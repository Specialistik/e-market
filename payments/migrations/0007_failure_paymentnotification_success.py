# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-02-02 13:25
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('payments', '0006_orderpayment_type'),
    ]

    operations = [
        migrations.CreateModel(
            name='Failure',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('response', models.TextField(verbose_name='\u0422\u0435\u043b\u043e \u043e\u0442\u0432\u0435\u0442\u0430')),
                ('customer', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='\u0417\u0430\u043a\u0430\u0437\u0447\u0438\u043a')),
            ],
            options={
                'db_table': 'failure_redirect',
                'verbose_name': 'Failure redirect \u0441\u0438\u0441\u0442\u0435\u043c\u044b paymaster',
                'verbose_name_plural': 'Failure redirect \u0441\u0438\u0441\u0442\u0435\u043c\u044b paymaster',
            },
        ),
        migrations.CreateModel(
            name='PaymentNotification',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('response', models.TextField(verbose_name='\u0422\u0435\u043b\u043e \u043e\u0442\u0432\u0435\u0442\u0430')),
                ('customer', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='\u0417\u0430\u043a\u0430\u0437\u0447\u0438\u043a')),
            ],
            options={
                'db_table': 'payment_notification',
                'verbose_name': 'Payment notification \u0441\u0438\u0441\u0442\u0435\u043c\u044b paymaster',
                'verbose_name_plural': 'Payment notifications \u0441\u0438\u0441\u0442\u0435\u043c\u044b paymaster',
            },
        ),
        migrations.CreateModel(
            name='Success',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('response', models.TextField(verbose_name='\u0422\u0435\u043b\u043e \u043e\u0442\u0432\u0435\u0442\u0430')),
                ('customer', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='\u0417\u0430\u043a\u0430\u0437\u0447\u0438\u043a')),
            ],
            options={
                'db_table': 'success_redirect',
                'verbose_name': 'Success redirect \u0441\u0438\u0441\u0442\u0435\u043c\u044b paymaster',
                'verbose_name_plural': 'Success redirect \u0441\u0438\u0441\u0442\u0435\u043c\u044b paymaster',
            },
        ),
    ]
