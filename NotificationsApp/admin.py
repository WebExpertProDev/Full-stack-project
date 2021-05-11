from django.contrib import admin
from .models import UserFcmToken
from .models import SmsCode


@admin.register(UserFcmToken)
class UserFcmTokenAdmin(admin.ModelAdmin):
    list_display = ['user', 'fcm_tokens']


@admin.register(SmsCode)
class SmsCodeAdmin(admin.ModelAdmin):
    list_display = ['phone_number', 'email', 'date_created', 'verification_code']
    search_fields = ('phone_number', )
