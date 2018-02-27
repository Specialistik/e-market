# -*- coding: utf-8 -*-
import os

from django.conf import settings
from mapwidgets import GooglePointFieldWidget


class PolygonFieldWidget(GooglePointFieldWidget):
    template_name = "polygon-field-widget.html"
    #template_name = os.path.join(settings.BASE_DIR, 'templates', "polygon-field-widget.html")#"polygon-field-widget.html"
