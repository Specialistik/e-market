# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required

from core.views import profile
from core.models import Address
from catalogs.models import Category
from producer.models import ProductCard, ProducerDepot


def categories(request):
    return render(request, 'categories.html', {'categories': Category.objects.filter(pid__isnull=True)})


def subcategories(request, pk):
    try:
        current_category = Category.objects.get(pk=pk)
        return render(request, 'subcategories.html', {
            'category': current_category,
            'subcategories': Category.objects.filter(pid=pk)
        })
    except Category.DoesNotExist:
        return render(request, '500.html', {'error_message': u'Категория не найдена'})


def subcategory_list(request, parent_id):
    result = {}
    for subcat in Category.objects.filter(pid=parent_id):
        result[subcat.id] = subcat.name
    return JsonResponse(result)


def products(request, cat_id):
    try:
        current_category = Category.objects.get(pk=cat_id)
        return render(request, 'products.html', {
            'category': current_category,
            'products': ProductCard.objects.filter(category_id=cat_id)
        })
    except Category.DoesNotExist:
        return render(request, '500.html', {'error_message': u'Категория не найдена'})


def product_add(request):
    if request.user.profile:
        if request.user.profile.role == 'producer':
            return render(request, 'product_add.html', {
                'categories': Category.objects.filter(pid__isnull=True),
                'depots': ProducerDepot.objects.filter(producer_id=request.user.id)
            })
        return render(request, '500.html', {'error_message': u'Только производитель может добавлять товар'})
    return render(request, '500.html', {'error_message': u'Ошибка при просмотре профиля пользователя'})


def depot_add(request):
    if request.user.profile:
        if request.user.profile.role == 'producer':
            depot_address = Address.objects.create(
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

            ProducerDepot.objects.create(
                producer_id=request.user.id,
                address=depot_address
            )
            return redirect(profile)
        return render(request, '500.html', {'error_message': u'Только производитель может добавлять склады'})
    return render(request, '500.html', {'error_message': u'Ошибка при просмотре профиля пользователя'})


def depot_edit(request, pk):
    if request.user.profile:
        if request.user.profile.role == 'producer':
            try:
                depot = ProducerDepot.objects.get(pk=pk, producer_id=request.user.id)
                depot.address.full_address = request.POST['full_address']
                depot.address.index = request.POST['index']
                depot.address.region = request.POST['region']
                depot.address.city = request.POST['city']
                depot.address.street = request.POST['street']
                depot.address.house = request.POST['house']
                depot.address.block = request.POST['block']
                depot.address.structure = request.POST['structure']
                depot.address.flat = request.POST['flat']
                depot.address.save()
            except ProducerDepot.DoesNotExist:
                return render(request, '500.html', {'error_message': u'Редактируемый склад не найден'})
            return redirect(profile)
        return render(request, '500.html', {'error_message': u'Только производитель может редактировать склады'})
    return render(request, '500.html', {'error_message': u'Ошибка при просмотре профиля пользователя'})