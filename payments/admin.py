# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from .models import PaymentNotification, Success, Failure


admin.site.register(PaymentNotification)
admin.site.register(Success)
admin.site.register(Failure)
