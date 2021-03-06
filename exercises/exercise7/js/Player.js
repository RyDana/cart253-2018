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
  this.speed = 8;
  this.jumping = false;
  this.jumpSpeed = 40; //speed upwards during jump
  this.downKey = 83; //S key
  this.upKey = 87; //W key
  this.leftKey = 65; //A key
  this.rightKey  = 68; //D key
  this.jumpKey = 80; //P key
  this.shootKey = 79; //O key
  this.facingRight = true; //Check which side of canvas player is facing
  this.bulletArray = []; //An array containing bullets shot by player
  this.shot = false; //boolean showing if mouse press released a bullet
}

// handleInputMove()
//
// Check if the left or right keys are pressed and update velocity
// appropriately
Player.prototype.handleInputMove = function() {
  if (keyIsDown(this.leftKey)) {
    this.vx = -this.speed;
    this.facingRight = false;
  }
  else if (keyIsDown(this.rightKey)) {
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
Player.prototype.handleInputJump = function() {
  //If upkey pressed and player is not jumping already
  if (keyIsDown(this.jumpKey) && this.jumping === false) {
    this.vy = -this.jumpSpeed; //upwards velocity
    this.jumping = true; //jumping state becomes true
  }
  //Quickly releasing the key after pressing it does a smaller jump
  //If player released up key and player is still in mid air
  if(!keyIsDown(this.jumpKey) && this.jumping === true){
    this.vy += 4; //force the player down faster ("increased gravity")
  }

}

// handleInputCrouch()
//
// Check if the crouch (down) key is pressed and change player size accordingly
Player.prototype.handleInputCrouch = function() {
  //If downKey pressed and player is not jumping
  if (keyIsDown(this.downKey) && this.jumping === false) {
    this.h = 20;
  } else{
    this.h = 30;
  }

}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Player.prototype.update = function() {
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
    if(!keyIsDown(this.jumpKey)){
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
Player.prototype.display = function() {
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

Player.prototype.shoot = function() {
  // //angle between player center and mouse
  // var angle = atan((this.y - mouseY)/( this.x - mouseX));
  //
  // //If player presses mouse and player is not currently shooting
  // if(mouseIsPressed && this.shot === false){
  //   //create a new bullet and push it into the array
  //   this.bulletArray.push(new Bullet(this.x, this.y, angle));
  //   console.log(angle);
  //   //Change shooting state
  //   this.shot = true;
  // }
  //
  // //Player allowed to shoot another bullet only when releases the mouse
  // if(!mouseIsPressed){
  //   this.shot = false;
  // }

  //check state of player
  if(keyIsDown(this.shootKey) && this.shot === false){
      //create a new bullet and push it into the array
      this.bulletArray.push(new Bullet(this.x, this.y, this.facingRight, keyIsDown(this.upKey)));
      //Change shooting state
      this.shot = true;
  }

  //Player allowed to shoot another bullet only when releases the mouse
  if(!keyIsDown(this.shootKey)){
    this.shot = false;
  }
}


//updateBullets()
//
//Updates all the bullets' positions in the bullet array
Player.prototype.updateBullets = function (){
  if(this.bulletArray.length > 0){
    for(i = 0; i < this.bulletArray.length; i++){
      this.bulletArray[i].update();
    }
  }

}

//displayBullets()
//
//Dispplays all the bullets in the bullet array
Player.prototype.displayBullets = function (){
  if(this.bulletArray.length > 0){
    for(i = 0; i < this.bulletArray.length; i++){
      this.bulletArray[i].display();
    }
  }
}
