# -*- coding: utf-8 -*-


from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import Group, User

from rest_framework import generics, viewsets, status, mixins
from rest_framework.decorators import api_view, detail_route, permission_classes
from rest_framework import permissions
from rest_framework.response import Response

from .models import UserProfile, Address
from .serializers import SignupSerializer, ProfileSerializer, AddressSerializer, JuridicalAddressSerializer, PhysicalAddressSerializer


@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
@csrf_exempt
def signup(request):
    try:
        producer_group = Group.objects.get(pk=1)
        customer_group = Group.objects.get(pk=2)
    except Group.DoesNotExist:
        return Response({'detail': 'required user groups not created'}, status=status.HTTP_400_BAD_REQUEST)

    serialized_user = SignupSerializer(data=request.data)
    #serialized_user = SignupSerializer(data=request.data.dict())
    if serialized_user.is_valid():
        registered_user = User.objects.create_user(
            email=request.data['email'],
            username=request.data['username'],
            password=request.data['password']
        )
        UserProfile.objects.create(
            user=registered_user,
            inn=request.data['inn'],
            phone=request.data['phone']
        )

        if serialized_user.validated_data['role'] == 'producer':
            producer_group.user_set.add(registered_user)
        elif serialized_user.validated_data['role'] == 'customer':
            customer_group.user_set.add(registered_user)

        return Response(serialized_user.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serialized_user.errors, status=status.HTTP_400_BAD_REQUEST)


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

    #def get_queryset(self):
    #    return self.request.

    #def get_queryset(self):
        #testinga = UserProfile.objects.filter(user=self.request.user)
        #me = self.request.user
        #queryset = self.queryset.filter(user=me.id)
        #me = self.request.user
        #queryset = UserProfile.objects.get(user=me.profile)
        #sreturn UserProfile.objects.filter(user=self.request.user)


"""
class NestedPhysicalAddressViewSet(mixins.CreateModelMixin,
                                   mixins.ListModelMixin,
                                   viewsets.GenericViewSet):

    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    #permission_classes = (IsAuthenticatedOrReadOnly)

    def get_profile(self, request, physical_profile__pk=None):
        Look for the referenced profile
        # Check if the referenced profile exists
        profile = get_object_or_404(UserProfile.objects.all(), pk=physical_profile__pk)

        # Check permissions
        self.check_object_permissions(self.request, profile)

        return profile

    def create(self, request, *args, **kwargs):
        self.get_profile(request, physical_profile__pk=kwargs['physical_profile__pk'])

        return super(NestedPhysicalAddressViewSet, self).create(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(
            author=self.request.user,
            physical_profile__pk=self.kwargs['physical_profile__pk']
        )

    def list(self, request, *args, **kwargs):
        self.get_profile(request, physical_profile__pk=kwargs['physical_profile__pk'])

        return super(NestedPhysicalAddressViewSet, self).list(request, *args, **kwargs)
"""