import datetime, functools
from common.choices import *
from HouseeApp.validations.field_validations import *
from common.error_and_message_code import *
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.models import Token
from .helpers import expires_in, token_expire_handler
from pytz import timezone
from allauth.account.utils import complete_signup
from allauth.account import app_settings as allauth_settings
from rest_auth.models import TokenModel
from rest_auth.registration.app_settings import register_permission_classes
from rest_auth.registration.views import RegisterView
from HouseeApp.serializers.auth_serializers import HouseeUserRegisterSerializer
from rest_framework.generics import (UpdateAPIView)
from HouseeApp.serializers.serializers import UserSerializer
from django.utils.translation import ugettext_lazy as _
from rest_framework.permissions import (AllowAny, IsAuthenticated)
from HouseeApp.models import HouseeUser
from allauth.account.views import ConfirmEmailView
from rest_framework.views import APIView
from rest_auth.registration.serializers import VerifyEmailSerializer
from django.conf import settings
from rest_auth.views import LogoutView
from NotificationsApp.models import SmsCode, UserFcmToken
from common.utils import generate_random_string
from LandlordApp.models import LandlordUser
from TenantApp.models import TenantUser
from AgentApp.models import AgentUser
from LandlordApp.serializers import LandlordGetSerializer


TIME_ZONE = timezone(getattr(settings, 'TIME_ZONE'))


class CustomLoginView(ObtainAuthToken):
    def post(self, request, **kwargs):
        fcm_token = request.data.get('fcm_token')
        data = {
            'username': request.data['username'].lower(),
            'password': request.data['password'].lower(),
        }
        serializer = AuthTokenSerializer(data=data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            token, _ = Token.objects.get_or_create(user=user)
            # token_expire_handler will check, if the token is expired it will generate new one
            is_expired, token = token_expire_handler(token)
            user_serialized = UserSerializer(user)
            if user.registration_status == UserRegistrationStatus.WaitingForSmsApproval or \
                    user.registration_status == UserRegistrationStatus.WaitingForEmailAndSmsApproval:
                return LoginFailedPhoneNumberNotVerifiedException().get_response()

            if user.registration_status == UserRegistrationStatus.Guest:
                return LoginFailedGuestException().get_response()

            user.last_login = datetime.datetime.now(tz=TIME_ZONE)
            user.save()
            user_json = user_serialized.data
            if fcm_token:
                user_fcm_token_obj = UserFcmToken.objects.get_or_create(user.id)
                user_fcm_token_obj.add_fcm_token(fcm_token)
            if user.user_type == UserType.Landlord:
                landlord = LandlordUser.objects.get(id=user.id)
                ser = LandlordGetSerializer(landlord)
                user_json = {
                    **user_json,
                    **ser.data
                }
            return Response({
                'user': user_json,
                'expires_in': expires_in(token),
                'key': token.key
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomLogoutView(LogoutView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        fcm_token = request.data.get('fcm_token')
        if fcm_token:
            # removes this fcm token from the corresponding UserFcmToken object OR creates a UserFcmToken if DNE
            # TODO: test this
            user_fcm_token_obj = UserFcmToken.objects.get_or_create(request.user.id)
            user_fcm_token_obj.remove_fcm_token(fcm_token)
        return self.logout(request)


class CustomRegisterView(RegisterView):
    serializer_class = HouseeUserRegisterSerializer
    permission_classes = register_permission_classes()
    token_model = TokenModel

    def get_response_data(self, user):
        # if allauth_settings.EMAIL_VERIFICATION == allauth_settings.EmailVerificationMethod.MANDATORY:
        #     return {"detail": _("Verification e-mail sent.")}
        return {
            "detail": _("Email sent"),
            "success": True
        }

    def create(self, request, *args, **kwargs):
        ip_address = request.META['REMOTE_ADDR']
        data = request.data
        email = data.get('email')
        full_name = data.get('full_name')
        password = data.get('password1')
        password2 = data.get('password2')
        phone_number = data.get('phone_number')
        user_type = data.get('user_type')
        is_guest = data.get('is_guest')

        if not is_in_enum_choices(user_type, UserType.CHOICES):
            return RegistrationFailedInvalidFormatException('user_type is not valid').get_response()

        if not full_name:
            return RegistrationFailedInvalidFormatException('full_name is missing').get_response()

        # Guest Mode is only for Consumers
        if is_guest and user_type == UserType.Tenant:
            password = password2 = generate_random_string(36) # generates a random string for password

        if not (password and password2):
            return RegistrationFailedInvalidFormatException('password1 or password2 is missing').get_response()

        if not phone_number and not email:
            return RegistrationFailedInvalidFormatException('At least one of phone_number or '
                                                            'email should be provided').get_response()

        if not email and not is_valid_phone_number(phone_number):
            return RegistrationFailedInvalidFormatException('phone number pattern is wrong.'
                                                            ' It should start with +1').get_response()

        if not phone_number and not is_valid_email(email):
            return RegistrationFailedInvalidFormatException('email is not valid').get_response()

        if password != password2:
            return RegistrationFailedInvalidFormatException('password1 is not the same as password2').get_response()

        if len(password) < 6:
            return RegistrationFailedInvalidFormatException('password length should be at least 6 characters').get_response()

        kwargs = {
            'full_name': full_name,
            'email': email,
            'password': password,
            'phone_number': phone_number
        }
        try:
            if user_type == UserType.Landlord:  # for Landlord
                request.user = LandlordUser.objects.create(**kwargs)

            elif user_type == UserType.Tenant:  # for Tenant

                if is_guest:
                    kwargs['registration_status'] = UserRegistrationStatus.Guest
                request.user = TenantUser.objects.create(**kwargs)

            elif user_type == UserType.Agent: # for Agent
                request.user = AgentUser.objects.create(**kwargs)

            elif user_type == UserType.Admin: # for Housee internal user
                request.user = HouseeUser.objects.create(**kwargs, is_admin=True)
        except Exception as e:
            return RegistrationFailedInvalidFormatException(str(e)).get_response()

        try:
            complete_signup(self.request._request, request.user,
                        allauth_settings.EMAIL_VERIFICATION, None)
        except Exception as e:
            request.user.delete()
            print(e)
            return RegistrationFailedInvalidFormatException(str(e)).get_response()

        #headers = self.get_success_headers(serializer.data)
        try:
            sms_code_object = SmsCode.objects.create(phone_number=phone_number, ip_address=ip_address)
        except:
            sms_code_object = SmsCode.objects.get(phone_number=phone_number)

        try:
            sms_code_object.send_verification_code()
        except:
            request.user.delete()
            sms_code_object.delete()
            return SendSmsException().get_response()

        # TODO : make this correct
        headers = {}
        return Response({
            **self.get_response_data(request.user)
        },
        status=status.HTTP_201_CREATED, headers=headers)


class ChangePassword(UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def patch(self, request, *args, **kwargs):
        user = request.user
        password1 = request.data.get('new_password1')
        password2 = request.data.get('new_password2')
        if not password1 or not password2:
            return ChangePasswordException("fields 'new_password1' or 'new_password2' is missing.").get_response()
        if password1 != password2:
            return ChangePasswordException('passwords are not the same').get_response()
        if len(password1) < 8:
            return ChangePasswordException('password\'s length must be at least 8.').get_response()

        HouseeUser.objects.change_password(user=user, password=password1)
        user.registration_status = UserRegistrationStatus.Done
        user.save()
        #return self.partial_update(request, *args, **kwargs)
        return Response({'message': 'password changed successfully', 'success': True})

    def get_queryset(self):
        return HouseeUser.objects.filter(id=self.request.user.id)


class VerifyEmailView(APIView, ConfirmEmailView):
    permission_classes = (AllowAny,)
    allowed_methods = ('POST', 'OPTIONS', 'HEAD')

    def get_serializer(self, *args, **kwargs):
        return VerifyEmailSerializer(*args, **kwargs)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.kwargs['key'] = serializer.validated_data['key']
        confirmation = self.get_object()
        user = confirmation.email_address.user
        user.registration_status = UserRegistrationStatus.get_email_approved_status(user.registration_status)
        user.save()
        confirmation.confirm(self.request)
        return Response({'detail': _('Email was verified successfully!')}, status=status.HTTP_200_OK)


class UpdateProfile(UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def patch(self, request, *args, **kwargs):
        # HouseeUser.objects.change_password(user=user, password=password1)
        #return self.partial_update(request, *args, **kwargs)
        return Response({'message': 'password changed successfully', 'success': True})

    def get_queryset(self):
        return HouseeUser.objects.filter(id=self.request.user.id)
