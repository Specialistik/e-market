# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-10-25 13:13
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('producer', '0007_productcard_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productcard',
            name='weight',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=12, null=True, verbose_name='\u0412\u0435\u0441'),
        ),
    ]