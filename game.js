// alert('hi')

var gamePattern = [];

var userClickedPattern = [];

var buttonColors = ['red', 'blue', 'green', 'yellow'];

var level = 0;

var started = false;

//keyboard key detected
$(document).keypress(function () {
    // console.log(event.key)
    if (!started) {
        $('#level-title').text('Level ' + level);

        nextSquence();
        started = true;

    }
});

$('.btn').click(function () {
    // alert('hi')
    var userChosenColour = $(this).attr('id');
    // console.log(userChosenColour);
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);

});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                nextSquence();
            }, 2000);

        }

    } else {

        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver()

    }
}

function nextSquence() {
    userClickedPattern = [];

    level++;
    $('#level-title').text('Level ' + level);

    var randomNum = Math.floor(Math.random() * 4);
    // console.log(randomNum)
    var randomChosenColor = buttonColors[randomNum];

    gamePattern.push(randomChosenColor);

    $('#' + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}

function animatePress(currentColour) {
    $('#' + currentColour).addClass('pressed');

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}


function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}