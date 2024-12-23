const newGame = document.querySelector('.btn--new');
const hold = document.querySelector('.btn--hold');
const submit = document.querySelector('.btn--submit');
const problemLabel = document.querySelector('.label-problem');
const inputLabel = document.querySelector('.current-answer');
const p1ScoreLabel = document.getElementById('score--0')
const p2ScoreLabel = document.getElementById('score--1')
const correctSound = new Audio('click.mp3');
const timerLabel = document.querySelector('.timer');
const p0Class = document.querySelector('.player--0');
const p1Class = document.querySelector('.player--1');
let firstNumber = 0;
let secondNumber = 0;
let p1Score = 0;
let p2Score = 0;


hold.classList.add('hidden');

submit.classList.add('hidden');


//Function for the timer at the top of the screen during game
function startTimer(duration) {
    let timer = duration, minutes, seconds;
    const timerInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
    
        timerLabel.textContent = minutes + ":" + seconds;
        if(timerLabel.textContent == "00:00"){
            clearInterval(timerInterval);
            gameOver();
            timerLabel.textContent == "01:00"
        }
    
        if (--timer < 0) {
            timer = 0;
        }
    }, 1000);

}

//changes game state to over and changes screen depending on who won
function gameOver(){
    window.removeEventListener('keyup', checkAnswer);
    timerLabel.classList.add('hidden');
    
    problemLabel.textContent = "Game Over";
    if(p1Score > p2Score){
        p0Class.classList.add('winBackground');
        p1Class.classList.add('loseBackground');
        document.getElementById('name--0').textContent = "WINNER";

    }
    else if(p2Score > p1Score){
        document.getElementById('name--1').textContent = "WINNER";
        p1Class.classList.add('winBackground');
        p0Class.classList.add('loseBackground');
    }
    else{
        problemLabel.textContent = "Game Over\nTIED";
        document.body.classList.add('gameBackground');
    }
    newGame.classList.remove('hidden');
    newGame.addEventListener('click', setGame);
}

//checks if input is correct
function checkAnswer(){
    let answer = firstNumber*secondNumber;
    if(Number(inputLabel.value) === answer){
        correctSound.play();
        p1Score++;
        p1ScoreLabel.textContent = p1Score;
        generateProblem()
        inputLabel.value = "";
    }

}

//creates a new math problem
function generateProblem(){
    firstNumber = Math.trunc(Math.random() * 10 + 1);
    secondNumber = Math.trunc(Math.random() * 10 + 1);
    let problemString = `${firstNumber} x ${secondNumber}`;
    problemLabel.textContent = problemString;
}

//Sets game back to default state
function setGame(){
    timerLabel.classList.remove('hidden');
    newGame.removeEventListener('click', setGame);
    p1Class.classList.remove('winBackground');
    p0Class.classList.remove('loseBackground');
    p0Class.classList.remove('winBackground');
    p1Class.classList.remove('loseBackground');
    document.body.classList.add('gameBackground');
    newGame.classList.add('hidden');
    startTimer(5);
    window.addEventListener('keyup', checkAnswer);
    generateProblem();   
    inputLabel.textContent = "";
    p1ScoreLabel.textContent = 0;
    p2ScoreLabel.textContent = 0;
    document.getElementById('name--0').textContent = "Player 1";
    document.getElementById('name--1').textContent = "Player 2";
}

setGame();

