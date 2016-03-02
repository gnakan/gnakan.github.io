var selected;
var scorecardData;
var currentMonth = 'jan';

$(document).ready(function() {
  getTableData();


  $('.sidebar-menu').on('click', 'li', function() {
    selected = $(this).data('name');
    $('#scorecardTitle').html(selected);

    loadMetrics();
  });
});

function getTableData() {
  Tabletop.init({
    key: '1EYgL1FVds4UUzQC1k8PHcpUKvTWAo8Rc9NF8j8qZuFM',
    callback: buildSidebar,
    simpleSheet: false
  });
}

function buildSidebar(data) {
  scorecardData = data;
  $('.sidebar-menu').empty();
  $('.sidebar-menu').append();

  $.each(data, function(index, obj) {
    if (obj.name !== "selections" && obj.name !== 'metrics')
      $('.sidebar-menu').append("<li class='dashboardLink' data-name='" + obj.name + "'><a href='#'><i class='fa fa-dashboard'></i><span>" + obj.name + "</span></a></li>");
  });

  var $links = $('.dashboardLink');
  var alphabeticallyOrderedDivs = $links.sort(function(a, b) {
    return $(a).attr('data-name') > $(b).attr('data-name');
  });

  $('.sidebar-menu').html("<li class='header'>PEOPLE</li>").append(alphabeticallyOrderedDivs);
  addTableRow();
}

function sorter(a, b) {
  return $(a).attr('data-name') > $(b).attr('data-name');
}

function loadMetrics(data) {
  $('.metrics').empty();
  $.each(scorecardData, function(index, obj) {
    if (obj.name === selected) {
      $.each(obj.elements, function(ind, obj) {
        var goal, actual, after;
        var status = 'blue';
        if (obj.after !== "%") {
          goal = obj.before + obj['jan-g'];
          actual = obj.before + obj['jan-a'];
          after = obj.after;
        } else {
          goal = obj.before + obj['jan-g'] + obj.after;
          actual = obj.before + obj['jan-a'] + obj.after;
          after = "";
        }

        if (obj.status !== "") {
          status = obj.status;
        }

        addMetric(obj.metric, goal, actual, after, obj.icon, status, obj.tooltip, '.metrics');
      });
    }

  });
}

function addMetric(name, goal, actual, after, icon, status, tooltip, div) {

  var source = $('#headline1').html();
  var template = Handlebars.compile(source);
  var data = {
    name: name,
    goal: goal,
    actual: actual,
    after: after,
    icon: icon,
    status: status,
    currentMonth: currentMonth,
    tooltip: tooltip
  };

  $(div).append(template(data));

}

function addTableRow(){
  var dataArr = [];
  var metricsArr = [];
  var theadData, test;

  var theadSource = $('#thead1').html();
  var theadTemplate = Handlebars.compile(theadSource);

  $.each(scorecardData, function(index, obj) {
    var lineItem = [];


    //get the metrics table header setup
    if(obj.name === 'metrics')
    {
      $.each(obj.elements, function(index, obj){
        if(index <= 6)
        {
          metricsArr.push(obj);
        }
      });
    }

    if (obj.name !== "selections" && obj.name !== 'metrics' && obj.name !== 'team roster')
    {
      //add the name
      lineItem.push(obj.name);

      //add the metric data
      $.each(obj.elements, function(index, obj){
        lineItem.push(obj.before + obj[currentMonth + "-a"] + obj.after);
      });

      dataArr.push(lineItem);

    }

  });


  var source = $('#tbody1').html();
  var template = Handlebars.compile(source);
  test = {metrics: dataArr};
  theadData = {metrics: metricsArr};
  $('#allUp thead tr').append(theadTemplate(theadData));
  $('#allUp tbody').append(template(test));
  $('#allUp').DataTable();
}
