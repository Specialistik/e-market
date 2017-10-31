$(document).ready(function(){
    $('.category_parent').change(function(){
        var self = $(this);
        var related_subcat = $(this).parent().parent().parent().parent().find('.category_child');
        console.log(related_subcat);

        //console.log($(this).val());
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
});