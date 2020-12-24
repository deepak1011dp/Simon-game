var buttonColor = ["red","blue", "green", "yellow"];
var useClickedPattern = [];
var gamePattern = [];
var started = false;
var level = 0;

$(document).keydown(function(){
    if (!started){
        $("#level-title").text("level "+level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
    var userChoosenColor = $(this).attr("id");
    useClickedPattern.push(userChoosenColor);
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    checkAnswer(useClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if (useClickedPattern[currentLevel]===gamePattern[currentLevel]){

        if (useClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }   
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
    
        startOver();
    }
}

function nextSequence(){
    useClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChoosenColor = buttonColor[randomNumber];
    gamePattern.push(randomChoosenColor);
    $("#"+randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);
}

function playSound(name){
    var audio = new Audio("sounds/"+ name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}