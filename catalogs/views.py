# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import viewsets
from models import Category
from serializers import CategorySerializer


class CategoryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

