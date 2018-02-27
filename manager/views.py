# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.decorators import login_required
from django.shortcuts import render

from customer.models import TradePoint


@login_required(login_url='/sign_in/')
def my_personal_data(request):
    if hasattr(request.user, 'profile'):
        if request.user.profile.role == 'manager':
            return render(request, 'manager/my_personal_data.html', {'profile': request.user.profile})
        return render(request, '500.html', {'error_message': u'Только торговый представитель имеет доступ к странице'})
    return render(request, '500.html', {'error_message': u'Ошибка при просмотре профиля пользователя'})


@login_required(login_url='/sign_in/')
def my_clients(request):
    if hasattr(request.user, 'profile'):
        if request.user.profile.role == 'manager':
            return render(request, 'manager/my_clients.html', {
                'profile': request.user.profile,
                'trade_points': (tp for tp in TradePoint.objects.filter(representative=request.user.id))
                                 #if tp.composite_sum() > 0),
            })
        return render(request, '500.html', {'error_message': u'Только торговый представитель имеет доступ к странице'})
    return render(request, '500.html', {'error_message': u'Ошибка при просмотре профиля пользователя'})