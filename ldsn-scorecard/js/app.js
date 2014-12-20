$(document).ready(function() {
    var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1oct7lLYLp12TCF1TgBgtvIFoPubEJ3T9jtQAcDtuNfM/pubhtml';
    Tabletop.init({
        key: public_spreadsheet_url,
        callback: showInfo,
        simpleSheet: false
    })
});


var estimateData;
var projectData;


function showInfo(data, tabletop) {
    //console.log(data);
    estimateData = data;

    createPageViewsChart()
    populateTable();
    renderProjectData();
}

function populateTable() {
    $.each(estimateData, function(index, obj) {

        if (obj['name'] == 'estimates') {
            $.each(obj['elements'], function(i, o) {
                var tableRow = "<tr>";
                tableRow += "<td>" + o['*month'].toUpperCase() + "</td>"
                tableRow += "<td>" + o['estimated uniques'] + "</td>"
                tableRow += "<td>" + o['estimated pageviews'] + "</td>"
                tableRow += "<td>" + o['estimated views'] + "</td>"
                tableRow += "</tr>"
                $('#estimated-table tbody').append(tableRow);
            })

        }

    })
}

function renderProjectData() {
    $.each(estimateData, function(index, obj) {
        if (obj['name'] == 'overview') {
            $('#project-title').text(obj['elements']['0']['project-name']);
            $('#project-site').html("<small>" + obj['elements']['0']['site'] + "</small>");
        }

    })
}

function createPageViewsChart() {
    var estimateLabels = [];
    var graphData = [];
    var seriesData;

    //console.log(estimateData)
    //get the labels
    $.each(estimateData, function(index, obj) {
        if (obj['name'] == 'estimates') {
            $.each(obj['elements'], function(key, value) {
                estimateLabels.push(value['*month'].toUpperCase());
            });

            //get the data
            $.each(obj['elements'], function(key, value) {
                seriesData = []
                $.each(value, function(i, o) {
                    if (i != undefined && i[0] != "*") {
                        var dataPoint = o;
                        seriesData.push(parseInt(dataPoint));
                    }
                })
                graphData.push(seriesData)
            });
        }
    })

    var data = {
        // A labels array that can contain any sort of values
        labels: estimateLabels,
        // Our series array that contains series objects or in this case series data arrays
        series: graphData
    };

    var options = {
        seriesBarDistance: 30,
        axisX: {
            showGrid: false
        }
    };

    // Create a new line chart object where as first parameter we pass in a selector
    // that is resolving to our chart container element. The Second parameter
    // is the actual data object. As a third parameter we pass in our custom options.
    new Chartist.Bar('#page-views-chart', data, options);
}
