$(document).ready(function(){
    $('#org_type_short').change(function(){
        $('#org_type_full').styler('destroy').val($(this).val()).styler();
    });

    $('#org_type_full').change(function(){
        $('#org_type_short').styler('destroy').val($(this).val()).styler();
    });
    /*
    $('#org_type_short').change(function(e){
        $('#org_type_full').val($(this).val());
    });

    $('#org_type_full').change(function(e){
        $('#org_type_short').val($(this).val());
    });
    */
});