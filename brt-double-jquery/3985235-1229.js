var thisNode = document.getElementsByTagName("script")[(document.getElementsByTagName("script").length - 1)];
var src = thisNode.src;
src = src.substring((window.location.protocol == "http:") ? 7 : 8, src.length).split("/")[0];
var sliderJQ;
var sliderOptions = {
    version: "2.6",
    type: "noLogo",
    urls: {
        slider: src,
        protocol: location.protocol,
        ad: "//optimizedby.brealtime.com/tt?id=3985235&size=728x90",
        css: "//portal.brealtime.com/includes/slider/3985235-1229.css?759",
        logo: "//cdn.cpxinteractive.com/slider/defs/solidblack.jpg"
    },
    pid: 3985235,
    width: 728,
    height: 90,
    debug: true,
    id: 1229,
    animationDelay: 0,
    animationDuration: 500,
    animationDirection: "bottom",
    animationEasing: "jswing",
    toolbarPosition: "top-right",
    horizontalPosition: "center",
    verticalPosition: "bottom",
    close: {
        permanently: 0,
        wTab: 0
    },
    freqLimit: 1,
    freqLimitTimeRange: 24,
    live: 0,
    scrollingDistance: 0,
    displayOnMobile: 0,
    minScreenWidth: 0,
    maxScreenWidth: 0,
    margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    position: {
        top: "0",
        right: "0",
        bottom: "0",
        left: "0"
    }
};
var SLIDER_JQ_VERSION = "1.9.1";
if (needs_jquery()) {
    console.log('jquery is needed');
    var script = document.createElement("script");

    script.src = "//cdnjs.cloudflare.com/ajax/libs/jquery/" + SLIDER_JQ_VERSION + "/jquery.min.js";
    script.type = "text/javascript";
    thisNode.parentNode.appendChild(script);
    script.onload = function(){
        load_slider_libs();
    };
} else {
    load_slider_libs()
}

function needs_jquery() {
    if (!window.jQuery) {
        return true
    }
    var d = window.jQuery.fn.jquery.split(".");
    var c = SLIDER_JQ_VERSION.split(".");
    var b = [100000, 10000, 1000, 100, 10];
    var a = 0;
    var e = 0;
    for (i in c) {
        a += parseInt(d[i]) * b[i];
        e += parseInt(c[i]) * b[i]
    }
    return (a < e)
}

function load_slider_libs(a) {
    sliderJQ = jQuery.noConflict();
    cookie_lib = "//cdn.cpxinteractive.com/slider/lib/js/jquery.easing.cookie.min.js";
    slider_options = "//cdn.cpxinteractive.com/slider/lib/js/app." + sliderOptions.version + ".js";
    
    sliderJQ(document).ready(function(){
         sliderJQ.getScript(cookie_lib, function() {
                sliderJQ.getScript(slider_options, function() {})
            
            });
    });
};