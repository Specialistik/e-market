# -*- coding: utf-8 -*-
from django.conf import settings
from django.contrib.auth import authenticate, login, logout
from django.core.mail import send_mail
from django.http import JsonResponse

from rest_framework.views import APIView
from rest_framework import status, parsers, renderers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken, Token
from rest_framework.authtoken.serializers import AuthTokenSerializer

from .serializers import SignupSerializer, CategorySerializer
from .models import User, UserProfile
from catalogs.models import Category
from customer.models import ProductCard, TradePoint


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
            send_mail(u'Регистрация нового пользователя на сайте the-sklad.ru', email_message,
                      settings.EMAIL_HOST_USER, ['ceo@the-sklad.ru', ])
        return Response(serialized_user.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serialized_user.errors, status=status.HTTP_400_BAD_REQUEST)


class SignIn(APIView):
    throttle_classes = ()
    permission_classes = ()
    parser_classes = (parsers.FormParser, parsers.MultiPartParser, parsers.JSONParser,)
    renderer_classes = (renderers.JSONRenderer,)
    serializer_class = AuthTokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        user = authenticate(username=request.data['username'], password=request.data['password'])
        if user is not None:
            login(request, user)
        store = {'token': token.key}
        if hasattr(request.user, 'profile'):
            store['role'] = request.user.profile.role
        return Response(store)


def sign_out(request):
    logout(request)
    return JsonResponse({'role': None, 'token': None})


def categories(request):
    return JsonResponse({
        'categories': [{
            'id': cat.id,
            'name': cat.name,
            'image': cat.get_image_url()
        } for cat in Category.objects.filter(pid__isnull=True)]
    })


def subcategories(request, pk):
    return JsonResponse({
        'categories': [{
            'id': cat.id,
            'name': cat.name,
            'image': cat.get_image_url()} for cat in Category.objects.filter(pid__id=pk)
        ],
        'current_cat': Category.objects.get(pk=pk).name,
    })


def products(request, cat_id):
    current_category = Category.objects.get(pk=cat_id)
    if hasattr(request.user, 'profile'):
        if request.user.profile.role == 'customer':
            for product in ProductCard.objects.filter(category=current_category):
                product.seen.add(request.user.id)
                product.save()

    return JsonResponse({
        'category': {
            'pid': current_category.pid_id,
            'name': current_category.name,
        },
        'products': [{
            'id': product.id,
            'name': product.name,
            'minimum_amount': product.minimum_amount,
            'description': product.description,
            'image': product.get_image_url(),
            'producer_price': product.producer_price,
            'product_weight': product.weight,
        } for product in ProductCard.objects.filter(category_id=cat_id)]
    })
    # 'trade_points': TradePoint.objects.filter(customer_id=request.user.id)


sign_in = SignIn.as_view()
