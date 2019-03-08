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
    this.renderSlider(controler.getSlider('slider1'),1);
    this.renderSlider(controler.getSlider('slider2'),2);    
        

    },
    renderSlider: function(array, num) {
        this[`slider${num}`] = $(`.slider${num}`);
        array.forEach(function(elem){
           view[`slider${num}`].append(`<img src="${elem}" alt="img" class="flexEl slideEl">`);
        }); 


    }
   
};

controler.init();