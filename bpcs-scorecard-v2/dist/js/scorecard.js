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

  $('.metrics, .bpcs-metrics').on('click', '.headline', function(){
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
  $('.bpcs-metrics').empty();
  $('.metrics').html(  '<section class="content"><div class="box box-solid"><div class="box-header with-border"><i class="fa fa-line-chart"></i><h3 class="box-title">' + selectedMetric + ' <small>' + selectedToolTip + '</small></h3></div><div class="box-body chart"></div><div class="box-footer"><ul class="chart-legend clearfix"><li><i class="fa fa-circle-o text-green"></i> Goal</li><li><i class="fa fa-circle-o text-blue"></i> Actual</li></ul></div></div>'
);

  var actualArr = [];
  var goalArr = [];
  var monthCounter = monArr.indexOf(monthAbbreviation);
  var monthAbbr = monArr[monthCounter];
  var chartMonthLabelsArr = [];

  $.each(selectedScoreCardData.elements, function(index, obj){
    if(obj.metric === selectedMetric)
    {
      for (i = -1; i < monArr.indexOf(monthAbbreviation); i++) {
        chartMonthLabelsArr.push(monthAbbr);
        actualArr.push({meta:'Actual:', value: obj[monthAbbr + '-a']});
        goalArr.push({meta:'Goal:', value: obj[monthAbbr + '-g']});
        monthCounter--;
        monthAbbr = monArr[monthCounter];
      }
    }

  });
  new Chartist.Line('.chart', {
  labels: chartMonthLabelsArr.reverse(),
  series: [
    [], [], [],  [], [], goalArr.reverse(), actualArr.reverse()
  ]
}, {
  fullWidth: true,
  chartPadding: {
    right: 40,
    top: 70
  },
  height: '350px',
  low: 0,
  showArea: true,
  plugins: [
    Chartist.plugins.tooltip()
  ]
});

}

function loadMetrics(data) {
  $('.metrics').empty();
  $('.bpcs-metrics').empty();
  $.each(scorecardData, function(index, obj) {
    if (obj.name === selected) {
      selectedScoreCardData = obj;
      $.each(obj.elements, function(ind, obj) {
        var goal, actual, after, currentGoal;
        var status = 'red';
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
        if(obj.display === 'TRUE' && actual !== "")
        {
          if(obj.metricSource === "Blueprint" || obj.metricSource === "")
          {
            addMetric(obj.metric, goal, actual, after, obj.icon, status, obj.tooltip, '.bpcs-metrics', obj.metricSource, currentMonth.capitalize());
          }
          else {
            addMetric(obj.metric, goal, actual, after, obj.icon, status, obj.tooltip, '.metrics', obj.metricSource, currentMonth.capitalize());
          }
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

  $(div).append(template(data));

}
