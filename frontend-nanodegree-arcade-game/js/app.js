
"use strict";

// reset players after collision and win conditions
function reset() {
    player.x = 200;
    player.y = 400;
}

//Enemy class
var Enemy = function (x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random()* 200);

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 101 * 5) {
        //Speed  
        this.x += dt * this.speed  ;
    }
    else {
        // reset the enemy posistion to start   
        this.x = -101;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write our own Player class
// This class requires an update(), render() and
// a handleInput() method.

//********************************************************************

var Player = function(){
        this.x = 200;
        this.y = 400;
        this.sprite = 'images/char-boy.png';
        this.win = false;
    };
    // Drawing the player on x , y co- ordinates
    Player.prototype.render = function () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
    // Check for collisions ,gems accumulation and win condition
    Player.prototype.update = function(){
        for (let enemy of allEnemies) {
            if (this.y === enemy.y && (enemy.x + 75 >= this.x && enemy.x - 75 <= this.x)) {
                reset();
            }
        }
        if (this.y < 25) {
            this.win = true;
            reset();
            alert("You Won !!!!");
            setTimeout(function () {
                this.win = false;
            }, 1000);

        }
    }

    //Update the players x and y co-ordinates as per user input
    Player.prototype.handleInput = function(key) {
        if (key==='right' && this.x<400) {
            this.x += 101;
          }
          else if (key==='down' && this.y<394) {
            this.y += 83;
          }
          else if (key==='left' && this.x>1) {
            this.x -= 101;
          }
          else if (key==='up' && this.y>1) {
            this.y -= 83;
    }

};


// object creation for Player ,enemy classes and adding enemies
let player = new Player();
let enemy = new Enemy(-101, 68);
let enemy1 = new Enemy(-202, 68);
let enemy2 = new Enemy(-101,151)
const allEnemies = [enemy , enemy1, enemy2];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
