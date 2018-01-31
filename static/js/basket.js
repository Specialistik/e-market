$(document).ready(function(){
    $('#popup_tradepoint').change(function(){
        $('#proxy_tradepoint').val($(this).val());
    });

    $('#perform_order').magnificPopup({
        items: {
            src: '#delivery_popup',
            type: 'inline'
        }
    });

    $('#tradepoint_pick').magnificPopup({
        items: {
            src: '#payment_popup',
            type: 'inline'
        }
    });
});