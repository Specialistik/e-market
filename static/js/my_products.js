$(document).ready(function(){
    $('#sort').styler('destroy');

    var base_url = '/my_products/?';
    var params = {
        sort: $('#sort:selected').val()
    };

    if ($('.page_entity.current').html()) {
        params['page'] = $('.page_entity.current').html()
    }
    $('#sort').styler();

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

    $('#sort').change(function(){
        params['sort'] = $(this).val();
        location.href = base_url + $.param( params );
    });

    $('.page_entity').click(function(){
        params['page'] = $(this).attr('page_num');
        location.href = base_url + $.param( params );
    });
});