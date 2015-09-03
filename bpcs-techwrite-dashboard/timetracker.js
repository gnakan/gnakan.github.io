//create the project definition file

var week = "Week 9";

var projDef = {
    "repoIssueURL": "https://api.github.com/repos/gnakan/gd-cloud-docs/issues",

    "roles": ['Content Creator'],

    "timeTrackingVars": ['$draft', '$editing'],

    "editScoreVar": "$edit-score",

    "articleLevels": [{
        "label": "Level 1",
        "draftEstimate": 1.5
    }, {
        "label": "Level 2",
        "draftEstimate": 3
    }, {
        "label": "Level 3",
        "draftEstimate": 6
    }, {
        "label": "Level 4",
        "draftEstimate": 8
    }],
    "queueStatus": ['Ready for drafting', 'Ready for coding', 'Ready for editing', 'Ready for testing'],
    "activeStatus": ['coding', 'drafting', 'editing', 'testing', 'Ready for review'],
    "allStatus": ['coding', 'drafting', 'editing', 'testing', 'Ready for coding', 'Ready for editing', 'Ready for review', 'Ready for testing', 'Ready for drafting']
};

var contentCreatorArr = [
    "Christine T",
    "Conrad J",
    "Pooja N",
    "Brian M",
    "Thomas H",
    "Advaiya M",
    "Gary N"
];

var editorArr = [
    "Carla J",
    "Crystal S"
];

var articleLevelsArr = [{
    "Level 1": 1.5
}, {
    "Level 2": 3
}, {
    "Level 3": 6
}, {
    "Level 4": 8
}];

var milestoneArr = [{
    "name": "Week 1",
    "count": 0
}, {
    "name": "Week 2",
    "count": 0
}, {
    "name": "Week 3",
    "count": 0
}, {
    "name": "Week 4",
    "count": 0
}, {
    "name": "Week 5",
    "count": 0
}, {
    "name": "Week 6",
    "count": 0
}, {
    "name": "Week 7",
    "count": 0
}, {
    "name": "Week 8",
    "count": 0
}, {
    "name": "Week 9",
    "count": 0
}, {
    "name": "Week 10",
    "count": 0
}];


var projIssues = 0;
var projIssuesInProgress = 0;
var projectArticlesToScore = 0;
var projArticlesScoreTotal = 0;
var projDeliveredArticles = 0;
var projArticlesDrafting = 0;
var projArticlesDraftQueue = 0;
var projArticlesCoding = 0;
var projArticlesCodeQueue = 0;
var projArticlesEditing = 0;
var projArticlesEditQueue = 0;
var projArticlesReEditing = 0;
var projArticlesTesting = 0;
var projArticlesTestQueue = 0;

var issueData = {};
var issueComments = {};

var loading_screen = pleaseWait({
    logo: "techdoc-logo.png",
    backgroundColor: '#666',
    loadingHtml: '<div class="sk-cube-grid">' +
        '<div class="sk-cube sk-cube1"></div>' +
        '<div class="sk-cube sk-cube2"></div>' +
        '<div class="sk-cube sk-cube3"></div>' +
        '<div class="sk-cube sk-cube4"></div>' +
        '<div class="sk-cube sk-cube5"></div>' +
        '<div class="sk-cube sk-cube6"></div>' +
        '<div class="sk-cube sk-cube7"></div>' +
        '<div class="sk-cube sk-cube8"></div>' +
        '<div class="sk-cube sk-cube9"></div>' +
        '</div>'
});


//get list of Github issues
function getAllIssues() {
    $.get(projDef.repoIssueURL + "?client_id=55787e148edf3df37d00&client_secret=317711070dd8e8a634359e4181eed45005622edd&page=1&per_page=100")
        .done(function(data) {
            issueData = data; //initial load
            $.get(projDef.repoIssueURL + "?client_id=55787e148edf3df37d00&client_secret=317711070dd8e8a634359e4181eed45005622edd&page=2&per_page=100")
                .done(function(data2) {
                    $.each(data2, function(index, obj) {
                        issueData.push(obj);
                    });
                    $.get(projDef.repoIssueURL + "?client_id=55787e148edf3df37d00&client_secret=317711070dd8e8a634359e4181eed45005622edd&page=3&per_page=100")
                        .done(function(data2) {
                            $.each(data2, function(index, obj) {
                                issueData.push(obj);
                            });
                            $.get(projDef.repoIssueURL + "?client_id=55787e148edf3df37d00&client_secret=317711070dd8e8a634359e4181eed45005622edd&page=4&per_page=100")
                                .done(function(data3) {
                                    $.each(data3, function(index, obj) {
                                        issueData.push(obj);
                                    });
                                    $.get(projDef.repoIssueURL + "?client_id=55787e148edf3df37d00&client_secret=317711070dd8e8a634359e4181eed45005622edd&page=5&per_page=100")
                                        .done(function(data4) {
                                            $.each(data4, function(index, obj) {
                                                issueData.push(obj);
                                            });
                                            getAllIssueComments();
                                        });
                                });
                        });
                });
        });
};

//get all comments associated with issues
function getAllIssueComments() {
    $.get(projDef.repoIssueURL + "/comments?client_id=55787e148edf3df37d00&client_secret=317711070dd8e8a634359e4181eed45005622edd&page=1&per_page=100")
        .done(function(data) {
            issueComments = data;
            $.get(projDef.repoIssueURL + "/comments?client_id=55787e148edf3df37d00&client_secret=317711070dd8e8a634359e4181eed45005622edd&page=2&per_page=100")
                .done(function(data2) {
                    $.each(data2, function(index, obj) {
                        issueComments.push(obj);
                    });
                    $.get(projDef.repoIssueURL + "/comments?client_id=55787e148edf3df37d00&client_secret=317711070dd8e8a634359e4181eed45005622edd&page=3&per_page=100")
                        .done(function(data3) {
                            $.each(data3, function(index, obj) {
                                issueComments.push(obj);
                            });
                            $.get(projDef.repoIssueURL + "/comments?client_id=55787e148edf3df37d00&client_secret=317711070dd8e8a634359e4181eed45005622edd&page=4&per_page=100")
                                .done(function(data4) {
                                    $.each(data4, function(index, obj) {
                                        issueComments.push(obj);
                                    });

                                    $.get(projDef.repoIssueURL + "/comments?client_id=55787e148edf3df37d00&client_secret=317711070dd8e8a634359e4181eed45005622edd&page=5&per_page=100")
                                        .done(function(data5) {
                                            $.each(data5, function(index, obj) {
                                                issueComments.push(obj);
                                            });
                                            buildDashboard(issueData);
                                        })
                                });
                        });
                });
        });
};


function buildDashboard(data) {
    $.each(data, function(index, obj) {
        projIssues++;
        addTableRow(obj);
    });

    $('#week').text(week);

    //build the widgets
    $('#dashboard-articles-num').text(projIssues);
    $('#dashboard-articles-progress').text(Math.floor((projIssuesInProgress / projIssues) * 100) + "%");
    $('#dashboard-articles-progress-num').text(projIssuesInProgress + " articles");
    $('#dashboard-articles-score').text(scoreToLetterGrade());
    $("#dashboard-articles-score:contains('A')").addClass('green');
    $("#dashboard-articles-score:contains('C')").addClass('red');
    $('#dashboard-articles-delivered').text(projDeliveredArticles);

    $('#dashboard-articles-drafting-progress').text(Math.floor((projArticlesDrafting / (projArticlesDrafting + projArticlesDraftQueue)) * 100) + "%");
    $('#dashboard-articles-coding-progress').text(Math.floor((projArticlesCoding / (projArticlesCodeQueue + projArticlesCoding)) * 100) + "%");
    $('#dashboard-articles-editing-progress').text(Math.floor((projArticlesEditing / (projArticlesEditQueue + projArticlesEditing)) * 100) + "%");
    $('#dashboard-articles-testing-progress').text(Math.floor((projArticlesTesting / (projArticlesTestQueue + projArticlesTesting)) * 100) + "%");
    buildPieChart();
    buildMilestoneChart();
    $('#myTable').DataTable();
    loading_screen.finish();
};


function scoreToLetterGrade() {
    var letterGrade = "";
    var score = Math.floor((projArticlesScoreTotal / projectArticlesToScore));

    if (score == 3) {
        letterGrade = "A";
    } else if (score >= 2 && score < 3) {
        letterGrade = "B"
    } else {
        letterGrade = "C";
    }

    return letterGrade;
}

//check the issue body for the issue level
function getIssueLevel(issue, dataType) {
    var articleLevel = "unavailable";
    var articleEstimate = "unavailable";

    $.each(issue.labels, function(index, obj) {
        var label = obj.name;

        $.each(projDef.articleLevels, function(i, o) {
            if (o.label == label) {
                label = label.replace("Level ", "");
                articleLevel = label;
                articleEstimate = o.draftEstimate;
            }
        });

    });
    if (dataType == 1) {
        return articleLevel;
    } else if (dataType == 2) {
        return articleEstimate;
    }

};

//check the issue labels 
function getIssueStatus(issue) {
    var issueStatus = projDef.queueStatus[0];
    $.each(issue.labels, function(index, obj) {
        var label = obj.name;
        if (projDef.allStatus.indexOf(label) >= 0) {
            issueStatus = label;

            //increment the active articles in progress
            if (projDef.activeStatus.indexOf(issueStatus) >= 0) {
                projIssuesInProgress++;

                //increment the delivered articles
                if (issueStatus == projDef.activeStatus[4]) {
                    projDeliveredArticles++;
                    getMilestoneData(issue); //check the milestone and track accordingly
                };

                //increment the drafting articles
                if (issueStatus == projDef.activeStatus[1]) {
                    projArticlesDrafting++;
                };

                //increment the drafting articles
                if (issueStatus == projDef.activeStatus[0]) {
                    projArticlesCoding++;
                };

                //increment the editing articles
                if (issueStatus == projDef.activeStatus[2]) {
                    projArticlesEditing++;
                };

                //increment the editing articles
                if (issueStatus == projDef.activeStatus[3]) {
                    projArticlesTesting++;
                };
            };

            //increment the active articles in queue
            if (projDef.queueStatus.indexOf(issueStatus) >= 0) {
                //projIssuesInProgress++;

                if (issueStatus == projDef.queueStatus[1]) {
                    projArticlesCodeQueue++;
                };

                if (issueStatus == projDef.queueStatus[2]) {
                    projArticlesEditQueue++;
                };

                if (issueStatus == projDef.queueStatus[3]) {
                    projArticlesTestQueue++;
                };
            };
        }

    });
    if (issueStatus == projDef.queueStatus[0]) {
        projArticlesDraftQueue++
    }
    return issueStatus;
};

//checks for issue time from comments
function getDraftTime(issue) {
    var draftVar = projDef.timeTrackingVars[0];
    var time = "unavailable";
    $.each(issueComments, function(index, obj) {
        if (issue.url == obj.issue_url && obj.body.indexOf(draftVar) >= 0) {
            time = obj.body.split(draftVar + ":")[1];
        }
    });
    return time;
};

//checks for edit score from comments
function getEditScore(issue) {
    var editScoreVar = projDef.editScoreVar;
    var score = "unavailable";
    $.each(issueComments, function(index, obj) {
        if (issue.url == obj.issue_url && obj.body.indexOf(editScoreVar) >= 0) {
            projectArticlesToScore++;
            score = obj.body.split(editScoreVar + ":")[1];
            if (score == "A") {
                projArticlesScoreTotal = projArticlesScoreTotal + 3;
            } else if (score == "B") {
                projArticlesScoreTotal = projArticlesScoreTotal + 2;
            } else {
                projArticlesScoreTotal = projArticlesScoreTotal + 1;
            };
        }
    });
    return score;
};

function getDiffPercent(value1, value2) {
    var diff = 0;
    if (value1 != "" && value2 != "" && !isNaN(value1) && !isNaN(value2)) {
        if (isNaN(value1)) {
            value1 = parseInt(value1)
        }

        if (isNaN(value2)) {
            value2 = parseInt(value2)
        }

        diff = Math.floor(((value2 - value1) / value1) * 100)

        if (diff >= 1) {
            diff = "+" + diff + "%";
        } else {
            diff = diff + "%"
        }
    } else {
        diff = 'unavailable';
    }
    return diff;
};

function getContentCreator(issue) {
    var contentCreator = "";
    $.each(issue.labels, function(index, obj) {
        var label = obj.name;
        if (contentCreatorArr.indexOf(label) >= 0) {
            contentCreator = label;
        }
    });

    return contentCreator;
};

function addTableRow(issue) {
    $('#myTable tbody').append('<tr><td><a href="' + issue.html_url + '">' + issue.title + '</a></td><td>' + getIssueLevel(issue, 1) + '</td><td>' + getIssueStatus(issue) + '</td><td>' + getContentCreator(issue) + '</td><td>' + getIssueLevel(issue, 2) + '</td><td>' + getDraftTime(issue, 1) + '</td><td class="timeDiff">' + getDiffPercent(projDef.articleLevels[0].draftEstimate, getDraftTime(issue)) + '</td><td class="editScore">' + getEditScore(issue) + '</td></tr>');
    $("td.timeDiff:contains('-')").addClass('green');
    $("td.timeDiff:contains('+')").addClass('red');
    $("td:contains('unavailable')").addClass('gray');
    $("td.editScore:contains('B')").addClass('green');
};


function buildPieChart() {
    new Chartist.Bar('#progress-chart', {
        labels: ['Progress'],
        series: [
            [projArticlesDrafting],
            [projArticlesCoding],
            [projArticlesEditing],
            [projArticlesTesting]
        ]
    }, {
        seriesBarDistance: 10,
        reverseData: false,
        stackBars: true,
        horizontalBars: true,
        height: '40px',
        axisY: {
            offset: 0
        }
    });
};

//builds the line chart that displays articles delivered weekly
function buildMilestoneChart() {
    new Chartist.Line('#delivered-chart', {
        labels: [
            milestoneArr[0].name,
            milestoneArr[1].name,
            milestoneArr[2].name,
            milestoneArr[3].name,
            milestoneArr[4].name,
            milestoneArr[5].name,
            milestoneArr[6].name,
            milestoneArr[7].name,
            milestoneArr[8].name
        ],
        series: [{
            "name": "Delivered articles",
            "data": [
                milestoneArr[0].count,
                milestoneArr[1].count,
                milestoneArr[2].count,
                milestoneArr[3].count,
                milestoneArr[4].count,
                milestoneArr[5].count,
                milestoneArr[6].count,
                milestoneArr[7].count,
                milestoneArr[8].count
            ]
        }]
    }, {
        fullWidth: true,
        height: 200,
        chartPadding: {
            right: 40
        }
    });
};

function getMilestoneData(issue) {
    if (issue.milestone !== null) {
        var milestone = issue.milestone.title;

        $.each(milestoneArr, function(index, obj) {
            if (obj.name == milestone) {
                obj['count']++;
            }
        })


    }

};

getAllIssues();

$(document).ready(function() {
    var $chart = $('#delivered-chart');

    var $toolTip = $chart
        .append('<div class="chart-tooltip"></div>')
        .find('.chart-tooltip')
        .hide();

    $chart.on('mouseenter', '.ct-point', function() {
        var $point = $(this),
            value = $point.attr('ct:value'),
            seriesName = $point.parent().attr('ct:series-name');
        $toolTip.html(seriesName + '<br>' + value).show();
    });

    $chart.on('mouseleave', '.ct-point', function() {
        $toolTip.hide();
    });

    $chart.on('mousemove', function(event) {
        $toolTip.css({
            left: (event.offsetX || event.originalEvent.layerX) - $toolTip.width() / 2 - 10,
            top: (event.offsetY || event.originalEvent.layerY) - $toolTip.height() + 330
        });
    });
});
