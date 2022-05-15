$(document).ready(function () 
{
  var questions = 
  [{
    question:
    "What does HTML stand for?",
    choices: [ "Hyper Text Preprocessor", "Hyper Text Markup Language","Hyper Text Multiple Language","Hyper Tool Multi Language"],
    correctAnswer: 1
  },
  {
    question: "What does CSS stand for?",
    choices: [ "Common Style Sheet","Colorful Style Sheet","Computer Style Sheet","Cascading Style Sheet"],
    correctAnswer: 3
  },
  {
    question: "what is the capital of ismailia?",
    choices: ["egypt","USA","farance"],
    correctAnswer: 0
  }];
  var questionCounter = 0;
  var selections = [];
  var quiz = $(".content"); 
  var timer=$(".Tt")
  var count = 20;
  displayNext();
  $("#next").on("click", function (e)
  {
    e.preventDefault();
    choose();
    if (isNaN(selections[questionCounter]))
    {
      $("#warning").text("Please make a selection! in question number "+(questionCounter+1) );
      questionCounter++;
      displayNext();
    }
    else
    {
      questionCounter++;
      displayNext();
      $("#warning").text("");
    }
  });
  $("#prev").on("click", function (e)
  {
    e.preventDefault();
    choose();
    questionCounter--;
    displayNext();
  });
  function createQuestionElement(index)
  {
    var qElement = $("<div>", {id: "question"});
    var remember=$('.remember')
    var header = $("<h2>Question " + (index + 1) + ":</h2>");
    qElement.append(header);
    var question = $("<p>").append(questions[index].question);
    qElement.append(question);
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    var warningText = $('<p id="warning">');
    remember.append(warningText);
    return qElement;
  }
  function createRadios(index)
  {
    var radioList = $("<ul>");
    var item;
    var input = "";
    for (var i = 0; i < questions[index].choices.length; i++)
    {
      item = $("<li>");
      input = '<input type="radio" name="answer" value=' + i + " />";
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  function choose()
  {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  function displayNext()
  {
    quiz.fadeOut(function ()
    {
      $("#question").remove();
      if (questionCounter < questions.length)
      {
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!isNaN(selections[questionCounter]))
        {
          $("input[value=" + selections[questionCounter] + "]").prop("checked",true);
        }
          if (questionCounter === 1)
          {
            $("#prev").show();
          } 
          else if (questionCounter === 0)
          {
            $("#prev").hide();
            $("#next").show();
          }
        }
        else
        {
          var scoreElem = displayScore();
          quiz.append(scoreElem).fadeIn();
          $("#next").hide();
          $("#prev").hide();
        }
    });
  }
  function displayScore()
  {
    
    var score = $("<h3>", { id: "question" });
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++)
    {
      if (selections[i] === questions[i].correctAnswer)
      {
        numCorrect++;
      }
    }
    score.append("congratulation! You got "+numCorrect+" out of "+questions.length+" questions right! ");
    return score;
  }
  const x = 1.2; 
  display = document.querySelector('#clock'); 
  clock_initialize(x);
  function clock_initialize(x)
  {
    $count_from_minutes = x;
    let  $timer_time = 60 * $count_from_minutes;
    let $time_at_start = x;
    startTimer($timer_time, display, $time_at_start);
  }
  function startTimer($timer_time, display)
  {
    var interval = setInterval(function ()
    {
      let days = Math.floor($timer_time /86400);
      let hours = Math.floor(($timer_time -(days * 86400)) / 3600);
      let minutes = Math.floor(($timer_time - (days * 86400) - (hours * 3600)) / 60);
      let secs = Math.floor(($timer_time - (days * 86400) - (hours * 3600) - (minutes * 60)));
      minutes = minutes < 10 ? "0" + minutes : minutes;
      secs = secs < 10 ? "0" + secs : secs;
      display.innerHTML ="<div class=\"minutes\">"+ minutes +"</div>\n"+"<div class=\"clock-dots\">:</div>"+
      "<div class=\"seconds\">"+ secs +"</div>";
      $timer_time--;
      if($timer_time <= 59)
      {
        $('#clock').css({"color":"red"});
      }
      if($timer_time >= -1 && $timer_time < 10 )
      {
        $('.seconds').css({"animation" : "scale-secs 1s infinite", "animation-iteration-count": "10"});
      }
      if($timer_time === -1 )
      {
        clearInterval(interval);
        $('#clock').css({"animation" : "countdown-over .9s infinite", "animation-iteration-count": "3"});
        $('.seconds').css({"animation" : "none"}); 
        var scoreElem2 = displayScore();
        quiz.append(scoreElem2).fadeIn();
        $("#next").hide();
        $("#prev").hide();
        alert('time out');
      }
      return $timer_time;
    },1000);
  }
});