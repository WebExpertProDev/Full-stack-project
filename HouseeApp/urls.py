from django.urls import path
from .views import ChangePassword, UserHasPhoneNumber, SetUserPhoneNumber

urlpatterns = [
    # GET all form objects OR post an item to collection
    path('change_password/', ChangePassword.as_view(), name="changePassword"),
    path('has_phone_number/<str:pk>', UserHasPhoneNumber.as_view(), name="hasUserPhoneNumber"),
    path('set_phone_number/<str:pk>', SetUserPhoneNumber.as_view(), name="setUserPhoneNumber"),
]
