var button_colors=["red", "blue", "green", "yellow"];
var game_pattern=[],userClickedPattern=[],lvl=0,started=false;

function nextSeq(){
    lvl++;
    $("#level-title").html("Level "+lvl);
    var randomNum=Math.floor(Math.random()*4);
    var randomChosenColour=button_colors[randomNum];
    game_pattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}


$(".btn").on("click",function(){
    if(started){
    var userChosenColour=this.id;
    userClickedPattern.push(userChosenColour);
    playSound(this.id);
    check_answer(userClickedPattern.length-1);
    }
    animatePress(this.id);
});

$(document).on("keypress",function(e){
    if(!started){
        nextSeq();
        started=true;
    }
});

function playSound(name){
    var audio=new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");  
    },100)
}

function check_answer(clicked){
    if(userClickedPattern[clicked]==game_pattern[clicked]){
        if(clicked==lvl-1){
            userClickedPattern=[];
            
            setTimeout(function(){
                nextSeq();
            },1000);
        }
    }
    else{
            var audio=new Audio("./sounds/wrong.mp3");
            audio.play();
            $("#level-title").html("Game Over, Press Any Key to Restart");
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            },200);
            //restart
            restart();
    }
}
function restart(){
    started=false;
    lvl=0;
    game_pattern=[];
    userClickedPattern=[];
}