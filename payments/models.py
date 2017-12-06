# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User


class OrderPayment(models.Model):
    # Краеугольный камень всея системы, количество денег за заказ
    customer = models.ForeignKey(User, verbose_name=u'Заказчик')
    price = models.DecimalField(max_digits=12, decimal_places=2, verbose_name=u'Цена')

    class Meta:
        db_table = 'order_payments'
        verbose_name = u'Платёж по заказу'
        verbose_name_plural = u'Платежи по заказам'


class DirectPayment(models.Model):
    payment = models.OneToOneField(OrderPayment, verbose_name=u'платёжная сущность')
    document = models.FileField(upload_to='order_payments', verbose_name=u'Платёжное поручение')
    date = models.DateField(verbose_name=u'Дата поручения')

    class Meta:
        db_table = 'direct_payment'
        verbose_name = u'Прямой перевод на рассчётный счёт'
        verbose_name_plural = u'Прямые переводы на рассчётный счёт'
