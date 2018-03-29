# -*- coding: utf-8 -*-

import datetime
import uuid
import os


from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout as logout_user
from django.contrib.auth.decorators import login_required
from django.core.mail import send_mail
from django.conf import settings

from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from .models import UserProfile, Address, OrganizationType, LegalAct, SignerInfo, IdentityDocument, Account
from customer.models import TradePoint
from producer.models import ProducerDepot
from .serializers import SignupSerializer
from manager.views import my_clients, my_personal_data
from core.decorators import roles_required


@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
@csrf_exempt
def signup(request):
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


def index(request):
    if request.user.is_anonymous:
        if request.method == 'GET':
            return render(request, 'sign_in.html')
    else:
        if hasattr(request.user, 'profile'):
            if request.user.profile.role == 'customer':
                return redirect('/categories')
            if request.user.profile.role == 'producer':
                return redirect('/my_products')
            if request.user.profile.role == 'supervisor':
                return redirect('/my_trade_points')
            if request.user.profile.role == 'manager':
                if request.user.profile.created:
                    return redirect(my_clients)
                return redirect(my_personal_data)
    return redirect('/categories')


@csrf_exempt
def sign_in(request):
    if request.method == 'POST':
        if 'email' in request.POST and 'password' in request.POST:
            user = authenticate(username=request.POST['email'], password=request.POST['password'])
            if user is not None:
                login(request, user)
                return redirect('/')
            else:
                return render(request, 'sign_in.html', {'error': u'Неверная почта или пароль'})
    return render(request, 'sign_in.html')


def register(request):
    if not request.user.is_anonymous:
        return redirect(index)

    if 'role' not in request.POST:
        return render(request, 'pick_role.html')
    role = request.POST['role']
    return render(request, 'register.html', {'role': role})


def logout(request):
    logout_user(request)
    return redirect('/')


@login_required(login_url='/sign_in/')
def profile(request):
    if not hasattr(request.user, 'profile'):
        return render(request, '500.html', {'error_message': u'У вас нет профиля пользователя'})

    data = {
        'profile': request.user.profile,
        'organization_types': OrganizationType.objects.all(),
        'legal_acts': LegalAct.objects.all(),
        'accounts': Account.objects.filter(profile_id=request.user.profile.id),
    }
    if request.user.profile.role in ('customer', 'producer'):
        if request.user.profile.role == 'customer':
            data['trade_points'] = TradePoint.objects.filter(customer_id=request.user.id)
            return render(request, 'profile_create_customer.html', data)

        if request.user.profile.role == 'producer':
            data['depots'] = ProducerDepot.objects.filter(producer_id=request.user.id)
            return render(request, 'profile_create_producer.html', data)

    if request.user.profile.role == 'manager':
        return redirect(my_personal_data)


@login_required(login_url='/sign_in/')
def create_profile(request):
    if hasattr(request.user, 'profile'):
        if request.user.profile.role in ('customer', 'producer'):
            data = {
                'profile': request.user.profile,
                'organization_types': OrganizationType.objects.all(),
                'legal_acts': LegalAct.objects.all(),
                'accounts': Account.objects.filter(profile_id=request.user.profile.id),
            }

            if request.user.profile.role == 'customer':
                data['trade_points'] = TradePoint.objects.filter(customer_id=request.user.id)
                if request.user.profile.created:
                    return render(request, 'profile_update_customer.html', data)
                return render(request, 'profile_create_customer.html', data)

            if request.user.profile.role == 'producer':
                data['depots'] = ProducerDepot.objects.filter(producer_id=request.user.id)
                if request.user.profile.created:
                    return render(request, 'profile_update_producer.html', data)
                return render(request, 'profile_create_producer.html', data)
        return render(request, '500.html', {'error_message': u'Только поставщики и заказчики имеют свой профиль'})
    return render(request, '500.html', {'error_message': u'Ошибка при просмотре профиля пользователя'})


def profile_fiz_and_jur_address(request):
    u_p = request.user.profile
    if u_p:
        if u_p.juridical_address is None:
            u_p.juridical_address = Address.objects.create(
                full_address=request.POST['jur_full_address'],
                index=request.POST['jur_index'],
                region=request.POST['jur_region'],
                city=request.POST['jur_city'],
                street=request.POST['jur_street'],
                house=request.POST['jur_house'],
                block=request.POST['jur_block'],
                structure=request.POST['jur_structure'],
                flat=request.POST['jur_flat']
            )
            u_p.save()
        else:
            u_p.juridical_address.full_address = request.POST['jur_full_address']
            u_p.juridical_address.index = request.POST['jur_index']
            u_p.juridical_address.region = request.POST['jur_region']
            u_p.juridical_address.city = request.POST['jur_city']
            u_p.juridical_address.street = request.POST['jur_street']
            u_p.juridical_address.house = request.POST['jur_house']
            u_p.juridical_address.block = request.POST['jur_block']
            u_p.juridical_address.structure = request.POST['jur_structure']
            u_p.juridical_address.flat = request.POST['jur_flat']
            u_p.juridical_address.save()

        if 'physical_is_juridical' in request.POST:
            u_p.physical_is_juridical = True
        else:
            u_p.physical_is_juridical = False
            if u_p.physical_address is None:
                u_p.physical_address = Address.objects.create(
                    full_address=request.POST['fiz_full_address'],
                    index=request.POST['fiz_index'],
                    region=request.POST['fiz_region'],
                    city=request.POST['fiz_city'],
                    street=request.POST['fiz_street'],
                    house=request.POST['fiz_house'],
                    block=request.POST['fiz_block'],
                    structure=request.POST['fiz_structure'],
                    flat=request.POST['fiz_flat']
                )
                u_p.save()
            else:
                u_p.physical_address.full_address = request.POST['fiz_full_address']
                u_p.physical_address.index = request.POST['fiz_index']
                u_p.physical_address.region = request.POST['fiz_region']
                u_p.physical_address.city = request.POST['fiz_city']
                u_p.physical_address.street = request.POST['fiz_street']
                u_p.physical_address.house = request.POST['fiz_house']
                u_p.physical_address.block = request.POST['fiz_block']
                u_p.physical_address.structure = request.POST['fiz_structure']
                u_p.physical_address.flat = request.POST['fiz_flat']
                u_p.physical_address.save()
        u_p.save()

    return redirect(profile)


@login_required(login_url='/sign_in/')
def profile_juridical_address(request):
    u_p = request.user.profile
    if u_p:
        if u_p.juridical_address is None:
            u_p.juridical_address = Address.objects.create(
                full_address=request.POST['full_address'],
                index=request.POST['index'],
                region=request.POST['region'],
                city=request.POST['city'],
                street=request.POST['street'],
                house=request.POST['house'],
                block=request.POST['block'],
                structure=request.POST['structure'],
                flat=request.POST['flat']
            )
            u_p.save()
        else:
            u_p.juridical_address.full_address = request.POST['full_address']
            u_p.juridical_address.index = request.POST['index']
            u_p.juridical_address.region = request.POST['region']
            u_p.juridical_address.city = request.POST['city']
            u_p.juridical_address.street = request.POST['street']
            u_p.juridical_address.house = request.POST['house']
            u_p.juridical_address.block = request.POST['block']
            u_p.juridical_address.structure = request.POST['structure']
            u_p.juridical_address.flat = request.POST['flat']
            u_p.juridical_address.save()

        if 'physical_is_juridical' in request.POST and request.POST['physical_is_juridical'] == 'on':
            u_p.physical_is_juridical = True
        else:
            u_p.physical_is_juridical = False
        u_p.save()

        return redirect(profile)
    return render(request, '500.html', {'error_message': u'Не найден профиль пользователя'})


@login_required(login_url='/sign_in/')
def profile_physical_address(request):
    u_p = request.user.profile
    if u_p:
        if u_p.physical_address is None:
            u_p.physical_address = Address.objects.create(
                index=request.POST['index'],
                region=request.POST['region'],
                city=request.POST['city'],
                street=request.POST['street'],
                house=request.POST['house'],
                block=request.POST['block'],
                structure=request.POST['structure'],
                flat=request.POST['flat']
            )
            u_p.save()
        else:
            u_p.physical_address.index = request.POST['index']
            u_p.physical_address.region = request.POST['region']
            u_p.physical_address.city = request.POST['city']
            u_p.physical_address.street = request.POST['street']
            u_p.physical_address.house = request.POST['house']
            u_p.physical_address.block = request.POST['block']
            u_p.physical_address.structure = request.POST['structure']
            u_p.physical_address.flat = request.POST['flat']
            u_p.physical_address.save()

        return redirect(profile)
    return render(request, '500.html', {'error_message': u'Не найден профиль пользователя'})


@login_required(login_url='/sign_in/')
def profile_company_info(request):
    u_p = request.user.profile
    if u_p:
        u_p.inn = request.POST['inn']
        u_p.ogrn = request.POST['ogrn']
        u_p.kpp = request.POST['kpp']
        u_p.organization_type_id = request.POST['org_type_short']
        u_p.legal_act_id = request.POST['legal_act']
        u_p.save()

        return redirect(profile)
    return render(request, '500.html', {'error_message': u'Не найден профиль пользователя'})


@login_required(login_url='/sign_in/')
def profile_signer_info(request):
    u_p = request.user.profile
    if u_p:
        if u_p.signer_info is None:
            u_p.signer_info = SignerInfo.objects.create(
                surname=request.POST['surname'],
                name=request.POST['name'],
                patronymic=request.POST['patronymic'],
                birth_date=datetime.datetime.strptime(request.POST['issued_date'], "%d.%m.%Y").date(),
                position=request.POST['position'],
            )
            u_p.save()
        else:
            u_p.signer_info.surname = request.POST['surname']
            u_p.signer_info.name = request.POST['name']
            u_p.signer_info.patronymic = request.POST['patronymic']
            u_p.signer_info.birth_date = datetime.datetime.strptime(request.POST['birth_date'], "%d.%m.%Y").date()
            u_p.signer_info.position = request.POST['position']
            u_p.signer_info.save()

        return redirect(profile)
    return render(request, '500.html', {'error_message': u'Не найден профиль пользователя'})


@login_required(login_url='/sign_in/')
def profile_identity_document(request):
    u_p = request.user.profile
    if u_p:
        if u_p.identity_document is None:
            u_p.identity_document = IdentityDocument.objects.create(
                series=request.POST['series'],
                number=request.POST['number'],
                issued_by=request.POST['issued_by'],
                issued_date=datetime.datetime.strptime(request.POST['issued_date'], "%d.%m.%Y").date()
            )
            u_p.save()
        else:
            u_p.identity_document.series = request.POST['series']
            u_p.identity_document.number = request.POST['number']
            u_p.identity_document.issued_by = request.POST['issued_by']
            u_p.identity_document.issued_date = datetime.datetime.strptime(request.POST['issued_date'], "%d.%m.%Y").date()
            u_p.identity_document.save()
        if 'document' in request.FILES:
            # todo: При изменении файла его было бы неплохо удалять
            u_p.identity_document.document.save(str(uuid.uuid4()) + request.FILES['document'].name, request.FILES['document'])
            u_p.identity_document.save()

        return redirect(profile)
    return render(request, '500.html', {'error_message': u'Не найден профиль пользователя'})


@login_required(login_url='/sign_in/')
def profile_signer_info_and_identity(request):
    u_p = request.user.profile
    if u_p:
        if u_p.signer_info is None:
            u_p.signer_info = SignerInfo.objects.create(
                surname=request.POST['surname'],
                name=request.POST['name'],
                patronymic=request.POST['patronymic'],
                birth_date=datetime.datetime.strptime(request.POST['birth_date'], "%d.%m.%Y").date(),
                position=request.POST.get('position', ''),
            )
            u_p.save()
        else:
            u_p.signer_info.surname = request.POST['surname']
            u_p.signer_info.name = request.POST['name']
            u_p.signer_info.patronymic = request.POST['patronymic']
            u_p.signer_info.birth_date = datetime.datetime.strptime(request.POST['birth_date'], "%d.%m.%Y").date()
            u_p.signer_info.position = request.POST.get('position', '')
            u_p.signer_info.save()

        if u_p.identity_document is None:
            u_p.identity_document = IdentityDocument.objects.create(
                series=request.POST['series'],
                number=request.POST['number'],
                issued_by=request.POST['issued_by'],
                issued_date=datetime.datetime.strptime(request.POST['issued_date'], "%d.%m.%Y").date()
            )
            u_p.save()
        else:
            u_p.identity_document.series = request.POST['series']
            u_p.identity_document.number = request.POST['number']
            u_p.identity_document.issued_by = request.POST['issued_by']
            u_p.identity_document.issued_date = datetime.datetime.strptime(request.POST['issued_date'], "%d.%m.%Y").date()
            u_p.identity_document.save()

        if not u_p.created:
            u_p.created = True
            u_p.save()
        if 'document' in request.FILES:
            # todo: При изменении файла его было бы неплохо удалять
            u_p.identity_document.document.save(str(uuid.uuid4()) + request.FILES['document'].name, request.FILES['document'])
            u_p.identity_document.save()

        return redirect(profile)
    return render(request, '500.html', {'error_message': u'Не найден профиль пользователя'})


@login_required(login_url='/sign_in')
def profile_account_add(request):
    if hasattr(request.user, 'profile'):
        Account.objects.create(
            profile=request.user.profile,
            account_number=request.POST['account_number'],
            bik=request.POST['bik'],
            bank_name=request.POST['bank_name'],
            correspondent_account=request.POST['correspondent_account']
        )
        return redirect(profile)
    return render(request, '500.html', {'error_message': u'Не найден профиль пользователя'})


@login_required(login_url='/sign_in')
def profile_account_edit(request, pk):
    if hasattr(request.user, 'profile'):
        my_account = Account.objects.get(pk=pk, profile_id=request.user.profile.id)
        if my_account:
            my_account.account_number = request.POST['account_number']
            my_account.bik = request.POST['bik']
            my_account.bank_name = request.POST['bank_name']
            my_account.correspondent_account = request.POST['correspondent_account']
            my_account.save()
            return redirect(profile)
        return render(request, '500.html', {'error_message': u'Редактируемый счёт не найден'})
    return render(request, '500.html', {'error_message': u'Не найден профиль пользователя'})


@login_required(login_url='/sign_in')
def profile_skip_creation(request):
    if hasattr(request.user, 'profile'):
        my_profile = UserProfile.objects.get(pk=request.user.profile.id)
        my_profile.created = True
        my_profile.save()
        return redirect(profile)
    return render(request, '500.html', {'error_message': u'Не найден профиль пользователя'})