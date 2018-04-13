# -*- coding: utf-8 -*-
from django.conf import settings
from django.contrib.auth import authenticate, login
from django.core.mail import send_mail

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import SignupSerializer
from .models import User, UserProfile


@api_view(['POST'])
def sign_up(request):
    serialized_user = SignupSerializer(data=request.data)
    if serialized_user.is_valid():
        registered_user = User.objects.create_user(
            email=request.data['email'],
            username=request.data['email'],
            password=request.data['password']
        )
        UserProfile.objects.create(
            user=registered_user,
            inn=request.data['inn'],
            phone=request.data['phone'],
            role=request.data['role'],
            company_name=request.data['company_name']
        )
        user = authenticate(username=request.data['email'], password=request.data['password'])
        if user is not None:
            login(request, user)

        email_message = u"Зарегистрирован новый пользователь\n"
        email_message += u"Название компании: " + request.data['company_name'] + "\n"
        email_message += u"email: " + request.data['email'] + "\n"
        email_message += u"ИНН: " + request.data['inn'] + "\n"
        email_message += u"Телефон: " + request.data['phone'] + "\n"

        if serialized_user.validated_data['role'] == 'producer':
            email_message += u"Роль: поставщик\n"
        elif serialized_user.validated_data['role'] == 'customer':
            email_message += u"Роль: торговая точка\n"

        if request.get_host() != '127.0.0.1:8000':
            send_mail(u'Регистрация нового пользователя на сайте the-sklad.ru', email_message, settings.EMAIL_HOST_USER, ['ceo@the-sklad.ru', ])
        return Response(serialized_user.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serialized_user.errors, status=status.HTTP_400_BAD_REQUEST)
