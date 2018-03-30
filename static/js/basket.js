$(document).ready(function(){

    $('#popup_tradepoint').change(function(){
        $('#proxy_tradepoint').val($(this).val());
    });

    $('#perform_order').magnificPopup({
        items: {
            src: '#delivery_popup',
            type: 'inline'
        }
    });

    $('#tradepoint_pick').click(function(e){
        e.preventDefault();
        $('#perform_order_form').submit();
    });

    /* ------------------------------------------------
        multisearch
    ------------------------------------------------ */

        if($("#myMultiSearch").length){
/*
            var deliveryAddress = [
               { name: 'ул. А. Варакина, 21, Нефтеюганск, Ханты-Мансийский автономный округ, Россия'},
               { name: 'ул. А. Варакина, 114, Россия'}
            ];
*/
            $("#myMultiSearch").multisearch({
                inputPosition: 'start',
                maxShowOptions: 5,
                minSearchChars: 1,
                source: "/basket/trade_points", //deliveryAddress,
                keyAttrs: ["name"],

                formatPickerItem: function( data ) {
                    return '<li><a href="javascript:;">'+ data.name +'</a></li>';
                },
                formatSelectedItem: function( data ) {
                    $("input[name='trade_point']").val(data.id);
                    return '<a href="javascript:;" class="selected_item"><span>'+ data.name +
                    '</span><i class="fa fa-times-circle multisearch_clear"></i></a>';
                },

            });


			// close item
			$(document).on('click', '.multisearch_clear', function(){
/*
			    var text = $(this).parent().find('span').text(),
			        id;

			    var el = deliveryAddress.find(function arrFind(element, index, array){
			        console.log(text)
			        if (element.name == text) {
			          return element;
			        }
			    });
*/
                $(this).parent().remove();
			    //$('#myMultiSearch').multisearch('remove', $(this).parent().parent());

			});
			// close item
        }

    /* ------------------------------------------------
        End of multisearch
    ------------------------------------------------ */

});