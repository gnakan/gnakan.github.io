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

    $('.plans').bind('click', function(){
      $('#smcx-sdk, #__smcx__, #test,.smcx-widget').remove();
      var script = document.createElement( 'script' );
      script.id = 'test';
      script.innerHTML = '(function(e,t,o,n){var c,s,a;e.SMCX=e.SMCX||[],t.getElementById(n)||(c=t.getElementsByTagName(o),s=c[c.length-1],a=t.createElement(o),a.type="text/javascript",a.async=!0,a.id=n,a.src=["https:"===location.protocol?"https://":"http://","widget.surveymonkey.com/collect/website/js/M2xMEodzPuBObXcFVjH3W6kZeH30agMo3HxqPIdeC1_2BEe5Bn1ed5X9f_2F4ymQq5v0.js"].join(""),s.parentNode.insertBefore(a,s))})(window,document,"script","smcx-sdk");';

      document.body.appendChild(script);


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
    })

    // Initialize WOW.js Scrolling Animations
    new WOW().init();

})(jQuery); // End of use strict
