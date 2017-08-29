# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User


class Address(models.Model):
    index = models.CharField(max_length=6, null=True, blank=True, verbose_name=u'Индекс')
    region = models.CharField(max_length=40, verbose_name=u'Регион')
    city = models.CharField(max_length=80, verbose_name=u'Город/Населённый пункт')
    street = models.CharField(max_length=80, verbose_name=u'Улица')
    house = models.CharField(max_length=100, verbose_name=u'Дом')
    block = models.CharField(max_length=20, null=True, blank=True, verbose_name=u'Корпус')
    structure = models.CharField(max_length=20, null=True, blank=True, verbose_name=u'Строение')
    flat = models.CharField(max_length=20, verbose_name=u'Квартира/Офис')

    class Meta:
        db_table = 'address'
        verbose_name = u'Адрес'
        verbose_name_plural = u'Адреса'


class UserProfile(models.Model):
    user = models.OneToOneField(User, related_name='profile', verbose_name=u'Пользователь')
    phone = models.CharField(max_length=15, verbose_name=u'Телефон')  # validators should be a list
    inn = models.CharField(max_length=12, null=True, blank=True, verbose_name=u'ИНН')
    ogrn = models.CharField(max_length=13, null=True, blank=True, verbose_name=u'ОГРН')
    kpp = models.CharField(max_length=9, null=True, blank=True, verbose_name=u'КПП')
    physical_address = models.OneToOneField(Address, null=True, blank=True, related_name='physical_profile', verbose_name=u'Физический адрес')
    physical_is_juridical = models.BooleanField(default=False, verbose_name=u'Совпадает с юридическим')
    juridical_address = models.OneToOneField(Address, null=True, blank=True, related_name='juridical_profile', verbose_name=u'Юридический адрес')

    class Meta:
        db_table = 'user_profile'
        verbose_name = u'Профиль пользователя'
        verbose_name_plural = u'Профили пользователей'
