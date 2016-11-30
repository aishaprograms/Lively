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

//initialize modal
$('.modal').modal({
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
});

//initialize parallax
$('.parallax').parallax();

// Intialize Slick.js Carousel code for slider
$('#index-carousel').slick({
    dots: false,
    arrows: false,
    adaptiveHeight: true,
    draggable: false,
    swipe: false
});

//turns all labels white without having to modify html
$('label').addClass('white-text');


$('#start-button').on('click', function() {
    $('#index-carousel').slick('slickNext');
    $('#results-wrapper').hide();
});

//modal is popped out if the user doesn't make food selections
$('#food-button').on('click', function() {
    var foodInputs = $('input[type=checkbox]:checked');
    if (foodInputs.length === 0 || foodInputs.length > 4) {
        $('#foods-modal').modal('open');
    } else {
        $('#index-carousel').slick('slickNext');
        var foodNamesArray = [];
        for (i = 0; i < foodInputs.length; i++) {
            var input = $(foodInputs[i]);
            var foodInputName = input.data('name');
            foodNamesArray.push(foodInputName);
        }
        var foodNames = foodNamesArray.join(', ');
        $('#foods-choice').html('<h5 class="light">Food choices: ' + foodNames + '</h5>');
    }
});

//modal is popped out if the user doesn't make exercise selection
$('#move-button').on('click', function() {
    var exercise = $('input[type=radio]:checked').data('move');
    if (exercise === undefined) {
        $('#move-modal').modal('open');
    } else {
        $('#index-carousel').slick('slickNext');
        $('#exercise-choice').html('<h5 class="light">Exercise choice: ' + exercise + '</h5>');
    }
});

$('.back-button').on('click', function() {
    $('#index-carousel').slick('slickPrev');
    $('#index-carousel').slick('slickPrev');
});
//hides text that doesn't contain "Get Started"
$('.post-submit').hide();

$('#submit-button').on('click', function() {
    $('#index-carousel').slick('slickNext');
    //hides text that contains "Get Started"
    $('.pre-submit').hide();
    $('.post-submit').show();
});
