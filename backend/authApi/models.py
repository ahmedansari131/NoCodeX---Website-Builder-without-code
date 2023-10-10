from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User
from authApi.manager import UserManager
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator


def no_numbers(value):
    if any(char.isdigit() for char in value):
        raise ValidationError({"name": "Name should not contain numbers."})


class User(AbstractUser):
    username = models.CharField(unique=True, max_length=20, null=True, blank=True)
    email = models.EmailField(unique=True)
    name = models.CharField(
        max_length=100,
        validators=[
            RegexValidator(
                regex=r"^[a-zA-Z\s]*$",
                message="Name should only contain letters and spaces.",
                code="invalid_name",
            ),
            no_numbers,
        ],
    )
    is_verified = models.BooleanField(default=False)
    otp = models.CharField(max_length=6, null=True, blank=True)

    USERNAME_FIELD = "email"
    EMAIL_FIELD="email"
    REQUIRED_FIELDS = ["name"]

    objects = UserManager()

    def __str__(self):
        return self.email


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(
        upload_to="authApi/images",
        default="authApi/images/profile.webp",
    )

    def __str__(self):
        return f"Profile of {self.user.username}"
