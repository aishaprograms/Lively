 var options = [
         { selector: '.class', offset: 200, callback: customCallbackFunc }
     },
     {
         selector: '.other-class',
         offset: 200,
         callback: function() {
             customCallbackFunc();
         }
     }, ];
 Materialize.scrollFire(options);


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
