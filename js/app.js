
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
       
        let sliderChildren1 = $('.sl1').children();
        let sliderChildren2 =$('.sl2').children();
        if (n) {
            this.animateFf(sliderChildren1,$('.sl1') );
            this.animateFf(sliderChildren2,$('.sl2'));    
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
    animateFf: function(slide,dom){
        let first= slide.first();
        let step= first.outerWidth()+20;
      
        let i=0;
        first.animate({opacity:'0'},{
            
            queue: false,
            complete: function(){
                let store= $(this).detach()//css("display","none");
                store.animate({'opacity':'1'});
                store.appendTo(dom);
            }
        });
        slide.animate({right:`-=${step}`},{ queue: false, complete:function(){
            
            $(this).css('right',`+=${step}`);
           
          }} );
    
        
    },
    animateRew:  function(slide,){
        let first= slide.first();
        let step= first.outerWidth();
      
        let i=0;
        
        slide.animate({right:`+=${step}`},{duration:600, queue: false, complete:function(){
            i++;
            if (i>= slide.length) {
                console.log('can do');
            }
           
          }} );
    },
    moveFf: function(slideDOM,first){
       // let store= first.detach()
        //console.log(store);
       // store.appendTo(slideDOM);
        

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
