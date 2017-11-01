$(document).ready(function(){
    $('.category_parent').change(function(){
        var related_subcat = $(this).parent().parent().parent().parent().find('.category_child');
        $.getJSON('/subcategory_list/' + $(this).val(), function( data ) {

            $(related_subcat).styler('destroy').html('<option value=""></option>');
            $.each(data, function(key, value) {
                $(related_subcat)
                    .append($('<option>', { value : key })
                    .text(value));
            });
            $(related_subcat).styler()
        });
    });

    $('.expiration_type').change(function(){
        var related_exp_value = $(this).parent().parent().parent().parent().find('.expiration_date');
        if ($(this).val() == 1) {
            related_exp_value.val('').attr('disabled','disabled');
        } else {
            related_exp_value.attr('required', 'required').removeAttr('disabled');
        }
    });
});