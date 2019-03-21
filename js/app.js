(function(){
	let model = {
	slider1: ["img/slider-image-1.jpg", "img/slider-image-2.jpg", "img/slider-image-3.jpg", "img/slider-image-4.jpg", "img/slider-image-5.jpg"],
	slider2: ["img/slider-image-6.jpg", "img/slider-image-7.jpg", "img/slider-image-8.jpg", "img/slider-image-9.jpg"]
};
let controller = {
	init:()=> view.init(),
	getSlider: sliderName => model[sliderName]
	
};
let view = {
	init: function () {
		/* get DOM elements */
		this.slideEl1 = $('.sl1');
		this.slideEl2 = $('.sl2');
		this.ff = $('.right');
		this.rew = $('.left');
		this.inactive = $('.inactive');
		this.activeAnimation = false;
		/* get image urls from controller */
		this.slider1 = controller.getSlider('slider1');
		this.slider2 = controller.getSlider('slider2');
		/* render sliders on screen */
		this.renderSlider(this.slider1, this.slideEl1);
		this.renderSlider(this.slider2, this.slideEl2);
		/* Add event and keybord listeners for right control */
		this.ff.click(this.moveBoth.bind(view, true));
		$(window).keyup(this.recogniseKey.bind(view));
	},
	/**
	 * @description render slider containing images held in array
	 * @param {array} array
	 * @param {number} num number of the slider
	 *  */
	renderSlider: (array, DOM) => {
		let image="";
		array.forEach((elem) => {
			image += `<img src="${elem}" alt="img" class="flexEl slideEl">`;
			
		});
		let imageDOM = $.parseHTML(image);
		DOM.css('right','0px');
		DOM.append(imageDOM);
	},
	moveBoth: function (n) {
		if (this.activeAnimation) {
			return;
		} else {
			/* activate left controls on screen */
			if (this.inactive.hasClass('inactive')) {
				this.inactive.addClass('active');
				this.inactive.removeClass('inactive');
				this.rew.click(this.moveBoth.bind(view, false));
			}
			/* get currently rendered elements */
			this.slideContainer1 = $('.sl1');
			this.slideContainer2 = $('.sl2');
			this.slideCollection1 = this.slideContainer1.children();
			this.slideCollection2 = this.slideContainer2.children();
			if (n) {
				this.animateFf(this.slideCollection1, this.slideContainer1);
				this.animateFf(this.slideCollection2, this.slideContainer2);
			} else {
				this.animateRew(this.slideCollection1,this.slideContainer1);
				this.animateRew(this.slideCollection2,this.slideContainer2);
			}
		}
	},
	/** 
	 * @description animate right
	 * @param slide jQuery collection of image elements
	 * @param DOM jQuery element containing slide images
	 */
	animateFf: function (slide, DOM) {
		let first = slide.first();
		let step = first.outerWidth();
		this.activeAnimation = true;
		first.animate({
			opacity: '0'
		}, {
			queue: false,
			complete: function () {
				let store = $(this).detach()
				store.animate({
					'opacity': '1'
				}, {
					complete: () => view.activeAnimation = false
				});
				store.appendTo(DOM);
			}
		});
		slide.animate({
			right: `-=${step}`
		}, {
			queue: false,
			complete: function () {
				$(this).css('right', `+=${step}`);
			}
		});
	},
	/** 
	 * @description animate left
	 * @param slide jQuery collection of image elements
	 * @param DOM jQuery element containing slide images
	 */
	animateRew: function (slide, DOM) {
		let last = slide.last();
		let step = last.outerWidth();
		this.activeAnimation = true;
		last.animate({
			opacity: '0'
		}, {
			queue: false,
			complete: function () {
				let store = $(this).detach()
				store.animate({
					'opacity': '1'
				}, {
					complete: () =>	view.activeAnimation = false
					
				});
				store.prependTo(DOM);
			}
		});
		slide.animate({
			right: `+=${step}`
		}, {
			queue: false,
			complete: function () {
				$(this).css('right', `-=${step}`);
			}
		});
	},
	/**  
	 * @description recognise keyboard input
	 */
	recogniseKey: function (e) {
		switch (e.which) {
		case 39:
			{
				this.moveBoth(true);
				break;
			}
		case 37:
			{
				if (!this.inactive.hasClass('inactive')) {
					this.moveBoth(false);
					break;
				} else {
					break;
				}
			}
		default:
		break;
		}
	}
};
controller.init();
})();