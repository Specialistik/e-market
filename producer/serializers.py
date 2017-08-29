# -*- coding: utf-8 -*-
from rest_framework import serializers

from models import ProducerDepot, ProductCard


class ProducerDepotSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        return ProducerDepot.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.pid = validated_data.get('pid', instance.pid)
        instance.image = validated_data.get('image', instance.image)
        instance.save()
        return instance

    class Meta:
        model = ProducerDepot
        fields = ('pk', 'name', 'pid', 'image')
        read_only_fields = ('pk', )


class ProductCardSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductCard
        fields = ('pk', 'category', 'product_depot', 'name', 'barcode', 'expiration_date', 'price', 'minimum_amount', 'pack_amount', 'weight', 'dimensions')
        read_only_fields = ('pk', )