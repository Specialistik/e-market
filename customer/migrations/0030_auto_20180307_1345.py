# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-03-07 10:45
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customer', '0029_auto_20180305_1713'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='order_status',
            field=models.IntegerField(choices=[(1, '\u041d\u0435 \u043e\u043f\u043b\u0430\u0447\u0435\u043d'), (2, '\u0421\u043e\u0433\u043b\u0430\u0441\u043e\u0432\u0430\u043d'), (3, '\u041d\u0435 \u0441\u043e\u0433\u043b\u0430\u0441\u043e\u0432\u0430\u043d'), (4, '\u041e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d'), (5, '\u041e\u0442\u043c\u0435\u043d\u0451\u043d'), (6, '\u0412 \u043f\u0443\u0442\u0438'), (7, '\u0414\u043e\u0441\u0442\u0430\u0432\u043b\u0435\u043d'), (8, '\u0418\u0441\u043f\u043e\u043b\u043d\u0435\u043d')], default=1, verbose_name='\u0421\u0442\u0430\u0442\u0443\u0441 \u0437\u0430\u044f\u0432\u043a\u0438'),
        ),
    ]
