# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.decorators import login_required
from django.shortcuts import render

from customer.models import TradePoint


@login_required(login_url='/sign_in/')
def my_trade_points(request):
    if hasattr(request.user, 'profile'):
        if request.user.profile.role == 'supervisor':
            final_data = {'gps_coordinates': [{
                              'lat': tp.address.location.y,
                              'lng': tp.address.location.x
                } for tp in TradePoint.objects.filter(address__location__isnull=False, address__isnull=False)]}
            return render(request, 'supervisor/my_trade_points.html', final_data)
        return render(request, '500.html', {'error_message': u'Только администратор имеет доступ к странице'})
    return render(request, '500.html', {'error_message': u'Ошибка при просмотре профиля пользователя'})