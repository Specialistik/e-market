;(function($){

	"use strict";

	var Core = {

		DOMReady: function(){

			var self = this;

			self.EditList();
			self.NavMenu.init();
			self.ToggleForm();
			self.SelectFile();

			/* self.NameFunction*/

		},


		windowLoad: function(){

			var self = this;

			self.HeaderHeight.init();

			/* self.NameFunction*/

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
			self.basketCount = $('.basket_count');

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
				$('#remove_product').arcticmodal();
			});

			self.basketCount.on('click', function(){
				location.href = '/basket';
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
 				console.log('file changed');

 				startRead();

 			});

 			function startRead() {

 			  var file = document.getElementById('file').files[0];

 			  if(file){
 			    getAsText(file);
 			  }

 			  	$("#preloadfile").arcticmodal({
 					closeOnEsc: false,
 					closeOnOverlayClick: false
 				});

 			}

 			function getAsText(readFile) {

 			  var reader = new FileReader();

 			  // Read file into memory as UTF-16
 			  reader.readAsText(readFile, "UTF-16");

 			  // Handle progress, success, and errors
 			  reader.onprogress = updateProgress;
 			  reader.onload = loaded;
 			  reader.onerror = errorHandler;
 			}

 			function updateProgress(evt) {

	 			if (evt.lengthComputable) {

	 			    var loaded = (evt.loaded / evt.total);

	 			    if (loaded < 1) {

	 			    }

	 			}
 			}

 			function loaded(evt) {
 			  // Obtain the read file data
				console.log(evt);
 			  $("#preloadfile").arcticmodal('close');
 			  $('#countPreloadfile').arcticmodal();

 			}

 			function errorHandler(evt) {
 				console.log('error happened');

 			    if(evt.target.error.name == "NotReadableError") {
 			  		console.log('file not readable error occured');
 			    	// The file could not be read

				}

 			}
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

 		}

	}


	$(document).ready(function(){

		Core.DOMReady();

	});

	$(window).load(function(){

		Core.windowLoad();

	});

})(jQuery);