
    var payboardCallback = function() {
        Payboard.Events.trackPage();
    };
    var payboardScript = document.createElement("script");
    payboardScript.src = '//az745252.vo.msecnd.net/scripts/0c098954-39aa-49b1-9016-ec0630d0163c.js';
    if (payboardScript.addEventListener) {
        payboardScript.addEventListener('load', payboardCallback, false);
    } else if (payboardScript.readyState) {
        payboardScript.onreadystatechange = payboardCallback;
    }
    document.head.appendChild(payboardScript);
