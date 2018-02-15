function place_markers() {
    $.getJSON("current_orders_json", function( data ) {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4
        });

        $.each(data, function (key, val) {
            console.log(key, val);
            var marker = new google.maps.Marker({
                position: val.location,
                map: map,
                title: val.name
            });
            map.setCenter(val.location, 6);
        });
    });
}

$(document).ready(function(){
    $('.clickable_order').click(function(){
        location.href = '/order/' + $(this).find('td').first().html() + '/';
    });
});


