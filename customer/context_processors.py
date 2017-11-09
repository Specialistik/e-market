# -*- coding: utf-8 -*-
from customer.models import OrderUnit, Order


def basket(request):
    try:
        wanted_order = Order.objects.get(customer_id=request.user.id, order_status__isnull=True)
        cost_of_basket = 0
        for order_unit in OrderUnit.objects.filter(order_id=wanted_order.id):
            cost_of_basket += order_unit.amount * order_unit.product.producer_price
        return {
            'basket_items': OrderUnit.objects.filter(order_id=wanted_order.id).count(),
            'basket_price': cost_of_basket
        }
    except Order.DoesNotExist:
        return {'basket_items': 0, 'basket_price': 0}
