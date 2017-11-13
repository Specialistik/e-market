$(document).ready(function(){
    $('#org_type_short').change(function(){
        $('#org_type_full').styler('destroy').val($(this).val()).styler();
    });

    $('#org_type_full').change(function(){
        $('#org_type_short').styler('destroy').val($(this).val()).styler();
    });

    $('#input_checkbox').change(function(){
        if ($(this).is(':checked')) {
            $(this).addClass('checked');
            $('#physical_address_block').hide();
        } else {
            $(this).removeClass('checked');
            $('#physical_address_block').show();
        }
    });
});