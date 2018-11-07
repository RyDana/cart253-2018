// Ball
//
// A class to define how an enemy ball behaves. Including bouncing on the top,
// bottom, right and left edges of the canvas,
// and hitting the paddles.


// Ball constructor
//
// Sets the properties with the provided arguments
function EnemyBall(x,y,vx,vy,size,speed) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
  this.r = 2; //corner radius
  this.color = [255,0,0]; //color of ball
  //min and max speed of ball
  this.minSpeed = 3;
  this.maxSpeed = 10;
}

// update()
//
// Moves according to velocity, constrains y and x to be on screen,
// checks for bouncing on edges
EnemyBall.prototype.update = function () {
  // Update position with velocity
  this.x += this.vx;
  this.y += this.vy;

  // Constrain y position to be on screen
  this.y = constrain(this.y,0 + this.size/2,height-this.size/2);
  this.x = constrain(this.x,0 + this.size/2,width-this.size/2);

  // Check for touching upper or lower edge and reverse velocity if so
  if (this.y - this.size/2 === 0 || this.y + this.size/2 === height) {
    this.vy = -this.vy;
  }
  // Check for touching right or left edge and reverse velocity if so
  if (this.x - this.size/2 === 0 || this.x + this.size/2 === width) {
    this.vx = -this.vx;
  }

}

// display()
//
// Draw the ball as a rectangle on the screen
EnemyBall.prototype.display = function () {
  fill(this.color[0],this.color[1],this.color[2]);
  rect(this.x,this.y,this.size,this.size, this.r);
}

// handleCollision(paddle)
//
// Check if this ball overlaps the paddle passed as an argument
// and if so changes paddle's wasHit proprety
EnemyBall.prototype.handleCollision = function(paddle) {
  // Check if the ball overlaps the paddle on x axis
  if (this.x + this.size/2 > paddle.x - paddle.w/2 && this.x - this.size/2 < paddle.x + paddle.w/2) {
    // Check if the ball overlaps the paddle on y axis
    if (this.y + this.size/2 > paddle.y - paddle.h/2 && this.y - this.size/2  < paddle.y + paddle.h/2) {

      // Play the hit sound effect by rewinding and then playing
      // beepSFX.currentTime = 0;
      // beepSFX.play();

      //Changes the paddle proprety that triggers a disadvantage
      paddle.wasHit = true;

      //Play sound
      hitSound.play();

      //restets position of the ball
      this.reset();
    }
  }
}

// reset()
//
// Set position back to the middle of the screen
// and moves it in a randomdirection and velocity
EnemyBall.prototype.reset = function() {
  this.x = width/2;
  this.y = height/2;

  //decides wether x velocity is positive or negative, at random
  var posOrNeg = Math.random() < 0.5 ? -1 : 1;

  //assigns a random x velocity
  this.vx = random(this.minSpeed,this.maxSpeed) * (posOrNeg);

  //assigns a random y velocity and direction
  posOrNeg = Math.random() < 0.5 ? -1 : 1;
  this.vy = random(this.minSpeed,this.maxSpeed) * (posOrNeg);
}
