;(function($){

	"use strict";

	var Core = {

		DOMReady: function(){

			var self = this;

			self.editList();
			self.NavMenu.init();
			self.ToggleForm();

			/* self.NameFunction*/

		},


		windowLoad: function(){

			var self = this;

			/* self.NameFunction*/

		},


		/**
		**	Edit list
		**/
		editList: function(){

			var self = this;

			self.editLink = $('.js_edit');
			self.editList = $('.setting_list');
			self.editInput = $('.setting_input');
			self.settingBox = $('.setting_box');
			self.editOkBtn = $('.ok_btn');

			self.editInput.attr('disabled' , 'disabled');

			self.editLink.on('click', function(){
				$(this)
				.addClass('active')
				.closest(self.settingBox)
				.addClass('active')
				.find('.setting_input')
				.removeAttr('disabled');
			});

			self.editOkBtn.on('click', function(){
				$(this)
				.removeClass('active')
				.closest(self.settingBox)
				.removeClass('active')
				.find('.setting_input')
				.attr('disabled' , 'disabled');

			});

		},



 		/*
		*
		*	NameFunction
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

 					$(".wrapp_content").stop().css("padding-left", "367px");

 				}else {
 					$(".wrapp_content").stop().css("padding-left", "70px");
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
		*	NameFunction
		*
		*/

 		NameFunction: function() {

 		},

 		/*
		*
		*	NameFunction
		*
		*/

 		NameFunction: function() {

 		},

	}


	$(document).ready(function(){

		Core.DOMReady();

	});

	$(window).load(function(){

		Core.windowLoad();

	});

})(jQuery);