# -*- coding: utf-8 -*-

from django.conf.urls import url
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

from rest_framework.authtoken import views as auth_views
from rest_framework import routers

from core import api as core_api

import core.views as core_views
import catalogs.views as catalog_views
import producer.views as producer_views
import customer.views as customer_views
import orders.views as orders_views
import payments.views as payment_views
import manager.views as manager_views
import system_supervisor.views as supervisor_views



router = routers.DefaultRouter(trailing_slash=False)
router.register(r'category', catalog_views.CategoryViewSet)


#profile_router = NestedDefaultRouter(router, r'profile', lookup='profile')
#profile_router.register(r'physical_address', core_api.PhysicalAddressViewSet)
#profile_router.register(r'juridical_address', core_api.JuridicalAddressViewSet)

urlpatterns = [
    # React views
    url(r'^react_index', core_views.react_index),

    # REST framework API views,
    url(r'^api/sign_up', core_api.sign_up),
    url(r'^api/sign_in', core_api.sign_in),
    url(r'^api/logout', core_api.logout),
    url(r'^api/register$', core_api.register),                                                              #вопрос
    url(r'^api/index$', core_api.index),                                                                    #вопрос
    url(r'^api/profile$', core_api.profile),
    url(r'^api/profile/skip_creation$', core_api.profile_skip_creation),
    url(r'^api/profile/fiz_and_jur_address$', core_api.profile_fiz_and_jur_address),
    url(r'^api/profile/juridical_address$', core_api.profile_juridical_address),
    url(r'^api/profile/physical_address$', core_api.profile_physical_address),
    url(r'^api/profile/company_info$', core_api.profile_company_info),
    url(r'^api/profile/signer_info$', core_api.profile_signer_info),
    url(r'^api/profile/identity_document$', core_api.profile_identity_document),
    url(r'^api/profile/signer_info_and_identity$', core_api.profile_signer_info_and_identity),
    url(r'^api/profile/account/add$', core_api.profile_account_add),
    url(r'^api/profile/account/([0-9]+)$', core_api.profile_account_edit),

    #manager
    url(r'^api/my_personal_data/$', core_api.my_personal_data),
    url(r'^api/my_clients/$', core_api.my_clients),
    url(r'^api/my_income/$', core_api.my_income),#new                                                           вопрос
    #supervisor
    url(r'^api/my_trade_points/$', core_api.my_trade_points),
    #Producer
    url(r'^api/depot/add/$', core_api.depot_add),
    url(r'^api/depot/del/$', core_api.depot_del),
    url(r'^api/depot/([0-9]+)/$', core_api.depot_edit),
    url(r'^api/products/([0-9]+)/$', core_api.products),
    url(r'^api/products/search/', core_api.product_search),
    url(r'^api/my_products/edit/([0-9]+)/$', core_api.product_edit),
    url(r'^api/my_products/del/([0-9]+)/$', core_api.product_del),
    url(r'^api/my_products/add/$', core_api.product_add),
    url(r'^api/my_products/import/$', core_api.my_products_import),
    url(r'api/my_products/', core_api.my_products),
    url(r'^api/my_previous_deals$', core_api.my_previous_deals),



    # Customer
    url(r'^api/categories/$', core_api.categories),
    url(r'^api/categories/([0-9]+)/$', core_api.subcategories),
    url(r'^api/trade_point/add/$', core_api.trade_point_add),
    url(r'^api/trade_point/([0-9]+)/$', core_api.trade_point_edit),
    url(r'^api/trade_point/([0-9]+)/del/$', core_api.trade_point_del),

    url(r'^api/basket$', core_api.basket),
    url(r'^api/basket/trade_points$', core_api.basket_trade_points),

    url(r'^api/order_unit/add/$', core_api.order_unit_add),
    url(r'^api/order_unit/edit/([0-9]+)/$', core_api.order_unit_edit),
    url(r'^api/order_unit/del/([0-9]+)/$', core_api.order_unit_del),
    url(r'^api/perform_order$', core_api.perform_order),

    # Order
    url(r'^api/current_orders$', core_api.current_orders),
    url(r'^api/order_history$', core_api.order_history),
    url(r'^api/order/([0-9]+)/$', core_api.order),
    url(r'^api/order/set_status_sent/([0-9]+)/$', core_api.set_status_sent),
    url(r'^api/order/set_status_delivered/([0-9]+)/$', core_api.set_status_delivered),


    # Payment
    url(r'^api/order_payment/([0-9]+)/$', core_api.order_payment),
    url(r'^api/direct_payment/([0-9]+)/$', core_api.direct_payment),
    url(r'^api/bank_payment/([0-9]+)/$', core_api.bank_payment),
    url(r'^api/payment_type/([0-9]+)/$', core_api.payment_type),
    url(r'^api/payment_type_pick$', core_api.payment_type_pick),

    url(r'^api/payment_notification', core_api.payment_notification),
    url(r'^api/success_redirect', core_api.success_redirect),
    url(r'^api/failure_redirect', core_api.failure_redirect),                                #                 вопрос!!!

    #url(r'^api-token-auth/$', drf_views.obtain_auth_token, name='auth'),

    #-----------------------------------------------------------
    # Old school views, not to break the app in the process
    url(r'^admin/', admin.site.urls),

    url(r'^$', core_views.index),
    url(r'^sign_in', core_views.sign_in),
    url(r'^logout', core_views.logout),
    url(r'^register', core_views.register),
    url(r'^profile/$', core_views.profile),
    url(r'^profile/skip_creation/$', core_views.profile_skip_creation),
    url(r'^profile/fiz_and_jur_address/$', core_views.profile_fiz_and_jur_address),
    url(r'^profile/juridical_address/$', core_views.profile_juridical_address),
    url(r'^profile/physical_address/$', core_views.profile_physical_address),
    url(r'^profile/company_info/$', core_views.profile_company_info),
    url(r'^profile/signer_info/$', core_views.profile_signer_info),
    url(r'^profile/identity_document/$', core_views.profile_identity_document),
    url(r'^profile/signer_info_and_identity/$', core_views.profile_signer_info_and_identity),
    url(r'^profile/account/add/$', core_views.profile_account_add),
    url(r'^profile/account/([0-9]+)/$', core_views.profile_account_edit),

    # manager views
    url(r'^my_personal_data/$', manager_views.my_personal_data),
    url(r'^my_clients/$', manager_views.my_clients),
    url(r'^my_income/$', manager_views.my_income),

    # supervisor views
    url(r'^my_trade_points/$', supervisor_views.my_trade_points),

    # Producer views
    url(r'^depot/add/$', producer_views.depot_add),
    url(r'^depot/del/$', producer_views.depot_del),
    url(r'^depot/([0-9]+)/$', producer_views.depot_edit),
    url(r'^products/([0-9]+)/$', customer_views.products),
    url(r'^products/search/', customer_views.product_search),
    url(r'^my_products/edit/([0-9]+)/$', producer_views.product_edit),
    url(r'^my_products/del/([0-9]+)/$', producer_views.product_del),
    url(r'^my_products/add/$', producer_views.product_add),
    url(r'^my_products/import/$', producer_views.my_products_import),
    url(r'^my_products/', producer_views.my_products),
    url(r'^my_previous_deals$', producer_views.my_previous_deals),



    # Customer views
    url(r'^categories/$', customer_views.categories),
    url(r'^category/([0-9]+)/$', customer_views.subcategories),
    url(r'^subcategory_list/([0-9]+)/$', customer_views.subcategory_list),
    url(r'^trade_point/add/$', customer_views.trade_point_add),
    url(r'^trade_point/([0-9]+)/$', customer_views.trade_point_edit),
    url(r'^trade_point/([0-9]+)/del/$', customer_views.trade_point_del),

    url(r'^basket$', customer_views.basket),
    url(r'^basket/trade_points$', customer_views.basket_trade_points),

    url(r'^order_unit/add/$', customer_views.order_unit_add),
    url(r'^order_unit/edit/([0-9]+)/$', customer_views.order_unit_edit),
    url(r'^order_unit/del/([0-9]+)/$', customer_views.order_unit_del),
    url(r'^perform_order$', customer_views.perform_order),


    # Order views
    url(r'^current_orders$', orders_views.current_orders),
    url(r'^current_orders_json$', orders_views.current_orders_json),
    url(r'^order_history$', orders_views.order_history),
    url(r'^order/([0-9]+)/$', orders_views.order),
    url(r'^order/set_status_sent/([0-9]+)/$', orders_views.set_status_sent),
    url(r'^order/set_status_delivered/([0-9]+)/$', orders_views.set_status_delivered),

    # Payment views
    url(r'^order_payment/([0-9]+)/$', payment_views.order_payment),
    url(r'^direct_payment/([0-9]+)/$', payment_views.direct_payment),
    url(r'^bank_payment/([0-9]+)/$', payment_views.bank_payment),
    url(r'^payment_type/([0-9]+)/$', payment_views.payment_type),
    url(r'^payment_type_pick$', payment_views.payment_type_pick),

    url(r'^payment_notification', payment_views.payment_notification),
    url(r'^success_redirect', payment_views.success_redirect),
    url(r'^failure_redirect', payment_views.failure_redirect),

    # generated documents
    #url(r'^documents/', payment_views.generated_document),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + staticfiles_urlpatterns()
