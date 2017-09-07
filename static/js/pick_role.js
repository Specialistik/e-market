$(document).ready(function(){
    var role = null;
    $('#pick_role').click(function(){
        if (role) {
            $('#pick_role_form').submit();
        }
    });

    $('#customer').click(function(){
        if (role === 'customer') {
            role = null;
            $('.fa').removeClass('fa-check');
        } else {
            $('.fa').removeClass('fa-check');
            role = 'customer';
            var fa = $(this).find('.fa');
            fa.addClass('fa-check');
        }
        $('#role').val(role);
    });

    $('#producer').click(function(){
        if (role === 'producer') {
            role = null;
            $('.fa').removeClass('fa-check');
        } else {
            $('.fa').removeClass('fa-check');
            role = 'producer';
            var fa = $(this).find('.fa');
            fa.addClass('fa-check');
        }
        $('#role').val(role);
    });
});