// JQuery functions
$(document).ready(function() {

    'use strict';

    var single_bolg_height = $('.right-side').height() + "px";
    $('.left-side').css('height', single_bolg_height);

    if (window.innerWidth < 991 && window.innerWidth > 767) {
        var single_bolg_height = $('.right-side').height() + "px";
        $('.singleBlog-img').css('height', single_bolg_height);
    }

    if (window.innerWidth < 575) {
        $('.header nav li').removeClass('d-noneIn animated');
    }

    $('.navbar-toggler').on('click', '.d-block', function() {
        $(this).removeClass('d-block').addClass('d-none');
        $(this).siblings().removeClass('d-none').addClass('d-block');
        $(this).parents('section').find('.sec-footer').toggle();
        $(this).parents('section').find(' .logo').toggleClass('white');
    })
    //home bg
    function moveBackground() {
        $('.home').addClass('backimage');
    }
    setTimeout(moveBackground, 4500);
    //about img
    $(window).on('scroll', function() {

        if ($(window).scrollTop() > $('.about-img').height() + 100) {
            $('.about-img').css({ 'opacity': '1', 'transform': 'scale(1)' })
            $('.wave').css({ 'animation': 'ripple-in 0.75s' })
        }

    });

    $(window).on('resize', function() {
        var single_bolg_height = $('.right-side').height() + "px";
        $('.left-side').css('height', single_bolg_height);

        if (window.innerWidth < 991 && window.innerWidth > 767) {
            var single_bolg_height = $('.right-side').height() + "px";
            $('.singleBlog-img').css('height', single_bolg_height);
        }
    });

    let social_white =
    '<ul>' +
        '<li><a href="https://api.whatsapp.com/send?phone=593987021212" target="_blank"><img src="assets/images/iconos-14.png" title="WhatsApp"></a></li>' +
        '<li><a href="https://github.com/sosegon/" target="_blank"><img src="assets/images/iconos-15.png"></a></li>' +
        '<li><a href="https://www.upwork.com/fl/sebastianvelasquez" target="_blank"><img src="assets/images/iconos-18.png" title="upwork"></a></li>' +
        '<li><a href="https://www.linkedin.com/in/sosegon/" target="_blank"><img src="assets/images/iconos-20.png" title="linkedin"></a></li>' +
        '<li><a href="https://medium.com/@sosegon" target="_blank"><img src="assets/images/iconos-21.png"></a></li>' +
    '</ul>'
    let social_gray =
    '<ul>' +
        '<li><a href="https://api.whatsapp.com/send?phone=593987021212" target="_blank"><img src="assets/images/iconos-13.png" title="WhatsApp"></a></li>' +
        '<li><a href="https://github.com/sosegon/" target="_blank"><img src="assets/images/iconos-16.png"></a></li>' +
        '<li><a href="https://www.upwork.com/fl/sebastianvelasquez" target="_blank"><img src="assets/images/iconos-17.png" title="upwork"></a></li>' +
        '<li><a href="https://www.linkedin.com/in/sosegon/" target="_blank"><img src="assets/images/iconos-19.png" title="linkedin"></a></li>' +
        '<li><a href="https://medium.com/@sosegon" target="_blank"><img src="assets/images/iconos-22.png"></a></li>' +
    '</ul>'
    $(".side-social.social-white").append(social_white);
    $(".side-social.social-gray").append(social_gray);
});