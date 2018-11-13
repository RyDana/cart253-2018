// Player
//
// A class that defines how a player behaves, including the ability
// to specify the input keys to move it

// Player constructor
//
// Sets the properties with the provided arguments or defaults
function Player(x,y) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.w = 20;
  this.h = 30;
  this.color = [0,0,0];
  this.speed = 10;
  this.jumping = false;
  this.jumpSpeed = 40;
  this.downKey = 83;
  this.upKey = 87;
  this.leftKey = 65;
  this.rightKey  = 68;
}

// handleInputMove()
//
// Check if the left or right keys are pressed and update velocity
// appropriately
Player.prototype.handleInputMove = function() {
  if (keyIsDown(this.leftKey)) {
    this.vx = -this.speed;
  }
  else if (keyIsDown(this.rightKey)) {
    this.vx = this.speed;
  }
  else {
    //Gradually slows down the player if no key is pressed
      if(this.vx < 0){
        this.vx += 1;
      } else if (this.vx > 0){
        this.vx -= 1;
      } else {
        this.vx = 0;
      }
  }
}

// handleInputJump()
//
// Check if the jump (up) key are pressed and update velocity
// appropriately
Player.prototype.handleInputJump = function() {
  if (keyIsDown(this.upKey) && this.jumping === false) {
    this.vy = -this.jumpSpeed;
    this.jumping = true;
  }
  //Quickly releasing the key after pressing it does a smaller jump
  if(!keyIsDown(this.upKey) && this.jumping === true){
    this.vy += 4;
  }

}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Player.prototype.update = function() {
  //Changing the gravity makes the player fall faster
  //after reaching the peak of the jump
  if(this.vy < 0){
    this.vy += 4;
  } else {
    this.vy += 1.5;
  }

  this.y += this.vy;
  this.y = constrain(this.y,0+this.h/2,height-this.h/2);

  if(this.y === height-this.h/2){
    this.vy = 0;
    if(!keyIsDown(this.upKey)){
      this.jumping = false;
    }
  }


  this.x += this.vx;
  this.x = constrain(this.x,0+this.w/2,width-this.w/2);
}

// display()
//
// Draw the paddle as a rectangle on the screen
Player.prototype.display = function() {
  push();
  fill(this.color[0], this.color[1],this.color[2]);
  rect(this.x,this.y,this.w,this.h, this.r);
  pop();
}
