# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-12-20 13:19
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('producer', '0012_auto_20171130_1353'),
    ]

    operations = [
        migrations.AddField(
            model_name='productcard',
            name='seen',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL, verbose_name='\u0422\u043e\u0432\u0430\u0440 \u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u043d'),
        ),
    ]