# -*- coding: utf-8 -*-


from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth.models import Group, User
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout as logout_user


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
        user = authenticate(username=request.data['username'], password=request.data['password'])
        if user is not None:
            login(request, user)

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


def index(request):
    if request.user.is_anonymous:
        if request.method == 'GET':
            return render(request, 'pick_role.html')
    return render(request, 'thanks.html')


def sign_in(request):
    return render(request, 'sign_in.html')


def register(request):
    if not request.user.is_anonymous:
        return render(request, 'thanks.html')

    if 'role' not in request.POST:
        return redirect('/')
    role = request.POST['role']
    return render(request, 'register.html', {'role': role})


def logout(request):
    logout_user(request)
    return redirect('/')


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
