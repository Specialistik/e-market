# -*- coding: utf-8 -*-
from __future__ import unicode_literals

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
            for tp in trade_point_queryset:
                if tp.customer_id in customers.keys():
                    customers[tp.customer_id]['trade_points'].append(tp)
                else:
                    customers[tp.customer_id] = {
                        "company_name": tp.customer.profile.company_name,
                        "signer_fio": (tp.customer.profile.signer_info.fio() if tp.customer.profile.signer_info else ''),
                        "phone": tp.customer.profile.nice_phone(),
                        "customer_total": tp.customer.customer_total(),
                        "trade_points": [tp, ]
                    }
            return render(request, 'manager/my_clients.html', {
                'profile': request.user.profile,
                'customers': customers
            })
        return render(request, '500.html', {'error_message': u'Только торговый представитель имеет доступ к странице'})
    return render(request, '500.html', {'error_message': u'Ошибка при просмотре профиля пользователя'})