
$(window).on('beforeunload', function() {
  $(window).scrollTop(0);
});

$(document).ready(function() {
  //tableTopInit();

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


  $('.award-location-1').on('click', function(e) {
    window.open('http://www.bizjournals.com/seattle/morning_call/2015/07/blueprint-consulting-services-earned-eastside.html', "_blank");
    window.location.href = './solutions.html#recognition';
  });

  $('.award-location-2').on('click', function(e) {
    window.open('http://www.bizjournals.com/seattle/news/2016/06/16/washingtons-best-workplaces-with-250-plus-workers.html#g3', "_blank");
    window.location.href = './solutions.html#recognition';
  });

  $('.award-location-3').on('click', function(e) {
    window.open('http://www.bizjournals.com/seattle/subscriber-only/2016/07/15/fastest-growing-private-companies.html', "_blank");
    window.location.href = './solutions.html#recognition';
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


function tableTopInit() {
  var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1nR4kcadW3rl8vhEFgLZJwmnsM8ZGGboWhXrDkyDpffM/pubhtml';
  Tabletop.init({
    key: public_spreadsheet_url,
    callback: handleJobListingData,
    simpleSheet: true
  })
};

function handleJobListingData(data, tabletop) {
  $("#job-listings").empty();

  $.each(data, function(index, obj) {
    addJobListing(obj);
  });
};

//creates the listing and appends it
function addJobListing(obj) {
  var listingHTML = "<div class='col-md-4'>" +
    "<div class='white-paper-entry'> " +
    "<div class='col-md-3'><i class='fa fa-globe  fa-4x'></i></div> " +
    "<div class='col-md-8'> " +
    "<h4>" + obj['job-title'] + "</h4> " +
    "<p>" + obj['location'] + "</p>" +
    "<a href='" + obj['posting-url'] + "'>View job <i class='fa fa-arrow-right fa-fw'></i></a>" +
    " </div>" +
    "</div> " +
    "</div>";

  $("#job-listings").append(listingHTML);
}


function getBlogData(numberOfPosts) {
  $("#blogPosts").empty();

  $.ajax({
    url: "http://bpcs.com/blog/?feed=json",
    jsonp: "callback",
    dataType: "jsonp",

    // Work with the response
    success: function(data) {
      $.each(data, function(index, obj) {
        if (index < numberOfPosts) {
          addBlogPost(obj);
        }
      });
    }
  });


}

function addBlogPost(obj) {
  var blogHTML = '<div class="col-md-4 col-sm-4 col-xs-12">' +
    '<h4 class="head-set">' + obj.title + '</h4>' +
    '<p class="blog-post-meta">By ' + obj.author + '</p>' +
    '<p>' + obj.excerpt + '</p>' +
    '<a href="' + obj.permalink + '">Read more <i class="fa fa-arrow-right fa-fw"></i></a>' +
    '</div>';

  $("#blogPosts").append(blogHTML);
}
