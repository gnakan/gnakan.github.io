var thisNode = document.getElementsByTagName("script")[(document.getElementsByTagName("script").length - 1)];
var src = thisNode.src;
src = src.substring((window.location.protocol == "http:") ? 7 : 8, src.length).split("/")[0];
var sliderOptions = {
    version: "2.6.x",
    type: "noLogo",
    urls: {
        slider: src,
        protocol: location.protocol,
        ad: "//optimizedby.brealtime.com/tt?id=3271734&size=728x90&referrer=iflscience.com",
        css: "//cdn.cpxinteractive.com/slider/defs/3271734-767.css",
        logo: "//cdn.cpxinteractive.com/slider/defs/solidblack.jpg"
    },
    pid: 3271734,
    width: 728,
    height: 90,
    debug: false,
    id: 767,
    animationDelay: 0,
    animationDuration: 500,
    animationDirection: "bottom",
    animationEasing: "jswing",
    toolbarPosition: "top-left",
    horizontalPosition: "center",
    verticalPosition: "bottom",
    close: {
        permanently: 1,
        wTab: 0
    },
    freqLimit: 0,
    freqLimitTimeRange: 24,
    live: 1,
    scrollingDistance: 0,
    displayOnMobile: 1,
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
        bottom: "50",
        left: "0"
    }
};
var SLIDER_JQ_VERSION = "1.9.1";

//_displayDebugConsole();
if (needs_jquery()) {
    var script = document.createElement("script");
    script.src = "//cdnjs.cloudflare.com/ajax/libs/jquery/" + SLIDER_JQ_VERSION + "/jquery.min.js";
    script.type = "text/javascript";
    thisNode.parentNode.appendChild(script);
    var jquery_load = setInterval(function() {
        if (window.jQuery && (window.jQuery.fn.jquery == SLIDER_JQ_VERSION)) {
            clearInterval(jquery_load);
            load_slider_libs()
        }
    }, 100)
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
    cookie_lib = "//cdn.cpxinteractive.com/slider/lib/js/jquery.easing.cookie.min.js";
    slider_options = "http://localhost:8000/app." + sliderOptions.version + ".js";
    window.sliderJQ = a ? jQuery.noConflict(false) : window.jQuery;
    (function(b) {
        b(function() {
            b.getScript(cookie_lib, function() {
                b.getScript(slider_options, function() {})
            })
        })
    })(window.sliderJQ)
};