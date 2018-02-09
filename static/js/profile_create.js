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
    });

    $('.delete_button').click(function(e){
        e.preventDefault();
        var del_action = $(this).closest('form').attr('action') + 'del/';
        $(this).closest('form').attr('action', del_action);
        $(this).closest('form').submit();
        /*
        $.ajax({
            type: "get",
            url: $(this).closest('form').attr('action') + 'del/',
            processData: false,  // tell jQuery not to process the data
            contentType: false   // tell jQuery not to set contentType
        }).done(function(data) {
            if (data['success'] === true) {
                location.reload();
            } else {
                alert(data['error_msg']);
            }
        }).fail(function(data) {
            alert(data['error_msg']);
        });
        */
    });

    /*
    $('.submit_button').click(function(e){
        e.preventDefault();
        $(this).closest('form').append($('input', {
            type: 'hidden',
            name: 'scroll_y',
            value: window.scrollY
        }));
    });
    */
});