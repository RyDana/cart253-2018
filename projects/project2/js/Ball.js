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
  this.r = 2; //corner radius
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

// isOffScreen()
//
// Checks if the ball has moved off the screen and, if so,
// returns ball's x position.
// Otherwise it returns half of canvas' width: an x position where the
// ball is certainly not off screen.
Ball.prototype.isOffScreen = function() {
  if (this.x + this.size/2 < 0 || this.x - this.size/2 > width) {
    return this.x;
  }
  else {
    return width/2 ;
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
  if (this.x + this.size/2 > paddle.x - paddle.w/2 && this.x - this.size/2 < paddle.x + paddle.w/2) {
    // Check if the ball overlaps the paddle on y axis
    if (this.y + this.size/2 > paddle.y - paddle.h/2 && this.y - this.size/2  < paddle.y + paddle.h/2) {
      // If so, move ball back to previous position (by subtracting current velocity)
      // this.x -= this.vx;
      // this.y -= this.vy;
      // Reverse x velocity to bounce
      this.vx = -this.vx;

      // Play our bouncing sound effect by rewinding and then playing
      beepSFX.currentTime = 0;
      beepSFX.play();
    }
  }
}

// reset()
//
// Set position back to the middle of the screen
// and moves it towards the player with the winning last point
// at a random Y velocity
Ball.prototype.reset = function() {
  this.x = width/2;
  this.y = height/2;

  this.vx = -this.vx;
  this.vy = random(3,10);
}
