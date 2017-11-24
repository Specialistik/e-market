# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

from core.models import Address
from producer.models import ProductCard
from catalogs.models import AbstractList


class OrderStatuses(AbstractList):
    class Meta:
        db_table = 'order_statuses'
        verbose_name = u'Статус заявки'
        verbose_name_plural = u'Статусы заявок'


class TradePoint(models.Model):
    customer = models.ForeignKey(User, verbose_name=u'Заказчик')
    name = models.CharField(max_length=256, verbose_name=u'Название')
    address = models.OneToOneField(Address, verbose_name=u'Адрес')

    class Meta:
        db_table = 'trade_points'
        verbose_name = u'Торговая точка'
        verbose_name_plural = u'Торговые точки'


class Order(models.Model):
    customer = models.ForeignKey(User, verbose_name=u'Заказчик', related_name="customer")
    created = models.DateTimeField(default=timezone.now, verbose_name=u'Время создания')

    STATUSES = (
        (1, u"На согласовании"),
        (2, u"Согласован"),
        (3, u"Не согласован"),
        (4, u"Отправлен"),
        (5, u"Отменён"),
        (6, u"В пути"),
        (7, u"Доставлен"),
        (8, u"Исполнен"),
    )
    #order_status = models.ForeignKey(OrderStatuses, null=True, default=1, verbose_name=u'Статус заявки')
    order_status = models.IntegerField(choices=STATUSES, default=1, verbose_name=u'Статус заявки')

    # Новый концепт денормализации
    trade_point = models.ForeignKey(TradePoint, null=True, verbose_name=u'Торговая точка')
    producer = models.ForeignKey(User, null=True, verbose_name=u'Поставщик', related_name="producer")

    def calculate_sum(self):
        cost_of_basket = 0
        for order_unit in OrderUnit.objects.filter(order_id=self.id):
            cost_of_basket += order_unit.amount * order_unit.product.producer_price
        return cost_of_basket

    """
    def status_name(self):
        return self.order_status
    """

    class Meta:
        db_table = 'orders'
        verbose_name = u'Заказ'
        verbose_name_plural = u'Заказы'


class OrderUnit(models.Model):
    order = models.ForeignKey(Order, null=True, verbose_name=u'Заказ')
    product = models.ForeignKey(ProductCard, verbose_name=u'Позиция заказа')

    # producer возможно излишняя денормализация, по факту можно будет за ненадобностью убрать
    producer = models.ForeignKey(User, verbose_name=u'Поставщик', related_name="producer_unit")
    customer = models.ForeignKey(User, verbose_name=u'Заказчик', related_name="customer_unit")

    amount = models.IntegerField(verbose_name=u'Количество')
    #trade_point = models.ForeignKey(TradePoint, verbose_name=u'Торговая точка')
    remark = models.CharField(max_length=256, null=True, blank=True, verbose_name=u'Примечание')

    def find_producer(self):
        return self.product.product_depot.producer.id

    def calculate_sum(self):
        return self.amount * self.product.producer_price

    # from depot
    # to trade point

    class Meta:
        #unique_together = ('order', 'product', '')
        db_table = 'order_units'
        verbose_name = u'Позиция заказа'
        verbose_name_plural = u'Позиции заказов'
