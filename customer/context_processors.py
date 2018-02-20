# -*- coding: utf-8 -*-
from customer.models import OrderUnit, TradePoint


def basket(request):
    if request.user.is_authenticated and not request.user.is_superuser:
        if hasattr(request.user, 'profile'):
            if request.user.profile.role == 'customer':
                cost_of_basket = 0
                for order_unit in OrderUnit.objects.filter(order__isnull=True, customer_id=request.user.id):
                    cost_of_basket += order_unit.amount * order_unit.price
                return {
                    'basket_items': OrderUnit.objects.filter(order__isnull=True, customer_id=request.user.id).count(),
                    'basket_price': cost_of_basket
                }
    return {'basket_items': 0, 'basket_price': 0}


def moneybox(request):
    if request.user.is_authenticated and not request.user.is_superuser:
        if hasattr(request.user, 'profile'):
            if request.user.profile.role == 'manager':
                moneybox_sum = 0
                for trade_point in TradePoint.objects.filter(representative=request.user.id):
                    moneybox_sum += trade_point.composite_sum()
                return {
                    'moneybox_sum': sum(trade_point.composite_sum() for trade_point in
                                        TradePoint.objects.filter(representative=request.user.id))
                }
    return {'moneybox_sum': 0}
