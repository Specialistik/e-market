# -*- coding: utf-8 -*-

from django.conf.urls import url, include
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

from rest_framework import routers
from rest_framework_nested.routers import NestedSimpleRouter, NestedDefaultRouter
from rest_framework_swagger.views import get_swagger_view


import core.views as core_views
import catalogs.views as catalog_views
import producer.views as producer_views
import customer.views as customer_views
import core.api as core_api

#schema_view = get_swagger_view(title='The sklad API')


#router = routers.DefaultRouter(trailing_slash=False)
router = routers.DefaultRouter(trailing_slash=False)
router.register(r'category', catalog_views.CategoryViewSet)
router.register(r'profile', core_api.ProfileViewSet)


profile_router = NestedDefaultRouter(router, r'profile', lookup='profile')
profile_router.register(r'physical_address', core_api.PhysicalAddressViewSet)
profile_router.register(r'juridical_address', core_api.JuridicalAddressViewSet)

urlpatterns = [
    url(r'^api/signup/$', core_views.signup),
    url(r'^o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    url(r'^api/', include(router.urls)),
    url(r'^api/', include(profile_router.urls)),
    url(r'^admin/', admin.site.urls),

    url(r'^$', core_views.index),
    url(r'^sign_in', core_views.sign_in),
    url(r'^logout', core_views.logout),
    url(r'^register', core_views.register),

    url(r'^profile/$', core_views.profile),
    url(r'^profile/skip_creation/$', core_views.profile_skip_creation),
    #url(r'^profile_create/$', core_views.create_profile),
    url(r'^profile/fiz_and_jur_address/$', core_views.profile_fiz_and_jur_address),
    url(r'^profile/juridical_address/$', core_views.profile_juridical_address),
    url(r'^profile/physical_address/$', core_views.profile_physical_address),
    url(r'^profile/company_info/$', core_views.profile_company_info),
    url(r'^profile/signer_info/$', core_views.profile_signer_info),
    url(r'^profile/identity_document/$', core_views.profile_identity_document),
    url(r'^profile/account/add/$', core_views.profile_account_add),
    url(r'^profile/account/([0-9]+)/$', core_views.profile_account_edit),

    # Producer views
    url(r'^categories/$', producer_views.categories),
    url(r'^category/([0-9]+)/$', producer_views.subcategories),
    url(r'^subcategory_list/([0-9]+)/$', producer_views.subcategory_list),

    url(r'^depot/add/$', producer_views.depot_add),
    url(r'^depot/([0-9]+)/$', producer_views.depot_edit),

    url(r'^products/([0-9]+)/$', producer_views.products),

    url(r'^my_products/$', producer_views.my_products),
    url(r'^my_products/add/$', producer_views.product_add),

    # Customer views
    url(r'^trade_point/add/$', customer_views.trade_point_add),
    url(r'^trade_point/([0-9]+)/$', customer_views.trade_point_edit),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + staticfiles_urlpatterns()
