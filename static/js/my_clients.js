$(document).ready(function(){
    $('.toggle_btn').on('click', function(){
        $(this).toggleClass('opened').closest('.toggle_btn_row').toggleClass("opened_box");
        $(this).closest('.toggle_btn_row').next('.toggle_row').children('td').children('.toggle_box').slideToggle("fast");
    });

    $('.dropdown_link').on('click', function(){
        $(this).parent().find('.dropdown_item').toggleClass("active").slideToggle("fast");
    });

    $('#sort').change(function(){
        var base_url = '/my_clients';
        location.href = base_url + '?sort=' + $(this).val();
    });
});