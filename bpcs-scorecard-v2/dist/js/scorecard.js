var selected, scorecardData, month, year, monthAbbreviation, selectedScoreCardData, selectedMetric, selectedToolTip;
var monArr = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
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

  $('.metrics').on('click', '.headline', function(){
    selectedMetric = $(this).data('metric');
    selectedToolTip = $(this).data('original-title');
    loadChart();
  });

  $('.metrics').on('click', '.chart', function(){
    $('#scorecardTitle').html(selected);
    $.each(scorecardData.teamConfig.elements, function(index, obj) {
      if (obj.TeamName === selected) {
        $('#scorecardTitle').append("<small>" + obj.Owner + "</small>");
      }
    });

    loadMetrics();
  });
});

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

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

function checkTBD(obj, monInd){

  if(obj[monArr[monInd] + '-a'] === 'TBD' || obj[monArr[monInd] + '-a'] === ' ')
  {
    return checkTBD(obj, monInd-1);
  }
  else {
    return monArr[monInd];
  }
}

function loadChart(){
  $('.metrics').html(  '<section class="content"><div class="box box-solid"><div class="box-header with-border"><i class="fa fa-line-chart"></i><h3 class="box-title">' + selectedMetric + ' <small>' + selectedToolTip + '</small></h3></div><div class="box-body chart"></div><div class="box-footer"><ul class="chart-legend clearfix"><li><i class="fa fa-circle-o text-red"></i> Goal</li><li><i class="fa fa-circle-o text-black"></i> Actual</li></ul></div></div>'
);

  var actualArr = [];
  var goalArr = [];

  $.each(selectedScoreCardData.elements, function(index, obj){
    if(obj.metric === selectedMetric)
    {
      actualArr.push({meta:'Actual:', value: obj['jan-a']});
      actualArr.push({meta:'Actual:', value: obj['feb-a']});
      actualArr.push({meta:'Actual:', value: obj['mar-a']});
      actualArr.push({meta:'Actual:', value: obj['apr-a']});
      actualArr.push({meta:'Actual:', value: obj['may-a']});
      actualArr.push({meta:'Actual:', value: obj['jun-a']});

      goalArr.push({meta:'Goal:', value: obj['jan-g']});
      goalArr.push({meta:'Goal:', value: obj['feb-g']});
      goalArr.push({meta:'Goal:', value: obj['mar-g']});
      goalArr.push({meta:'Goal:', value: obj['apr-g']});
      goalArr.push({meta:'Goal:', value: obj['may-g']});
      goalArr.push({meta:'Goal:', value: obj['jun-g']});
    }

  });
  new Chartist.Line('.chart', {
  labels: ['jan', 'feb', 'mar', 'apr', 'may', 'jun'],
  series: [
    [], goalArr, [], [], actualArr
  ]
}, {
  fullWidth: true,
  chartPadding: {
    right: 40,
    top: 70
  },
  height: '400px',
  low: 0,
  showArea: true,
  plugins: [
    Chartist.plugins.tooltip()
  ]
});

}

function loadMetrics(data) {
  $('.metrics').empty();
  $.each(scorecardData, function(index, obj) {
    if (obj.name === selected) {
      selectedScoreCardData = obj;
      $.each(obj.elements, function(ind, obj) {
        var goal, actual, after, currentGoal;
        var status = 'blue';
        var currentMonth = checkTBD(obj, monArr.indexOf(monthAbbreviation));

        if (obj.after !== "%") {
          goal = obj.before + obj[currentMonth + '-g'];
          actual = obj.before + obj[currentMonth + '-a'];
          after = obj.after;
        } else {
          goal = obj.before + obj[currentMonth + '-g'] + obj.after;
          actual = obj.before + obj[currentMonth + '-a'] + obj.after;
          after = "";
        }

        if (obj.status !== "") {
          status = obj.status;
        }
        if(obj.display === 'TRUE')
        {
          addMetric(obj.metric, goal, actual, after, obj.icon, status, obj.tooltip, '.metrics', obj.metricSource, currentMonth.capitalize());
        }

      });
    }

  });
}


function addMetric(name, goal, actual, after, icon, status, tooltip, div, metricSource, currentMonth) {

  var source = $('#headline1').html();
  var template = Handlebars.compile(source);
  var data = {
    name: name,
    goal: goal,
    actual: actual,
    after: after,
    icon: icon,
    status: status,
    currentMonth: currentMonth + " " + year,
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
