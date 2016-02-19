var projectHealth;

$(document).ready(function() {
  $('#messages').empty();
  firstContact();


  //Click on What Is This?
  $('#actions').on('click', '#whatIsThis', function() {
    $('#whatIsThis').appendTo('#messages');
    $('#actions').empty();
    jarvisMessage(whoResponse(), '#messages', function() {
      meMessage('tellMeMore', 'Tell me more', '#actions');
      meMessage('status', 'projects', '#actions');
    });
  });

  //Click on Tell Me More
  $('#actions').on('click', '#tellMeMore', function() {
    $('#tellMeMore').appendTo('#messages');
    $('#actions').empty();
    jarvisMessage(tellMeMoreResponse(), '#messages', function() {
      meMessage('warGame', 'A game?', '#actions');
      meMessage('status', 'projects', '#actions');
    });
  });

  //click on A Game?
  $('#actions').on('click', '#warGame', function() {
    $('#warGame').appendTo('#messages');
    $('#actions').empty();
    jarvisMessage(warGameResponse, '#messages', function() {
      meMessage('status', 'projects', '#actions');
    });
  });

  //click on Get Me the PM!
  $('#actions').on('click', '#pm', function() {
    $('#pm').appendTo('#messages');
    $('#actions').empty();
    jarvisMessage(pmResponse(), '#messages', function() {
      meMessage('status', 'projects', '#actions');
    });
  });


  //click on scorecard
  $('#actions').on('click', '#scorecard', function() {
    $('#scorecard').appendTo('#messages');
    $('#actions').empty();
    jarvisMessage(scorecardResponse(), '#messages', function() {
      jarvisMessage(scorecardImage, '#messages', function() {
        meMessage('status', 'projects', '#actions');
      });
    });
  });

  //view project status
  $('#actions').on('click', '#status', function() {
    $('#status').appendTo('#messages');
    $('#actions').empty();
    jarvisMessage(statusResponse, '#messages', function() {
      meMessage('project1', 'Red Valve', '#actions');
      meMessage('project2', 'MBR Dashboard', '#actions');
    });
  });

  //view project 1 status
  $('#actions').on('click', '#project1', function() {
    $('#project1').appendTo('#messages');
    $('#actions').empty();
    jarvisMessage(projectStatus('Red Valve'), '#messages', function() {
      meMessage('projectDetails', 'Tell me more!', '#actions');
      meMessage('status', 'projects', '#actions');
    });
  });

  //view project 2 status
  $('#actions').on('click', '#project2', function() {
    $('#project2').appendTo('#messages');
    $('#actions').empty();
    jarvisMessage(projectStatus('MBR Dashboard'), '#messages', function() {
      meMessage('projectDetails', 'Tell me more!', '#actions');
      meMessage('status', 'projects', '#actions');
    });
  });

  $('#actions').on('click', '#projectDetails', function() {
    $('#projectDetails').appendTo('#messages');
    $('#actions').empty();
    jarvisMessage(projectDeliverables(), '#messages', function(){
      jarvisMessage(projectResources(), '#messages', function() {
        meMessage('scorecard', 'Show scorecard', '#actions');
        if(projectHealth)
        {
          meMessage('status', 'projects', '#actions');
        }
        else {
          meMessage('pm', 'Get me the PM', '#actions');
        }


      });
    });


  });

});

function pmResponse(){
  var response = "Because I am a demo, I cannot message the PM. However, in the full version, I can connect you directly with the PM.";
  return response;
}

function scorecardResponse(){
  var response = "Currently, because I am demo, I can only show you an example of a scorecard.";
  return response;
}

function scorecardImage(){
  var response = "<a href='scorecard.png' target='_blank'><img class='messageIMG' src='scorecard.png'></a>";
  return response;
}


function projectResources()
{
  var resources = Math.floor(Math.random() * (99 - 1 + 1)) + 1;
  if(projectHealth)
  {
    response = "Your resource allocation is at " + resources + "%";
  }
  else {
    response = "Your resource allocation is at " + (resources + 100) + "%!";
  }
  return response;

}

function projectDeliverables(){
  var deliverables = Math.floor(Math.random() * (30 - 1 + 1)) + 1;
  if(projectHealth)
  {
    response = deliverables + " deliverables have been completed.";
  }
  else {
    response = deliverables + " deliverables are needed but 1 requires your attention.";
  }
  console.log('response', response);
  return response;
}

function projectStatus(projectName) {
  var healthy = !!Math.floor(Math.random() * 2);
  var response;
  projectHealth = healthy;

  if (healthy) {
    response = "<img class='emoji' src='thumbs-up.png'>";
  } else {
    response = "<img class='emoji' src='thumbs-down.png'>";
  }
  return response;
}



function meMessage(id, message, div) {
  var html = "<div id=" + id + " class='message me'>" + message + "</div>";
  $(div).append(html);
  $('#messages').scrollTop($('#messages')[0].scrollHeight);
  return true;
}

//response for project status
function statusResponse() {
  var response = "It appears you have 2 projects: Red Valve & MBR Dashboard. Which project do you want the status of?";
  return response;
}

function jarvisMessage(message, div, cb) {
  var messageID = moment();
  var html = "<div id=" + messageID + " class='message jarvis'><img src='message.gif'></div>";

  $(div).append(html);
  $('#messages').scrollTop($('#messages')[0].scrollHeight);
  setTimeout(function() {
    if (message === 'hello') {
      $("#" + messageID).html(hello() + greeting());
    } else {
      $("#" + messageID).html(message);
    }
    if (cb && typeof cb === "function") {
      cb();
    }

  }, 2000);

  return true;
}

function hello() {
  var helloArr = ["Salut!", "Ciao!", "Ahoj!", "Hej!", "Czesc!", "Hola!", "Shalom!", "Kon'nichiwa!", "Hujambo!", "Aloha"];
  var rand = helloArr[Math.floor(Math.random() * helloArr.length)];
  return rand;
}

function helpResponse() {
  var helpArr = ["How may I be of assistance?", "To what do I owe the pleasure?", "Is there anything I can assist you with?"];
  var rand = helpArr[Math.floor(Math.random() * helpArr.length)];
  return rand;
}

function greeting() {
  var currentHour = moment().get('hour');
  var message = "";

  if (currentHour < 12) {
    message = " and good morning.";
  } else if (currentHour >= 12 && currentHour < 19) {
    message = " and good afternoon!";
  } else {
    message = " and good evening!";
  }

  return message;
}

//response for What Is This
function whoResponse() {
  var text = 'I am Radar. I give you the status of your projects and provide helpful actions.';
  return text;
}

//Initial message on load
function firstContact() {
  jarvisMessage('hello', '#messages');
  setTimeout(function() {
    jarvisMessage(helpResponse(), '#messages', function() {
      meMessage('whatIsThis', 'What is this?', '#actions');
      meMessage('status', 'projects', '#actions');
    });
  }, 2000);
}

//initial response of Tell Me More
function tellMeMoreResponse() {
  var text = 'The project team keeps me updated so I can assist you whenever required. Shall we play a game?';
  return text;
}

//Response for when someone asks about playing a game.
function warGameResponse() {
  var text = "Sorry, I can't play any games right now. I was making a <a target='_blank' href='https://www.youtube.com/watch?v=KXzNo0vR_dU'>movie reference</a>. " + helpResponse();
  return text;
}
