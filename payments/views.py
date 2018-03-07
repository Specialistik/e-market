# -*- coding: utf-8 -*-
import datetime
import os
import json
from docx import Document

from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, redirect
from django.conf import settings
from django.contrib.auth.decorators import login_required

from orders.views import current_orders
from .models import OrderPayment, DirectPayment, PaymentNotification, Success, Failure
from customer.models import Order


@login_required(login_url='/sign_in/')
def order_payment(request, pk):
    if not hasattr(request.user, 'profile'):
        return render(request, '500.html', {'error_message': u'Не создан профиль пользователя'})
    if request.user.profile.role != 'customer':
        return render(request, '500.html', {'error_message': u'Только заказчики могут просматривать страницу оплаты заказов'})
    try:
        payment = OrderPayment.objects.get(pk=pk)
        order = Order.objects.filter(payment__id=payment.id).first()
    except Order.DoesNotExist:
        return render(request, '500.html', {'error_message': u'Заказ не существует'})

    document = Document(os.path.join(settings.DOCS_ROOT, 'invoice_payment.docx'))
    if not request.user.id == payment.customer_id:
        return render(request, '500.html', {'error_message': u'Просматривать можно только свои заказы'})

    replacements = {
        '{{sum}}': payment.price,
        '{{order_number}}': payment.id,
        '{{order_date}}': payment.created,
        '{{company}}': request.user.profile.company_name,
        '{{inn}}': request.user.profile.inn,
        '{{kpp}}': request.user.profile.kpp,
        '{{address}}': order.trade_point.address.castrate_nicely()
    }

    for table_index, table in enumerate(document.tables):
        for row_index, row in enumerate(table.rows):
            print row_index
            for cell in row.cells:
                for rep_ind, rep_val in replacements.iteritems():
                    cell.text = cell.text.replace(rep_ind, unicode(rep_val))

    # TODO: Доступ к документам ограничить бы
    document.save(os.path.join(settings.MEDIA_ROOT, 'generated_docs', 'invoice_payment_{}.docx'.format(payment.id)))

    return render(request, 'order_payment.html', {'payment': payment})


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


@login_required(login_url='/sign_in/')
def bank_payment(request, pk):
    try:
        payment = OrderPayment.objects.get(pk=pk)
    except OrderPayment.DoesNotExist:
        return render(request, '500.html', {'error_message': u'Платёж не найден'})
    if not request.user.id == payment.customer_id:
        return render(request, '500.html', {'error_message': u'Только создатель заказа может его оплачивать'})

    return render(request, 'bank_payment.html', {'payment': payment})


@login_required(login_url='/sign_in/')
def payment_type(request, pk):
    try:
        op = OrderPayment.objects.get(pk=pk)
    except OrderPayment.DoesNotExist:
        return render(request, '500.html', {'error_message': u'Не найден счёт на оплату'})
    return render(request, 'payment_type.html', {'order_payment': op})


@login_required(login_url='/sign_in/')
def payment_type_pick(request):
    try:
        op = OrderPayment.objects.get(pk=request.POST['order_payment'])
    except OrderPayment.DoesNotExist:
        return render(request, '500.html', {'error_message': u'Не найден счёт на оплату'})
    if payment_type == 0:
        return redirect('/order_payment/{}/'.format(op.id))
    return redirect('/bank_payment/{}/'.format(op.id))

    #return render(request, 'payment_type.html', {'order_payment': op})


@csrf_exempt
def payment_notification(request):
    PaymentNotification.objects.create(response=json.dumps(request.body))
    return redirect('/')


@csrf_exempt
def success_redirect(request):
    Success.objects.create(response=json.dumps(request.body))
    return redirect('/')


@csrf_exempt
def failure_redirect(request):
    Success.objects.create(response=json.dumps(request.body))
    return redirect('/')



# TODO: Тут идея в том, чтобы ограничить загрузку счетов на оплату только для тех, кто формиовал заказ
"""
@login_required(login_url='/sign_in/')
def generated_document(request, document_name):
    return [
        url(r'^%s(?P<path>.*)$' % re.escape(prefix.lstrip('/')), view, kwargs=kwargs),
    ]
"""
