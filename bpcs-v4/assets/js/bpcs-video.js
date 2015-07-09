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
        if (vidStatus == 0) {
            vidStatus = 1;
            vid.load();
            vid.muted = false;
        } else if (vid.paused && vidStatus == 1) {
            vid.play();
        } else {
            vid.pause();
        }
    });
});
