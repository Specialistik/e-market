# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-11-24 14:33
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('customer', '0020_auto_20171124_1655'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='orderunit',
            unique_together=set([]),
        ),
    ]