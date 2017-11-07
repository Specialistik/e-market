# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from math import ceil

from django.utils import timezone
from django.db import models
from django.contrib.auth.models import User

from core.models import UserProfile, Address
from catalogs.models import Category, Measure, ExpirationValue


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
    barcode = models.CharField(max_length=64, verbose_name=u'Штрих-код')
    expiration_date = models.CharField(max_length=256, null=True, blank=True, verbose_name=u'Срок годности')
    expiration_type = models.ForeignKey(ExpirationValue, default=2, verbose_name=u'Тип срока годности')
    producer_price = models.DecimalField(max_digits=12, decimal_places=2, verbose_name=u'Цена производителя')
    customer_price = models.DecimalField(max_digits=12, decimal_places=2, verbose_name=u'Цена для заказчика')
    minimum_amount = models.IntegerField(default=1, verbose_name=u'Минимальное количество')
    pack_amount = models.IntegerField(null=True, blank=True, verbose_name=u'Количество в упаковке')
    weight = models.DecimalField(null=True, blank=True, max_digits=12, decimal_places=3, verbose_name=u'Вес')
    #dimensions = models.CharField(max_length=256, null=True, blank=True, verbose_name=u'Размеры')
    image = models.ImageField(upload_to='products', null=True, blank=True, verbose_name=u'Изображение')
    length = models.CharField(max_length=15, null=True, blank=True, verbose_name=u'Длина')
    width = models.CharField(max_length=15, null=True, blank=True, verbose_name=u'Ширина')
    height = models.CharField(max_length=15, null=True, blank=True, verbose_name=u'Высота')

    def parent_category(self):
        return Category.objects.get(pk=self.category.pid_id)

    def related_subcategories(self):
        return Category.objects.filter(pid=self.category.pid_id)

    def get_image_url(self):
        if self.image:
            return self.image.url
        return ''

    @staticmethod
    def calculate_customer_price(producer_price):
        return producer_price
        #return ceil(producer_price + (producer_price * 15 / 100))

    class Meta:
        db_table = 'product_cards'
        verbose_name = u'Карта товара'
        verbose_name_plural = u'Карты товаров'


class ProductPrice(models.Model):
    product = models.ForeignKey(ProductCard, verbose_name=u'Продукт')
    price = models.DecimalField(max_digits=12, decimal_places=2, verbose_name=u'Цена')
    created = models.DateTimeField(default=timezone.now, verbose_name=u'Время изменения цены')

    class Meta:
        db_table = 'product_prices'
        verbose_name = u'Цена продукта'
        verbose_name_plural = u'Цены продуктов'
