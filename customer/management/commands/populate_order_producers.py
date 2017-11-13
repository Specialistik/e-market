# -*- coding: utf-8 -*-
from django.core.management.base import BaseCommand

from customer.models import Order, OrderUnit


class Command(BaseCommand):
    help = 'populate correct producers for order units'

    def handle(self, *args, **options):
        for order_unit in OrderUnit.objects.all():
            order_unit.producer_id = order_unit.find_producer()
            order_unit.save()