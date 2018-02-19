;(function ($) {

	"use strict";

	$.fn.extend({

		validateForm: function($options){

			$.fn.hasAttr = function(name) {
			   return this.attr(name) !== undefined;
			};

			var defaults = {

				rules: {
					required: true,
					email: true,
					number: true,
					maxlength: 10,
					minlength: 2
				},
				messages: {
					required: "Это поле обязательно для заполнения",
					email: "Неверный формат email",
					number: "Только цифры",
					maxlength: "Максимальное количество символов",
					minlength: "Минимальное количество символов"
				},

		    	elementContainer: 'error_form_container',
		    	errorClassEl: 'error',
		    	errorClass: 'error_massage',
		    	errorEl: 'div',

			};

			//Variables
            var options = {};

            $options.rules = $.extend(defaults.rules, $options.rules);
            $options.messages = $.extend(defaults.messages, $options.messages);
            options = $.extend(defaults, $options);

		    var regexp = {
			        email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			        number: /^\d+$/
			    };

			//Main function
			this.each(function(){

				var $form = $(this);

			    var valid = {

			    	regexp: function(val, $element){

			    		var self = this;
			    		return regexp[$element].test(val);
			    	},

			    	checkForm: function(){

				    	var self = this;
				    	if($form.find('.'+options.errorClassEl).length){
				    		$form.addClass('no_validate');
				    	}
				    	else{
				    		$form.removeClass('no_validate').addClass('validate_form');
				    		$form.submit();
				    	}
			    	},

				    validate: function($element){

				    	var self = this;
				    	// удаляем текст и класс ошибки
				    	$element.closest('.'+options.elementContainer).removeClass(options.errorClassEl).find('.'+options.errorClass).remove();

				    	var val = $.trim($element.val()),
				    		$name = $element.data('name'),
				    		$rulList = options.rules[$name] ? options.rules[$name] : 0;

				    	if(($element.attr('type') == 'checkbox' || $element.attr('type') == 'radio') && !$element.prop('checked') && ($element.hasAttr('required') || $rulList.required)){

	            			var massage = self.errorMassage('required', options.messages[$name]);

	            			self.addError($element, massage);

				    	}
				    	// проверяем поле на обязательное заполнение
				    	if(val == ''){

				    		if($rulList && $rulList.required){

		            			var massage = self.errorMassage('required', options.messages[$name]);

		            			self.addError($element, massage);

				    		}
				    		else if($element.hasAttr('required')){

		            			var massage = self.errorMassage('required', options.messages[$name]);

		            			self.addError($element, massage);
				    		}

				    	}

				    	// пробегаем по правилам указанным в инициализации
				    	else if($rulList){

					    	for (var key in $rulList) {

					    		// проверка на email
					    		if(key == 'email' && $rulList[key]){

					    			if(!self.regexp( val, 'email')){

				            			var massage = self.errorMassage('email', options.messages[$name]);

				            			self.addError($element, massage);

					    			}

					    		}
					    		// проверка на заполнения только цифр
					    		else if(key == 'number' && $rulList[key]){

					    			if(!self.regexp( val, 'number')){

				            			var massage = self.errorMassage('number', options.messages[$name]);

				            			self.addError($element, massage);

					    			}

					    		}
					    		// проверка на максимальное количество символов
					    		else if(key == 'maxlength'){

					    			var qt = $rulList[key];

					    			if(val.length > qt){

				            			var massage = self.errorMassage('maxlength', options.messages[$name], qt);

				            			self.addError($element, massage);

					    			}
					    		}
					    		// проверка на минимальное количество символов
					    		else if(key == 'minlength'){

					    			var qt = $rulList[key];

					    			if(val.length < qt){

				            			var massage = self.errorMassage('minlength', options.messages[$name], qt);

				            			self.addError($element, massage);

					    			}
					    		}

					    	}

				    	}
				    	else if($element.attr('type') == 'email'){

			    			if(!self.regexp( val, 'email')){

		            			var massage = self.errorMassage('email', options.messages[$name]);

		            			self.addError($element, massage);

			    			}

				    	}

				    },

				 	addError: function(el, massage){

				    	var self = this,
				    		error = '<'+options.errorEl+' class="'+options.errorClass+'">'+massage+'</'+options.errorEl+'>';

				    	el.closest($('.'+options.elementContainer)).addClass(options.errorClassEl).append(error);

				 	},

			    	errorMassage: function($key, $obj, qt){

			    		var self = this;
	        			var massage;

				    	for (var key in $obj) {

				    		if(key == $key){
				    			massage = $obj[$key];
				    		}

				    	}

			    		massage = massage ? massage : options.messages[$key];
			    		if(qt){

			    			return massage+' '+qt

			    		}
			    		else{
			    			return massage
			    		}
			    	},

			    };

				$form.on('submit', function(e){

					if(!$form.hasClass('validate_form')){

						e.preventDefault();
						$form.find('select, input').each(function(){

							valid.validate($(this));

						});
						valid.checkForm();
					}

				});

				$form.on('change input blure', 'input, select, textarea', function(){
					valid.validate($(this));
				});

			});


		},

	});

})(jQuery);
