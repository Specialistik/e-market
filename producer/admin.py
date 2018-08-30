# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

# Register your models here.
from models import ProductCard, ProducerDepot

class ProductAdmin(admin.ModelAdmin):
    list_display = ('pk', 'category', 'name', 'barcode', 'producer_price')

class ProducerDepotAdmin(admin.ModelAdmin):
    list_display = ('pk', 'producer', 'name', 'address')

admin.site.register(ProductCard, ProductAdmin)
admin.site.register(ProducerDepot, ProducerDepotAdmin)