# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-09-28 13:19
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_auto_20170908_0959'),
    ]

    operations = [
        migrations.CreateModel(
            name='LegalAct',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435')),
            ],
            options={
                'db_table': 'legal_acts',
                'verbose_name': '\u041f\u0440\u0430\u0432\u043e\u0432\u043e\u0439 \u0430\u043a\u0442',
                'verbose_name_plural': '\u041f\u0440\u0430\u0432\u043e\u0432\u044b\u0435 \u0430\u043a\u0442\u044b',
            },
        ),
        migrations.CreateModel(
            name='OrganizationType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('short_name', models.CharField(max_length=10, verbose_name='\u041a\u043e\u0440\u043e\u0442\u043a\u043e\u0435 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435')),
                ('full_name', models.CharField(max_length=80, verbose_name='\u041f\u043e\u043b\u043d\u043e\u0435 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435')),
            ],
            options={
                'db_table': 'organization_types',
                'verbose_name': '\u041e\u0440\u0433\u0430\u043d\u0438\u0437\u0430\u0446\u0438\u043e\u043d\u043d\u043e \u043f\u0440\u0430\u0432\u043e\u0432\u0430\u044f \u0444\u043e\u0440\u043c\u0430',
                'verbose_name_plural': '\u0421\u043b\u0432\u0430\u0440\u044c \u043e\u0440\u0433\u0430\u043d\u0438\u0437\u0430\u0446\u0438\u043e\u043d\u043d\u043e \u043f\u0440\u0430\u0432\u043e\u0432\u044b\u0445 \u0444\u043e\u0440\u043c',
            },
        ),
        migrations.CreateModel(
            name='SignerInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('surname', models.CharField(max_length=40, verbose_name='\u0424\u0430\u043c\u0438\u043b\u0438\u044f')),
                ('name', models.CharField(max_length=40, verbose_name='\u0418\u043c\u044f')),
                ('patronymic', models.CharField(max_length=40, verbose_name='\u041e\u0442\u0447\u0435\u0441\u0442\u0432\u043e')),
                ('birth_date', models.DateField(verbose_name='\u0414\u0430\u0442\u0430 \u0440\u043e\u0436\u0434\u0435\u043d\u0438\u044f')),
                ('inn', models.CharField(max_length=12, verbose_name='\u0418\u041d\u041d')),
                ('position', models.CharField(max_length=60, verbose_name='\u0414\u043e\u043b\u0436\u043d\u043e\u0441\u0442\u044c')),
                ('code_field', models.CharField(max_length=30, verbose_name='\u041a\u043e\u0434\u043e\u0432\u043e\u0435 \u0441\u043b\u043e\u0432\u043e')),
            ],
            options={
                'db_table': 'signer_info',
                'verbose_name': '\u0414\u0430\u043d\u043d\u044b\u0435 \u043f\u043e\u0434\u043f\u0438\u0441\u0430\u043d\u0442\u0430',
                'verbose_name_plural': '\u0414\u0430\u043d\u043d\u044b\u0435 \u043f\u043e\u0434\u043f\u0438\u0441\u0430\u043d\u0442\u043e\u0432',
            },
        ),
        migrations.AddField(
            model_name='userprofile',
            name='legal_act',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='core.LegalAct', verbose_name='\u041f\u0440\u0430\u0432\u043e\u0432\u043e\u0439 \u0430\u043a\u0442'),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='organization_type',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='core.OrganizationType', verbose_name='\u041e\u0440\u0433\u0430\u043d\u0438\u0437\u0430\u0446\u0438\u043e\u043d\u043d\u043e \u043f\u0440\u0430\u0432\u043e\u0432\u0430\u044f \u0444\u043e\u0440\u043c\u0430'),
        ),
    ]
