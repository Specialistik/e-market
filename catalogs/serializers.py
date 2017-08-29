# -*- coding: utf-8 -*-
from rest_framework import serializers

from models import Category


class CategorySerializer(serializers.ModelSerializer):
    """
    def create(self, validated_data):
        return Category.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.pid = validated_data.get('pid', instance.pid)
        instance.image = validated_data.get('image', instance.image)
        instance.save()
        return instance
    """
    class Meta:
        model = Category
        fields = ('id', 'name', 'pid', 'image')

