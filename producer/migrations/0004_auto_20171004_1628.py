# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-10-04 16:28
from __future__ import unicode_literals

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('producer', '0003_auto_20170908_0959'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productprice',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2017, 10, 4, 16, 28, 50, 263766), verbose_name='\u0412\u0440\u0435\u043c\u044f \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f \u0446\u0435\u043d\u044b'),
        ),
    ]