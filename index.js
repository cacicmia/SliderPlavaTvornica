import './css/styles.scss'
import img1 from './img/slider-image-1.jpg';
import img2 from './img/slider-image-2.jpg';
import img3 from './img/slider-image-3.jpg';
import img4 from './img/slider-image-4.jpg';
import img5 from './img/slider-image-5.jpg';
import img6 from './img/slider-image-6.jpg';
import img7 from './img/slider-image-7.jpg';
import img8 from './img/slider-image-8.jpg';
import img9 from './img/slider-image-9.jpg';
	let slider = {
	slider1: [img1, img2, img3, img4, img5],
	slider2: [img6, img7, img8, img9],
	
	init () {
		this.reachDOM();
		/* render sliders on screen */
		this.renderSlider(this.slider1, this.slideEl1);
		this.renderSlider(this.slider2, this.slideEl2);
		/* Add event and keybord listeners for right control */
		this.ff.click(this.moveBoth.bind(this, true));
		$(window).keyup(this.recogniseKey.bind(this));
	},
	reachDOM () {
		/* get DOM elements */	
		this.slideEl1 = $('.sl1');
		this.slideEl2 = $('.sl2');
		this.ff = $('.right');
		this.rew = $('.left');
		this.inactive = $('.inactive');
		this.activeAnimation = false;
	},
	/**
	 * @description render slider containing images held in array
	 * @param {array} array
	 * @param {number} num number of the slider
	 *  */
	renderSlider (array, DOM) {
		let image="";
		array.forEach((elem) => {
			image += `<img src="${elem}" alt="img" class="flexEl slideEl">`;
			});
		let imageDOM = $.parseHTML(image);
		DOM.css('right','0px');
		DOM.append(imageDOM);
	},
	moveBoth (n) {
		if (this.activeAnimation) {
			return;
		} else {
			/* activate left controls on screen */
			if (this.inactive.hasClass('inactive')) {
				this.inactive.addClass('active');
				this.inactive.removeClass('inactive');
				this.rew.click(this.moveBoth.bind(this, false));
			}
			/* animate both sliders */
				this.animate( this.slideEl1, n);
				this.animate( this.slideEl2, n);
		
		}
	},
	/** 
	 * @description animate slide 
	 * @param DOM jQuery element containing slide images
	 * @param n move direction 
	 */
	animate (DOM, n) {
		let slide = DOM.children();
		let movingImg, step, moveDirection,moveBack, action;
		 n ? (movingImg = slide.first(), step = movingImg.outerWidth(), moveDirection= `-=${step}`, moveBack = `+=${step}`, action = 'appendTo' ) :
			(movingImg= slide.last(), step = movingImg.outerWidth(), moveDirection =`+=${step}`, moveBack = `-=${step}`,
			action = 'prependTo');		 
		
		this.activeAnimation = true;
		movingImg.animate({
			opacity: '0'
		}, {
			queue: false,
			complete: function () {
				let store = $(this).detach()
				store.animate({
					opacity: '1'
				}, {
					complete: () => slider.activeAnimation = false
				});
				store[`${action}`](DOM);
				
			}
		});
		slide.animate({
			right: moveDirection
		}, {
			queue: false,
			complete: function () {
				$(this).css('right', moveBack);
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
$.ready(slider.init());
