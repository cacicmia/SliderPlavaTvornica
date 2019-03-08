
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
        
    this.slideEl1 = document.querySelector('.slider1');
    this.slideEl2 = document.querySelector('.slider2');
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
   // this.rew.addEventListener('click',this.moveBoth.bind(view, false)); 
     

    },
    /**
     * @description render slider containing images held in array
     * @param {array} array
     * @param {number} num number of the slider 
     *  */
    renderSlider: function(array, DOM ) {
               
        array.forEach(function(elem){
            let imageDOM = `<img src="${elem}" alt="img" class="flexEl slideEl">`;
            DOM.insertAdjacentHTML('beforeend',imageDOM);
        
        }); 
        

    },
    moveBoth: function(n) {
        
        $('.slideEl').remove();
        if (n) {
            console.log(this.slideEl1);
            this.moveFf(this.slider1,this.slideEl1);
            this.moveFf(this.slider2,this.slideEl2); 

           
        
        } else if (!n) {
            console.log('reached false');
            this.moveRew(this.slider1,this.slideEl1);
            this.moveRew(this.slider2,this.slideEl2);
        }
    
        
    },
    moveFf: function(array, DOM){

        let rotatedEl = array.shift();
        array.push(rotatedEl);
        this.renderSlider(array,DOM );

    },
    moveRew: function(array,DOM){
        let rotatedEl =array.pop();
        array.unshift(rotatedEl);
        this.renderSlider(array,DOM); 

    }
   
};

controler.init();
