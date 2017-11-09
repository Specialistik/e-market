$(document).ready(function(){

    $('.add_to_cart').click(function(){
        var product = $(this).closest('.col_products');
        var minimal_price = product.find('.product_minimum_amount').html();

        //var product_name = product.find('.product_name').html();

        $('#popup_product_id').val(product.find('.product_id').html());
        $('#popup_product_name').html(product.find('.product_name').html());
        $('#popup_product_url').attr('src', product.find('.img_url').attr('src'));
        $('#popup_minimum_amount').html('от ' + product.find('.product_minimum_amount').html() + ' шт.');
        $('#amount').attr('min', minimal_price).val(minimal_price);
        $('#popup_price').html(product.find('.products_price').html());
        $('#popup_tooltip_desc').attr('data-tooltip-txt', 'Минимальный заказ: от ' + minimal_price + ' шт');
        $('#product_popup').arcticmodal();
    });
});