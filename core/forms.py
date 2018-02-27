# -*- coding: utf-8 -*-
from django import forms
from .models import User, IdentityDocument


class IdentityDocumentForm(forms.ModelForm):
    class Meta:
        model = IdentityDocument
        fields = ['series', 'number', 'issued_by', 'issued_date', 'document']


class UserProfileModelForm(forms.ModelForm):
    ROLES = (
        ('customer', 'Торговая точка'),
        ('producer', 'Поставщик'),
        ('manager', 'Торговый представитель'),
    )

    role = forms.ChoiceField(choices=ROLES)


