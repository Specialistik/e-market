# -*- coding: utf-8 -*-
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

from customer.models import Order, OrderUnit


@login_required(login_url='/sign_in/')
def current_orders(request):
    if request.user.profile:
        cur_orders = None
        if request.user.profile.role == 'customer':
            cur_orders = Order.objects.filter(customer_id=request.user.id, order_status__in=(1, 4, 7))

        if request.user.profile.role == 'producer':
            cur_orders = Order.objects.filter(producer_id=request.user.id, order_status__in=(1, 4, 7))
        return render(request, 'current_orders.html', {
            'current_orders': cur_orders
        })
    return render(request, '500.html', {'error_message': u'Недостаточно прав для совершения операции'})


@login_required(login_url='/sign_in/')
def order_history(request):
    if request.user.profile:
        cur_orders = None
        if request.user.profile.role == 'customer':
            cur_orders = Order.objects.filter(customer_id=request.user.id, order_status__in=(2, 3, 5, 6, 8))

        if request.user.profile.role == 'producer':
            cur_orders = Order.objects.filter(producer_id=request.user.id, order_status__in=(2, 3, 5, 6, 8))
        return render(request, 'order_history.html', {
            'current_orders': cur_orders
        })
    return render(request, '500.html', {'error_message': u'Недостаточно прав для совершения операции'})


@login_required(login_url='/sign_in/')
def order(request, pk):
    try:
        current_order = Order.objects.get(pk=pk)
        if not (request.user.id == current_order.producer_id or request.user.id == current_order.customer_id):
            return render(request, '500.html', {'error_message': u'Просматривать можно только свои заказы'})

        order_units = OrderUnit.objects.filter(order=current_order)

    except Order.DoesNotExist:
        return render(request, '500.html', {'error_message': u'Заказ не существует'})
    return render(request, 'order.html', {'order': current_order, 'order_units': order_units})


@login_required(login_url='/sign_in/')
def set_status_sent(request, pk):
    if not request.user.profile.role == 'producer':
        return render(request, '500.html', {'error_message': u'Только поставщик может подтверждать отправку заказа'})
    try:
        current_order = Order.objects.get(pk=pk)
        if not request.user.id == current_order.producer_id:
            return render(request, '500.html', {'error_message': u'Только поставщик может подтверждать отправку заказа'})
        current_order.set_status_sent()
        return redirect(order, pk)
    except Order.DoesNotExist:
        return render(request, '500.html', {'error_message': u'Заказ не существует'})


@login_required(login_url='/sign_in/')
def set_status_delivered(request, pk):
    if not request.user.profile.role == 'customer':
        return render(request, '500.html', {'error_message': u'Только заказчик может подтверждать доставку заказа'})
    try:
        current_order = Order.objects.get(pk=pk)
        if not request.user.id == current_order.customer_id:
            return render(request, '500.html', {'error_message': u'Только заказчик может подтверждать доставку заказа'})
        current_order.set_status_delivered()
        return redirect(order, pk)
    except Order.DoesNotExist:
        return render(request, '500.html', {'error_message': u'Заказ не существует'})
