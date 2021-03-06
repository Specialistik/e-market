# -*- coding: utf-8 -*-
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from core.models import User, UserProfile, Address
from catalogs.models import Category


class SignupSerializer(serializers.Serializer):
    role = serializers.ChoiceField(
        ['producer', 'customer'],
        required=True,
    )
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all(), message=u'Пользователь с таким email уже существует')]
    )
    company_name = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True)

    inn = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=UserProfile.objects.all(),
                                    message=u'Организация с таким ИНН уже зарегистрирована в системе')]
    )
    phone = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=UserProfile.objects.all(), message=u'Телефон уже есть в системе')]
    )

    # Используем сериалайзер только для валидации, абстрактные методы необходимо в любом случае имплементировать
    def create(self, validated_data):
        return True

    def update(self, instance, validated_data):
        return True


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ('pk', 'index', 'region', 'city', 'street', 'house', 'block', 'structure', 'flat')
        read_only_fields = ('pk', )


class JuridicalAddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = Address
        fields = ('pk', 'index', 'region', 'city', 'street', 'house', 'block', 'structure', 'flat')
        read_only_fields = ('pk', )


class PhysicalAddressSerializer(serializers.ModelSerializer):

    #def create(self, validated_data):
    #    physical_address = Address.objects.create(**validated_data)


    """
    def update(self, validated_data, *args, **kwargs):
        physical_update = True
    """

    class Meta:
        model = Address
        fields = ('pk', 'index', 'region', 'city', 'street', 'house', 'block', 'structure', 'flat')
        read_only_fields = ('pk', )


class ProfileSerializer(serializers.ModelSerializer):
    inn = serializers.CharField(read_only=True)
    phone = serializers.CharField(read_only=True)
    ogrn = serializers.CharField(required=True)
    kpp = serializers.CharField(required=True)
    physical_address = PhysicalAddressSerializer()
    juridical_address = JuridicalAddressSerializer()

    class Meta:
        model = UserProfile
        fields = ('pk', 'phone', 'inn', 'ogrn', 'kpp', 'physical_address', 'juridical_address')
        read_only_fields = ('pk',)
        related_fields = ['physical_address']


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
