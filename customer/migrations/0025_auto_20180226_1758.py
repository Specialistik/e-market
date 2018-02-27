# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-02-26 14:58
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0019_auto_20180222_1032'),
        ('customer', '0024_auto_20180219_1726'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tradepoint',
            name='representative',
        ),
        migrations.AddField(
            model_name='tradepoint',
            name='territory',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='core.ComplexTerritory', verbose_name='\u0422\u0435\u0440\u0440\u0438\u0442\u043e\u0440\u0438\u044f'),
        ),
    ]
