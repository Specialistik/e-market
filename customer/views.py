# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

from core.views import profile
from models import TradePoint


@login_required(login_url='/sign_in')
def trade_point_add(request):
    if request.user.profile:
        if request.user.profile.role == 'customer':
            TradePoint.objects.create(
                profile=request.user.profile,
                name=request.POST['name'],
                account_number=request.POST['account_number'],
                bik=request.POST['bik'],
                bank_name=request.POST['bank_name'],
                correspondent_account=request.POST['correspondent_account']
            )
            return redirect(profile)
        return render(request, '500.html', {'error_message': u'Только заказчики могут добавлять торговые точки'})
    return render(request, '500.html', {'error_message': u'Не найден профиль пользователя'})


@login_required(login_url='/sign_in')
def trade_point_edit(request, pk):
    if request.user.profile:
        if request.user.profile.role == 'customer':
            my_trade_point = TradePoint.objects.get(pk=pk, profile=request.user.profile.id)

            """
            TradePoint.objects.create(
                profile=request.user.profile,
                name=request.POST['name'],
                account_number=request.POST['account_number'],
                bik=request.POST['bik'],
                bank_name=request.POST['bank_name'],
                correspondent_account=request.POST['correspondent_account']
            )
            """
            return redirect(profile)
        return render(request, '500.html', {'error_message': u'Только заказчики могут редактировать торговые точки'})
    return render(request, '500.html', {'error_message': u'Не найден профиль пользователя'})