//create the project definition file

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

    "activeStatus": ['coding', 'drafting', 'editing', 'testing', 'Ready for review'],
    "allStatus": ['coding', 'drafting', 'editing', 'testing', 'Ready for coding', 'Ready for editing', 'Ready for review', 'Ready for testing', 'Ready for drafting']
};

var contentCreatorArr = [
    "Christine T",
    "Conrad J",
    "Pooja N",
    "Brian M",
    "Thomas H",
    "Advaiya M"
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


var projIssues = 0;
var projIssuesInProgress = 0;
var projectArticlesToScore = 0;
var projArticlesScoreTotal = 0;

var issueData = {};
var issueComments = {};



//get list of Github issues
function getAllIssues() {
    $.get(projDef.repoIssueURL + "?page=1&per_page=100")
        .done(function(data) {
            issueData = data; //initial load
            $.get(projDef.repoIssueURL + "?page=2&per_page=100")
                .done(function(data2) {
                    $.each(data2, function(index, obj) {
                        issueData.push(obj);
                    });
                    $.get(projDef.repoIssueURL + "?page=3&per_page=100")
                        .done(function(data2) {
                            $.each(data2, function(index, obj) {
                                issueData.push(obj);
                            });

                            getAllIssueComments();
                        });
                });
        });
};

//get all comments associated with issues
function getAllIssueComments() {
    $.get(projDef.repoIssueURL + "/comments?page=1&per_page=100")
        .done(function(data) {
            issueComments = data;
            buildDashboard(issueData);
        });
};


function buildDashboard(data) {
    $.each(data, function(index, obj) {
        projIssues++;
        addTableRow(obj);
    })

    //build the widgets
    $('#dashboard-articles-num').text(projIssues);
    $('#dashboard-articles-progress').text(Math.floor((projIssuesInProgress / projIssues) * 100) + "%");
    $('#dashboard-articles-score').text(scoreToLetterGrade());
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
    var articleLevel = "";
    var articleEstimate = "";
    /*
    var issueLevel = "";
    var testOBJ = {};
    if (issue.body && issue.body.split('$level:')) {
        var levelFront = issue.body.split('$level:');
        if (typeof levelFront[1] !== 'undefined') {
            var levelBack = levelFront[1].split(/\s+/); //split by the carriage return
            issueLevel = levelBack[0];
        }
    }

    $.each(projDef.$level, function(index, obj) {
        if (issueLevel == obj.level) {
            var draftEstimate = obj.draftEstimate;
            testOBJ = {
                issueLevel, draftEstimate
            }

        }
    });
    */
    $.each(issue.labels, function(index, obj) {
        var label = obj.name;

        $.each(projDef.articleLevels, function(i, o) {
            if (o.label == label) {
                label = label.replace("Level ", "");
                articleLevel = label;
                articleEstimate = o.draftEstimate;
            }
        });
        /*
                if (articleLevelsArr.indexOf(label) >= 0) {
                    label = label.replace("Level ", "");
                    articleLevel = label;
                }
                */
    });
    if (dataType == 1) {
        return articleLevel;
    } else if (dataType == 2) {
        return articleEstimate;
    }

};

//check the issue labels 
function getIssueStatus(issue) {
    var issueStatus = "Ready for drafting";
    $.each(issue.labels, function(index, obj) {
        var label = obj.name;
        if (projDef.allStatus.indexOf(label) >= 0) {
            issueStatus = label;

            if (projDef.activeStatus.indexOf(issueStatus) >= 0) {
                projIssuesInProgress++;
            }

        }
    });
    return issueStatus;
};

//checks for issue time from comments
function getDraftTime(issue) {
    var draftVar = projDef.timeTrackingVars[0];
    var time = "";
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
        console.log(obj)
        if (issue.url == obj.issue_url && obj.body.indexOf(editScoreVar) >= 0) {
            projectArticlesToScore++;
            score = obj.body.split(editScoreVar + ":")[1];
            console.log(score);
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
    if (value1 != "" && value2 != "") {
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
    $('#myTable tr:last').after('<tr><td><a href="' + issue.html_url + '">' + issue.title + '</a></td><td>' + getIssueLevel(issue, 1) + '</td><td>' + getIssueStatus(issue) + '</td><td>' + getContentCreator(issue) + '</td><td>' + getIssueLevel(issue, 2) + '</td><td>' + getDraftTime(issue, 1) + '</td><td class="timeDiff">' + getDiffPercent(projDef.articleLevels[0].draftEstimate, getDraftTime(issue)) + '</td><td class="editScore">' + getEditScore(issue) + '</td></tr>');
    $("td.timeDiff:contains('-')").addClass('green');
    $("td.timeDiff:contains('+')").addClass('red');
    $("td.editScore:contains('unavailable')").addClass('gray');
};




getAllIssues();
