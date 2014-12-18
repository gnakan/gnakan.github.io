$(document).ready(function() {
    var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1oct7lLYLp12TCF1TgBgtvIFoPubEJ3T9jtQAcDtuNfM/pubhtml';
    Tabletop.init({
        key: public_spreadsheet_url,
        callback: showInfo,
        simpleSheet: true
    })
});


var scorecardData;


function showInfo(data, tabletop) {
    console.log(data);
    scorecardData = data;

    createPageViewsChart()
    populateTable();
}

function populateTable(){
    $.each(scorecardData, function(index, obj){
        console.log(obj);
        var tableRow = "<tr>" + 
        "<td>" + obj['*month']+"</td>" + 
        "<td>" + obj['estimated uniques']+"</td>" + 
        "<td>" + obj['estimated pageviews']+"</td>" +
        "<td>" + obj['estimated views']+"</td>" +
        "</tr>"
        $('#estimated-table tbody').append(tableRow);
    })
}

function createPageViewsChart() {
    var estimateLabels = [];
    var estimateData = [];
    var seriesData;

    //get the labels
    $.each(scorecardData[0], function(key, value) {
        if (key != undefined && key[0] != "*") {
            estimateLabels.push(key);
        }
    });
    //get the data
    $.each(scorecardData, function(key, value) {
        seriesData = []
       // console.log("estimateLabels", estimateLabels)
        $.each(estimateLabels, function(index, label) {
            //console.log("label", value[label])
            if (value[label] != undefined && value[label][0] != "*") {
                var dataPoint = value[label];
                seriesData.push(parseInt(dataPoint));
            }
        });
        //console.log(seriesData)
        estimateData.push(seriesData)
    });

    //console.log(estimateData)

    var data = {
        // A labels array that can contain any sort of values
        labels: estimateLabels,
        // Our series array that contains series objects or in this case series data arrays
        series: estimateData
    };

    // Create a new line chart object where as first parameter we pass in a selector
    // that is resolving to our chart container element. The Second parameter
    // is the actual data object. As a third parameter we pass in our custom options.
    new Chartist.Bar('#page-views-chart', data);
}
