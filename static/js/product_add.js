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

    $('#expiration_type').change(function(){
        //console.log($(this).val(), $(this).val() == 1);
        if ($(this).val() == 1) {
            $('#expiration_value').removeAttr("required").attr('disabled' , 'disabled').val('');
        } else {
            $('#expiration_value').attr("required", true).removeAttr("disabled");
        }
    });


    if($(".wrapp_textarea").length){

        $('.textarea_item').limit('600','.count_textarea');

    }
});