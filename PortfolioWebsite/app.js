
// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.step = 101;
    this.x = x;
    this.y = y;
    this.speed = speed;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < this.step * 5){
     //Move forward and move by 200*dt   
        this.x += dt * this.speed; 
    }
    else{
    // reset the enemy posistion to start   
        this.x = -this.step;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

//********************************************************************

 class Hero {
     constructor(){ 
         this.step = 101;
         this.jump = 83;
         this.startX = this.step * 2;
         this.startY = (this.jump * 5);
         this.x = this.startX;
         this.y = this.startY;
         this.sprite = 'images/char-boy.png';
         this.victory = false;
     }
     // Drawing the player on x , y co- ordinates
     render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y); 
     }
     // Check for collisions and win conditions
     update(){
         for(let enemy of allEnemies){ 
             if (this.y === enemy.y && (enemy.x + enemy.step/2 > this.x && enemy.x < this.x + this.step/2)){
                this.reset();
             }                 
         }
         if( this.y < 25){
            this.victory = true ;        
            this.reset();
            setTimeout(function(){   
            this.victory = false;
            },1000);

         }
    }
     
     //Reset the hero after collision to the starting x and y
     reset(){
         this.x = this.startX;
         this.y = this.startY;
     }  
     //Update the players x and y co-ordinates as per user input
     handleInput(input){
         switch(input){
             case 'left' :
                 if ( this.x > 0 ){
                    this.x -= this.step;
                 }
                break;
            case 'up' :
                if ( this.y > 0 ){
                    this.y -= this.jump;
                }
                break;
            case 'right' :
                 if ( this.x < this.step * 4 ){
                    this.x += this.step;
                 }
                 break;
            case 'down' :
                if ( this.y < this.jump * 5 ){
                 this.y += this.jump;
                }
                 break;               
         }
     }
 }

 var Star = function() {
        this.sprite = 'images/Star.png';
        this.x = -101;
        this.y =  83;
        this.speed = 500;
    };
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    Star.prototype.update = function(dt) {
        this.y += this.speed * dt;
    };
    // Draw the enemy on the screen, required method for game
     
     Star.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };




 // oject creation for Hero ,enemy classes and adding enemies
 const player = new Hero();
 const star   = new Star();
 const bug = new Enemy(-101,83,200);
 const bug1 = new Enemy((-101*3),(83*2),200);
 const bug2 = new Enemy((-101*2.5),83,300);
 const allEnemies = [];
allEnemies.push(bug,bug1,bug2);
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
