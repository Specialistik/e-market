$(document).ready(function(){
    function populate_address(overlord, geoObject) {
        var address = geoObject.item.full_value.metaDataProperty.GeocoderMetaData.Address;
        var longlat = geoObject.item.longlat;
        var arr_longlat = longlat.split(' ');
        var lng = arr_longlat[0];
        var lat = arr_longlat[1];

        //console.log(longlat);
        overlord.find('.autocomplete_index').val(address.postal_code);
        overlord.find('.autocomplete_region').val(address.Components[2].name);
        overlord.find('.autocomplete_city').val(address.Components[4].name);
        overlord.find('.autocomplete_street').val(address.Components[5].name);
        overlord.find('.autocomplete_house').val(address.Components[6].name);
        overlord.find('.autocomplete_lng').val(lng);
        overlord.find('.autocomplete_lat').val(lat);
    }

    $(".autocomplete").keyup(function(){
        //по мере ввода фразы, событие будет срабатывать всякий раз
        var search_query = $(this).val();
        //массив, в который будем записывать результаты поиска
        search_result = [];
        $.getJSON('https://geocode-maps.yandex.ru/1.x/?format=json&geocode='+search_query, function(data) {
            $.each( data.response.GeoObjectCollection.featureMember, function( key, value ) {
                search_result.push({
                    label: value.GeoObject.description + ' - ' + value.GeoObject.name,
                    value: value.GeoObject.description + ' - ' + value.GeoObject.name,
                    full_value: value.GeoObject,
                    longlat: value.GeoObject.Point.pos
                });
            });

            //подключаем к текстовому полю виджет autocomplete
            $(".autocomplete").autocomplete({
                //в качестве источника результатов указываем массив search_result
                source: search_result,
                select: function(event, ui){
                    populate_address($(this).closest('form'), ui);
                }
            });
        });
    });

    // Костыль, который отключает фильтрацию неполных совпадений в автокомплите
    $.ui.autocomplete.filter = function (array, term) {
        return $.grep(array, function (value) {
            return value.label || value.value || value;
        });
    };

});