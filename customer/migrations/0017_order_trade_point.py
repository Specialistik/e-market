# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-11-20 08:59
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('customer', '0016_remove_orderunit_trade_point'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='trade_point',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='customer.TradePoint', verbose_name='\u0422\u043e\u0440\u0433\u043e\u0432\u0430\u044f \u0442\u043e\u0447\u043a\u0430'),
            preserve_default=False,
        ),
    ]
