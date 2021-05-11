from rest_framework.generics import (
UpdateAPIView,
GenericAPIView,
RetrieveAPIView
)
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers.serializers import UserSerializer
from HouseeApp.models import HouseeUser
from rest_framework.response import Response
from rest_framework import status
from rest_framework import serializers
from django.conf import settings
from django.utils.translation import ugettext_lazy as _
from django import forms
from django.contrib.auth import (
get_user_model
)
UserModel = get_user_model()
from django.contrib.auth.tokens import default_token_generator
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from NotificationsApp.models import SmsCode
from NotificationsApp.sib_client import SibClient
from .validations.field_validations import is_valid_phone_number

from allauth.account.adapter import DefaultAccountAdapter


class MyAccountAdapter(DefaultAccountAdapter):

    def send_mail(self, template_prefix, email, context):
        # context['activate_url'] = 'https://%s/%s/%s' % (context['current_site'],
        #                         front_end_settings.get('email_verification_page_url'), context['key'])
        # msg = self.render_mail(template_prefix, email, context)

        template_id = 1 # get this from a table
        subject = 'Complete Your Housee Account'
        if settings.ENV == 'production':
            try:
                SibClient.send_transactional_email(subject, email, template_id)
            except Exception as e:
                print(e)
            # raise Exception('Could not send an email to ' + email)

    # ### uses Gmail SMTP as a temporary solution
    # def send_mail(self, template_prefix, email, context):
    #     from EmailServiceApp.models import EmailSender
    #     html = 'Welcome to Housee'
    #     subject = 'From Python Django'
    #     pt_sender = EmailSender.objects.get(email='masoud.housee@gmail.com')
    #     pt_sender.send_email(email, html, subject)

class UserHasPhoneNumber(RetrieveAPIView):
    permission_classes = (AllowAny,)

    def get(self, request, *args, **kwargs):
        user = self.get_queryset().first()
        if user:
            phone_number = user.phone_number
            if phone_number:
                return Response({'has_phone_number': True})
            else:
                return Response({'has_phone_number': False})
        else:
            return Response({'error': 'user not found'})

    def get_queryset(self):
        email = self.kwargs['pk']
        return HouseeUser.objects.filter(email=email)


class SetUserPhoneNumber(UpdateAPIView):
    permission_classes = (AllowAny,)

    def patch(self, request, *args, **kwargs):
        user = self.get_queryset().first()
        if user:
            phone_number = request.data.get('phone_number')
            if not is_valid_phone_number(phone_number):
                return Response({'error': 'phone number is not valid'})
            users_registered_with_this_phone_number = HouseeUser.objects.filter(phone_number=phone_number).count()
            if users_registered_with_this_phone_number != 0:
                return Response({'error': 'This phone number has been used for another account'})
            user.phone_number = phone_number
            user.save()
            return Response({'success': True})
        else:
            return Response({'error': 'user not found'})

    def get_queryset(self):
        email = self.kwargs['pk']
        return HouseeUser.objects.filter(email=email)


class ChangePassword(UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def patch(self, request, *args, **kwargs):
        user = request.user
        password = request.data['password']
        HouseeUser.objects.change_password(user=user, password=password)
        #return self.partial_update(request, *args, **kwargs)
        return Response({'message': 'password changed successfully', 'success': True})

    def get_queryset(self):
        return HouseeUser.objects.filter(id=self.request.user.id)


class PasswordResetForm(forms.Form):
    email = forms.EmailField(label=_("Email"), max_length=254)

    def send_sms(self, phone_number, context):
        """
        Send a django.core.mail.EmailMultiAlternatives to `to_email`.
        """

        SmsCode.objects.send_reset_password_sms(phone_number, context['uid'], context['token'])

    def get_users(self, email):
        """Given an email, return matching user(s) who should receive a reset.

        This allows subclasses to more easily customize the default policies
        that prevent inactive users and users with unusable passwords from
        resetting their password.
        """
        active_users = UserModel._default_manager.filter(**{
            '%s__iexact' % UserModel.get_email_field_name(): email,
            'is_active': True,
        })
        return (u for u in active_users if u.has_usable_password())

    def save(self, domain_override=None,
             subject_template_name='registration/password_reset_subject.txt',
             email_template_name='registration/password_reset_email.html',
             use_https=False, token_generator=default_token_generator,
             from_email=None, request=None, html_email_template_name=None,
             extra_email_context=None):
        """
        Generate a one-use only link for resetting password and send it to the
        user.
        """
        email = self.cleaned_data["email"]
        for user in self.get_users(email):

            if not domain_override:
                current_site = get_current_site(request)
                site_name = current_site.name
                domain = current_site.domain
            else:
                site_name = domain = domain_override
            context = {
                'email': email,
                'domain': domain,
                'site_name': site_name,
                'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                'user': user,
                'token': token_generator.make_token(user),
                'protocol': 'https' if use_https else 'http',
                **(extra_email_context or {}),
            }
            self.send_sms(user.phone_number, context)


class PasswordResetSerializer(serializers.Serializer):
    """
    Serializer for requesting a password reset e-mail.
    """
    email = serializers.EmailField()

    password_reset_form_class = PasswordResetForm

    def get_email_options(self):
        """Override this method to change default e-mail options"""
        return {}

    def validate_email(self, value):
        # Create PasswordResetForm with the serializer
        self.reset_form = self.password_reset_form_class(data=self.initial_data)
        if not self.reset_form.is_valid():
            raise serializers.ValidationError(self.reset_form.errors)

        return value

    def save(self):
        request = self.context.get('request')
        print(request)
        # Set some values to trigger the send_email method.
        opts = {
            'use_https': request.is_secure(),
            'from_email': getattr(settings, 'DEFAULT_FROM_EMAIL'),
            'request': request,
        }

        opts.update(self.get_email_options())
        self.reset_form.save(**opts)


class PasswordResetView(GenericAPIView):
    """
    Calls Django Auth PasswordResetForm save method.

    Accepts the following POST parameters: email
    Returns the success/fail message.
    """
    serializer_class = PasswordResetSerializer
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        # Create a serializer with request.data
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        serializer.save()
        # Return the success message with OK HTTP status
        return Response(
            {"detail": _("Password reset sms link has been sent.")},
            status=status.HTTP_200_OK
        )

# class PasswordResetConfirmView(GenericAPIView):
#     """
#     Password reset e-mail link is confirmed, therefore
#     this resets the user's password.
#
#     Accepts the following POST parameters: token, uid,
#         new_password1, new_password2
#     Returns the success/fail message.
#     """
#     serializer_class = PasswordResetConfirmSerializer
#     permission_classes = (AllowAny,)
#
#     @sensitive_post_parameters_m
#     def dispatch(self, *args, **kwargs):
#         return super(PasswordResetConfirmView, self).dispatch(*args, **kwargs)
#
#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response(
#             {"detail": _("Password has been reset with the new password.")}
#         )
