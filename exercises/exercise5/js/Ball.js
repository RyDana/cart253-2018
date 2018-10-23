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
  this.y = constrain(this.y,0,height-this.size);

  // Check for touching upper or lower edge and reverse velocity if so
  if (this.y === 0 || this.y + this.size === height) {
    this.vy = -this.vy;
  }
}

// isOffScreen()
//
// Checks if the ball has moved off the screen and, if so, returns true.
// Otherwise it returns false.
Ball.prototype.isOffScreen = function(rightPaddle,leftPaddle) {
  // Check for going off screen and reset if so
  if (this.x + this.size/2 < 0) {
    // If it went off the left side
    //Increase score of right paddle
    rightPaddle.score ++;
    //changing the color of the paddle
    rightPaddle.changePaddleColor();
    //Call ball reset, the ball will move in positive vx (function's parameter)
    this.reset(1);
    //Trigger winning point animation and sounds
    rightPaddle.hasScored = true;
    if (rightPaddle.score%10 == 0){
      levelUpSound.play();
    } else {
      pointSound.play();
    }
    return true;
  }
  else if(this.x - this.size/2 > width){
    //If it went off the right side
    //Increase score of left paddle
    leftPaddle.score ++;
    //changing the color of the paddle
    leftPaddle.changePaddleColor();
    //Call ball reset, the ball will move in negative vx (function's parameter)
    this.reset(-1); //TODO:check if okay???
    //Trigger winning point animation and sounds
    leftPaddle.hasScored = true;
    if (leftPaddle.score%10 == 0){
      levelUpSound.play();
    } else {
      pointSound.play();
    }
    return true;
  }
  else {
    return false;
  }
}

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
  if (this.x + this.size > paddle.x && this.x < paddle.x + paddle.w) {
    // Check if the ball overlaps the paddle on y axis
    if (this.y + this.size > paddle.y && this.y < paddle.y + paddle.h) {
      // If so, move ball back to previous position (by subtracting current velocity)
      this.x -= this.vx;
      this.y -= this.vy;
      // Reverse x velocity to bounce
      this.vx = -this.vx;
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

  ball.vx = xDirection * ball.speed;
  ball.vy = random(3,15);
}
