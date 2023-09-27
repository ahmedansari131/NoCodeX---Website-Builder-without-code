from .views import *
from django.urls import path

urlpatterns = [
    path('register/', Register.as_view(), name="Register")
]