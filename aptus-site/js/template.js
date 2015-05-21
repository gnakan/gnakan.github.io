$(document).ready(function(){
    
	//just a little something to change up the content
	var randomnDisplay=".rotate" + Math.floor(Math.random()*3);
	$(randomnDisplay).show(100);


	$('a[href^="#"]').on('click', function(event) {
    var target = $(this).attr('href');
    console.log(target);
    if( target.length ) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $(target).offset().top
        }, 1000);
    }
});


	$(".read-more-btn").on('click', function(e){
            if($(this).text() == "Read More"){
                $(this).text("Show Less");
                $(this).prev('.read-more').show(500);
            }
            else
            {
                $(this).text("Read More");
                $('html,body').animate({
          			scrollTop: $('#careers').offset().top
        		}, 1000);
                $(this).prev('.read-more').hide(500);
                
            }
            
     });


	//Make Videos Responsive
	$(".video-wrapper").fitVids();

	//Initialize tooltips
	$('.show-tooltip').tooltip();

	//Contact Us Map
	if($('#contact-us-map').length > 0){ //Checks if there is a map element
		var map = L.map('contact-us-map', {
			center: [51.502, -0.09],
			scrollWheelZoom: false,
			zoom: 15
		});
		L.tileLayer('http://{s}.tile.cloudmade.com/{key}/22677/256/{z}/{x}/{y}.png', {
			key: 'BC9A493B41014CAABB98F0471D759707'
		}).addTo(map);
		L.marker([51.5, -0.09]).addTo(map).bindPopup("<b>Some Company</b><br/>123 Fake Street<br/>LN1 2ST<br/>London</br>United Kingdom").openPopup();
	}

	$( window ).resize(function() {
		$('.col-footer:eq(0), .col-footer:eq(1)').css('height', '');
		var footerColHeight = Math.max($('.col-footer:eq(0)').height(), $('.col-footer:eq(1)').height()) + 'px';
		$('.col-footer:eq(0), .col-footer:eq(1)').css('height', footerColHeight);
	});
	$( window ).resize();

});