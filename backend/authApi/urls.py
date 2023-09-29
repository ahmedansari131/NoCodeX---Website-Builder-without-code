from django.urls import path
from .views import *

urlpatterns = [
    path('register/', RegisterApi.as_view(), name="Registeration"),
    path('verify-otp/', VerifyOtp.as_view(), name="OtpVerification"),
]
