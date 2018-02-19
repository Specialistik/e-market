# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from sorl.thumbnail import ImageField


class AbstractList(models.Model):
    name = models.CharField(max_length=100, verbose_name=u'Название')

    def __repr__(self):
        return self.name

    def __str__(self):
        return self.name

    def __unicode__(self):
        return self.name or u''

    class Meta:
        abstract = True


class AbstractTree(AbstractList):
    pid = models.ForeignKey("self", null=True, blank=True, verbose_name=u"Родительская сущность")

    def __str__(self):
        if self.pid is not None:
            return self.pid.name + ' -> ' + self.name
        return self.name

    def __repr__(self):
        return self.name

    class Meta:
        abstract = True


class Measure(AbstractList):
    class Meta:
        db_table = 'measures'
        verbose_name = u'Единица измерения'
        verbose_name_plural = u'Единицы измерения'


class Category(AbstractTree):
    image = ImageField(upload_to='category', null=True, blank=True, verbose_name=u'Изображение')
    disabled = models.BooleanField(default=False, verbose_name=u'Неактивная')

    def get_image_url(self):
        if self.image:
            return self.image.url
        return ''

    def is_root(self):
        return self.pid is None

    class Meta:
        db_table = 'categories'
        verbose_name = u'Категория'
        verbose_name_plural = u'Категории'


class ExpirationValue(AbstractList):
    class Meta:
        db_table = 'expiration_values'
        verbose_name = u'Вид срока годности'
        verbose_name_plural = u'Виды сроков годности'
