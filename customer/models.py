# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.utils import timezone

from django.contrib.auth.models import User
from core.models import Address
from producer.models import ProductCard


class TradePoint(models.Model):
    customer = models.ForeignKey(User, verbose_name=u'Заказчик')
    name = models.CharField(max_length=256, blank=True, verbose_name=u'Название')
    address = models.OneToOneField(Address, verbose_name=u'Адрес')
    # address

    class Meta:
        db_table = 'trade_points'
        verbose_name = u'Торговая точка'
        verbose_name_plural = u'Торговые точки'


class Order(models.Model):
    customer = models.ForeignKey(User, verbose_name=u'Заказчик')
    trade_point = models.ForeignKey(TradePoint, verbose_name=u'Торговая точка ')
    created = models.DateTimeField(default=timezone.now, verbose_name=u'Время создания')

    class Meta:
        db_table = 'orders'
        verbose_name = u'Заказ'
        verbose_name_plural = u'Заказы'


class OrderUnit(models.Model):
    order = models.ForeignKey(Order, verbose_name=u'Заказ')
    product = models.ForeignKey(ProductCard, verbose_name=u'Позиции заказа')
    amount = models.IntegerField(verbose_name=u'Количество')

    # from depot
    # to trade point

    class Meta:
        db_table = 'order_units'
        verbose_name = u'Позиция заказа'
        verbose_name_plural = u'Позиции заказов'
