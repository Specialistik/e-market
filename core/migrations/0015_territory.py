# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-02-14 09:20
from __future__ import unicode_literals

import django.contrib.gis.db.models.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0014_address_location'),
    ]

    operations = [
        migrations.CreateModel(
            name='Territory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('upper_left', django.contrib.gis.db.models.fields.PointField(srid=4326, verbose_name='\u0412\u0435\u0440\u0445\u043d\u044f\u044f \u043b\u0435\u0432\u0430\u044f \u0442\u043e\u0447\u043a\u0430 \u043f\u0440\u044f\u043c\u043e\u0443\u0433\u043e\u043b\u044c\u043d\u0438\u043a\u0430')),
                ('lower_right', django.contrib.gis.db.models.fields.PointField(srid=4326, verbose_name='\u041f\u0440\u0430\u0432\u0430\u044f \u043d\u0438\u0436\u043d\u044f\u044f \u0442\u043e\u0447\u043a\u0430 \u043f\u0440\u044f\u043c\u043e\u0443\u0433\u043e\u043b\u044c\u043d\u0438\u043a\u0430')),
            ],
            options={
                'db_table': 'territory_simple',
                'verbose_name': '\u041f\u0440\u044f\u043c\u043e\u0443\u0433\u043e\u043b\u044c\u043d\u0430\u044f \u0442\u0435\u0440\u0440\u0438\u0442\u043e\u0440\u0438\u044f',
                'verbose_name_plural': '\u041f\u0440\u044f\u043c\u043e\u0443\u0433\u043e\u043b\u044c\u043d\u044b\u0435 \u0442\u0435\u0440\u0440\u0438\u0442\u043e\u0440\u0438\u0438',
            },
        ),
    ]
