# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-09-04 14:23
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('producer', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProductPrice',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.DecimalField(decimal_places=2, max_digits=12, verbose_name='\u0426\u0435\u043d\u0430')),
                ('created', models.DateTimeField(default=datetime.datetime(2017, 9, 4, 17, 23, 11, 179660), verbose_name='\u0412\u0440\u0435\u043c\u044f \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f \u0446\u0435\u043d\u044b')),
            ],
            options={
                'db_table': 'product_prices',
                'verbose_name': '\u0426\u0435\u043d\u0430 \u043f\u0440\u043e\u0434\u0443\u043a\u0442\u0430',
                'verbose_name_plural': '\u0426\u0435\u043d\u044b \u043f\u0440\u043e\u0434\u0443\u043a\u0442\u043e\u0432',
            },
        ),
        migrations.RemoveField(
            model_name='productcard',
            name='price',
        ),
        migrations.AddField(
            model_name='productcard',
            name='customer_price',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=12, verbose_name='\u0426\u0435\u043d\u0430 \u0434\u043b\u044f \u0437\u0430\u043a\u0430\u0437\u0447\u0438\u043a\u0430'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='productcard',
            name='producer_price',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=12, verbose_name='\u0426\u0435\u043d\u0430 \u043f\u0440\u043e\u0438\u0437\u0432\u043e\u0434\u0438\u0442\u0435\u043b\u044f'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='productprice',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='producer.ProductCard', verbose_name='\u041f\u0440\u043e\u0434\u0443\u043a\u0442'),
        ),
    ]
