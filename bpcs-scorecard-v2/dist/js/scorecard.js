var selected, scorecardData, month, year, monthAbbreviation;

$(document).ready(function() {
  getTableData();

  $('.sidebar-menu').on('click', 'li', function() {
    selected = $(this).data('name');
    $('#scorecardTitle').html(selected);
    $.each(scorecardData.teamConfig.elements, function(index, obj) {
      if (obj.TeamName === selected) {
        $('#scorecardTitle').append("<small>" + obj.Owner + "</small>");
      }
    });

    loadMetrics();
  });
});



function getTableData() {
  Tabletop.init({
    key: '1bv3udHegg36oNe56frPqfrThQlCu2wR55w8RhFimZ9Q',
    callback: buildSidebar,
    simpleSheet: false
  });
}

function buildSidebar(data) {
  scorecardData = data;
  $('.sidebar-menu').empty();
  $('.sidebar-menu').append();

  $.each(data, function(index, obj) {
    if (obj.name !== "selections" && obj.name !== "config" && obj.name !== "teamConfig" && !obj.name.includes("###"))
    {
      $('.sidebar-menu').append("<li class='dashboardLink' data-name=" + obj.name + "><a href='#'><i class='fa fa-dashboard'></i><span>" + obj.name + "</span></a></li>");
    }

    if(obj.name === "config")
    {
      $.each(obj.elements, function(index, obj){
        if(obj.key === "month")
        {
          month = obj.value;
        }

        if(obj.key === "year")
        {
          year = obj.value;
        }

        if(obj.key === "mon-abbreviation")
        {
          monthAbbreviation = obj.value;
        }
      });
    }

  });

  var $links = $('.dashboardLink');
  var alphabeticallyOrderedDivs = $links.sort(function(a, b) {
    return $(a).attr('data-name') > $(b).attr('data-name');
  });

  $('.sidebar-menu').html("<li class='header'>SCORECARDS</li>").append(alphabeticallyOrderedDivs);
}

function loadMetrics(data) {
  $('.metrics').empty();
  $.each(scorecardData, function(index, obj) {
    if (obj.name === selected) {
      $.each(obj.elements, function(ind, obj) {
        var goal, actual, after;
        var status = 'blue';
        if (obj.after !== "%") {
          goal = obj.before + obj[monthAbbreviation + '-g'];
          actual = obj.before + obj[monthAbbreviation + '-a'];
          after = obj.after;
        } else {
          goal = obj.before + obj[monthAbbreviation + '-g'] + obj.after;
          actual = obj.before + obj[monthAbbreviation + '-a'] + obj.after;
          after = "";
        }

        if (obj.status !== "") {
          status = obj.status;
        }
        if(obj.display === 'TRUE')
        {
          addMetric(obj.metric, goal, actual, after, obj.icon, status, obj.tooltip, '.metrics', obj.metricSource);
        }

      });
    }

  });
}


function addMetric(name, goal, actual, after, icon, status, tooltip, div, metricSource) {

  var source = $('#headline1').html();
  var template = Handlebars.compile(source);
  var data = {
    name: name,
    goal: goal,
    actual: actual,
    after: after,
    icon: icon,
    status: status,
    currentMonth: month + " " + year,
    tooltip: tooltip,
    metricSource: metricSource
  };

  var template1 = "<div class='col-lg-6'>" +
    "<div class='box box-info'>" +
    "<div class='box-header'>" +
    "<i class='fa fa-line-chart'></i>" +
    "<h3 class='box-title'>" + name + "</h3>" +
    "<p><small class='text-muted'>For " + month + " " + year + "</small></p></div>" +
    "<div class='box-body'>" +
    "<div class='row'>" +
    "<div class='col-md-3'>" +
    "<div class='row headline-info'>" +
    "<h3 class='text-primary'>" + goal + "</h3>" +
    "<p>Goal</p>" +
    "<p>100</p></div>" +
    "<div class='row headline-info'><h3 style='color: rgba(0,0,0,.5);'>" + actual + "</h3>" +
    "<p>Actual</p><p>93</p></div></div>" +
    "<div class='col-md-9'><canvas id='' width='700' height='250'></canvas></div></div>" +
    "</div></div></div>";

  $(div).append(template(data));

}
