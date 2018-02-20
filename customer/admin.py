# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import Order, OrderUnit, TradePoint


class OrderAdmin(admin.ModelAdmin):
    list_display = ('pk', 'customer', 'order_status')
    exclude = ('payment',)


admin.site.register(Order, OrderAdmin)
admin.site.register(OrderUnit)
admin.site.register(TradePoint)
