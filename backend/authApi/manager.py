from django.contrib.auth.models import BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, email, name, password=None, password2=None, **extra_fields):
        if not email:
            raise ValueError("Email should be set")
        email = self.normalize_email(email)
        user = self.model(email=email, name=name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is staff true")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is superuser true")
        return self.create_user(email, name, password, **extra_fields)
