from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    
    # def validate_email(self, request):


    class Meta:
        model = User
        fields = ["email", "name", "password", "is_verified"]


class VerifyOtpSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    otp = serializers.CharField()

    class Meta:
        model = User
        fields = ["email", "otp"]
