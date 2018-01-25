$(document).ready(function(){
    $('.add_to_cart').click(function(){
        console.log('add to cart was clicked');
        var product = $(this).closest('.col_products');
        var minimal_price = product.find('.product_minimum_amount').html();

        //var product_name = product.find('.product_name').html();

        $('#popup_product_id').val(product.find('.product_id').html());
        $('#popup_product_name').html(product.find('.product_name').html());
        $('#popup_product_url').attr('src', product.find('.img_url').attr('src'));
        $('#popup_minimum_amount').html('от ' + product.find('.product_minimum_amount').html() + ' шт.');
        $('#amount').attr('min', minimal_price).attr('step', minimal_price).val(minimal_price).trigger('refresh');
        $('#popup_price').html(product.find('.products_price').html());
        $('#popup_tooltip_desc').attr('data-tooltip-txt', 'Минимальный заказ: от ' + minimal_price + ' шт');
        $('#popup_description').html(product.find('.product_description').html());


        $.magnificPopup.open({
            items: {
                src: '#product_popup'
            },
            type: 'inline'
        }, 0);
    });

    $('.modal_desc_product').click(function(){
        console.log('product pic was clicked');
        var product = $(this).closest('.col_products');
        $('#popup_minimum_amount_desc').html('от ' + product.find('.product_minimum_amount').html() + ' шт.');
        $('#popup_product_url_desc').attr('src', product.find('.img_url').attr('src'));
        $('#popup_price_desc').html(product.find('.products_price').html());
        $('#popup_description_desc').html(product.find('.product_description').html());
        //$(this).magnificPopup({src: '#modal_desc_product'});
        //$('#modal_desc_product').magnificPopup({type: 'inline', src: '#modal_desc_product'});
         $.magnificPopup.open({
            items: {
                src: '#modal_desc_product'
            },
            type: 'inline'
        }, 0);
    });
});