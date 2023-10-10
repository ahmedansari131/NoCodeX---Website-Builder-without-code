from rest_framework import serializers
from .models import User, Profile


class UserSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={"input_type": "password"}, write_only=True)

    class Meta:
        model = User
        fields = ["email", "name", "username", "password", "password2", "is_verified"]
        extra_kwargs = {"password": {"write_only": True}}

    def validate_name(self, value):
        if len(value) < 3:
            raise serializers.ValidationError("Name should be atleast of 3 characters.")
        return value

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError(
                "Password should be atleast of 8 characters."
            )
        return value

    def validate(self, data):
        password = data.get("password")
        password2 = data.get("password2")
        if password != password2:
            raise serializers.ValidationError(
                {"password": "Password and confirm password does not match"}
            )
        return data

    def create(self, validate_data):
        return User.objects.create_user(**validate_data)


class VerifyOtpSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    otp = serializers.CharField()

    class Meta:
        model = User
        fields = ["email", "otp"]


class LoginApiSerializer(serializers.Serializer):
    login_data = serializers.CharField()
    password = serializers.CharField()

    def validate_login_data(self, value):
        try:
            user = User.objects.get(email = value)
            print(user)
        except User.DoesNotExist:
            try:
                user = User.objects.get(username = value)
                print(user)
            except User.DoesNotExist:
                raise serializers.ValidationError("Invalid Credentials.")
        return value

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError(
                "Password should be atleast of 8 characters."
            )
        return value



class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["image"]
