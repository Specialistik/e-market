# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.contrib.auth.decorators import login_required

from customer.models import Order, OrderUnit


@login_required(login_url='/sign_in/')
def current_orders(request):
    if request.user.profile:
        cur_orders = None
        if request.user.profile.role == 'customer':
            cur_orders = Order.objects.filter(customer_id=request.user.id, order_status__in=(3, 5, 8))

        if request.user.profile.role == 'producer':
            cur_orders = Order.objects.filter(producer_id=request.user.id, order_status__in=(3, 5, 8))
        return render(request, 'current_orders.html', {
            'current_orders': cur_orders
        })
    return render(request, '500.html', {'error_message': u'Недостаточно прав для совершения операции'})


@login_required(login_url='/sign_in/')
def order_history(request):
    if request.user.profile:
        cur_orders = None
        if request.user.profile.role == 'customer':
            cur_orders = Order.objects.filter(customer_id=request.user.id, order_status__id__in=(2, 3, 6, 7))

        if request.user.profile.role == 'producer':
            cur_orders = Order.objects.filter(producer_id=request.user.id, order_status__in=(2, 3, 6, 7))
        return render(request, 'order_history.html', {
            'current_orders': cur_orders
        })
    return render(request, '500.html', {'error_message': u'Недостаточно прав для совершения операции'})