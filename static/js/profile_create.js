$(document).ready(function(){
    $('#org_type_short').change(function(e){
        console.log($(this).val());
        $('#org_type_full').val($(this).val());
    });

    $('#org_type_full').change(function(e){
        $('#org_type_short').val($(this).val());
        console.log($(this).val());
    });
});