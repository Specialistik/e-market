$('.wrapp_tabs').each(function(){
    var $this = $(this),
        active = $this.find('.tabs_list').find(".tabs_item.active"),
        index = active.index();

    $this.find('.wrapp_tabs_content').children(".tabs_content").eq(index).show().siblings().hide();

});

$('.tabs_list').on('click', '.tabs_item', function(){

    var listIndex = $(this).index(),
        tabActive = $(this).closest('.wrapp_tabs').find('.wrapp_tabs_content').children().eq(listIndex);

    $(this)
    .addClass('active')
    .siblings()
    .removeClass('active');

    tabActive
    .addClass('active')
    .show()
    .siblings()
    .removeClass('active')
    .hide();

    /*
    if(tabActive.find(".gmap").length){

        Core.Gmap.refreshMap();

    }
    */

});
/*
ymaps.ready(function () {
    $.getJSON("current_orders_json", function( data ) {
        console.log(Object.keys(data)[0]);
        var map = new ymaps.Map('#ymap', {
            center: Object.keys(data)[0],
            zoom: 7
        });

        $.each(data, function (key, val) {
            var myPlacemark = new ymaps.Placemark(map.getCenter(), {
                balloonContentBody: [
                    '<address>',
                    //'<strong>val.name</strong>',
                    //'<br/>',
                    val.name,
                    //'<br/>',
                    '</address>'
                ].join('')
            }, {
                preset: 'islands#redDotIcon'
            });


            map.geoObjects.add(myPlacemark);
            //});
        });
    });
});
*/
$(document).ready(function(){
    $('.clickable_order').click(function(){
        location.href = '/order/' + $(this).find('td').first().html() + '/';
    });
});


