# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-12-27 08:33
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('payments', '0004_auto_20171207_1410'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderpayment',
            name='created',
            field=models.DateTimeField(default=django.utils.timezone.now, verbose_name='\u0412\u0440\u0435\u043c\u044f \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u044f'),
        ),
    ]
