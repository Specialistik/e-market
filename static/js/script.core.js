;(function($){

	"use strict";

	/* Add CORE function */

	var Core = {

		DOMReady: function(){

			var self = this;

			self.EditList();
			self.NavMenu.init();
			self.ToggleForm();
			self.SelectFile();
			self.CustomScroll();
			self.tabs();

			if($('.gmap').length){

				self.Gmap.init();

			}

			if($('#ymap').length){

				self.yMap.init();

			}

		},


		windowLoad: function(){

			var self = this;

			self.HeaderHeight.init();

		},


		/**
		**	Edit list
		**/

		EditList: function(){

			var self = this;

			self.editLink = $('.js_edit');
			self.editList = $('.setting_list');
			self.editInput = $('.setting_input');
			self.settingBox = $('.setting_box');
			self.editOkBtn = $('.ok_btn');
			self.basket = $('#basket');
			self.moneybox = $('#moneybox');

			self.closestBtn = $('.closest_btn');
			self.editTextarea = $('.setting_textarea');

			self.editLink.on('click', function(){
				$(this)
				.addClass('active')
				.closest(self.settingBox)
				.addClass('active')
				.find('.setting_input, .setting_textarea')
				.removeAttr('disabled').trigger('refresh');

				$(this).closest('.setting_box').find('.wrapp_settings_select select').attr('disabled', false)
			    .trigger('refresh');

				if ($(this).closest(self.settingBox).find('select.expiration_type').val() == 1) {
					$(this).closest(self.settingBox).find('.expiration_date').val('').attr('disabled','disabled');
				}

			});

			self.closestBtn.on('click',function(e){
				e.preventDefault();
				var $this = $(this);

				self.closestBox = $this.closest('.block_closest');
				$('.removeProduct_l').attr('href', $this.attr('href'));
				$.magnificPopup.open({
				  	items: {
				    	src: '#remove_product'
				  	},
					type: 'inline'

				}, 0);
			});

			self.basket.on('click', function(){
				location.href = '/basket';
			});

			self.moneybox.on('click', function(){
				location.href = '/my_clients';
			});
		},


 		/*
		*
		*	NavMenu
		*
		*/

 		NavMenu: {

 			init: function(){

 				var self = this;

 				self.ShowHideMenu();
 				self.ContentResize();

 			},

 			ShowHideMenu: function(){

 				var self = this;

 				$('.navigation_btn').on("click", function () {

					$(this).stop().toggleClass("active");

 					$(".navigation").stop().toggleClass("opened");

					self.ContentResize();

 				});


 			},

 			ContentResize: function () {

 				if ($(".navigation").hasClass("opened")) {

 					$(".wrapp_content").addClass("changed");

 				}else {
 					$(".wrapp_content").removeClass("changed");
 				}

 			},

 		},

 		/*
		*
		*	ToggleForm
		*
		*/

 		ToggleForm: function() {

 			$(".title_edit.angle_right").on("click", function () {
				$(this).toggleClass("active").next().stop().slideToggle();
 			});

 		},

 		/*
		*
		*	SelectFile
		*
		*/

 		SelectFile: function() {

 			$('.select_file').children('span').on('click',function(){$(this).parent().find("input[type='file']").trigger('click')});
 			$('.select_file').children('input').on('change',function(){$(this).siblings("span").addClass("checked").text($(this).val())});

 			$('#file').on('change', function(){
				$.magnificPopup.open({
			    items: {
			        src: '#preloadfile'
			    },
			    	type: 'inline'
		      	});

				var file_data = new FormData($('#file'));
				file_data.append('import_file', $('#file')[0].files[0]);

				$.ajax({
					type: "POST",
					url: $('#import_form').attr('action'),
					enctype: 'multipart/form-data',
					data: file_data,
					processData: false,  // tell jQuery not to process the data
				  	contentType: false   // tell jQuery not to set contentType
				}).done(function(data) {
					$.magnificPopup.close({
						items: {
							src: '#preloadfile'
						},
							type: 'inline'
					});

					if (data['success'] === true) {
                        $('#processed_products_count').html(data['processed_products']);
                        $('#unprocessed_products_count').html(data['unprocessed_products']);
                    } else {
						alert(data['error_msg']);
					}
					$.magnificPopup.open({
						items: {
							src: '#countPreloadfile'
						},
							type: 'inline'
					});

				$("#countPreloadfile").close(function(){
					location.href = '/my_products/'
				});


				}).fail(function(data) {
					alert(data['error_msg']);
                });

 			});
 		},


 		/*
 		*
 		*
 		*	Header Height
 		*
 		*/

 		HeaderHeight: {

 			init: function(){

 				var self = this;

 				self.header = $('#header');
 				self.page = $('.wrapp_content');

 				self.calculation();

 				$(window).on('resize', function(){

 					self.calculation();

 				});

 			},

 			calculation : function(){

 				var self = this;

 			    var headerHeight = self.header.outerHeight();

 			    self.page.css({
 			    	'padding-top': headerHeight
 			    });

 			}

 		},


 		/*
 		*
 		*
 		*	Custom Scroll
 		*
 		*/

 		CustomScroll: function() {

            var GetAgent = navigator.userAgent;

            if ($(window).width() > 767){

	            if (GetAgent.search(/Chrome/) > 0 || GetAgent.search(/Opera/) > 0 || GetAgent.search(/Safari/) > 0){
	            	$("html").addClass('custom_scroll');
	            }

            }

 		},

 		/*
 		*
 		*
 		*  Ymap
 		*
 		*/

 		yMap:{

 			init: function(){

 		    	ymaps.ready(init);

 				var myMap,
 					dataCoords,
           			myPlacemark;

               	function init(){

               		dataCoords = $("#ymap").data("coords");

                   	myMap = new ymaps.Map ("ymap", {
                       center: dataCoords[0].coord,
                       zoom: 9
                   	});

                   	for (var i = dataCoords.length - 1; i >= 0; i--) {


	                   	myPlacemark = new ymaps.Placemark(dataCoords[i].coord, {
	           	            hintContent: dataCoords[i].title,
	           	            // balloonContent: 'Это красивая метка'
	           	        }, {
	           	            // Опции.
	           	            // Необходимо указать данный тип макета.
	           	            // iconLayout: 'default#image',
	           	            // Своё изображение иконки метки.
	           	            // iconImageHref: 'images/myIcon.gif'
	           	            // Размеры метки.
	           	            // iconImageSize: [30, 42],
	           	            // Смещение левого верхнего угла иконки относительно
	           	            // её "ножки" (точки привязки).
	           	            // iconImageOffset: [-5, -38]
	           	        });

	                   	myMap.geoObjects.add(myPlacemark);
                   	}


				}

 			}

 		},

 		/**
 		**  Tabs
 		**/

 		tabs: function(){

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

	 		    if(tabActive.find(".gmap").length){
			        Core.Gmap.refreshMap();

	 		    }

 		    });

 		},

	}; /* End add CORE function */

	$(document).ready(function(){

		Core.DOMReady();

	});

	$(window).load(function(){

		Core.windowLoad();

	});

})(jQuery);