$(document).ready(function(){
    $('.clickable_order').click(function(){
        location.href = '/order/' + $(this).find('td').first().html() + '/';
    });
});