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
    console.log(estimateData);
}

function populateTable() {
    $.each(estimateData, function(index, obj) {
        if (obj['name'] == 'estimates') {
            $.each(obj['elements'], function(i, o) {
                var tableRow = "<tr>";
                tableRow += "<td>" + o['*metrics'] + "</td>"
                tableRow += "<td>" + o['jan'] + "</td>"
                tableRow += "<td>" + o['feb'] + "</td>"
                tableRow += "<td>" + o['mar'] + "</td>"
                tableRow += "</tr>"
                $('#estimated-table tbody').append(tableRow);
            })

        }
    })
}

function renderProjectData() {
    $.each(estimateData, function(index, obj) {
        if (obj['name'] == 'overview') {
            $('#project-title').html("Project: " + obj['elements']['0']['project-name']);
            $('#project-site').html("<small>" + obj['elements']['0']['site'] + "</small>");
        }
    })
}

function createPageViewsChart() {
    var estimateLabels = [];
    var graphData = [];
    var seriesData;

    //get the labels
    $.each(estimateData, function(index, obj) {
        if (obj['name'] == 'estimates') {
            $.each(obj['elements'], function(key, value) {
                estimateLabels.push(value['*metrics']);
            });

            //get the data
            $.each(obj['elements'], function(key, value) {
                seriesData = []
                    //skip the first value, write the next value to the first label array, write the second value to the second array
                $.each(value, function(i, o) {
                    if (i != undefined && i[0] != "*") {
                        var noComma = o.replace(/[^\d\.\-\ ]/g, '');
                        var dataPoint = parseFloat(noComma);
                        seriesData.push(dataPoint);
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
        },
        axisY: {
            labelOffset: {
                x: 20,
                y: 0
            },
        }
    };

    new Chartist.Bar('#page-views-chart', data, options);
}
