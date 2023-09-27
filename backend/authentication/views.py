from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView

class Register(APIView):
    def post(self, format=None):
        return Response("Hello")

