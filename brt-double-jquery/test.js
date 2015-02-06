var thisNode = document.getElementsByTagName("script")[(document.getElementsByTagName("script").length - 1)];
var src = thisNode.src;
src = src.substring((window.location.protocol == "http:") ? 7 : 8, src.length).split("/")[0];
var sliderJQ;
var sliderOptions = {
    version: "2.6.1",
    type: "noLogo",
    urls: {
        slider: src,
        protocol: location.protocol,
        ad: "//optimizedby.brealtime.com/tt?id=3528110&size=160x600&referrer=listia.com",
        css: "//cdn.cpxinteractive.com/slider/defs/3528110-918.css",
        logo: "//cdn.cpxinteractive.com/slider/defs/solidblack.jpg"
    },
    pid: 3528110,
    trid: 0,
    width: 160,
    height: 600,
    debug: false,
    id: 918,
    animationDelay: 0,
    animationDuration: 0,
    animationDirection: "top",
    animationEasing: "jswing",
    toolbarPosition: "top-left",
    horizontalPosition: "right",
    verticalPosition: "top",
    close: {
        permanently: 1,
        wTab: 0
    },
    freqLimit: 0,
    freqLimitTimeRange: 24,
    reverseFreqLimit: 0,
    reverseFreqLimitTimeRange: 24,
    live: 1,
    scrollingDistance: 0,
    displayOnMobile: 0,
    minScreenWidth: 1355,
    margin: {
        top: 238,
        right: 0,
        bottom: 470,
        left: 500
    },
    position: {
        top: "0",
        right: "0",
        bottom: "0",
        left: "50%"
    }
};
var SLIDER_JQ_VERSION = "1.9.1";
if (needs_jquery()) {
    var script = document.createElement("script");
    script.src = "//cdnjs.cloudflare.com/ajax/libs/jquery/" + SLIDER_JQ_VERSION + "/jquery.min.js";
    script.type = "text/javascript";
    thisNode.parentNode.appendChild(script);
    script.onload = function() {
        load_slider_libs()
    }
} else {
    load_slider_libs()
}

function needs_jquery() {
    if (!window.jQuery) {
        return true
    }
    var b = window.jQuery.fn.jquery.split(".");
    var a = SLIDER_JQ_VERSION.split(".");
    var e = [100000, 10000, 1000, 100, 10];
    var d = 0;
    var c = 0;
    for (i in a) {
        d += parseInt(b[i]) * e[i];
        c += parseInt(a[i]) * e[i]
    }
    return (d < c)
}

function load_slider_libs() {
    var noConflictScript = document.createElement("script");
    noConflictScript.innerHTML = "var sliderJQ =jQuery.noConflict(true)";
    noConflictScript.type = "text/javascript";
    thisNode.parentNode.appendChild(noConflictScript);

    var libARR = ["//cdn.cpxinteractive.com/slider/lib/js/jquery.easing.cookie.min.v1.1.js", "//cdn.cpxinteractive.com/slider/lib/js/app." + sliderOptions.version + ".js"];

    for(i=0; i<libARR.length;i++){
        var newScript = "script" + i;
        newScript = document.createElement("script");
        newScript.src = libARR[i];
        thisNode.parentNode.appendChild(newScript);
    }
};