// Ball
//
// A class to define how a ball behaves. Including bouncing on the top
// and bottom edges of the canvas, going off the left and right sides,
// and bouncing off paddles.


// Ball constructor
//
// Sets the properties with the provided arguments
function Ball(x,y,vx,vy,size,speed) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
  ////////NEW////////
  this.r = 2; //corner radius
  ////////END NEW////////
}

// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edgs, checks for going
// off left or right side.
Ball.prototype.update = function () {
  // Update position with velocity
  this.x += this.vx;
  this.y += this.vy;

  // Constrain y position to be on screen
  this.y = constrain(this.y,0 + this.size/2,height-this.size/2);

  // Check for touching upper or lower edge and reverse velocity if so
  if (this.y - this.size/2 === 0 || this.y + this.size/2 === height) {
    this.vy = -this.vy;
  }
}

////////NEW////////
// isOffScreen()
//
// Checks if the ball has moved off the screen and, if so,
// gives point to the winning player and returns true.
// Otherwise it returns false.
Ball.prototype.isOffScreen = function() {
  // Check for going off screen and reset if so
  if (this.x + this.size/2 < 0) {
    // If it went off the left side
    //trigger events related to score of right paddle
    rightPaddle.scored();

    //Call ball reset, the ball will move in positive vx (function's parameter)
    this.reset(1);
    return true;
  }
  else if(this.x - this.size/2 > width){
    //If it went off the right side
    //trigger events related to score of left paddle
    leftPaddle.scored();

    //Call ball reset, the ball will move in negative vx (function's parameter)
    this.reset(-1); //TODO:check if okay???
    return true;
  }
  else {
    return false;
  }
}
////////END NEW ////////

// display()
//
// Draw the ball as a rectangle on the screen
Ball.prototype.display = function () {
  fill(255);
  rect(this.x,this.y,this.size,this.size, this.r);
}

// handleCollision(paddle)
//
// Check if this ball overlaps the paddle passed as an argument
// and if so reverse x velocity to bounce
Ball.prototype.handleCollision = function(paddle) {
  // Check if the ball overlaps the paddle on x axis
  if (this.x + this.size/2 > paddle.x - paddle.w/2 && this.x - this.size/2 < paddle.x + paddle.w/2) {
    // Check if the ball overlaps the paddle on y axis
    if (this.y + this.size/2 > paddle.y - paddle.h/2 && this.y - this.size/2  < paddle.y + paddle.h/2) {
      // If so, move ball back to previous position (by subtracting current velocity)
      // this.x -= this.vx;
      // this.y -= this.vy;
      // Reverse x velocity to bounce
      this.vx = -this.vx;

      ////////NEW////////
      // Play our bouncing sound effect by rewinding and then playing
      beepSFX.currentTime = 0;
      beepSFX.play();
      ////////END NEW////////
    }
  }
}

// reset()
//
// Set position back to the middle of the screen
// and moves it towards the player with the winning last point
// at a random Y velocity
Ball.prototype.reset = function(xDirection) {
  this.x = width/2;
  this.y = height/2;

  ////////NEW////////
  ball.vx = xDirection * ball.speed;
  ball.vy = random(3,10);
  ////////END NEW////////
}
