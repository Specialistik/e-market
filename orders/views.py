# -*- coding: utf-8 -*-
from django.shortcuts import render
from customer.models import Order, OrderUnit


def current_orders(request):
    if request.user.profile:
        cur_orders = None
        if request.user.profile.role == 'customer':
            cur_orders = Order.objects.filter(customer_id=request.user.id)

        if request.user.profile.role == 'producer':
            cur_orders = Order.objects.filter(producer_id=request.user.id)
        return render(request, 'current_orders.html', {
            'current_orders': cur_orders
        })
    return render(request, '500.html', {'error_message': u'Недостаточно прав для совершения операции'})


def order_history(request):
    if request.user.profile:
        cur_orders = None
        if request.user.profile.role == 'customer':
            cur_orders = Order.objects.filter(customer_id=request.user.id, order_status__id__in=(3, 5, 8))

        if request.user.profile.role == 'producer':
            cur_orders = Order.objects.filter(id__in=OrderUnit.objects.filter(producer_id=request.user.id), order_status__in=(3, 5, 8))
        return render(request, 'current_orders.html', {
            'current_orders': cur_orders
        })
    return render(request, '500.html', {'error_message': u'Недостаточно прав для совершения операции'})