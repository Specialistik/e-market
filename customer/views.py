# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.http import JsonResponse
#from django.contrib.gis.geos import Point

from catalogs.models import Category
from producer.models import ProductCard
from models import TradePoint, Order, OrderUnit
from core.models import Address

from core.views import profile
from orders.views import current_orders
from payments.models import OrderPayment


# TODO: Для незарегистрированных пользователей во имя оптимизации можно
def categories(request):
    cats = []
    for cat in Category.objects.filter(pid__isnull=True, disabled=False):
        final_unseen = 0
        for sub_cat in Category.objects.filter(pid=cat.id):
            final_unseen += sub_cat.productcard_set.count() - sub_cat.productcard_set.filter(seen__id=request.user.id).count()

        cats.append({
            'id': cat.id,
            'name': cat.name,
            'get_image_url': cat.get_image_url(),
            'unseen': final_unseen
        })
    return render(request, 'categories.html', {'categories': cats})


def subcategories(request, pk):
    try:
        current_category = Category.objects.get(pk=pk)
        sub_cats = []
        for sub_cat in Category.objects.filter(pid=pk):
            sub_cats.append({
                'id': sub_cat.id,
                'name': sub_cat.name,
                'get_image_url': sub_cat.get_image_url(),
                'unseen': sub_cat.productcard_set.count() - sub_cat.productcard_set.filter(seen__id=request.user.id).count()
            })

        return render(request, 'subcategories.html', {
            'category': current_category,
            'subcategories': sub_cats,
        })
    except Category.DoesNotExist:
        return render(request, '500.html', {'error_message': u'Категория не найдена'})


def subcategory_list(request, parent_id):
    return JsonResponse({cat.id: cat.name for cat in Category.objects.filter(pid=parent_id)})


@login_required(login_url='/sign_in/')
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
                flat=request.POST['flat'],
                #location=Point(float(request.POST['lng']), float(request.POST['lat'])),
            )

            TradePoint.objects.create(
                customer_id=request.user.id,
                address=depot_address
            )
            return redirect(profile)
        return render(request, '500.html', {'error_message': u'Только заказчик может добавлять торговые точки'})
    return render(request, '500.html', {'error_message': u'Ошибка при просмотре профиля пользователя'})


@login_required(login_url='/sign_in/')
def trade_point_edit(request, pk):
    if hasattr(request.user, 'profile'):
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


@login_required(login_url='/sign_in/')
def trade_point_del(request, pk):
    if hasattr(request.user, 'profile'):
        if request.user.profile.role == 'customer':
            try:
                trade_point = TradePoint.objects.get(pk=pk)
            except TradePoint.DoesNotExist:
                return render(request, '500.html', {'error_message': u'Торговая точка не существует'})

            if trade_point.customer_id != request.user.id:
                return render(request, '500.html', {'error_message': u'Торговая точка вам не пренадлежит'})

            trade_point_orders = Order.objects.filter(trade_point_id=pk).count()
            if trade_point_orders > 0:
                return render(request, '500.html', {'error_message': u'У торговой точки есть заказы'})

            trade_point.delete()

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
        if hasattr(request.user, 'profile'):
            if request.user.profile.role == 'customer':
                for product in ProductCard.objects.filter(category=current_category):
                    product.seen.add(request.user.id)
                    product.save()

        return render(request, 'products.html', {
            'category': current_category,
            'products': ProductCard.objects.filter(category_id=cat_id),
            'trade_points': TradePoint.objects.filter(customer_id=request.user.id)
        })
    except Category.DoesNotExist:
        return render(request, '500.html', {'error_message': u'Категория не найдена'})


@login_required(login_url='/sign_in/')
def basket(request):
    if hasattr(request.user, 'profile'):
        if request.user.profile.role == 'customer' or request.user.profile.role == 'manager':
            order_units = OrderUnit.objects.filter(order__isnull=True, customer_id=request.user.id).order_by('pk')
            """
            if request.user.profile.role == 'customer':
                trade_points = TradePoint.objects.filter(customer_id=request.user.id).order_by('pk')
            if request.user.profile.role == 'manager':
                trade_points = TradePoint.objects.filter(territory__representative_id=request.user.id).order_by('pk')
            """
            return render(request, 'basket.html', {
                'order_units': order_units, 
                #'trade_points': trade_points
            })
        return render(request, '500.html', {'error_message': u'Только заказчики и торговые представители могут просматривать корзину'})
    return render(request, '500.html', {'error_message': u'Недостаточно прав для совершения операции'})


@login_required(login_url='/sign_in/')
def order_unit_add(request):
    if hasattr(request.user, 'profile'):
        if request.user.profile.role == 'customer' or request.user.profile.role == 'manager':
            try:
                product = ProductCard.objects.get(pk=request.POST['product'])
                endpoint = '/products/{}/'.format(product.category_id)
            except ProductCard.DoesNotExist:
                return render(request, '500.html', {'error_message': u'Не найден добавляемый продукт'})


            """Если в корзине уже есть товар - меняем цену"""
            if OrderUnit.objects.filter(order__isnull=True, product_id=product.id, customer_id=request.user.id).count() > 0:
                order_unit = OrderUnit.objects.get(order__isnull=True, product_id=product.id, customer_id=request.user.id)
                order_unit.amount = int(request.POST['amount'])
                order_unit.save()
                return redirect(endpoint)

            order_unit = OrderUnit.objects.create(
                producer_id=product.product_depot.producer.id,
                customer_id=request.user.id,
                product=product,
                amount=int(request.POST['amount']),
                price=product.producer_price,
            )
            order_unit.save()
            return redirect(endpoint)
        return render(request, '500.html', {'error_message': u'Только заказчики или торговые представители могут добавлять позиции заказа'})
    return render(request, '500.html', {'error_message': u'Недостаточно прав для совершения операции'})


@login_required(login_url='/sign_in/')
def order_unit_edit(request, pk):
    if hasattr(request.user, 'profile'):
        if request.user.profile.role == 'customer' or request.user.profile.role == 'manager':
            try:
                order_unit = OrderUnit.objects.get(pk=pk)
                if order_unit.customer_id != request.user.id:
                    return render(request, '500.html', {'error_message': u'Редактировать можно только свои позиции заказа'})
                order_unit.amount = request.POST['amount']
                order_unit.remark = request.POST['remark']
                order_unit.price = order_unit.product.producer_price
                order_unit.save()
            except OrderUnit.DoesNotExist:
                return render(request, '500.html', {'error_message': u'Позиция заказа не существует'})

            return redirect(basket)
        return render(request, '500.html', {'error_message': u'Только заказчики и торговые представители могут редактировать позиции заказа'})
    return render(request, '500.html', {'error_message': u'Недостаточно прав для совершения операции'})


@login_required(login_url='/sign_in/')
def order_unit_del(request, pk):
    if hasattr(request.user, 'profile'):
        if request.user.profile.role == 'customer' or request.user.profile.role == 'manager':
            try:
                order_unit = OrderUnit.objects.get(pk=pk)
                if order_unit.customer_id != request.user.id:
                    return render(request, '500.html', {'error_message': u'Удалять можно только свои позиции заказа'})
                order_unit.delete()
            except OrderUnit.DoesNotExist:
                return render(request, '500.html', {'error_message': u'Позиция заказа не существует'})

            return redirect(basket)
        return render(request, '500.html', {'error_message': u'Только заказчики или торговые представители могут удалять позиции заказа'})
    return render(request, '500.html', {'error_message': u'Недостаточно прав для совершения операции'})


@login_required(login_url='/sign_in/')
def perform_order(request):
    if hasattr(request.user, 'profile'):
        if request.user.profile.role == 'customer' or request.user.profile.role == 'manager':
            try:
                tp = TradePoint.objects.get(pk=request.POST['trade_point'])
            except TradePoint.DoesNotExist:
                return render(request, '500.html', {'error_message': u'Не найдена торговая точка'})

            cost_of_basket = 0
            for order_unit in OrderUnit.objects.filter(order__isnull=True, customer_id=request.user.id):
                cost_of_basket += order_unit.amount * order_unit.price

            order_payment = OrderPayment.objects.create(price=cost_of_basket, customer_id=tp.customer_id)

            # todo: Тут можно покрасивее переписать, group_by
            order_unit_producer_id = 0
            for order_unit in (OrderUnit.objects.filter(order__isnull=True, customer_id=request.user.id).order_by('producer_id')):
                if order_unit.producer_id != order_unit_producer_id:
                    order = Order.objects.create(
                        customer_id=tp.customer_id,
                        trade_point_id=tp.id,
                        producer_id=order_unit.producer_id,
                        payment=order_payment)
                    order_unit.order_id = order.id
                    order_unit.save()
                else:
                    order = Order.objects.filter(
                        customer_id=tp.customer_id,
                        trade_point_id=tp.id,
                        producer_id=order_unit.producer_id).order_by('id').reverse()[0]
                    order_unit.order_id = order.id
                    order_unit.save()
                order_unit_producer_id = order_unit.producer_id

            if request.user.profile.role == 'customer':
                return redirect('/payment_type/{}/'.format(order_payment.id))
            return redirect('/my_clients')
        return render(request, '500.html', {'error_message': u'Только заказчик может просматривать свои заказы'})
    return render(request, '500.html', {'error_message': u'Недостаточно прав для совершения операции'})


def basket_trade_points(request):
    if hasattr(request.user, 'profile'):
        if request.user.profile.role == 'customer' or request.user.profile.role == 'manager':
            if request.user.profile.role == 'customer':
                trade_points = TradePoint.objects.filter(customer_id=request.user.id).order_by('pk')
            if request.user.profile.role == 'manager':
                trade_points = TradePoint.objects.filter(territory__representative_id=request.user.id).order_by('pk')

            if 'term' in request.GET:
                trade_points = trade_points.filter(address__full_address__icontains=request.GET['term'])
            return JsonResponse([{'id': tp.id, 'name': tp.customer_and_address(), 's_name': tp.address.full_address}
                                 for tp in trade_points], safe=False)
        return render(request, '500.html', {'error_message': u'Только заказчики и торговые представители могут просматривать корзину'})
    return render(request, '500.html', {'error_message': u'Недостаточно прав для совершения операции'})