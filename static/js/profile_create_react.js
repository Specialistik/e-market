$(document).ready(function(){
    $(".autocomplete").keyup(function(){
        //по мере ввода фразы, событие будет срабатывать всякий раз
        var search_query = $(this).val();
        //массив, в который будем записывать результаты поиска
        search_result = [];
        //делаем запрос к геокодеру
        $.getJSON('http://geocode-maps.yandex.ru/1.x/?format=json&geocode='+search_query, function(data) {
            //геокодер возвращает объект, который содержит в себе результаты поиска
            //для каждого результата возвращаются географические координаты и некоторая дополнительная информация
            //ответ геокодера легко посмотреть с помощью console.log();
            for(var i = 0; i < data.response.GeoObjectCollection.featureMember.length; i++) {
                //записываем в массив результаты, которые возвращает нам геокодер
                search_result.push({
                    label: data.response.GeoObjectCollection.featureMember[i].GeoObject.description+' - '+data.response.GeoObjectCollection.featureMember[i].GeoObject.name,
                    value:data.response.GeoObjectCollection.featureMember[i].GeoObject.description+' - '+data.response.GeoObjectCollection.featureMember[i].GeoObject.name,
                    longlat:data.response.GeoObjectCollection.featureMember[i].GeoObject.Point.pos});
            }
            //подключаем к текстовому полю виджет autocomplete
            $(".autocomplete").autocomplete({
                //в качестве источника результатов указываем массив search_result
                source: search_result,
                select: function(event, ui){
                    //это событие срабатывает при выборе нужного результата

                }
            });
        });
    });
});