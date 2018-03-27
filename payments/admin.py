# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from .models import OrderPayment, PaymentNotification, Success, Failure


class OrderPaymentAdmin(admin.ModelAdmin):
    list_display = ('customer', 'price', 'created', 'type')


class SuccessFailureNotificationAdmin(admin.ModelAdmin):
    list_display = ('name', 'customer')


admin.site.register(OrderPayment, OrderPaymentAdmin)
admin.site.register(Success, Failure, PaymentNotification)(SuccessFailureNotificationAdmin)
