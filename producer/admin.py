# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

# Register your models here.
from models import ProductCard, ProducerDepot

admin.site.register(ProductCard)
admin.site.register(ProductDepot)