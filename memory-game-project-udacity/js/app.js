const iconsList = ['fa-diamond', 'fa-diamond',
'fa-paper-plane-o', 'fa-paper-plane-o',
'fa-anchor', 'fa-anchor',
'fa-bolt', 'fa-bolt',
'fa-cube', 'fa-cube',
'fa-leaf', 'fa-leaf',
'fa-bicycle', 'fa-bicycle',
'fa-bomb', 'fa-bomb'];
const icons = shuffle(iconsList);
let openedCard = [];
let matchedCard = [];
let timerCount = 0;
let seconds = 0;
let moveCount = 0;
let starCount =  0;                        
const cardsCont = document.querySelector('.deck');
const timerConst = document.querySelector('.timer');
const moveConst = document.querySelector('.moves');
const starConst = document.querySelector('.stars');
const gameConst = document.querySelector('.modal');
const gameOvertimerConst = document.querySelector('.finalTime');
const gameOvermoveConst = document.querySelector('.finalMoves');
const gameOverstarConst = document.querySelector('.finalRating');
const playAgainConst = document.querySelector('.button');
const restartConst = document.querySelector('.restart');

// Initiate the game - prepare the deck , click functionality on cardsand initiate timer
function startGame(){
    startTimer();
    for(let i = 0;i< iconsList.length;i++){
        const card = document.createElement('li');
        card.classList.add('card');
        card.innerHTML = `<i class="fa ${iconsList[i]}"></i>`;
        cardsCont.appendChild(card);   
        clickCard(card);
  }
}

// timer functionality
function startTimer(){
    timerCount = setInterval(function(){
    timerConst.innerHTML = seconds + 'secs';
    seconds ++;
    },1000); 
}
 //stop timer functionlity
function stopTimer(){
    clearInterval(timerCount);
}

//count the number of moves to complete the game
function countMove(){
     moveCount++;
     moveConst.innerHTML = moveCount;
}

//provide star rating based on the number of moves taken
function countStar(){
     if (moveCount <= 20){
         starConst.innerHTML = `<i class="fa fa-star"></i>
                                 <i class="fa fa-star"></i> 
                                  <i class="fa fa-star"></i>`; 
         starCount = 3;                          
     }
     if (moveCount > 21){
        starConst.innerHTML = `<i class="fa fa-star"></i>
                                 <i class="fa fa-star"></i>`; 
        starCount = 2;               
    }
    if(moveCount > 35){
        starConst.innerHTML = `<i class="fa fa-star"></i>`;
        starCount = 1;
    }
}

// game over condition
function gameOver(){
    stopTimer();
    gameConst.style.display = "block";
    gameOvertimerConst.innerHTML = timerConst.innerHTML;
    gameOverstarConst.innerHTML = starCount;
    gameOvermoveConst.innerHTML = moveCount;
}
 // playAgain button click functionality
playAgainConst.addEventListener('click',playAgain);
function playAgain(){
    gameConst.style.display = "none";
    moveConst.innerHTML = 0;
    moveCount = 0;
    seconds = 0 ;
    stopTimer();
    starConst.innerHTML = `<i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i> 
                                    <i class="fa fa-star"></i>`;
    cardsCont.innerHTML = "";
    startGame();
    matchedCard = [];
    openedCard = [];
} 

//restart button click functionality
restartConst.addEventListener('click',restart);
function restart(){
    gameConst.style.display = "none";
    moveConst.innerHTML = 0;
    moveCount = 0;
    seconds = 0 ;
    stopTimer(); 
    starConst.innerHTML = `<i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i> 
                                    <i class="fa fa-star"></i>`;
    cardsCont.innerHTML = "";
    startGame();
    matchedCard = [];
    openedCard = []; 
}

// click card functionality
function clickCard(card){
      card.addEventListener("click", function(){
      if(openedCard.length === 1)  {  
       const currentCard = this;
        const previousCard = openedCard[0];
            card.classList.add ('open' , 'show', 'disabled');
            openedCard.push(this);
            countMove();
            countStar();
            compareCard(currentCard,previousCard);
      }
      else{
        card.classList.add ('open' , 'show', 'disabled');
        openedCard.push(this);
        countMove();
        countStar();
      } 
    });
}

// compare two matching card condition
function compareCard(currentCard,previousCard){
    if (currentCard.innerHTML == previousCard.innerHTML){
        previousCard.classList.add('match');
        currentCard.classList.add('match');
        matchedCard.push(currentCard,previousCard);
        // game won condition
         if (matchedCard.length === iconsList.length){
            gameOver();
         }
        openedCard = [];
    }
   else{
    currentCard.classList.add('wrong');
    previousCard.classList.add('wrong');
        setTimeout(function() {
            currentCard.classList.remove('open', 'show', 'wrong','disabled');
            previousCard.classList.remove('open', 'show', 'wrong', 'disabled');
            openedCard = [];
        }, 700);
        
  }
}
startGame();



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
let currentIndex = array.length, temporaryValue, randomIndex;

while (currentIndex !== 0) {
randomIndex = Math.floor(Math.random() * currentIndex);
currentIndex -= 1;
temporaryValue = array[currentIndex];
array[currentIndex] = array[randomIndex];
array[randomIndex] = temporaryValue;
}

return array;
}