from django.urls import path
from .views import CustomRegisterView, CustomLoginView, VerifyEmailView, ChangePassword, CustomLogoutView
from django.conf.urls import include, re_path

urlpatterns = [
    path('login', CustomLoginView.as_view(), name='rest_auth_login'),
    path('logout', CustomLogoutView.as_view(), name='rest_auth_logout'),
    path('registration', CustomRegisterView.as_view(), name='rest_register'),
    path('password/change', ChangePassword.as_view(), name="changePassword"),
    re_path('confirm-email', VerifyEmailView.as_view(), name='confirmEmail')
]
