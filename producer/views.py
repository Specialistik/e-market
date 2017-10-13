# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required

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
                'depots': ProducerDepot.objects.filter(producer_id=request.user.profile.id)
            })
        return render(request, '500.html', {'error_message': u'Только производитель может добавлять товар'})
    return render(request, '500.html', {'error_message': u'Ошибка при просмотре профиля пользователя'})

