# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, redirect
from django.http import JsonResponse

from catalogs.models import Category
from producer.models import ProductCard
from core.views import profile
from core.models import Address
from models import TradePoint, Order, OrderUnit

from orders.views import current_orders


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


def trade_point_add(request):
    if request.user.profile:
        if request.user.profile.role == 'customer':
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

            TradePoint.objects.create(
                customer_id=request.user.id,
                address=depot_address
            )
            return redirect(profile)
        return render(request, '500.html', {'error_message': u'Только заказчик может добавлять торговые точки'})
    return render(request, '500.html', {'error_message': u'Ошибка при просмотре профиля пользователя'})


def trade_point_edit(request, pk):
    if request.user.profile:
        if request.user.profile.role == 'customer':
            try:
                depot = TradePoint.objects.get(pk=pk, customer_id=request.user.id)
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
            except TradePoint.DoesNotExist:
                return render(request, '500.html', {'error_message': u'Редактируемая торговая точка не найдена'})
            return redirect(profile)
        return render(request, '500.html', {'error_message': u'Только заказчик может редактировать торговые точки'})
    return render(request, '500.html', {'error_message': u'Ошибка при просмотре профиля пользователя'})


def product_search(request):
    search_string = request.GET['search_string']
    results = ProductCard.objects.filter(name__search=search_string)
    if 'sorting' in request.GET:
        if int(request.GET['sorting']) == 1:
            results.order_by('pk')
        if int(request.GET['sorting']) == 2 or int(request.GET['sorting']) == 3:
            results.order_by('category_id')
        if int(request.GET['sorting']) == 4:
            results.order_by('price')
    else:
        results.order_by('pk')

    return render(request, 'search.html', {
        'products': results,
        'trade_points': TradePoint.objects.filter(customer_id=request.user.id)
    })


def products(request, cat_id):
    try:
        current_category = Category.objects.get(pk=cat_id)
        return render(request, 'products.html', {
            'category': current_category,
            'products': ProductCard.objects.filter(category_id=cat_id),
            'trade_points': TradePoint.objects.filter(customer_id=request.user.id)
        })
    except Category.DoesNotExist:
        return render(request, '500.html', {'error_message': u'Категория не найдена'})


def basket(request):
    if request.user.profile:
        if request.user.profile.role == 'customer':
            try:
                order = Order.objects.get(customer_id=request.user.id, order_status__isnull=True)
                order_units = OrderUnit.objects.filter(order_id=order.id)
            except Order.DoesNotExist:
                order_units = []

            return render(request, 'basket.html', {'order_units': order_units})
        return render(request, '500.html', {'error_message': u'Только заказчик может просматривать корзину'})
    return render(request, '500.html', {'error_message': u'Недостаточно прав для совершения операции'})


def order_unit_add(request):
    if request.user.profile:
        if request.user.profile.role == 'customer':
            order, created = Order.objects.get_or_create(customer_id=request.user.id, order_status__isnull=True)

            if OrderUnit.objects.filter(order=order, product_id=request.POST['product']).count() > 0:
                return JsonResponse({'error_message': u'Товар уже присутствует в корзине'})

            OrderUnit.objects.create(
                order_id=order.id,
                product_id=request.POST['product'],
                amount=int(request.POST['amount']),
                trade_point_id=int(request.POST['trade_point'])
            )
            return redirect(basket)
        return render(request, '500.html', {'error_message': u'Только заказчик может добавлять позиции заказа'})
    return render(request, '500.html', {'error_message': u'Недостаточно прав для совершения операции'})


def order_unit_edit(request, pk):
    if request.user.profile:
        if request.user.profile.role == 'customer':
            try:
                order_unit = OrderUnit.objects.get(pk=pk)
                if order_unit.order.customer_id != request.user.id:
                    return render(request, '500.html', {'error_message': u'Редактировать можно только свои позиции заказа'})
                order_unit.amount = request.POST['amount']
                order_unit.remark = request.POST['remark']
                order_unit.save()
            except OrderUnit.DoesNotExist:
                return render(request, '500.html', {'error_message': u'Позиция заказа не существует'})

            return redirect(basket)
        return render(request, '500.html', {'error_message': u'Только заказчик может редактировать позиции заказа'})
    return render(request, '500.html', {'error_message': u'Недостаточно прав для совершения операции'})


def order_history(request):
    if request.user.profile:
        if request.user.profile.role == 'customer':
            return render(request, 'order_history.html')
        return render(request, '500.html', {'error_message': u'Только заказчик может просматривать историю заказов'})
    return render(request, '500.html', {'error_message': u'Недостаточно прав для совершения операции'})


def perform_order(request):
    if request.user.profile:
        if request.user.profile.role == 'customer':
            try:
                order = Order.objects.get(customer_id=request.user.id, order_status__isnull=True)
                if OrderUnit.objects.filter(order_id=order.id).count() == 0:
                    return render(request, '500.html', {'error_message': u'Не выбраны продукты для совершения заказа'})
                order.order_status_id = 1
                order.save()
                return redirect(current_orders)
            except Order.DoesNotExist:
                return render(request, '500.html', {'error_message': u'Не выбраны продукты для совершения заказа'})
        return render(request, '500.html', {'error_message': u'Только заказчик может просматривать свои заказы'})
    return render(request, '500.html', {'error_message': u'Недостаточно прав для совершения операции'})