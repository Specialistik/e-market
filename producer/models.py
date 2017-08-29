# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models

from django.contrib.auth.models import User
from core.models import UserProfile, Address
from catalogs.models import Category, Measure


class ProducerDepot(models.Model):
    producer = models.ForeignKey(User, verbose_name=u'Производитель')
    name = models.CharField(max_length=256, verbose_name=u'Название')
    address = models.OneToOneField(Address, verbose_name=u'Адрес')

    class Meta:
        db_table = 'producer_depots'
        verbose_name = u'Склад производителя'
        verbose_name_plural = u'Склады производителя'


class ProductCard(models.Model):
    category = models.ForeignKey(Category, verbose_name=u"Категория")
    product_depot = models.ForeignKey(ProducerDepot, verbose_name=u'Склад')
    name = models.CharField(max_length=256, verbose_name=u"Название")
    #measure = models.ForeignKey(Measure, verbose_name=u'Единица измерения', default=1)
    barcode = models.IntegerField(verbose_name=u'Штрих-код')
    expiration_date = models.CharField(max_length=256, verbose_name=u'Срок годности')
    price = models.DecimalField(max_digits=12, decimal_places=2, verbose_name=u'Цена')
    minimum_amount = models.IntegerField(default=1, verbose_name=u'Минимальное количество')
    pack_amount = models.IntegerField(null=True, blank=True, verbose_name=u'Количество в упаковке')
    weight = models.DecimalField(null=True, blank=True, max_digits=12, decimal_places=2, verbose_name=u'Вес')
    dimensions = models.CharField(max_length=256, null=True, blank=True, verbose_name=u'Размеры')

    class Meta:
        db_table = 'product_cards'
        verbose_name = u'Карта товара'
        verbose_name_plural = u'Карты товаров'


