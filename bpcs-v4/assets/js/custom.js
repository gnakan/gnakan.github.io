/*=============================================================
    Authour URL: www.designbootstrap.com

    http://www.designbootstrap.com/

    License: MIT

    http://opensource.org/licenses/MIT

    100% Free To use For Personal And Commercial Use.

    IN EXCHANGE JUST TELL PEOPLE ABOUT THIS WEBSITE
   
========================================================  */
var vid = document.getElementById("bgvid");
var pauseButton = document.getElementById("teamCulture");
var vidStatus = 0;

function vidFade() {
    vid.classList.add("stopfade");
};



vid.addEventListener('ended', function() {
    // only functional if "loop" is removed
    vid.pause();
    // to capture IE10
    vidFade();
});

/*
pauseButton.addEventListener("click", function() {
vid.classList.toggle("stopfade");
if (vid.paused) {
vid.play();
pauseButton.innerHTML = "Pause";
} else {
vid.pause();
pauseButton.innerHTML = "Paused";
}
})
*/




$(window).on('beforeunload', function() {
    $(window).scrollTop(0);
});

$(document).ready(function() {
    
    $('#vid-close').on('click', function() {
        vidStatus = 0;
        vid.play();
        $(this).hide();
        vid.muted = true;
        $('.vid-container').show();
    })


    $('#teamCulture').on('click', function() {
        $('.vid-container').hide();
        $('#bgvid').css('opacity', 1);
        $('#vid-close').show();
        if(vidStatus == 0)
        {
            vidStatus = 1;
            vid.load();
            vid.muted = false;
        }
        else if(vid.paused && vidStatus == 1)
        {
            vid.play();
        }
        else
        {
            vid.pause();
        }
    });


    // SCROLL SCRIPTS 
    $('.scroll-me a').bind('click', function(event) { //just pass scroll-me class and start scrolling
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1000, 'easeInOutQuad');
        event.preventDefault();
    });
    // BACKGROUND VIDEO SCRIPTS
    $(function() {
        $(".player").mb_YTPlayer(); // .player - class to add for playing video ( see the div above to understand)
    });


    $(document).on('scroll', function() {

        if ($(window).scrollTop() == 0) {
            $('.bounce').show();
        } else {
            $('.bounce').hide();
        }


    });

    $(".read-more-btn").on('click', function(e) {
        if ($(this).text() == "Read More") {
            $(this).text("Show Less");
            $(this).prev('.read-more').show(500);
        } else {
            $(this).text("Read More");
            $(this).prev('.read-more').hide(500);
        }

    });

    $('.hero-control-scroll').on('click', function(e) {

        $('html, body').animate({
            scrollTop: window.innerHeight
        }, 1000);

    });

    $('.arrow').on('click', function(e) {
        $('html, body').animate({
            scrollTop: window.innerHeight
        }, 1000);

    });

    $('.share-link').on('click', function(e) {
        e.preventDefault();
        var menuWidth = 600;

        if ($(this).width() < menuWidth) {
            $(this).addClass('share-link-show');
        }

    });

    $('.show-link').on('click', function(e) {
        $('div').removeClass('share-link-show')
    });

    $('a[href^="#"]').on('click', function(event) {
        var target = $(this).attr('href');
        if (target.length) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: $(target).offset().top
            }, 1000);
        }
    });
});


function test() {
    $(this).preventDefault;
    console.log('yes')
}
