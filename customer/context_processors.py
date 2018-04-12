# -*- coding: utf-8 -*-
from customer.models import OrderUnit, TradePoint


def basket(request):
    if request.user.is_authenticated and not request.user.is_superuser:
        if hasattr(request.user, 'profile'):
            if request.user.profile.role == 'customer' or request.user.profile.role == 'manager':
                cost_of_basket = 0
                for order_unit in OrderUnit.objects.filter(order__isnull=True, customer_id=request.user.id):
                    cost_of_basket += order_unit.amount * order_unit.price
                return {
                    'basket_items': OrderUnit.objects.filter(order__isnull=True, customer_id=request.user.id).count(),
                    'basket_price': cost_of_basket
                }
    return {'basket_items': 0, 'basket_price': 0}


def moneybox(request):
    # Делитель для определения дохода менеджера по обороту
    MANAGER_INCOME_DIVIDER = 20

    # todo: условия входа необходимо переосмыслить
    if request.user.is_authenticated and not request.user.is_superuser:
        if hasattr(request.user, 'profile'):
            if request.user.profile.role == 'manager':
                moneybox_sum = moneybox_today = moneybox_month = 0
                for trade_point in TradePoint.objects.filter(territory__representative_id=request.user.id):
                    moneybox_sum += trade_point.composite_sum()
                    moneybox_today += trade_point.composite_sum_today()
                    moneybox_month += trade_point.composite_sum_this_month()
                return {
                    'income_sum': moneybox_sum / MANAGER_INCOME_DIVIDER,
                    'income_today': moneybox_today / MANAGER_INCOME_DIVIDER,
                    'income_month': moneybox_month / MANAGER_INCOME_DIVIDER,
                    'moneybox_sum': moneybox_sum,
                    'moneybox_today': moneybox_today,
                    'moneybox_month': moneybox_month
                }
    return {'moneybox_sum': 0, 'moneybox_today': 0, 'moneybox_month': 0,
            'income_sum': 0, 'income_today': 0, 'income_month': 0}
