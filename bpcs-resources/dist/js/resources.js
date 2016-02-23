var selected;
var allocationData;
var currentMonth = "January 2016";

$(document).ready(function() {
  getTableData();

  $('#weekOfMonth').html("<i class='fa fa-calendar'></i> Week " + getWeek(moment()));

  $('.sidebar-menu').on('click', 'li', function() {
    selected = $(this).data('name');

    loadAllocation();
  });
});



function getTableData() {
  Tabletop.init({
    key: '1iDp0SJlnXhAPmaVJxWfnY4SvuEPGdHNTzvVjfiNkjk4',
    callback: buildSidebar,
    simpleSheet: false
  });
}

function buildSidebar(data) {
  allocationData = data;
  $('.sidebar-menu').empty();
  $('.sidebar-menu').append();

  $.each(data, function(index, obj) {
    if (obj.name !== "selections")
      $('.sidebar-menu').append("<li class='resourceLink' data-name='" + obj.name + "'><a href='#'><i class='fa fa-user'></i><span>" + obj.name + "</span></a></li>");
  });

  var $links = $('.resourceLink');
  var alphabeticallyOrderedDivs = $links.sort(function(a, b) {
    return $(a).attr('data-name') > $(b).attr('data-name');
  });

  $('.sidebar-menu').html("<li class='header'>RESOURCES</li>").append(alphabeticallyOrderedDivs);
}

function getWeek(date){
        prefixes = [1,2,3,4,5];

    return prefixes[0 | moment(date).date() / 7];
}


function sorter(a, b) {
  return $(a).attr('data-name') > $(b).attr('data-name');
}

function loadAllocation() {
  $('.allocation').empty();
  $('.overview').empty();
  var colorArr = ['rgba(0, 192, 239, 0.8)', 'rgba(0, 166, 90, 0.8)', 'rgba(243, 156, 18, 0.8)', 'rgba(96, 92, 168, 0.8)', 'rgba(57, 204, 204, 0.8)'];
  var dataArr = [];
  var engagementObj;

  $.each(allocationData, function(index, obj) {
    if (obj.name === selected) {
      //build the dataset
      $.each(obj.elements, function(ind, obj) {
        var label = obj.engagement + ", " + obj.role;
        var data = [parseInt(obj.wk1), parseInt(obj.wk2), parseInt(obj.wk3), parseInt(obj.wk4), parseInt(obj.wk5)];
        var fillColor;

        if(obj.engagement === "Bench")
        {
          fillColor = 'rgba(221, 75, 57, 0.8)';
        }
        else {
          fillColor = colorArr[ind];
        }

        engagementObj = {
          label: label,
          data: data,
          backgroundColor: fillColor,
          borderColor: fillColor,
          hoverBackgroundColor: fillColor
        };

        dataArr.push(engagementObj);
        if(obj.engagement !== "Bench")
        {
          addOverview(selected, obj.overview, obj.engagement);
        }


      });
      addChart(obj.name, dataArr);
    }

  });
}

function addOverview(name, overview, engagement){
  var source = $('#overviewText').html();
  var template = Handlebars.compile(source);
  var data = {
    name:name,
    overview:overview,
    engagement: engagement
  };

  $('.overview').append(template(data));
}


function addChart(name, datasets) {

  var graphSource = $('#resourceGraph').html();
  var graphTemplate = Handlebars.compile(graphSource);
  var graphData = {
    name:name
  };

  $('.allocation').append(graphTemplate(graphData));

  var data = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
    datasets: datasets
  };

  var ctx = document.getElementById("myChart").getContext("2d");
  /*
  var myBarChart = new Chart(ctx).Bar(data,{
    barValueSpacing : 40,
    scaleLabel: "<%=value%>%",
    responsive: true,
    maintainAspectRatio: false,
  });
  */

  var myBarChart = new Chart(ctx,{
    type: 'bar',
    data: data,
    options: {
      barValueSpacing : 40,
      scaleLabel: "<%=value%>%",
      responsive: true,
      maintainAspectRatio: false,
      scales: {
                xAxes: [{
                        stacked: true,
                }],
                yAxes: [{
                        stacked: true
                }]
            }

    }
});




}
