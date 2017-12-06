# -*- coding: utf-8 -*-
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

from customer.models import Order


@login_required(login_url='/sign_in/')
def order_payment(request, pk):
    try:
        current_order = Order.objects.get(pk=pk)
        if not request.user.id == current_order.customer_id:
            return render(request, '500.html', {'error_message': u'Только заказчик может оплачивать заказ'})

        return render(request, 'order_payment.html', {'order': current_order})
    except Order.DoesNotExist:
        return render(request, '500.html', {'error_message': u'Заказ не существует'})
