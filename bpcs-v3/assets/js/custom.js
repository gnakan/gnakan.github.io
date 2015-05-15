
/*=============================================================
    Authour URL: www.designbootstrap.com

    http://www.designbootstrap.com/

    License: MIT

    http://opensource.org/licenses/MIT

    100% Free To use For Personal And Commercial Use.

    IN EXCHANGE JUST TELL PEOPLE ABOUT THIS WEBSITE
   
========================================================  */

$(document).ready(function () {
    // SCROLL SCRIPTS 
        $('.scroll-me a').bind('click', function (event) { //just pass scroll-me class and start scrolling
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1000, 'easeInOutQuad');
        event.preventDefault();
        });
    // BACKGROUND VIDEO SCRIPTS
        $(function () {
            $(".player").mb_YTPlayer(); // .player - class to add for playing video ( see the div above to understand)
        });




        $(".read-more-btn").on('click', function(e){
            if($(this).text() == "Read More"){
                $(this).text("Show Less");
                $(this).prev('.read-more').show(500);
            }
            else
            {
                $(this).text("Read More");
                $(this).prev('.read-more').hide(500);
            }
            
        })







    $('a[href^="#"]').on('click', function(event) {
    var target = $(this).attr('href');
    console.log(target);
    if( target.length ) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $(target).offset().top
        }, 1000);
    }
});
});
