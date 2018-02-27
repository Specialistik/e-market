# -*- coding: utf-8 -*-
from __future__ import unicode_literals


from django.contrib.gis.db import models
from django.contrib import admin
from core.models import OrganizationType, LegalAct, Address, UserProfile, ComplexTerritory
from .forms import UserProfileModelForm
from mapwidgets.widgets import GooglePointFieldWidget
from widgets import PolygonFieldWidget


class UserProfileAdmin(admin.ModelAdmin):
    form = UserProfileModelForm


class AddressAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.PointField: {"widget": GooglePointFieldWidget}
    }


class ComplexTerritoryAdmin(admin.ModelAdmin):
    exclude = ('polygon', )
    formfield_overrides = {
        models.PolygonField: {"widget": PolygonFieldWidget}
    }


admin.site.register(Address, AddressAdmin)
admin.site.register(OrganizationType)
admin.site.register(LegalAct)
admin.site.register(UserProfile, UserProfileAdmin)
admin.site.register(ComplexTerritory, ComplexTerritoryAdmin)
