// PlayerMobile
//
// A class that defines how a player behaves using a touch-based
// game controller defined in this class as well.

// Player constructor
//
// Sets the properties with the provided arguments or defaults
function PlayerMobile(x,y) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.w = 20;
  this.h = 30;
  this.color = [0,0,0];
  this.speed = 5;
  this.jumping = false;
  this.jumpSpeed = 40; //speed upwards during jump
  this.downKeyPressed = false;
  this.upKeyPressed = false;
  this.leftKeyPressed = false;
  this.rightKeyPressed  = false;
  this.jumpKeyPressed = false;
  this.shootKeyPressed = false;
  this.facingRight = true; //Check which side of canvas player is facing
  this.bulletArray = []; //An array containing bullets shot by player
  this.shot = false; //boolean showing if mouse press released a bullet
}


PlayerMobile.prototype.playerController = function(){
  // The touches array holds an object for each and every touch
  // Cycle through the touches to check if they interact with the player
  // mobile controller
  for (var i = 0; i < touches.length; i++) {

    //check on which side of the screen is the touch
    //if it is on the left, analyze where it is on the left game pad
    if(touches[i].x < width/2){
      //touching the left side of the controller
      if(touches[i].x < 130 && touches[i].x > 30 && touches[i].y > height-330 && touches[i].y < height-30 ){
        this.leftKeyPressed = true;
      } else{
        this.leftKeyPressed = false;
      }

      //touching the right side of the controller
      if(touches[i].x < 330 && touches[i].x > 230 && touches[i].y > height-330 && touches[i].y < height-30 ){
        this.rightKeyPressed = true;
      } else{
        this.rightKeyPressed = false;
      }

      //touching the bottom side of the controller
      if(touches[i].x < 330 && touches[i].x > 30 && touches[i].y > height-130 && touches[i].y < height-30 ){
        this.downKeyPressed = true;
      } else{
        this.downKeyPressed = false;
      }

      //touching the top side of the controller
      if(touches[i].x < 330 && touches[i].x > 30 && touches[i].y > height-330 && touches[i].y < height- 230 ){
        this.upKeyPressed = true;
      } else{
        this.upKeyPressed = false;
      }

      //make both jump and shoot "false" if there is only one touch
      //and it is situated on the left side of the canvas (since the following
      //"else" statement will not be triggered if there is only one touch
      // situated on the left side, thus there will be nothing to turn the
      //shoot/jump keys to a "false" state)
      if(touches.length === 1){
        this.jumpKeyPressed = false;
        this.shootKeyPressed = false;
      }
    //if it is on the right, analyze if it touches the right buttons
    } else{
      //touching the jump key
      if(touches[i].x < width-130 && touches[i].x > width-230 && touches[i].y > height-130 && touches[i].y < height-30 ){
        this.jumpKeyPressed = true;
      } else{
        this.jumpKeyPressed = false;
      }

      //touching the shoot key
      if(touches[i].x < width-30 && touches[i].x > width-130 && touches[i].y > height-230 && touches[i].y < height-130 ){
        this.shootKeyPressed = true;
      } else{
        this.shootKeyPressed = false;
      }

      //make the direction keys "false" if there is only one touch
      //and it is situated on the right side of the canvas (since the previous
      //"if" statement will not be triggered if there is only one touch situated
      // on the right side, thus there will be nothing to turn the direction
      // keys to a "false" state)
      if(touches.length === 1){
        this.downKeyPressed = false;
        this.upKeyPressed = false;
        this.leftKeyPressed = false;
        this.rightKeyPressed  = false;
      }
    }

    //NOTE: the primary analysis of wether the touch was on the right or left
    //of the canvas was done so that the touch on the right of the canvas will
    //not put the movement keys (up/down/left/right) in a "false" state
    //(since that touch is not situated on the left game pad)
  }

  //the previous "for" loop is useless if there is no touch, thus we can not
  //put the player propreties to "false" state. This will remedie to it.
  if(touches.length === 0){
    this.downKeyPressed = false;
    this.upKeyPressed = false;
    this.leftKeyPressed = false;
    this.rightKeyPressed  = false;
    this.jumpKeyPressed = false;
    this.shootKeyPressed = false;
  }
}

//drawControls()
//
//Draws the outline of up/down/left/right/shoot/jump buttons
PlayerMobile.prototype.drawControls = function(){
  push();
  noFill();
  stroke(0);
  //left gamepad for movement
  ellipse(180,height-280, 100);
  ellipse(280,height-180, 100);
  ellipse(180,height-80, 100);
  ellipse(80,height-180, 100);

  //right gamepad for jump and shoot
  ellipse(width-180, height-80, 100);
  ellipse(width-80, height-180, 100);
  pop();
}

// handleInputMove()
//
// Check if the left or right keys are pressed and update velocity
// appropriately
PlayerMobile.prototype.handleInputMove = function() {
  if (this.leftKeyPressed) {
    this.vx = -this.speed;
    this.facingRight = false;
  }
  else if (this.rightKeyPressed) {
    this.vx = this.speed;
    this.facingRight = true;
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
PlayerMobile.prototype.handleInputJump = function() {
  //If upkey pressed and player is not jumping already
  if (this.jumpKeyPressed && this.jumping === false) {
    this.vy = -this.jumpSpeed; //upwards velocity
    this.jumping = true; //jumping state becomes true
  }
  //Quickly releasing the key after pressing it does a smaller jump
  //If player released up key and player is still in mid air
  // if(!keyIsDown(this.jumpKey) && this.jumping === true){
  //   this.vy += 4; //force the player down faster ("increased gravity")
  // }

}

// handleInputCrouch()
//
// Check if the crouch (down) key is pressed and change player size accordingly
PlayerMobile.prototype.handleInputCrouch = function() {
  //If downKey pressed and player is not jumping
  if (this.downKeyPressed && this.jumping === false) {
    this.h = 20;
  } else{
    this.h = 30;
  }

}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
PlayerMobile.prototype.update = function() {
  // After Player reaches the peak of the jump (falls down)
  //"increase gravity" to make the player fall down faster
  if(this.vy < 0){
    this.vy += 4;
  //Otherwise apply "normal gravity" downwards
  } else {
    this.vy += 1.5;
  }

  //Update Y position and constrain on canvas
  this.y += this.vy;
  this.y = constrain(this.y,0+this.h/2,height-this.h/2);

  //If Player is on the "gound" (bottomof canvas),
  //stop inducing any velocity downwards
  if(this.y === height-this.h/2){
    this.vy = 0;

    //Once the player releases the "jump" key after a jump
    //allow player to make subsequent jump by changing jumping state to false
    //Otherwise the player will do multiple jumps if "jump" key remains pushed down
    if(!this.jumpKeyPressed){
      this.jumping = false;
    }
  }

  //Update X position and constrain on canvas
  this.x += this.vx;
  this.x = constrain(this.x,0+this.w/2,width-this.w/2);
}

// display()
//
// Draw the player as a rectangle on the screen with a little ellipse as an eye
PlayerMobile.prototype.display = function() {
  push();
  fill(this.color[0], this.color[1],this.color[2]); //black
  rect(this.x,this.y,this.w,this.h, this.r);
  fill(255); // white
  if(this.facingRight){
    ellipse(this.x + this.w/4, this.y - this.h/2 + 5, 5);
  } else{
    ellipse(this.x - this.w/4, this.y - this.h/2 + 5, 5);
  }
  pop();
}

PlayerMobile.prototype.shoot = function() {
  //check state of player
  if(this.shootKeyPressed && this.shot === false){
      //create a new bullet and push it into the array
      this.bulletArray.push(new Bullet(this.x, this.y, this.facingRight, this.upKeyPressed));
      //Change shooting state
      this.shot = true;
  }

  //Player allowed to shoot another bullet only when releases the mouse
  if(!this.shootKeyPressed){
    this.shot = false;
  }
}


//updateBullets()
//
//Updates all the bullets' positions in the bullet array
PlayerMobile.prototype.updateBullets = function (){
  if(this.bulletArray.length > 0){
    for(i = 0; i < this.bulletArray.length; i++){
      this.bulletArray[i].update();
    }
  }

}

//displayBullets()
//
//Dispplays all the bullets in the bullet array
PlayerMobile.prototype.displayBullets = function (){
  if(this.bulletArray.length > 0){
    for(i = 0; i < this.bulletArray.length; i++){
      this.bulletArray[i].display();
    }
  }
}
