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

    def sort_by_income(tp_set):
        def compose_sum(trade_point):
            return trade_point.customer.customer_total()

        sorted_tps = list(tp_set)
        sorted_tps.sort(key=compose_sum)
        return sorted_tps

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
                    sorted_key = tp.customer.customer_total()

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

                customers = OrderedDict(sorted(customers.items()))
            #if sort_type == 'name':
                #customers = sorted(customers, key=lambda customer: customer['company_name'])
                #customers.sort(key=lambda d: d.values()['company_name'], reversed=True)
                #OrderedDict(sorted(customers.items(), key='company_name'))
            return render(request, 'manager/my_clients.html', {
                'profile': request.user.profile,
                'customers': customers,
                'sort_type': sort_type,
            })
        return render(request, '500.html', {'error_message': u'Только торговый представитель имеет доступ к странице'})
    return render(request, '500.html', {'error_message': u'Ошибка при просмотре профиля пользователя'})