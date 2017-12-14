# -*- coding: utf-8 -*-
import datetime

from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

from orders.views import current_orders
from .models import OrderPayment, DirectPayment
from customer.models import Order


@login_required(login_url='/sign_in/')
def order_payment(request, pk):
    try:
        payment = OrderPayment.objects.get(pk=pk)
        if not request.user.id == payment.customer_id:
            return render(request, '500.html', {'error_message': u'Только заказчик может оплачивать заказ'})

        return render(request, 'order_payment.html', {'payment': payment})
    except Order.DoesNotExist:
        return render(request, '500.html', {'error_message': u'Заказ не существует'})


@login_required(login_url='/sign_in/')
def direct_payment(request, pk):
    try:
        payment = OrderPayment.objects.get(pk=pk)
    except OrderPayment.DoesNotExist:
        return render(request, '500.html', {'error_message': u'Платёж не найден'})
    if not request.user.id == payment.customer_id:
        return render(request, '500.html', {'error_message': u'Только создатель заказа может его оплачивать'})

    if 'document' not in request.FILES:
        return render(request, '500.html', {'error_message': u'Прикрепите платёжное поручение'})

    DirectPayment.objects.create(
        payment=payment,
        document=request.FILES['document'],
        document_id=request.POST['document_id'],
        date=datetime.datetime.strptime(request.POST['date'], "%d.%m.%Y").date()
    )

    return redirect(current_orders)


