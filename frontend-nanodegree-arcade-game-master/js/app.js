"use strict";

const positionG = [1, 102, 203, 303, 404];
const positionE = [63, 146, 229];
const gemsT = ['images/Gem Blue.png', 'images/Gem Green.png', 'images/Gem Orange.png'];
const modal = document.querySelector('.modal');
const modalloss = document.querySelector('.modal-loss');
const score = document.querySelector('.scores');
const gems = document.querySelector('.gems');
const imgs = document.querySelectorAll('img');
// Choosing players option
for (let i= 0;i<imgs.length;i++){
    imgs[i].addEventListener('click',function(){  
        player.sprite = imgs[i].getAttribute('src'); 
    })
}
// function to get the randomizied value of array
function randomAr(array) {
return array[Math.floor(Math.random() * array.length)];
};
// Enemy class consisting of constructor , having the position of enemy and update and render methods
class Enemy{
constructor(x,y){
    this.x = x;
    this.y = y;
    this.speed =Math.floor(Math.random() * 50) +20;
    this.sprite = 'images/enemy-bug.png';
 }
}
//enemy position is getting updated
Enemy.prototype.update = function(dt) {
if (this.x <= 101 * 4) {
    //Speed  
    this.x += dt * this.speed  ;
}
else {
    // reset the enemy posistion to start   
    this.x = -101;
}  
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
ctx.drawImage(Resources.get(this.sprite), this.x,this.y);
};
// Player class with constructor , update method (collision ,wining and losing conditions), render method and handleinput method for player movement
class Player{ 
constructor(){
    this.x = 101 * 2;
    this.y = 83 * 4;
    this.sprite = 'images/char-boy.png';
    this.startX = 101;
    this.startY = 83 + 5;
    this.win = false;
    this.count = 0;

}
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
 };
Player.prototype.update = function(){
    let numOfCollisions = document.querySelector('.collisions');
    let gemCount = document.querySelector('.gemcount');
    let gemCountloss = document.querySelector('.gemcounts');

for (let enemy of allEnemies) {
    // collision condition
    if (this.y === enemy.y && (enemy.x + 75 >= this.x && enemy.x - 75 <= this.x)){
        reset();
        this.count+=1;
        score.innerHTML = this.count;
        // wining condition with confirmation message
        if ( this.count >= 5){
            modalloss.style.display = "block";
            gemCountloss.innerHTML = gem.gemCount; 
        }
    }
}
    // losing condition with confirmation message
    if (this.y  <= 0){
        modal.style.display = "block";
        numOfCollisions.innerHTML = this.count;
        gemCount.innerHTML = gem.gemCount; 
        this.win = true;
    }
}

Player.prototype.handleInput = function(input){
switch(input){
    case  'up':
        if (this.y >= 0){
            this.y -=this.startY;
    }
        break;
    case  'down':
    if (this.y <= 83 * 4){
        this.y +=this.startY;
    }
        break;
    case  'left':
    if (this.x >= 0){
        this.x -= 105;
    }
        break;
    case  'right':
    if (this.x <= 101 * 4){
        this.x += this.startX + 5;
    }
        break;
}
}
//function to get reset the player posistion
function reset(){
    player.x = 202;
    player.y = 332;
};
//Gem method with constructor , update (gem collection condition) and render method
let Gem = function(x,y){    
    this.x = x;
    this.y = y;   
    this.sprite = randomAr(gemsT);
    this.gemCount = 0;
};

Gem.prototype.update = function() { 
    const gems = document.querySelector('.gems'); 
    // gem collections condition   
    if (player.y <= this.y +20 &&(player.x + 40 >= this.x && player.x - 40 <= this.x))  {
        this.sprite = randomAr(gemsT);
        this.x = randomAr(positionG);
        this.y = randomAr(positionE);
        this.render()
        this.gemCount+=1;
        gems.innerHTML = this.gemCount;
    }
};
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// object initiation for Player , Enemy and Gem
let player = new Player(); 
let enemy = new Enemy(-101,68);
let enemy1 = new Enemy(-202,68);
let enemy2 = new Enemy(-303,156);
const allEnemies = [enemy,enemy1,enemy2];
let gem = new Gem(randomAr(positionG),randomAr(positionE));
// Play Again and Return Game button functionalities
document.querySelector('.playAgain').addEventListener('click', playAgain);
document.querySelector('.returnGame').addEventListener('click', returnGame);

function playAgain(){
    modal.style.display = "none";
    score.innerHTML = 0;
    gems.innerHTML = 0;
    gem.gemCount = 0;
    player.count = 0;
    reset();
}

function returnGame(){
    modalloss.style.display = "none";
    score.innerHTML = 0;
    gems.innerHTML = 0;
    gem.gemCount = 0;
    player.count = 0;
    reset();
}
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
};

player.handleInput(allowedKeys[e.keyCode]);
});
