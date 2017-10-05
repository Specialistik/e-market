# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from core.models import OrganizationType, LegalAct

admin.site.register(OrganizationType)
admin.site.register(LegalAct)
