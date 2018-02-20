# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
from django.contrib.gis.db.models import PointField
from catalogs.models import AbstractList


class OrganizationType(models.Model):
    short_name = models.CharField(max_length=10, verbose_name=u'Короткое название')
    full_name = models.CharField(max_length=80, verbose_name=u'Полное название')

    def __repr__(self):
        return self.full_name

    def __str__(self):
        return self.full_name

    def __unicode__(self):
        return self.full_name

    class Meta:
        db_table = 'organization_types'
        verbose_name = u'Организационно-правовая форма'
        verbose_name_plural = u'Организационно-правовые формы'


class LegalAct(AbstractList):
    class Meta:
        db_table = 'legal_acts'
        verbose_name = u'Правовой акт'
        verbose_name_plural = u'Правовые акты'


class Address(models.Model):
    index = models.CharField(max_length=6, null=True, blank=True, verbose_name=u'Индекс')
    region = models.CharField(max_length=40, null=True, blank=True, verbose_name=u'Регион')
    city = models.CharField(max_length=80, verbose_name=u'Город/Населённый пункт')
    street = models.CharField(max_length=80, verbose_name=u'Улица')
    house = models.CharField(max_length=100, verbose_name=u'Дом')
    block = models.CharField(max_length=20, null=True, blank=True, verbose_name=u'Корпус')
    structure = models.CharField(max_length=20, null=True, blank=True, verbose_name=u'Строение')
    flat = models.CharField(max_length=20, blank=True, default='', verbose_name=u'Квартира/Офис')
    full_address = models.CharField(max_length=256, null=True, blank=True, verbose_name=u'Полный адрес')
    location = PointField(null=True, default=None, verbose_name=u'Широта\долгота')

    def __repr__(self):
        return self.full_address

    def __str__(self):
        return self.full_address

    def __unicode__(self):
        return self.full_address or u''

    # Обрезать строку до n-ой запятой
    def castrate_nicely(self, trim_until_n_th_coma=3):
        return ','.join(self.full_address.split(',', trim_until_n_th_coma)[:trim_until_n_th_coma])

    class Meta:
        db_table = 'address'
        verbose_name = u'Адрес'
        verbose_name_plural = u'Адреса'


class SignerInfo(models.Model):
    surname = models.CharField(max_length=40, verbose_name=u'Фамилия')
    name = models.CharField(max_length=40, verbose_name=u'Имя')
    patronymic = models.CharField(max_length=40, verbose_name=u'Отчество')
    birth_date = models.DateField(verbose_name=u'Дата рождения')
    position = models.CharField(max_length=60, verbose_name=u'Должность')

    def fio(self):
        return self.surname + ' ' + self.name + ' ' + self.patronymic

    def __repr__(self):
        return self.surname + ' ' + self.name + ' ' + self.patronymic

    def __str__(self):
        return self.surname + ' ' + self.name + ' ' + self.patronymic

    def __unicode__(self):
        return self.surname + ' ' + self.name + ' ' + self.patronymic

    class Meta:
        db_table = 'signer_info'
        verbose_name = u'Данные подписанта'
        verbose_name_plural = u'Данные подписантов'


class IdentityDocument(models.Model):
    series = models.CharField(max_length=4, verbose_name=u'Серия')
    number = models.CharField(max_length=6, verbose_name=u'Номер')
    issued_by = models.CharField(max_length=256, verbose_name=u'Кем выдан')
    issued_date = models.DateField(verbose_name=u'Дата выдачи')
    document = models.FileField(upload_to='identity_documents', verbose_name=u'Документ, подтверждающий право подписи')

    def __repr__(self):
        return self.series + ' ' + self.number + ' ' + self.issued_by

    def __str__(self):
        return self.series + ' ' + self.number + ' ' + self.issued_by

    def __unicode__(self):
        return self.series + ' ' + self.number + ' ' + self.issued_by

    class Meta:
        db_table = 'identity_documents'
        verbose_name = u'Документ, подтверждающий личность'
        verbose_name_plural = u'Документы, подтверждающие личность'


class UserProfile(models.Model):
    role = models.CharField(max_length=20, blank=True, null=True, verbose_name=u'Роль пользователя')
    company_name = models.CharField(max_length=150, null=True, blank=True, verbose_name=u'Название компании')
    user = models.OneToOneField(User, related_name='profile', verbose_name=u'Пользователь', on_delete=models.CASCADE)
    phone = models.CharField(max_length=15, verbose_name=u'Телефон')  # validators should be a list
    inn = models.CharField(max_length=12, null=True, blank=True, verbose_name=u'ИНН')
    ogrn = models.CharField(max_length=15, null=True, blank=True, verbose_name=u'ОГРН')
    kpp = models.CharField(max_length=9, null=True, blank=True, verbose_name=u'КПП')
    organization_type = models.ForeignKey(OrganizationType, null=True, blank=True, verbose_name=u'Организационно правовая форма')
    legal_act = models.ForeignKey(LegalAct, null=True, blank=True, verbose_name=u'Правовой акт')
    physical_address = models.OneToOneField(Address, null=True, blank=True, related_name='physical_profile', verbose_name=u'Физический адрес')
    physical_is_juridical = models.BooleanField(default=False, verbose_name=u'Совпадает с юридическим')
    juridical_address = models.OneToOneField(Address, null=True, blank=True, related_name='juridical_profile', verbose_name=u'Юридический адрес')
    signer_info = models.OneToOneField(SignerInfo, null=True, blank=True, related_name='signer_info', verbose_name=u'Данные подписанта')
    identity_document = models.OneToOneField(IdentityDocument, null=True, blank=True, verbose_name=u'Документ')

    def nice_phone(self):
        return '+7 ' + self.phone

    def __repr__(self):
        return self.role + ' ---> ' + self.user.username

    def __str__(self):
        return self.role + ' ---> ' + self.user.username

    def __unicode__(self):
        return self.role + ' ---> ' + self.user.username

    # У нас две разные страницы для создания и редактирования профиля.
    # False = используем страницу создания профиля profile_create.html
    # True = Используем страницу редактирования profile_update.html
    created = models.BooleanField(default=False, verbose_name=u'Создание профиля завершено или пропущено')

    class Meta:
        db_table = 'user_profile'
        verbose_name = u'Профиль пользователя'
        verbose_name_plural = u'Профили пользователей'


class Account(models.Model):
    profile = models.ForeignKey(UserProfile, verbose_name=u'Профиль')
    #name = models.CharField(max_length=150, verbose_name=u'Наименование')
    account_number = models.CharField(max_length=20, verbose_name=u'Рассчётный счёт')
    bik = models.CharField(max_length=9, verbose_name=u'БИК')
    bank_name = models.CharField(max_length=256, verbose_name=u'Наименование банка')
    correspondent_account = models.CharField(max_length=20, verbose_name=u'Корреспондентский счет')

    class Meta:
        db_table = 'account'
        verbose_name = u'Используемый счёт'
        verbose_name_plural = u'Используемые счета'


class Territory(models.Model):
    """
    Упрощённая модель территорий, левая верхняя и правая нижняя gps-координаты прямоугольной площади
    """
    upper_left = PointField(verbose_name=u'Верхняя левая точка прямоугольника')
    lower_right = PointField(verbose_name=u'Правая нижняя точка прямоугольника')
    name = models.CharField(max_length=256, verbose_name=u'Название')

    def __repr__(self):
        return self.name

    def __str__(self):
        return self.name

    def __unicode__(self):
        return self.name or u''

    class Meta:
        db_table = 'territory_simple'
        verbose_name = u'Прямоугольная территория'
        verbose_name_plural = u'Прямоугольные территории'
