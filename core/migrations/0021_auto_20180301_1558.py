# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-03-01 12:58
from __future__ import unicode_literals

import django.contrib.auth.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0008_alter_user_username_max_length'),
        ('core', '0020_auto_20180227_1135'),
    ]

    operations = [
        migrations.CreateModel(
            name='SophisticatedUser',
            fields=[
            ],
            options={
                'proxy': True,
                'indexes': [],
            },
            bases=('auth.user',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.AlterField(
            model_name='account',
            name='account_number',
            field=models.CharField(max_length=20, verbose_name='\u0420\u0430\u0441\u0447\u0451\u0442\u043d\u044b\u0439 \u0441\u0447\u0451\u0442'),
        ),
        migrations.AlterField(
            model_name='complexterritory',
            name='representative',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='core.SophisticatedUser', verbose_name='\u0422\u043e\u0440\u0433\u043e\u0432\u044b\u0439 \u043f\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u0438\u0442\u0435\u043b\u044c'),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='profile', to='core.SophisticatedUser', verbose_name='\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c'),
        ),
    ]