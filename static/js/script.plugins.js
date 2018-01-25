;(function($){

	"use strict";

	$(document).ready(function(){


		/* ------------------------------------------------
				Name function
		------------------------------------------------ */

		if($("select, .number_type_btn, .number_type_clear").length){

			$('select, .number_type_btn, .number_type_clear').styler();

		}

        /* ------------------------------------------------
				End of Name function
		------------------------------------------------ */


		/* ------------------------------------------------
				Popup Call
		------------------------------------------------ */

		/* When click btn */
			/* ~ open popup ~ */
		if($(".btn_popup").length){

			$('.btn_popup').magnificPopup({
				type: 'inline'
			});

		}
			/* ~ open popup ~ */

			/* ~ close popup ~ */
		$(document).on('click', '.close_popup', function (e) {
			e.preventDefault();
			$.magnificPopup.close();
		});
			/* ~ close popup ~ */
		/* When click btn */

		/* When load Page show popup (add this class from popup) */
		if($(".onload_popup").length){

			setTimeout(function() {

			   	$.magnificPopup.open({

			    items: {
			        src: '.onload_popup'
			    },
			    	type: 'inline'
		      	});

		   	}, 300);

		}
		/* When load Page show popup*/

        /* ------------------------------------------------
				End of Popup Call
		------------------------------------------------ */

		/* ------------------------------------------------
				Validation Form
		------------------------------------------------ */

			if($('.validate').length){

				$('.validate').validateForm({

					// пример
					rules: {
						n_mail: {
							required: true,
							email: false,
							number: true,
							maxlength: 5,
							minlength: 2
						}
					},

					payment_number: {
						required: true
					},

					messages: {

						n_mail: {
							required: "Это поле обязательно для заполнения",
							email: "Неверный формат email",
							number: "",
							maxlength: "Максимальное количество символов",
							minlength: "Минимальное количество символов"
						},

						n_captcha: {
							required: "Введите код с картинки"
						},

						payment_number: {
							required: "Номер платежного поручения необходим <br> для отслеживания поступления денег на безопасный счет"
						}

					}
					// elementContainer: 'error_form_container', // клас обертки элемента формы (обязательно!!!!!!!)
			    	// errorClassEl: 'error', // клас элемента ошибки элемента формы
			    	// errorClass: 'error_massage', // клас элемента с сообщением об ошибке
			    	// errorEl: 'div',   // какой тег будет обернуто сообщени об ошибка (только парные теги)

				});

			}

		/* ------------------------------------------------
				End of Validation Form
		------------------------------------------------ */

		/* ------------------------------------------------
				Name function
		------------------------------------------------ */

		if($(".wrapp_textarea").length){

			$('.textarea_item').limit('600','.count_textarea');

		}

        /* ------------------------------------------------
				End of Name function
		------------------------------------------------ */


		/* ------------------------------------------------
				Name function
		------------------------------------------------ */

		if($("").length){}

        /* ------------------------------------------------
				End of Name function
		------------------------------------------------ */

		/* ------------------------------------------------
				Name function
		------------------------------------------------ */

		if($("").length){}

        /* ------------------------------------------------
				End of Name function
		------------------------------------------------ */

	});

	$(window).load(function(){


		/* ------------------------------------------------
				Name function
		------------------------------------------------ */

		if($("").length){}

        /* ------------------------------------------------
				End of Name function
		------------------------------------------------ */

		/* ------------------------------------------------
				Name function
		------------------------------------------------ */

		if($("").length){}

        /* ------------------------------------------------
				End of Name function
		------------------------------------------------ */

		/* ------------------------------------------------
				Name function
		------------------------------------------------ */

		if($("").length){}

        /* ------------------------------------------------
				End of Name function
		------------------------------------------------ */

	});

})(jQuery);