# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-03-01 12:58
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('producer', '0013_productcard_seen'),
    ]

    operations = [
        migrations.AlterField(
            model_name='producerdepot',
            name='producer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.SophisticatedUser', verbose_name='\u041f\u0440\u043e\u0438\u0437\u0432\u043e\u0434\u0438\u0442\u0435\u043b\u044c'),
        ),
    ]
