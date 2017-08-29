"""storehouse URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static

from rest_framework import routers
from rest_framework_nested.routers import NestedSimpleRouter, NestedDefaultRouter
from rest_framework_swagger.views import get_swagger_view


import core.views as core_views
import catalogs.views as catalog_views
import producer.views as producer_views
import customer.views as customer_views

#schema_view = get_swagger_view(title='The sklad API')


router = routers.DefaultRouter(trailing_slash=False)
router.register(r'category', catalog_views.CategoryViewSet)
#router.register(r'address', core_views.AddressViewSet)
router.register(r'profile', core_views.ProfileViewSet)


profile_router = NestedDefaultRouter(router, r'profile', lookup='profile')
profile_router.register(r'physical_address', core_views.PhysicalAddressViewSet)
profile_router.register(r'juridical_address', core_views.JuridicalAddressViewSet)

urlpatterns = [
    url(r'^api/signup/$', core_views.signup),
    url(r'^o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    url(r'^api/', include(router.urls)),
    url(r'^api/', include(profile_router.urls)),
    url(r'^admin/', admin.site.urls),
#    url(r'^$', schema_view)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
