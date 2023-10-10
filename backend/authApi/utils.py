from django.core.mail import EmailMessage
import random
from authApi.models import User
import os
from django.conf import settings
from decouple import config


@staticmethod
def send_otp_email(email):
    otp = random.randint(1000, 9999)

    email_data = EmailMessage(
        subject="Email verification code | NoCodeX",
        body=f"Email verification code is {otp} for the NoCodeX.",
        from_email=config("EMAIL_FROM"),
        to=[email],
    )
    email_data.send()
    print(email)
    user_obj = User.objects.get(email=email)
    user_obj.otp = otp
    user_obj.save()
    print("Email sent successfully.")
