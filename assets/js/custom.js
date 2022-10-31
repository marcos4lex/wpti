(function() {

	"use strict";
  
	var app = {
		
		init: function() {

			//=== Main visible ===\\
			this.mainVisible();

			//=== lazy loading effect ===\\
			this.lazyLoading();

			this.setUpListeners();

			//=== Custom scripts ===\\
			this.btnHover();
			this.appendMfBg();
			this.appendBtnTop();
			this.formingHrefTel();
			this.contentTable();
			this.detectIE();

			//=== Plugins ===\\
			this.device();
			this.scrollToFixed();
			this.forms();
			this.spincrement();

		},
 
		setUpListeners: function() {

			//=== Ripple effect for buttons ===\\
			$(".ripple").on("click", this.btnRipple);

			//=== Header lang ===\\
			// Header lang open
			$(".header-lang-current").on("click", this.headerLangOpen);
			// Header lang close not on this element \\
			$(document).on("click", this.headerLangCloseNotEl);

			//=== Header mobile/tablet navbar ===\\
			// Header navbar toggle \\
			$(".header-navbar-btn").on("click", this.headerNavbarToggle);
			// Header navbar close not on this element \\
			$(document).on("click", this.headerNavbarNotEl);

			//=== Mobile/tablet main menu ===\\
			// Main menu toogle \\
			$(".main-mnu-btn").on("click", this.MainMenuToggle);
			// Main menu submenu toogle \\
			$(".mmm-btn").on("click", this.MainMenuSubmenuToggle);
			// Main menu close not on this element \\
			$(document).on("click", this.MainMenuCloseNotEl);

			//=== Side toggle ===\\
			$(".side-open").on("click", this.sideOpen);
			$(document).on("click", ".side-close, .side-visible", this.sideClose);

			//=== Tab ===\\
			$(".tabs-nav li").on("click", this.tab);

			//=== Accordion ===\\
			$(".accordion-trigger").on("click", this.accordion);
			
			//=== Form field ===\\
			$(".form-field").each(this.inputEach);
			$(".form-field-input")
				.on("focus", this.inputFocus)
				.on("keyup change", this.inputKeyup)
				.on("blur", this.inputBlur);

			//=== Button top ===\\
			$(document).on("click", '.btn-top', this.btnTop);
			$(window).on("scroll", this.btnTopScroll);
			
		},

		//=== Body visible ===\\
		mainVisible: function() {

			$(".main").addClass("main-visible");

		},

		appendMfBg: function() {

			$("body").append('<div class="mf-bg"></div>');

		},

		appendBtnTop: function() {

			$("body").append('<div class="btn-top"><svg class="btn-icon-right" viewBox="0 0 13 9" width="13" height="9"><use xlink:href="assets/img/sprite.svg#arrow-right"></use></svg></div>');

		},

		btnTop: function() {
			
			$('html, body').animate({scrollTop: 0},1000, function() {
				$(this).removeClass("active");
			});

		},

		btnTopScroll: function() {
			
			var btnTop = $('.btn-top');
			
			if ($(this).scrollTop() > 700) {

				btnTop.addClass("active");

			} else {

				btnTop.removeClass("active");
				
			}

		},

		//=== Tab ===\\
		tab: function() {

			var _this = $(this),
				index = _this.index(),
				list = _this.parent(),
				tabs = _this.closest(".tabs"),
				items = tabs.find(".tabs-item");

			if (!_this.hasClass("active")) {

				items
					.eq(index)
					.add(_this)
					.addClass("active")
					.siblings()
					.removeClass("active");
			
			}

		},

		//=== Accordion ===\\
		accordion: function(e) {

			e.originalEvent.preventDefault();

			var _this = $(this),
				item = _this.closest(".accordion-item"),
				container = _this.closest(".accordion"),
				items = container.find(".accordion-item"),
				content = item.find(".accordion-content"),
				otherContents = container.find(".accordion-content"),
				duration = 300;

			if (!item.hasClass("active")) {
				items.removeClass("active");
				item.addClass("active");
				otherContents.stop(true, true).slideUp(duration);
				content.stop(true, true).slideDown(duration);
			} else {
				content.stop(true, true).slideUp(duration);
				item.removeClass("active");
			}

		},
		
		//=== Header lang ===\\
		headerLangOpen: function() {

			$(this).parent().toggleClass("open");

		},
		headerLangCloseNotEl: function(e) {
			
			if($(".header-lang").hasClass("open")) {
				if ($(e.originalEvent.target).closest(".header-lang").length) return;
				$(".header-lang").removeClass("open");
				e.originalEvent.stopPropagation();
			}

		},

		//=== Mobile/tablet main menu ===\\
		MainMenuToggle: function() {

			var _this = $(this),
				_body = $("body"),
				headerH = _this.closest(".header").outerHeight(),
				mnu = $(".mmm"),
				offsetTop = $(".header-fixed").offset().top;
				
			mnu.css("padding-top", headerH);
			$(this).toggleClass("active");

			_body.toggleClass("mmm-open").scrollTop(offsetTop);
				
			if(_body.hasClass("mmm-open")) {
				$(".mf-bg").addClass("visible mm");
			} else {
				$(".mf-bg").removeClass("visible mm");
			}

		},
		MainMenuSubmenuToggle: function() {

			var _this = $(this),
				item = _this.parent(),
				content = item.find(".mmsm");

			item.toggleClass("open");
			content.slideToggle();

		},
		MainMenuCloseNotEl: function(e) {

			if($("body").hasClass("mmm-open")) {
				if ($(e.originalEvent.target).closest(".mmm, .main-mnu-btn").length) return;
				$("body").removeClass("mmm-open");
				$(".main-mnu-btn").removeClass("active");
				$(".mf-bg").removeClass("visible mm");
				e.originalEvent.stopPropagation();
			}

		},

		//=== Header mobile/tablet navbar ===\\
		headerNavbarToggle: function() {

			$(this).parent().toggleClass("open");

		},
		headerNavbarNotEl: function(e) {

			if ($(e.originalEvent.target).closest(".header-navbar").length) return;
			$(".header-navbar").removeClass("open");
			e.originalEvent.stopPropagation();

		},

		//=== Side toggle ===\\
		sideOpen: function(e) {

			e.originalEvent.preventDefault();

			var side = $($(this).attr("data-side"));

			if(side.length) {

				side.toggleClass("open");
				if(!e.currentTarget.classList.contains("panel-settings-btn")) {
					$(".mf-bg").toggleClass("visible side-visible");
				}

			}

		},
		sideClose: function() {

			$(".side, .sidebar-filters").removeClass("open");
			$(".mf-bg").removeClass("visible side-visible");

		},

		//=== Form input ===\\
		inputEach: function() {

			var _this = $(this),
				val = _this.find(".form-field-input").val();

			if (val === "") {
				_this.removeClass("focus");
			} else {
				_this.addClass("focus");
			}

		},
		inputFocus: function() {

			var _this = $(this),
				wrappInput = _this.parent();

			wrappInput.addClass("focus");

		},
		inputKeyup: function() {

			var _this = $(this),
				val = _this.val(),
				wrappInput = _this.parent();

			if (val === "" && !_this.is(":focus")) {
				wrappInput.removeClass("focus");
			} else {
				wrappInput.addClass("focus");
			}

		},
		inputBlur: function() {

			var _this = $(this),
				val = _this.val(),
				wrappInput = _this.parent();

			if(val === "") {
				wrappInput.removeClass("focus"); 
			}

		},

		//=== Ripple effect for buttons ===\\
		btnRipple: function(e) {
			
			var _this = $(this),
				offset = $(this).offset(),
				positionX = e.originalEvent.pageX - offset.left,
				positionY = e.originalEvent.pageY - offset.top;
			_this.append("<div class='ripple-effect'>");
			_this
				.find(".ripple-effect")
				.css({
					left: positionX,
					top: positionY
				})
				.animate({
					opacity: 0
				}, 1500, function() {
					$(this).remove();
				});

		},

		btnHover: function() {

			var btns = document.querySelectorAll(".btn, .el-ripple"),
				btn = [];

			btns.forEach(function(element, index) {

				var span = document.createElement("span"); 
				span.className = "el-ripple-circle";
				element.appendChild(span);

				// If The span element for this element does not exist in the array, add it.
				if (!btn[index])
				btn[index] = element.querySelector(".el-ripple-circle");

				element.addEventListener("mouseenter", function(e) {	
					btnHandler(element, index, e);			
				});

				element.addEventListener("mouseleave", function(e) {
					btnHandler(element, index, e);
				});
				
			});

			const btnHandler = function(element, index, e) {

				let offset = element.getBoundingClientRect(),
					left = e.pageX - offset.left - window.scrollX,
					top = e.pageY - offset.top - window.scrollY;

				btn[index].style.left = left + "px";
				btn[index].style.top = top + "px";

			}

		},

		//=== Forming href for phone ===\\
		formingHrefTel: function() {

			var linkAll = $('.formingHrefTel'),
				joinNumbToStringTel = 'tel:';

			$.each(linkAll, function () {
				var _this = $(this),
					linkValue = _this.text(),
					arrayString = linkValue.split("");

				for (var i = 0; i < arrayString.length; i++) {
					var thisNunb = app.isNumber(arrayString[i]);
					if (thisNunb === true || (arrayString[i] === "+" && i === 0)) {
						joinNumbToStringTel += arrayString[i];
					}
				}

				_this.attr("href", function () {
					return joinNumbToStringTel;
				});
				joinNumbToStringTel = 'tel:'

			});

		},

		isNumber: function(n) {

			return !isNaN(parseFloat(n)) && isFinite(n);

		},
		
		//=== Content table responsive ===\\
		contentTable: function() {

			var contentTable = $(".content");
			if(contentTable.length) {
				
				$.each(contentTable.find("table"), function() {
					$(this).wrap("<div class='table-responsive-outer'></div>").wrap("<div class='table-responsive'></div>");
				});
				
			}

		},

		//=== Plugins ===\\

		lazyLoading: function() {

			var observer = lozad('.lazy');
			observer.observe();

		},

		device: function() {

			if( (device.mobile() || device.tablet()) && device.ios() ) {
				var tempCSS = $('a').css('-webkit-tap-highlight-color');
				$('main, .main-inner').css('cursor', 'pointer')
						 .css('-webkit-tap-highlight-color', 'rgba(0, 0, 0, 0)');
				$('a').css('-webkit-tap-highlight-color', tempCSS);
			}

		},

		scrollToFixed: function() {

			if($('.header-fixed').length) {

				$('.header-fixed').scrollToFixed({
					preFixed: function() { $(this).addClass("fixed"); },
					postFixed: function() { $(this).removeClass("fixed"); }
				});

			}
			
		},

		forms: function() {

			$.validator.addMethod("customemail", function (value, element) {
				return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
			},
				"The email is not a valid email."
			);
			

			$(".contact-form").validate({
				rules: {
					ContactName: {
					required: true,
					minlength: 2
					},
					ContactPhone: {
					required: true
					},
					ContactEmail: {
						required: true,
						email: true,
						customemail: true
					},
				},
				messages: {
					ContactName: {
					required: "The name field is required.",
					},
					ContactPhone: {
					required: "The phone field is required.",
					},
					ContactEmail: {
						required: "The email field is required.",
						email: "The email field is required.",
						customemail: "The email is not a valid email."
					},
				},
				submitHandler: function(form) {

					$(form).trigger("reset");
					$(".form-field").removeClass("focus");
			
					alert('Successfully sent!');
		
				}
			});
			
			$(".footer-subscribe").validate({
				rules: {
					ContactEmail: {
						required: true,
						email: true,
						customemail: true
					},
				},
				messages: {
					ContactEmail: {
						required: "The email field is required.",
						email: "The email field is required.",
						customemail: "The email is not a valid email."
					},
				},
				submitHandler: function(form) {

					$(form).trigger("reset");
					$(".form-field").removeClass("focus");
			
					alert('Successfully sent!');
		
				}
			});

			$(".order-form").validate({
				rules: {
					orderName: {
					required: true,
					minlength: 2
					},
					orderPhone: {
					required: true
					}
				},
				messages: {
					orderName: {
					required: "The name field is required.",
					},
					orderPhone: {
					required: "The phone field is required.",
					}
				},
				submitHandler: function(form) {

					$(form).trigger("reset");
					$(".form-field").removeClass("focus");
			
					alert('Successfully sent!');
		
				}
			});

		},

		spincrement: function() {

			var show = true;
			var countbox = ".spincrement-container";

			if($(countbox).length) {
			
				$(window).on("scroll load resize", function () {
					if (!show) return false;
					var w_top = $(window).scrollTop();
					var e_top = $(countbox).offset().top;
					var w_height = $(window).height();
					var d_height = $(document).height();
					var e_height = $(countbox).outerHeight();
					if (w_top + 500 >= e_top || w_height + w_top == d_height || e_height + e_top < w_height) {
						$('.spincrement').spincrement({
							duration: 1500,
							leeway: 10
						});
					show = false;
					}
				});
			}

		},

		//=== detect IE ===\\
		detectIE: function() {

			if(this.detectIECheck()) {
				var body = document.querySelector("body"),
					msg = 'Unfortunately, the browser Internet Explorer you use is outdated and cannot display the site normally. <br> Please open the site in another browser';
				body.classList.add("overflow-hidden");
				body.innerHTML = '<div class="ie-browser"><div class="ie-browser-tr"><div class="ie-browser-td">'+ msg +'</div></div></div>';
			}

		},
		detectIECheck: function() {

			var ua = window.navigator.userAgent;
			  
			var msie = ua.indexOf('MSIE ');
			if (msie > 0) {
				// IE 10 or older => return version number
				return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
			}
			  
			var trident = ua.indexOf('Trident/');
			if (trident > 0) {
				// IE 11 => return version number
				var rv = ua.indexOf('rv:');
				return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
			}
			  
			// other browser
			return false;

		}
		
	}
 
	app.init();
 
}());