# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-02-14 12:00
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0015_territory'),
    ]

    operations = [
        migrations.AlterField(
            model_name='address',
            name='region',
            field=models.CharField(blank=True, max_length=40, null=True, verbose_name='\u0420\u0435\u0433\u0438\u043e\u043d'),
        ),
    ]