var thisNode = document.getElementsByTagName("script")[(document.getElementsByTagName("script").length - 1)];
var src = thisNode.src;
src = src.substring((window.location.protocol == "http:") ? 7 : 8, src.length).split("/")[0];
var sliderOptions = {
    version: "2.6",
    type: "noLogo",
    urls: {
        slider: src,
        protocol: location.protocol,
        ad: "//optimizedby.brealtime.com/tt?id=1630773&size=120x600",
        css: "//cdn.cpxinteractive.com/slider/defs/1630773-686.css",
        logo: "//cdn.cpxinteractive.com/slider/defs/solidblack.jpg"
    },
    pid: 1630773,
    width: 120,
    height: 600,
    resize_width: undefined,
    resize_height: null,
    resize_ratio: null,
    debug: false,
    id: 686,
    referrer: "&",
    animationDelay: 0,
    animationDuration: 500,
    animationDirection: "left",
    animationEasing: "jswing",
    toolbarPosition: "right-top",
    horizontalPosition: "left",
    verticalPosition: "bottom",
    close: {
        permanently: 0,
        wTab: 0
    },
    freqLimit: 0,
    freqLimitTimeRange: 24,
    live: 1,
    scrollingDistance: 0,
    displayOnMobile: 1,
    minScreenWidth: 0,
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
    },
    minScreenWidth: 0
};
var SLIDER_JQ_VERSION = "1.9.1";
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
    slider_options = "//cdn.cpxinteractive.com/slider/lib/js/app." + sliderOptions.version + ".js";
    window.sliderJQ = a ? jQuery.noConflict(false) : window.jQuery;
    (function(b) {
        b(function() {
            b.getScript(cookie_lib, function() {
                b.getScript(slider_options, function() {})
            })
        })
    })(window.sliderJQ)
};