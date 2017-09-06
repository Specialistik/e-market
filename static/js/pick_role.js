$(document).ready(function(){
    var role = null;
    $('#pick_role').click(function(){
        if (role) {
            $('#pick_role_form').submit();
        }
    });

    $('#customer').click(function(){
        if (role === 'customer') {
            role = null
        } else role = 'customer';
        $('#role').val(role);
    });

    $('#producer').click(function(){
        if (role === 'producer') {
            role = null
        } else role = 'producer';
        $('#role').val(role);
    });
});