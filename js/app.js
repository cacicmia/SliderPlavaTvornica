
        var model = {
    slider1: ["img/slider-image-1.jpg", "img/slider-image-2.jpg", "img/slider-image-3.jpg", "img/slider-image-4.jpg", "img/slider-image-5.jpg"],
    slider2: ["img/slider-image-6.jpg", "img/slider-image-7.jpg", "img/slider-image-8.jpg", "img/slider-image-9.jpg"], 
};

var controler = {
    init: function(){
        view.init();
    },
    getSlider: function(sliderName){
        return model[sliderName];
    }

};
 
var view = {
    init: function(){
        
    this.slideEl1 = document.querySelector('.sl1');
    this.slideEl2 = document.querySelector('.sl2');
    /* slider vars */
    this.slider1 = controler.getSlider('slider1');
    this.slider2 = controler.getSlider('slider2');
    /* get sliders on screen */

    this.renderSlider(this.slider1,this.slideEl1);
    this.renderSlider(this.slider2,this.slideEl2);    
    /* reach buttons from the DOM */
   
    this.ff = document.querySelector('.right');
    this.rew = document.querySelector('.left');
        
    this.ff.addEventListener('click',this.moveBoth.bind(view, true));
    $(window).keyup(this.recogniseKey.bind(view));
    
     

    },
    /**
     * @description render slider containing images held in array
     * @param {array} array
     * @param {number} num number of the slider 
     *  */
    renderSlider: function(array, DOM ) {
               
        array.forEach(function(elem){
            let imageDOM = `<img src="${elem}" alt="img" class="flexEl slideEl">`;
            //jquery declaration $('<img>')
           
            
            DOM.style.right="0px";
            DOM.insertAdjacentHTML('beforeend',imageDOM);
            

        }); 
        

    },
    moveBoth: function(n) {
        let inactive= $('.inactive');
        if (inactive.length !== 0 ) {
            inactive.addClass('active');
            inactive.removeClass('inactive');
            this.rew.addEventListener('click',this.moveBoth.bind(view, false));
        }
        let slider = $('.slideEl');
        let sliderChildren1 = $('.sl1');
        let sliderChildren2 =$('.sl2');;
        if (n) {
            this.animateFf(sliderChildren1,this.slider1,this.slideEl1);
            this.animateFf(sliderChildren2,this.slider2,this.slideEl2);    
            //slider.remove()
            //setTimeout(this.moveFf.bind(view,this.slider1,this.slideEl1),1000);
            //setTimeout(this.moveFf.bind(view,this.slider2,this.slideEl2), 1000); 

           
        
        } else {
           this.animateRew(sliderChildren1,this.slider1,this.slideEl1);
           this.animateRew(sliderChildren2, this.slider2,this.slideEl2);
            //slider.remove()
           // setTimeout(this.moveRew.bind(view, this.slider1,this.slideEl1),1000);
            //setTimeout(this.moveRew.bind(view, this.slider2,this.slideEl2),1000);
        }
    
        
    },
    animateFf: function(slide,img, DOM){
        let lastFocused= slide[0];
        slide.push()
        let nextFocused = slide[slide.length-1];
        let position = slide.offset();
        let movement = position.left - lastFocused.clientWidth;
        movement+='px';
        console.log(movement);
        slide.animate({left:movement},1000);
        
    },
    animateRew: function(slide, img, DOM) {
        let focused= slide[0];
        let position = slide.offset();
        let movement = position.left -focused.clientWidth;
        movement+='px';
        slide.animate({left:movement},1000);
    },
    moveFf: function(array, DOM){
        console.log('im here');
        let rotatedEl = array.shift();
        array.push(rotatedEl);
        this.renderSlider(array,DOM );

    },
    moveRew: function(array,DOM){
         let rotatedEl =array.pop();
        array.unshift(rotatedEl);
        this.renderSlider(array,DOM); 

    },
    recogniseKey: function(e) {
        switch(e.which) {
            case 39: {
                this.moveBoth(true);
                break;
                }
            case 37: { 
                this.moveBoth( false);
                break;
                }
            default: return;
        }

    }
   
};

controler.init();
