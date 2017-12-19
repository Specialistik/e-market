$(document).ready(function(){
    $('#org_type_short').change(function(){
        $('#org_type_full').styler('destroy').val($(this).val()).styler();
    });

    $('#org_type_full').change(function(){
        $('#org_type_short').styler('destroy').val($(this).val()).styler();
    });

    if ($('.physical_is_juridical').is(':checked')) {
        $('.fiz_input').attr('disabled', true)
    }

    $('.physical_is_juridical').change(function(){
         if ($(this).is(':checked')) {
            $('.fiz_input').attr('disabled', true)
        } else {
            $('.fiz_input').attr('disabled', false)
        }
    });

    $('#tradepoint_add').click(function(){
        $(this).hide();
        $('#hidden_trade_point').show();
    })
});