# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib import admin

from .models import OrderPayment, PaymentNotification, Success, Failure


@admin.register(OrderPayment)
class OrderPaymentAdmin(admin.ModelAdmin):
    list_display = ('customer', 'price', 'created', 'type')


@admin.register(Success, Failure, PaymentNotification)
class SuccessFailureNotificationAdmin(admin.ModelAdmin):
    list_display = ('response', 'customer')
