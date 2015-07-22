$(window).on('beforeunload', function() {
    $(window).scrollTop(0);
});

$(document).ready(function() {


    // SCROLL SCRIPTS 
    $('.scroll-me a').bind('click', function(event) { //just pass scroll-me class and start scrolling
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1000, 'easeInOutQuad');
        event.preventDefault();
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


    $('.awardLink').on('click', function(e) {
        window.open('http://www.bizjournals.com/seattle/morning_call/2015/07/blueprint-consulting-services-earned-eastside.html', "_blank");
        window.location.href = '/solutions.html#recognition';
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