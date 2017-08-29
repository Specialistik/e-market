# -*- coding: utf-8 -*-
from django import forms
from .models import User, Profile


class UserRegisterForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ["password", "username", "email"]


class ProfileRegisterForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ["inn", "phone"]
