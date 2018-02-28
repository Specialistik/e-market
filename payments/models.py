# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.utils import timezone
from django.db import models

#from core.models import SophisticatedUser
#from django.contrib.auth.models import User


class OrderPayment(models.Model):
    # Краеугольный камень всея системы, количество денег за заказ
    customer = models.ForeignKey('core.SophisticatedUser', verbose_name=u'Заказчик')
    price = models.DecimalField(max_digits=12, decimal_places=2, verbose_name=u'Цена')
    created = models.DateTimeField(default=timezone.now, verbose_name=u'Время создания')

    TYPES = (
        (0, u"Оплата рассчётного счёта"),
        (1, u"Оплата картой"),
    )
    type = models.IntegerField(choices=TYPES, default=0, verbose_name=u'Тип оплаты')

    class Meta:
        db_table = 'order_payments'
        verbose_name = u'Платёж по заказу'
        verbose_name_plural = u'Платежи по заказам'


class DirectPayment(models.Model):
    payment = models.OneToOneField(OrderPayment, verbose_name=u'Платёжная сущность')
    document = models.FileField(upload_to='order_payments', verbose_name=u'Платёжное поручение')
    document_id = models.DecimalField(max_digits=20, decimal_places=0, default=None, verbose_name=u'Номер платёжного поручения')
    date = models.DateField(verbose_name=u'Дата поручения')

    class Meta:
        db_table = 'direct_payment'
        verbose_name = u'Прямой перевод на рассчётный счёт'
        verbose_name_plural = u'Прямые переводы на рассчётный счёт'


class PaymentNotification(models.Model):
    response = models.TextField(verbose_name=u'Тело ответа')
    customer = models.ForeignKey('core.SophisticatedUser', null=True, blank=True, verbose_name=u'Заказчик')

    class Meta:
        db_table = 'payment_notification'
        verbose_name = u'Payment notification системы paymaster'
        verbose_name_plural = u'Payment notifications системы paymaster'


class Success(models.Model):
    response = models.TextField(verbose_name=u'Тело ответа')
    customer = models.ForeignKey('core.SophisticatedUser', null=True, blank=True, verbose_name=u'Заказчик')

    class Meta:
        db_table = 'success_redirect'
        verbose_name = u'Success redirect системы paymaster'
        verbose_name_plural = u'Success redirect системы paymaster'


class Failure(models.Model):
    response = models.TextField(verbose_name=u'Тело ответа')
    customer = models.ForeignKey('core.SophisticatedUser', null=True, blank=True, verbose_name=u'Заказчик')

    class Meta:
        db_table = 'failure_redirect'
        verbose_name = u'Failure redirect системы paymaster'
        verbose_name_plural = u'Failure redirect системы paymaster'