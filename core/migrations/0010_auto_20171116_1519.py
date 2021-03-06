# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-11-16 12:19
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0009_userprofile_created'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='account',
            name='name',
        ),
        migrations.RemoveField(
            model_name='signerinfo',
            name='code_field',
        ),
        migrations.AlterField(
            model_name='account',
            name='account_number',
            field=models.CharField(max_length=20, verbose_name='\u0420\u0430\u0441\u0441\u0447\u0451\u0442\u043d\u044b\u0439 \u0441\u0447\u0451\u0442'),
        ),
        migrations.AlterField(
            model_name='account',
            name='correspondent_account',
            field=models.CharField(max_length=20, verbose_name='\u041a\u043e\u0440\u0440\u0435\u0441\u043f\u043e\u043d\u0434\u0435\u043d\u0442\u0441\u043a\u0438\u0439 \u0441\u0447\u0435\u0442'),
        ),
    ]
