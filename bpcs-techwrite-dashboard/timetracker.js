//create the project definition file

var projDef = {
    "repoIssueURL": "https://api.github.com/repos/gnakan/GDTest/issues",

    "roles": ['Content Creator'],

    "timeTrackingVars": ['$draft'],

    "$level": [{
        "level": "1",
        "draftEstimate": 1.5
    }, {
        "level": "2",
        "draftEstimate": 3
    }, {
        "level": "3",
        "draftEstimate": 6
    }],

    "status": ['coding', 'drafting', 'editing', 'testing', 'reviewing', 'Ready: Coding', 'Ready:Drafting', 'Ready:Editing', 'Ready: Testing', 'Ready: GD Review'],
};

var projAssignments = {
    "accounts": [{
        "account": "gnakan",
        "name": "Gary Nakanelua",
        "role": projDef.roles[0]
    }]
}


var projIssues = 0;
var projIssuesInProgress = 0;

var issueData = {};
var issueComments = {};



//get list of Github issues
function getAllIssues() {
    $.get(projDef.repoIssueURL)
        .done(function(data) {
            issueData = data;
            getAllIssueComments();
        });
};

//get all comments associated with issues
function getAllIssueComments() {
    $.get(projDef.repoIssueURL + "/comments")
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
};


//check the issue body for the issue level
function getIssueLevel(issue) {
    var issueLevel = "";
    var testOBJ = {};
    if (issue.body && issue.body.split('$level:')) {
        var levelFront = issue.body.split('$level:');
        var levelBack = levelFront[1].split(/\s+/); //split by the carriage return
        issueLevel = levelBack[0];
    }

    $.each(projDef.$level, function(index, obj) {
        if (issueLevel == obj.level) {
            var draftEstimate = obj.draftEstimate;
            testOBJ = {
                issueLevel, draftEstimate
            }

        }
    });

    return issueLevel;
};

//check the issue labels 
function getIssueStatus(issue) {
    var issueStatus = "Ready For Drafting";
    $.each(issue.labels, function(index, obj) {
        var label = obj.name;
        if (projDef.status.indexOf(label) >= 0) {
            issueStatus = label;
            projIssuesInProgress++;
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

        if(diff >= 1){
        	diff = "+" + diff + "%";
        }
        else
        {
        	diff = diff + "%"
        }
    }
    return diff;
};

function getName(account) {
    $.each(projDef.accounts, function(index, obj) {
        if (account == obj.account) {
            console.log(obj.name)
        }
    });
};

function addTableRow(issue) {
    $('#myTable tr:last').after('<tr><td><a href="' + issue.html_url + '">' + issue.title + '</a></td><td>' + getIssueLevel(issue) + '</td><td>' + getIssueStatus(issue) + '</td><td>1.5</td><td>' + getDraftTime(issue) + '</td><td class="timeDiff">' + getDiffPercent(1.5, getDraftTime(issue)) + '</td></tr>');
    $("td.timeDiff:contains('-')").addClass('green');
  	$("td.timeDiff:contains('+')").addClass('red');
};




getAllIssues();
