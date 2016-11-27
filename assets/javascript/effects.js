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

 $('.carousel.carousel-slider').carousel({
     full_width: true
 });
 $('#start-button').on('click', function() {
     $('.carousel').carousel('next');
 });
 $('.modal').modal();

 $('.parallax').parallax();

 // Slick Carousel code for slider
 $('#index-carousel').slick({
     dots: false,
     arrows: false
 });
 $('#start-button').on('click', function() {
     $('#index-carousel').slick('slickNext');
 });
 //done-btn changed to food-button
 $("#food-button").click(function() {
     $('.carousel').carousel('next');
     $('#index-carousel').slick('slickNext');
 });

 $('label').addClass('white-text');
