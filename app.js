// strike button
var strikebutton = document.querySelector("#strike")
// resetbutton
var resetbutton = document.querySelector("#reset")
     

// score tags
var team1score_tag = document.getElementById("score-team1")
var team2score_tag = document.getElementById("score-team2")
    

var team1wicket_tag = document.getElementById("wicket-team1")
var team2wicket_tag = document.getElementById("wicket-team2")


// audio tags
var strikeaudio = new Audio("http://bit.ly/so-ball-hit")
var gameoveraudio = new Audio("http://bit.ly/so-crowd-cheer")


// variables to keep track of game
var team1Score = 0
var team2Score = 0
var team1Wickets = 0
var team2Wickets = 0
var team1Ballsfaced = 0
var team2Ballsfaced = 0
var turn = 1



var possibleOutcomes = [0,1,2,3,4,6,"w"];

// console.log(possibleOutcomes[4])

strikebutton.addEventListener("click",strikebuttonclicked)


function strikebuttonclicked(){
    // audio play
    strikeaudio.pause();  //pause the previous audio
    strikeaudio.currentTime = 0; //bring the time to 0
    strikeaudio.play();
    

    //choosing random value
    var randomness = Math.random()
    // console.log("randomness:",randomness)
    var random1 = randomness * possibleOutcomes.length
    var randomindex = Math.floor(random1);
    console.log("randomindex: ",randomindex);
    var randomvalue = possibleOutcomes[randomindex];
    console.log("randomvalue: ",randomvalue);


// india batting
if(turn==1){
    team1Ballsfaced++
    var ball = document.querySelector(`#team-1-superover div:nth-child(${team1Ballsfaced})`)
    ball.innerHTML = randomvalue

    if(randomvalue=="w"){
        team1Wickets++
    } else{
        team1Score+=randomvalue
    }


if(team1Ballsfaced==6 || team1Wickets==2){
    turn = 2
    console.log(turn)
}
    
    updateScore()


}





// pak batting
if(turn == 2){
    team2Ballsfaced++
    var ball = document.querySelector(`#team-2-superover div:nth-child(${team2Ballsfaced})`)
    ball.innerHTML = randomvalue

    if(randomvalue=="w"){
        team2Wickets++
    } else{
        team2Score+=randomvalue
    }


if(team2Score > team1Score || team2Wickets == 2 || team2Ballsfaced == 6){
    turn=3;
    setTimeout(()=>{
        gameover()

    },50);
    


}
    
    updateScore()
}
}

function updateScore(){
team1score_tag.innerHTML = team1Score
team1wicket_tag.innerHTML = team1Wickets
team2score_tag.innerHTML = team2Score
team2wicket_tag.innerHTML = team2Wickets

}
function gameover(){
    gameoveraudio.pause();  //pause the previous audio
    gameoveraudio.currentTime = 0; //bring the time to 0
    gameoveraudio.play();
    if (team1Score > team2Score){
        alert("INDIA WINS!")
    }else if(team1Score > team2Score){
        alert("PAK WINS!")
    } else{
        alert("Its a tie")
    }    
    document.querySelectorAll(".ball").forEach(e=> {
        if(e.innerHTML==""){
            e.innerHTML = "X"
            e.style.backgroundColor="grey"
            

    }
    })
    
}

resetbutton.addEventListener("click", resetfunction)
function resetfunction(){
    window.location.reload()
}