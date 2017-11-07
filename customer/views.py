# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, redirect

from core.views import profile
from core.models import Address
from models import TradePoint


def trade_point_add(request):
    if request.user.profile:
        if request.user.profile.role == 'customer':
            depot_address = Address.objects.create(
                full_address=request.POST['full_address'],
                index=request.POST['index'],
                region=request.POST['region'],
                city=request.POST['city'],
                street=request.POST['street'],
                house=request.POST['house'],
                block=request.POST['block'],
                structure=request.POST['structure'],
                flat=request.POST['flat']
            )

            TradePoint.objects.create(
                customer_id=request.user.id,
                address=depot_address
            )
            return redirect(profile)
        return render(request, '500.html', {'error_message': u'Только производитель может добавлять склады'})
    return render(request, '500.html', {'error_message': u'Ошибка при просмотре профиля пользователя'})


def trade_point_edit(request, pk):
    if request.user.profile:
        if request.user.profile.role == 'customer':
            try:
                depot = TradePoint.objects.get(pk=pk, customer_id=request.user.id)
                depot.address.full_address = request.POST['full_address']
                depot.address.index = request.POST['index']
                depot.address.region = request.POST['region']
                depot.address.city = request.POST['city']
                depot.address.street = request.POST['street']
                depot.address.house = request.POST['house']
                depot.address.block = request.POST['block']
                depot.address.structure = request.POST['structure']
                depot.address.flat = request.POST['flat']
                depot.address.save()
            except TradePoint.DoesNotExist:
                return render(request, '500.html', {'error_message': u'Редактируемая торговая точка не найдена'})
            return redirect(profile)
        return render(request, '500.html', {'error_message': u'Только заказчик может редактировать торговые точки'})
    return render(request, '500.html', {'error_message': u'Ошибка при просмотре профиля пользователя'})