# -*- coding: utf-8 -*-

from rest_framework import viewsets, mixins, permissions

from .models import Address, UserProfile
from .serializers import JuridicalAddressSerializer, PhysicalAddressSerializer, ProfileSerializer


class JuridicalAddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = JuridicalAddressSerializer

    def create(self, request, *args, **kwargs):
        profile_pk = int(kwargs['profile_pk'])
        juridical_address = super(JuridicalAddressViewSet, self).create(request, *args, **kwargs)
        user_profile = UserProfile.objects.get(pk=profile_pk)
        user_profile.juridical_address_id = juridical_address.data['pk']
        user_profile.save()
        return juridical_address


class PhysicalAddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = PhysicalAddressSerializer

    def create(self, request, *args, **kwargs):
        physical_address = super(PhysicalAddressViewSet, self).create(request, *args, **kwargs)

        profile_pk = int(kwargs['profile_pk'])
        user_profile = UserProfile.objects.get(pk=profile_pk)
        user_profile.physical_address_id = physical_address.data['pk']
        user_profile.save()
        return physical_address


class ProfileViewSet(mixins.RetrieveModelMixin,
                     mixins.UpdateModelMixin,
                     viewsets.GenericViewSet):

    serializer_class = ProfileSerializer
    queryset = UserProfile.objects.all()
    permission_classes = [permissions.IsAuthenticated]
