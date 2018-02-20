;(function($){

	"use strict";

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
			/*
			self.editOkBtn.on('click', function(){
				$(this)
				.removeClass('active')
				.closest(self.settingBox)
				.removeClass('active')
				.find('.setting_input')
				.attr('disabled' , 'disabled');

				$(this).closest('.setting_box').find('.wrapp_settings_select select').attr('disabled', true)
			    .trigger('refresh');

			});
			*/

			self.closestBtn.on('click',function(e){
				e.preventDefault();
				var $this = $(this);

				self.closestBox = $this.closest('.block_closest');
				$('.removeProduct_l').attr('href', $this.attr('href'));
				//$('#remove_product').arcticmodal();
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


			/*
			$('.removeProduct_l').on('click', function(){

				$('#remove_product').arcticmodal('close');

				self.closestBox.animate({
					'opacity': 0
				},500, function(){
					self.closestBox.slideUp(300,function(){
						self.closestBox.remove();
					});
				});

			});
			*/


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
 				/*
				if (!$(this).hasClass('active')) {
					$(this).addClass('active').next().stop().hide();
				} else {
					$(".title_edit.angle_right").addClass('active').next().stop().hide();
				*/
					$(this).toggleClass("active").next().stop().slideToggle();
				//}
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

 		/**
 		**  G-Map
 		**/

 		Gmap: {

 			init: function(){

 				var self = this;

                self.map = new GMaps({
                    el: '.gmap',
                    lat: -12.037,
                    lng: -77.041,
                    zoom: 16,
                    scrollwheel: false,
                });

                var blue_styles = [{"featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{"color": "#444444"} ] }, {"featureType": "landscape", "elementType": "all", "stylers": [{"color": "#f2f2f2"} ] }, {"featureType": "poi", "elementType": "all", "stylers": [{"visibility": "off"} ] }, {"featureType": "road", "elementType": "all", "stylers": [{"saturation": -100 }, {"lightness": 45 } ] }, {"featureType": "road.highway", "elementType": "all", "stylers": [{"visibility": "simplified"} ] }, {"featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{"visibility": "off"} ] }, {"featureType": "transit", "elementType": "all", "stylers": [{"visibility": "off"} ] }, {"featureType": "water", "elementType": "all", "stylers": [{"color": "#46bcec"}, {"visibility": "on"} ] } ];

                self.map.addStyle({
                    styledMapName:"Blue Map",
                    styles: blue_styles,
                    mapTypeId: "blue_styles"
                });

                self.map.setStyle("blue_styles");

                // addMarker
                var dryLiningMarkers = [

	                self.map.addMarker({
		                lat: -12.042,
		                lng: -77.028333,
		                title: 'Marker with InfoWindow 1',
		                infoWindow: {
		                	content: '<p>HTML Content 1</p>'
		                }
	                }),

	                self.map.addMarker({
		                lat: -12.040,
		                lng: -77.029,
		                title: 'Marker with InfoWindow 2',
		                infoWindow: {
		                	content: '<p>HTML Content 2</p>'
		                }
	                }),

	                self.map.addMarker({
		                lat: -12.044,
		                lng: -77.027,
		                title: 'Marker with InfoWindow 3',
		                infoWindow: {
		                	content: '<p>HTML Content 3</p>'
		                }
	                }),

	                self.map.addMarker({
	                	lat: -12.047,
	                	lng: -77.030,
		                title: 'Marker with InfoWindow 4',
		                infoWindow: {
		                	content: '<p>HTML Content 4</p>'
		                }
	                }),

                ];
                // addMarker

 			},

 			refreshMap: function(){

 				var self = this;

	 		    /**
		         * Trigger a `resize` event, useful if you need to repaint the current map (for changes in the viewport or display / hide actions).
		        */

	 			self.map.refresh();

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

 		        $this.find('.wrapp_tabs_content').children(".tabs_content").eq(index).show().siblings().hide();;

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

		 		    /**
			         * Trigger a `resize` event, useful if you need to repaint the current map (for changes in the viewport or display / hide actions).
			        */

			        Core.Gmap.refreshMap();

	 		    }

 		    });

 		},

	};


	$(document).ready(function(){

		Core.DOMReady();

	});

	$(window).load(function(){

		Core.windowLoad();

	});

})(jQuery);