from rest_framework.response import Response
from rest_framework.views import APIView
from .serializer import *
from authApi.utils import send_otp_email


class RegisterApi(APIView):
    def post(self, request):
        try:
            data = request.data
            print(data)
            serializer = UserSerializer(data=data)
            if serializer.is_valid():
                if data["password"] == data["confirmPassword"]:
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
                        "message": "Password does not match",
                        "data": serializer._errors,
                    }
                )

            return Response(
                {
                    "status": 400,
                    "message": "Something went wrong...",
                    "data": serializer.errors,
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
            serializer = VerifyOtpSerializer(data=data)
            if serializer.is_valid(raise_exception=True):
                email = serializer.data["email"]
                otp = serializer.data["otp"]
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
                return Response(
                    {
                        "status": 200,
                        "message": "OTP Mathced",
                        "data": serializer.data,
                    }
                )

        except Exception as error:
            print("Error occurred while verifying the otp", error)
        return Response(
            {
                "status": 400,
                "message": "Something went wrong...",
                "data": serializer.errors,
            }
        )
