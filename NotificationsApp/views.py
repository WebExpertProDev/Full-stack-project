from common.serializer_mapper import SerializerMapper
from .clients.firebase import FirebaseCloudMessagingManager
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.generics import (
    CreateAPIView,
    RetrieveAPIView
)
from .models import SmsCode
from LoggerApp.models import ActivityLog
from HouseeApp.models import HouseeUser
from common.utils import response_bad_request
from common.choices import *
from common.error_and_message_code import *
from rest_framework.authtoken.models import Token
from django.shortcuts import get_object_or_404


class SendPushNotification(SerializerMapper, CreateAPIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request, *args, **kwargs):
        try:
            registration_ids = self.request.data['registration_ids']
            message_title = self.request.data['message_title']
            message_body = self.request.data['message_body']
        except:
            return Response({'error': 'registration_ids or message_title or message_body is missing in body'})
        if len(registration_ids) == 0:
            return Response({'error': 'registration_ids cannot be an empty list'})
        response = FirebaseCloudMessagingManager.notify_all_devices(registration_ids, message_title, message_body)
        return Response(response)


class ApproveUserPhoneNumber(CreateAPIView):
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        body = self.request.data
        actual_verification_code = body.get('code')
        phone_number = body.get('phone_number')
        if not actual_verification_code or not phone_number:
            return PhoneNumberApprovalException("POST body should include 'code' and 'phone_number'").get_response()
        try:
            user = HouseeUser.objects.get(phone_number=phone_number)
        except:
            return PhoneNumberApprovalException('Phone number is not registered').get_response()
        try:
            sms_code_object = SmsCode.objects.get(phone_number=phone_number)
        except SmsCode.DoesNotExist as e:
            ActivityLog.objects.create(ip_address=request.META['REMOTE_ADDR'], message=str(e),
                                       where='ApproveUserPhoneNumber.post', severity=LogSeverity.High)
            return PhoneNumberApprovalException('an error occurred.').get_response()
        expected_verification_code = sms_code_object.verification_code
        if str(actual_verification_code) == str(expected_verification_code):
            # user.registration_status = UserRegistrationStatus.get_sms_approved_status(user.registration_status)
            # user.registration_status = UserRegistrationStatus.Done
            # user.save()
            try:
                token = Token.objects.create(user=user)
            except:
                token = Token.objects.get(user=user)
            user_json = {
                'full_name': user.full_name,
                'email': user.email,
                'phone_number': user.phone_number,
                'user_type': user.user_type,
                'registration_status': user.registration_status
            }
            return Response({'detail': 'Verification code is correct', 'success': True,
                             'user': user_json, 'key': token.key}, status=status.HTTP_200_OK)
        else:
            return PhoneNumberApprovalException('Verification code is wrong').get_response()


class GetAnotherPhoneNumberVerificationCode(RetrieveAPIView):
    permission_classes = (AllowAny,)

    def get(self, request, *args, **kwargs):
        phone_number = self.request.query_params.get('phone_number')
        self.get_object() # DONT REMOVE THIS LINE. if user DNE, it throws 404
        sms_code_object = SmsCode.objects.get_or_create(phone_number=phone_number)
        try:
            sms_code_object.send_verification_code()
        except Exception as e:
            return response_bad_request({'error': str(e.args[0])})
        return Response({'detail': 'sms sent successfully', 'success': True}, status=status.HTTP_200_OK)

    def get_object(self):
        phone_number = self.request.query_params.get('phone_number')
        if not phone_number:
            raise Exception("You need to pass 'phone_number' as a query parameter to this endpoint.")
        return get_object_or_404(HouseeUser, phone_number=phone_number)
