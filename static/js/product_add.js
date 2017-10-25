$(document).ready(function(){
    $('#category_box').change(function(){
        $.getJSON('/subcategory_list/' + $(this).val(), function( data ) {
            $('#subcategory_box').styler('destroy').html('<option value=""></option>');
            $.each(data, function(key, value) {
                $('#subcategory_box')
                    .append($('<option>', { value : key })
                    .text(value));
            });
            $('#subcategory_box').styler()
        });
    });
    $("#weight").inputmask('Regex', {regex: "^[0-9]{1,6}(\\.\\d{1,3})?$"});

});