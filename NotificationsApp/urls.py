from django.urls import path
from .views import SendPushNotification, ApproveUserPhoneNumber, GetAnotherPhoneNumberVerificationCode

urlpatterns = [
    path('send_push/', SendPushNotification.as_view(), name="sendPushNotification"),
    path('approve_phone_number/', ApproveUserPhoneNumber.as_view(), name="approveUserPhoneNumber"),
    path('another_phone_verification_code/', GetAnotherPhoneNumberVerificationCode.as_view(), name="another_code"),
]
