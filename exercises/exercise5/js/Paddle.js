// Paddle
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down

// Paddle constructor
//
// Sets the properties with the provided arguments or defaults
function Paddle(x,y,w,h,speed,downKey,upKey,smallPaddleOffset) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.w = w;
  this.h = h;
  this.speed = speed;
  this.downKey = downKey;
  this.upKey = upKey;
  ////////NEW////////
  this.r = 5; //corner radius
  this.sr = 5; //corner radius of small rectangle
  this.score = 0; //player score
  this.color = [255,255,255]; //paddle color
  this.smallPaddleColor = [255,255,255]; //paddle color of small rectangle
  this.smallPaddleOffset = smallPaddleOffset; //small rectangle offset from the Paddle
  this.smallPaddleSize = 10 //by how much the small rectangle is smaller than the paddle
  this.hasScored = false; //detection if player scored the last point
  this.animationTime = 0; //timer for animation once player scored
  this.animationEllipseSize = 20; //size of ellipse involved in animation
  this.animationEllipseOpacity = 50; //opacity of ellipse involved in animation
  ////////END NEW////////
}

// handleInput()
//
// Check if the up or down keys are pressed and update velocity
// appropriately
Paddle.prototype.handleInput = function() {
  if (keyIsDown(this.upKey)) {
    this.vy = -this.speed;
  }
  else if (keyIsDown(this.downKey)) {
    this.vy = this.speed;
  }
  else {
    this.vy = 0;
  }
}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Paddle.prototype.update = function() {
  this.y += this.vy;
  this.y = constrain(this.y,0,height-this.h);
}

// display()
//
// Draw the paddle as a rectangle on the screen
Paddle.prototype.display = function() {
  fill(this.color[0], this.color[1],this.color[2]);
  rect(this.x,this.y,this.w,this.h);
}
