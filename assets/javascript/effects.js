//scroll animation to section on page
$(function() {
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});


$('.modal').modal({
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
});

$('.parallax').parallax();

// Intialize Slick.js Carousel code for slider
$('#index-carousel').slick({
    dots: false,
    arrows: false
});

$('label').addClass('white-text');


$('#start-button').on('click', function() {
    $('#index-carousel').slick('slickNext');
    $('#results-wrapper').hide();
});


$('#food-button').on('click', function() {
    $('#index-carousel').slick('slickNext');
});

// $('#submit-button').on('click', function() {
//     $('#index-carousel').slick('slickNext');
// });
