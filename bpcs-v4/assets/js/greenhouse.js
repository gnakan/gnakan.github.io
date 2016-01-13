$(document).ready(function() {


  $.get("https://api.greenhouse.io/v1/boards/bpcs/embed/jobs", function(data) {
    $('#jobListings').empty();
    $.each(data.jobs, function(index, obj) {
      var jobTemplate = "<div class='col-md-4'><div class='job-entry'><div class='col-md-3'><i class='fa fa-user  fa-4x'></i></div>";
      jobTemplate += "<div class='col-md-8'><h4>" + obj.title + "</h4><p>" + obj.location.name + "</p>";
      jobTemplate += "<a href='" + obj.absolute_url + "' target='_blank'>View job <i class='fa fa-arrow-right fa-fw'></i></a>";
      jobTemplate += "</div></div></div>";
      console.log(obj.title);
      $('#jobListings').append(jobTemplate);
    });
  });
});
