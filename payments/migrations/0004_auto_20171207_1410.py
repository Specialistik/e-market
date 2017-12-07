# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-12-07 11:10
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('payments', '0003_auto_20171206_1617'),
    ]

    operations = [
        migrations.AddField(
            model_name='directpayment',
            name='document_id',
            field=models.DecimalField(decimal_places=0, default=None, max_digits=20, verbose_name='\u041d\u043e\u043c\u0435\u0440 \u043f\u043b\u0430\u0442\u0451\u0436\u043d\u043e\u0433\u043e \u043f\u043e\u0440\u0443\u0447\u0435\u043d\u0438\u044f'),
        ),
        migrations.AlterField(
            model_name='directpayment',
            name='payment',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='payments.OrderPayment', verbose_name='\u041f\u043b\u0430\u0442\u0451\u0436\u043d\u0430\u044f \u0441\u0443\u0449\u043d\u043e\u0441\u0442\u044c'),
        ),
    ]
