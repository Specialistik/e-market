(function ($) {
    $.fn.serializeFormJSON = function () {

        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
})(jQuery);

$(document).ready(function(){
    //$('#signup').click(function(e){
    $('#signup_form').submit(function(e){
        e.preventDefault();
        //$('#signup_form').validate();
        var json_data = $('#signup_form').serializeFormJSON();
        //var request_data = $('#signup_form').serialize();
        //var request_data_object = $('#signup_form').serializeObject();
        console.log(json_data);
        //console.log(request_data_object);

        $.post('/api/signup/', json_data, function(response_data){
            location.href = '/'
        }).fail(function(response) {
            alert(response.responseText);
        });

    });
});