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
				.removeAttr('disabled');

				$(this).closest('.setting_box').find('.wrapp_settings_select select').attr('disabled', false)
			    .trigger('refresh');

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