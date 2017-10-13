$(document).ready(function(){
    $(".category_products").on("click", function(e) {
        e.preventDefault();

        if ($(this).hasClass('current')) {
            $(this).removeClass('current');
        } else {
            $('.category_products').removeClass('current');
            $(this).addClass('current');
        }
    });

    $('#pick_category').click(function(){
        if ($('.category_products.current').length == 1) {
            location.href = $('.category_products.current').find('a').attr('href');
        }
    });
});