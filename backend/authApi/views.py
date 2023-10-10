import json
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializer import *
from authApi.utils import send_otp_email
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated


def generate_tokens(user):
    refresh = RefreshToken.for_user(user)
    return {
        "data": {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        },
    }


class RegisterApi(APIView):
    def post(self, request):
        try:
            data = request.data
            print(data)
            serializer = UserSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                send_otp_email(serializer.data["email"])
                return Response(
                    {
                        "status": 200,
                        "message": "Registered successfully, check email for verification",
                        "data": serializer.data,
                    }
                )

            return Response(
                {
                    "status": 400,
                    "message": serializer.errors,
                }
            )
        except Exception as error:
            print("Error occurred while registering the user", error)
        return Response({"Error": "Error occured"})


class VerifyOtp(APIView):
    def post(self, request):
        try:
            data = request.data
            print(data)
            if data["otp"] == "":
                return Response(
                    {
                        "status": 400,
                        "message": "This field is required",
                    }
                )
            serializer = VerifyOtpSerializer(data=data)
            if serializer.is_valid():
                email = serializer.data["email"]
                otp = serializer.data["otp"]
                print("this is otp", otp)
                user = User.objects.filter(email=email)
                if not user.exists():
                    return Response(
                        {
                            "status": 400,
                            "message": "User does not exist",
                            "data": serializer.errors,
                        }
                    )

                if user[0].otp != otp:
                    print("Otp does not matched")
                    return Response(
                        {
                            "status": 400,
                            "message": "OTP does not match",
                            "data": serializer.errors,
                        }
                    )
                user = user.first()
                user.is_verified = True
                user.save()
                token = generate_tokens(user)

                print("OTP matched")
                return Response(
                    {
                        "status": 200,
                        "token": token,
                    }
                )

        except Exception as error:
            print("Error occurred while verifying the otp", error)
        return Response(
            {
                "status": 400,
                "message": "Something went wrong...sfnk",
                "data": serializer.errors,
            }
        )


class LoginApi(APIView):
    def post(self, request):
        try:
            data = request.data
            print(data)
            serializer = LoginApiSerializer(data=data)

            if serializer.is_valid():
                print("In serializer")
                login_data = serializer.validated_data["login_data"]
                password = serializer.validated_data["password"]
                user = authenticate(email=login_data, password=password)
                if user is None:
                    user = authenticate(
                        email=User.objects.get(username=login_data), password=password
                    )

                if user is None:
                    return Response(
                        {"status": 400, "message": {"user": "User does not exist"}}
                    )

                if user.is_verified:
                    user_data = {}
                    token = generate_tokens(user)
                    user_profile = Profile.objects.filter(user=user)
                    print("user profile", user_profile)
                    if user_profile:
                        for user in user_profile:
                            user_data["image"] = user.image.url
                            user_data["username"] = user.user.username
                            user_data["email"] = user.user.email
                            user_data["id"] = user.user.id
                            user_data["profileId"] = user.id

                    print(user_data)
                    return Response(
                        {
                            "status": 200,
                            "messasge": "Token generated",
                            "token": token,
                            "user": user_data,
                        }
                    )

                return Response(
                    {"status": 400, "message": "User is not verified", "data": {}}
                )

            return Response(
                {
                    "status": 400,
                    "message": serializer.errors,
                }
            )
        except Exception as error:
            print("Error occurred while login the user", error)

        return Response({"status": 400, "message": "Something went wrong..."})


class ProfileApi(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            data = request.data
            print("This is post data for profile setup", data)
            serializer = ProfileSerializer(data=data)
            if serializer.is_valid(raise_exception=True):
                loggedin_user = request.user
                user = User.objects.filter(email=loggedin_user).first()
                username = data.get("username")
                user.username = username
                user.save()

                serializer.save(user=loggedin_user)
                user_data = {}
                user_profile = Profile.objects.filter(user=loggedin_user)
                if user_profile:
                    for user in user_profile:
                        user_data["image"] = user.image.url
                        user_data["username"] = user.user.username
                        user_data["email"] = user.user.email
                        user_data["id"] = user.user.id
                        user_data["profileId"] = user.id

                return Response(
                    {
                        "status": 200,
                        "message": "Profile Saved, Successfully",
                        "user": user_data,
                    }
                )
        except Exception as error:
            print("Error occurred while saving the profile of the user", error)
        return Response({"status": 400, "message": "Something went wrong", "data": {}})

    def put(self, request, id):
        try:
            data = request.data
            print("This is updation data for profile", data)
            serializer = ProfileSerializer(data=data)
            if serializer.is_valid(raise_exception=True):
                print("hello")
                if "username" in data:
                    username = data.get("username")
                    user = User.objects.filter(username=username)
                    if user:
                        return Response(
                            {"status": 400, "message": "Username already exist"}
                        )
                    user = User.objects.get(id=id)
                    user.username = username
                    user.save()

                profile = Profile.objects.get(id=data.get("profileId"))
                if "image" in serializer.validated_data:
                    profile.image = serializer.validated_data["image"]
                    profile.save()
                user_data = {}
                user_profile = Profile.objects.filter(user=request.user)
                if user_profile:
                    for user in user_profile:
                        user_data["image"] = user.image.url
                        user_data["username"] = user.user.username
                        user_data["email"] = user.user.email
                        user_data["id"] = user.user.id
                        user_data["profileId"] = user.id

                return Response(
                    {
                        "status": 200,
                        "message": "Profile Saved, Successfully",
                        "user": user_data,
                    }
                )

        except Exception as error:
            print("Error occurred while updating the profile", error)
        return Response({"status": 400, "message": "Something went wrong"})
