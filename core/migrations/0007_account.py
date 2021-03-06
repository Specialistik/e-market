# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-10-04 13:26
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0006_userprofile_identity_document'),
    ]

    operations = [
        migrations.CreateModel(
            name='Account',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150, verbose_name='\u041d\u0430\u0438\u043c\u0435\u043d\u043e\u0432\u0430\u043d\u0438\u0435')),
                ('account_number', models.CharField(max_length=30, verbose_name='\u0420\u0430\u0441\u0441\u0447\u0451\u0442\u043d\u044b\u0439 \u0441\u0447\u0451\u0442')),
                ('bik', models.CharField(max_length=9, verbose_name='\u0411\u0418\u041a')),
                ('bank_name', models.CharField(max_length=256, verbose_name='\u041d\u0430\u0438\u043c\u0435\u043d\u043e\u0432\u0430\u043d\u0438\u0435 \u0431\u0430\u043d\u043a\u0430')),
                ('correspondent_account', models.CharField(max_length=256, verbose_name='\u041a\u043e\u0440\u0440\u0435\u0441\u043f\u043e\u043d\u0434\u0435\u043d\u0442\u0441\u043a\u0438\u0439 \u0441\u0447\u0435\u0442')),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.UserProfile', verbose_name='\u041f\u0440\u043e\u0444\u0438\u043b\u044c')),
            ],
            options={
                'db_table': 'account',
                'verbose_name': '\u0418\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0435\u043c\u044b\u0439 \u0441\u0447\u0451\u0442',
                'verbose_name_plural': '\u0418\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0435\u043c\u044b\u0435 \u0441\u0447\u0435\u0442\u0430',
            },
        ),
    ]
