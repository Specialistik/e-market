# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-09-08 06:59
from __future__ import unicode_literals

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('producer', '0002_auto_20170904_1723'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productprice',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2017, 9, 8, 9, 59, 1, 604729), verbose_name='\u0412\u0440\u0435\u043c\u044f \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f \u0446\u0435\u043d\u044b'),
        ),
    ]
