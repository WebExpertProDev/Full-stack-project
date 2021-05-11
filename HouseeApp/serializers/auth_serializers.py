from django.utils.translation import ugettext_lazy as _
from django.contrib.auth import settings
from allauth.account import app_settings as allauth_settings
from allauth.utils import (email_address_exists, get_username_max_length)
from allauth.account.adapter import get_adapter
from allauth.account.models import EmailAddress
from allauth.account.forms import ResetPasswordForm
from rest_auth.serializers import PasswordResetSerializer, PasswordResetConfirmSerializer, \
    PasswordChangeSerializer
from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer


class HouseeUserRegisterSerializer(RegisterSerializer):
    username = serializers.CharField(
        max_length=get_username_max_length(),
        min_length=allauth_settings.USERNAME_MIN_LENGTH,
        required=allauth_settings.USERNAME_REQUIRED
    )
    email = serializers.EmailField(required=allauth_settings.EMAIL_REQUIRED)
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    captcha_token = serializers.CharField(required=False, write_only=True)
    user_type = serializers.IntegerField(required=False)

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_settings.UNIQUE_EMAIL:
            if email and email_address_exists(email):
                raise serializers.ValidationError(
                    _("A user is already registered with this e-mail address."))
        return email

    def custom_signup(self, request, user):
        # TODO: what you should put here?
        pass

    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', '')
        }

    def validate_captcha_token(self, value):
        return True
        # try:
        #     r = requests.post(
        #         'https://www.google.com/recaptcha/api/siteverify',
        #         {
        #             'secret': settings.RECAPTCHA_PRIVATE_KEY,
        #             'response': value
        #         },
        #         timeout=5
        #     )
        #     r.raise_for_status()
        # except requests.RequestException as e:
        #     raise ValidationError(
        #         _('Connection to reCaptcha server failed')
        #     )
        #
        # json_response = r.json()
        #
        # if bool(json_response['success']):
        #     return value
        # else:
        #     if 'error-codes' in json_response:
        #         if 'missing-input-secret' in json_response['error-codes'] or \
        #                 'invalid-input-secret' in json_response['error-codes']:
        #             raise serializers.ValidationError(
        #                 _('Connection to reCaptcha server failed')
        #             )
        #         else:
        #             raise serializers.ValidationError(
        #                 _('reCaptcha invalid or expired, try again')
        #             )
        #     else:
        #         raise serializers.ValidationError(
        #             _('reCaptcha response from Google not valid, try again')
        #         )


class VerifyEmailSerializer(serializers.Serializer):
    key = serializers.CharField()


class PasswordSerializer(PasswordResetSerializer):
    password_reset_form_class = ResetPasswordForm


class CustomPasswordResetConfirmSerializer(PasswordResetConfirmSerializer):
    def save(self):
        if not EmailAddress.objects.filter(user=self.user).exists():
            EmailAddress.objects.create(user=self.user, email=self.user.email, verified=True, primary=True)
        return self.set_password_form.save()


class CustomPasswordChangeSerializer(PasswordChangeSerializer):
    def __init__(self, *args, **kwargs):
        self.old_password_field_enabled = getattr(
            settings, 'OLD_PASSWORD_FIELD_ENABLED', False
        )
        self.logout_on_password_change = getattr(
            settings, 'LOGOUT_ON_PASSWORD_CHANGE', False
        )
        super(PasswordChangeSerializer, self).__init__(*args, **kwargs)

        self.request = self.context.get('request')
        self.user = getattr(self.request, 'user', None)

        self.empty_old_password = True if self.user.password == '' else False

        if not self.old_password_field_enabled or self.empty_old_password:
            self.fields.pop('old_password')

    def save(self):
        super().save()
        if self.empty_old_password:
            if not EmailAddress.objects.filter(user=self.user).exists():
                EmailAddress.objects.create(user=self.user, email=self.user.email, verified=True, primary=True)
