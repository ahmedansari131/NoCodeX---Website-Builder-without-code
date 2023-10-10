from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path("register/", RegisterApi.as_view(), name="Registeration"),
    path("verify-otp/", VerifyOtp.as_view(), name="OtpVerification"),
    path("login/", LoginApi.as_view(), name="LoginUser"),
    path("user-profile-setup/", ProfileApi.as_view(), name="UserProfile"),
    path("user-profile-setup/<int:id>", ProfileApi.as_view(), name="UserProfileUpdate"),
    path("refresh-token/", TokenRefreshView.as_view(), name="TokenRefresh"),
] 

