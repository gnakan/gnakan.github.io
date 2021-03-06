/*!
 * Start Bootstrap - Creative Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    $('.mixpanel').bind('click', function(){
      var action = $(this).data('action');
      mixpanel.track(action);
    });

    $('#openDemo').bind('click', function(){
      popupwindow('./jarvis/index.html', 'Radar Conversation', 400, 525);
    });

    $('.plans').bind('click', function(){
      popupwindow('https://www.surveymonkey.com/r/Z2NYVFS', 'Get early access to Radar', 730, 550);
    });

    $('.action-how-it-works').bind('click', function(){
      mixpanel.track("View How It Works");
    });

    $('.action-for-project-managers').bind('click', function(){
      mixpanel.track("View For Project Managers");
    });

    $('.action-for-stakeholders').bind('click', function(){
      mixpanel.track("View For Stakeholders");
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Fit Text Plugin for Main Header
    $("h1").fitText(
        1.2, {
            minFontSize: '35px',
            maxFontSize: '65px'
        }
    );

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    });

    // Initialize WOW.js Scrolling Animations
    new WOW().init();

})(jQuery); // End of use strict


function popupwindow(url, title, w, h) {
  var left = (screen.width/2)-(w/2);
  var top = (screen.height/2)-(h/2);
  return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
}
