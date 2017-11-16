# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import uuid

from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

from core.views import profile
from core.models import Address
from catalogs.models import Category, ExpirationValue
from producer.models import ProductCard, ProducerDepot


def my_products(request):
    if request.user.profile:
        if request.user.profile.role == 'producer':
            return render(request, 'my_products.html', {
                'products': ProductCard.objects.filter(product_depot__producer_id=request.user.id).order_by('pk'),
                'categories': Category.objects.filter(pid__isnull=True),
                'depots': ProducerDepot.objects.filter(producer_id=request.user.id),
                'expiration_values': ExpirationValue.objects.all(),
            })
        return render(request, '500.html', {'error_message': u'Только производитель может просматривать свои товары'})
    return render(request, '500.html', {'error_message': u'Ошибка при просмотре профиля пользователя'})


def product_add(request):
    if request.user.profile:
        if request.user.profile.role == 'producer':
            if request.method == 'POST':
                new_product = ProductCard.objects.create(
                    category_id=request.POST['subcategory'],
                    product_depot_id=request.POST['product_depot'],
                    name=request.POST['name'],
                    expiration_date=request.POST.get('expiration_date', ''),
                    expiration_type_id=request.POST['expiration_type'],
                    producer_price=request.POST['producer_price'],
                    customer_price=ProductCard.calculate_customer_price(float(request.POST['producer_price'])),
                    minimum_amount=request.POST['minimum_amount'],
                    weight=request.POST['weight'],
                    barcode=request.POST['barcode'],
                    height=request.POST['height'],
                    width=request.POST['width'],
                    length=request.POST['length'],
                    description=request.POST['description'],
                )

                if 'product_pic' in request.FILES:
                    # todo: При изменении файла его было бы неплохо удалять
                    new_product.image.save(str(uuid.uuid4()), request.FILES['product_pic'])
                    new_product.save()
                return redirect(my_products)

            return render(request, 'product_add.html', {
                'categories': Category.objects.filter(pid__isnull=True),
                'depots': ProducerDepot.objects.filter(producer_id=request.user.id),
                'expiration_values': ExpirationValue.objects.all(),
            })
        return render(request, '500.html', {'error_message': u'Только производитель может добавлять товар'})
    return render(request, '500.html', {'error_message': u'Ошибка при просмотре профиля пользователя'})


def product_edit(request, pk):
    """
        todo: only owners should be allowed to edit products
    """
    if request.user.profile:
        if request.user.profile.role == 'producer':
            try:
                product = ProductCard.objects.get(pk=pk)
            except ProductCard.DoesNotExist:
                return render(request, '500.html', {'error_message': u'Редактируемый товар не найден'})
            if product.product_depot.producer_id != request.user.id:
                return render(request, '500.html', {'error_message': u'Редактировать можно только свои товары'})
            product.name = request.POST['name']
            product.weight = request.POST['weight']
            product.height = request.POST['height']
            product.width = request.POST['width']
            product.length = request.POST['length']
            product.producer_price = request.POST['producer_price']
            product.customer_price = ProductCard.calculate_customer_price(float(request.POST['producer_price']))
            product.minimum_amount = request.POST['minimum_amount']
            product.expiration_date = request.POST.get('expiration_date', '')
            product.expiration_type_id = request.POST['expiration_type']
            product.description = request.POST['description']

            product.category_id = request.POST['category']
            product.save()

            if 'product_pic' in request.FILES:
                # todo: При изменении файла его было бы неплохо удалять
                product.image.save(str(uuid.uuid4()), request.FILES['product_pic'])
                product.save()
            return redirect(my_products)
        return render(request, '500.html', {'error_message': u'Только производитель может добавлять товар'})
    return render(request, '500.html', {'error_message': u'Ошибка при просмотре профиля пользователя'})


def product_del(request, pk):
    if request.user.profile:
        if request.user.profile.role == 'producer':
            try:
                product = ProductCard.objects.get(pk=pk)
            except ProductCard.DoesNotExist:
                return render(request, '500.html', {'error_message': u'Редактируемый товар не найден'})
            if not product.product_depot.producer_id == request.user.id:
                return render(request, '500.html', {'error_message': u'Только производитель может удалять свой товар'})
            product.delete()
            return redirect(my_products)
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
