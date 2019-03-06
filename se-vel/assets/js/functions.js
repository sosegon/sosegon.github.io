// JQuery functions
$(document).ready(function() {
    	
    'use strict';

    var single_bolg_height = $('.right-side').height()+ "px";
   	$('.left-side').css('height',single_bolg_height);

   	if (window.innerWidth < 991 && window.innerWidth>767) {
   		var single_bolg_height = $('.right-side').height()+ "px";
   		$('.singleBlog-img').css('height',single_bolg_height);
   	}

   	if (window.innerWidth < 575) {
   		$('.header nav li').removeClass('d-noneIn animated');
   	}

   	$('.navbar-toggler').on('click', '.d-block', function () {
   		$(this).removeClass('d-block').addClass('d-none');
   		$(this).siblings().removeClass('d-none').addClass('d-block');
   		$(this).parents('section').find('.sec-footer').toggle();
   		$(this).parents('section').find(' .logo').toggleClass('white');
   	})
   	//home bg
   	function moveBackground(){
           $('.home').addClass('backimage');
    }
   	setTimeout(moveBackground, 4500);
   	//about img
   	$(window).on('scroll',function(){

		if( $(window).scrollTop() > $('.about-img').height() +100){
			$('.about-img').css({'opacity':'1', 'transform':'scale(1)'})
			$('.wave').css({'animation':'ripple-in 0.75s'})
		}

	});

	$(window).on('resize',function(){
		var single_bolg_height = $('.right-side').height()+ "px";
	   	$('.left-side').css('height',single_bolg_height);

	   	if (window.innerWidth < 991 && window.innerWidth>767) {
	   		var single_bolg_height = $('.right-side').height()+ "px";
	   		$('.singleBlog-img').css('height',single_bolg_height);
	   	}
	});	

}); 