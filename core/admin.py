# -*- coding: utf-8 -*-
from __future__ import unicode_literals


from django.contrib.gis.db import models
from django.contrib import admin
from core.models import OrganizationType, LegalAct, Address, UserProfile, ComplexTerritory
from mapwidgets.widgets import GooglePointFieldWidget


class AddressAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.PointField: {"widget": GooglePointFieldWidget}
    }


class ComplexTerritoryAdmin(admin.ModelAdmin):
    exclude = ('polygon', )


admin.site.register(Address, AddressAdmin)
admin.site.register(OrganizationType)
admin.site.register(LegalAct)
admin.site.register(UserProfile)
admin.site.register(ComplexTerritory, ComplexTerritoryAdmin)
