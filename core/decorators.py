# -*- coding: utf-8 -*-
from django.shortcuts import render


def roles_required(function, roles):
    def wrap(request, *args, **kwargs):
        wanted_roles = (roles, ) if isinstance(roles, str) else roles
        if not hasattr(request.user, 'profile'):
            return render(request, '500.html', {'error_message': u'Недоступно для вашей роли'})

        if request.user.profile.role not in wanted_roles:
            return render(request, '500.html', {'error_message': u'Недоступно для вашей роли'})
        return function(request, *args, **kwargs)

    wrap.__doc__ = function.__doc__
    wrap.__name__ = function.__name__
    return wrap
