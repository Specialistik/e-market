# -*- coding: utf-8 -*-
from __future__ import unicode_literals


from collections import OrderedDict
from django.contrib.auth.decorators import login_required
from django.shortcuts import render

from customer.models import TradePoint


@login_required(login_url='/sign_in/')
def my_personal_data(request):
    if hasattr(request.user, 'profile'):
        if request.user.profile.role == 'manager':
            return render(request, 'manager/my_personal_data.html', {
                'profile': request.user.profile,
                'trade_points': TradePoint.objects.filter(territory__representative__id=request.user.id)
            })
        return render(request, '500.html', {'error_message': u'Только торговый представитель имеет доступ к странице'})
    return render(request, '500.html', {'error_message': u'Ошибка при просмотре профиля пользователя'})


@login_required(login_url='/sign_in/')
def my_clients(request):
    if hasattr(request.user, 'profile'):
        if request.user.profile.role == 'manager':
            customers = {}
            trade_point_queryset = TradePoint.objects.filter(territory__representative__id=request.user.id)
            if 'search_string' in request.GET:
                trade_point_queryset = trade_point_queryset.filter(address__full_address__icontains=request.GET['search_string'])

            sort_type = request.GET['sort'] if 'sort' in request.GET else 'income'

            for tp in trade_point_queryset:

                if sort_type == 'name':
                    sorted_key = tp.customer.profile.company_name
                else:
                    customer_total = tp.customer.customer_total()
                    sorted_key = customer_total if customer_total != 0 else 0 - tp.customer.id

                if sorted_key in customers.keys():
                    customers[sorted_key]['trade_points'].append(tp)
                else:
                    customers[sorted_key] = {
                        "company_name": tp.customer.profile.company_name,
                        "signer_fio": (tp.customer.profile.signer_info.fio() if tp.customer.profile.signer_info else ''),
                        "phone": tp.customer.profile.nice_phone(),
                        "customer_total": tp.customer.customer_total(),
                        "trade_points": [tp, ]
                    }

                customers = OrderedDict(sorted(customers.items(), reverse=True))
            return render(request, 'manager/my_clients.html', {
                'profile': request.user.profile,
                'customers': customers,
                'sort_type': sort_type,
            })
        return render(request, '500.html', {'error_message': u'Только торговый представитель имеет доступ к странице'})
    return render(request, '500.html', {'error_message': u'Ошибка при просмотре профиля пользователя'})


@login_required(login_url='/sign_in/')
def my_income(request):
    if hasattr(request.user, 'profile'):
        if request.user.profile.role == 'manager':
            return render(request, 'manager/my_income.html')
        return render(request, '500.html', {'error_message': u'Только торговый представитель имеет доступ к странице'})
    return render(request, '500.html', {'error_message': u'Ошибка при просмотре профиля пользователя'})