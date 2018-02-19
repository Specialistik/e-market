# -*- coding: utf-8 -*-
from __future__ import unicode_literals


from django.contrib.gis.db import models
from django.contrib import admin
from core.models import OrganizationType, LegalAct, Territory, Address, UserProfile
from .forms import UserProfileModelForm
from mapwidgets.widgets import GooglePointFieldWidget


class UserProfileAdmin(admin.ModelAdmin):
    form = UserProfileModelForm


class GISAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.PointField: {"widget": GooglePointFieldWidget}
    }


admin.site.register(Address, GISAdmin)
admin.site.register(OrganizationType)
admin.site.register(LegalAct)
admin.site.register(Territory, GISAdmin)
admin.site.register(UserProfile, UserProfileAdmin)
