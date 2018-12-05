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
  this.h = 32;
  this.life = 100;
  this.color = [0,0,0];
  this.speed = 3;
  this.touchingEnemy = false;
  this.jumping = false;
  this.jumpSpeed = 15; //speed upwards during jump
  this.downKeyPressed = false;
  this.upKeyPressed = false;
  this.leftKeyPressed = false;
  this.rightKeyPressed  = false;
  this.jumpKeyPressed = false;
  this.shootKeyPressed = false;
  this.facingRight = true; //Check which side of canvas player is facing
  this.lookingUp = false; //Check if player looking up
  this.bulletArray = []; //An array containing bullets shot by player
  this.bulletSpeed = 10;
  this.bulletSize = 5;
  this.bulletColor= [255, 24, 238];
  this.shot = false; //boolean showing if key press released a bullet
  this.buttonSize = 60;
  this.buttonMargin = 6;
  this.buttonDistance = 40;
}

//handleInputUp()
//
//Checks if player is looking up (up key pressed)
PlayerMobile.prototype.handleInputUp = function(){
  if(this.upKeyPressed){
    this.lookingUp = true;
  } else{
    this.lookingUp = false;
  }
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
      if(touches[i].x < this.buttonMargin+this.buttonSize &&
        touches[i].x > this.buttonMargin &&
        touches[i].y > height- this.buttonMargin - this.buttonSize*2 - this.buttonDistance &&
        touches[i].y < height-this.buttonMargin ){
        this.leftKeyPressed = true;
      } else{
        this.leftKeyPressed = false;
      }

      //touching the right side of the controller
      if(touches[i].x < this.buttonMargin + this.buttonDistance + this.buttonSize*2 &&
        touches[i].x > this.buttonMargin + this.buttonDistance + this.buttonSize &&
        touches[i].y > height- this.buttonMargin - this.buttonSize*2 - this.buttonDistance &&
        touches[i].y < height-this.buttonMargin){
        this.rightKeyPressed = true;
      } else{
        this.rightKeyPressed = false;
      }

      //touching the bottom side of the controller
      if(touches[i].x < this.buttonMargin + this.buttonDistance + this.buttonSize*2 &&
        touches[i].x > this.buttonMargin &&
        touches[i].y > height-this.buttonMargin - this.buttonSize &&
        touches[i].y < height-this.buttonMargin ){
        this.downKeyPressed = true;
      } else{
        this.downKeyPressed = false;
      }

      //touching the top side of the controller
      if(touches[i].x < this.buttonMargin + this.buttonDistance + this.buttonSize*2 &&
        touches[i].x > this.buttonMargin &&
        touches[i].y > height-this.buttonMargin - this.buttonDistance - this.buttonSize*2 &&
        touches[i].y < height-this.buttonMargin - this.buttonDistance - this.buttonSize ){
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
      if(touches[i].x < width-this.buttonMargin-this.buttonSize+this.buttonDistance/4 &&
        touches[i].x > width-this.buttonMargin-this.buttonSize*2+this.buttonDistance/4 &&
        touches[i].y > height-this.buttonMargin-this.buttonSize &&
        touches[i].y < height-this.buttonMargin ){
        this.jumpKeyPressed = true;
      } else{
        this.jumpKeyPressed = false;
      }

      //touching the shoot key
      if(touches[i].x < width-this.buttonMargin &&
        touches[i].x > width-this.buttonMargin-this.buttonSize &&
        touches[i].y > height-this.buttonMargin-this.buttonSize*2+this.buttonDistance/4 &&
        touches[i].y < height-this.buttonMargin-this.buttonSize+this.buttonDistance/4 ){
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
  stroke(255);

  //left gamepad for movement
  ellipse(this.buttonMargin + this.buttonSize + this.buttonDistance/2,
    height- this.buttonMargin - this.buttonSize*1.5 - this.buttonDistance,
    this.buttonSize);
  ellipse(this.buttonMargin + this.buttonSize*1.5 + this.buttonDistance,
    height-this.buttonMargin - this.buttonSize - this.buttonDistance/2,
     this.buttonSize);
  ellipse(this.buttonMargin + this.buttonSize + this.buttonDistance/2,
    height-this.buttonMargin - this.buttonSize/2,
    this.buttonSize);
  ellipse(this.buttonMargin+this.buttonSize/2,
    height-this.buttonMargin - this.buttonSize - this.buttonDistance/2,
    this.buttonSize);

  //right gamepad for jump and shoot
  ellipse(width-this.buttonMargin-this.buttonSize-this.buttonDistance/2,
     height-this.buttonMargin - this.buttonSize/2,
     this.buttonSize);
  ellipse(width-this.buttonMargin-this.buttonSize/2,
    height-this.buttonMargin-this.buttonSize-this.buttonDistance/2,
    this.buttonSize);
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
    this.h = 26;
  } else{
    this.h = 32;
  }

}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
PlayerMobile.prototype.update = function() {
  // After Player reaches the peak of the jump (falls down)
  //"increase gravity" to make the player fall down faster
  if(this.vy < 0){
    this.vy += 1.1;
  //Otherwise apply "normal gravity" downwards
  } else {
    this.vy += 1;
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
// Draw the player using loaded sprites
PlayerMobile.prototype.display = function() {

  //player looking up, weapon pointed up
  if(this.lookingUp){
    if(this.h < 32){ //if player crouching
      if(this.vx === 0){ //if player not moving
        if(this.facingRight){ //if player facing left
          push();
          imageMode(CENTER);
          image(upCrouchRight, this.x, this.y);
          pop();
        }
        else{ //if player facing right
          push();
          imageMode(CENTER);
          image(upCrouchLeft, this.x, this.y);
          pop();
        }
      } else{ //if player moving
        if(this.facingRight){
          animation(upCrouchRightAnimation, this.x, this.y);
        }
        else{
          animation(upCrouchLeftAnimation, this.x, this.y);
        }
      }
    }
    //if player is not touching the ground
    else if(this.y + this.h/2 !== height){
      if(this.facingRight){
        animation(jumpingRightAnimation, this.x, this.y);
      }
      else{
        animation(jumpingLeftAnimation, this.x, this.y);
      }
    }
    //if player moving right
    else if(this.vx>0){
      animation(upRunningRightAnimation, this.x, this.y);
    }
    //or left
    else if(this.vx<0){
      animation(upRunningLeftAnimation, this.x, this.y);
    }
    //if player is not moving
    else if(this.facingRight){
      animation(upStandingRightAnimation, this.x, this.y);
    } else{
      animation(upStandingLeftAnimation, this.x, this.y);
    }
  // if player is not looking up, repeat the previous commands
  //but replace the animation with the player's weapon not pointed up
  } else {
    if(this.h < 32){
      if(this.vx === 0){
        if(this.facingRight){
          push();
          imageMode(CENTER);
          image(crouchRight, this.x, this.y);
          pop();
        }
        else{
          push();
          imageMode(CENTER);
          image(crouchLeft, this.x, this.y);
          pop();
        }
      } else{
        if(this.facingRight){
          animation(crouchRightAnimation, this.x, this.y);
        }
        else{
          animation(crouchLeftAnimation, this.x, this.y);
        }
      }

    }
    else if(this.y + this.h/2 !== height){
      if(this.facingRight){
        animation(jumpingRightAnimation, this.x, this.y);
      }
      else{
        animation(jumpingLeftAnimation, this.x, this.y);
      }

    }
    else if(this.vx>0){
      animation(runningRightAnimation, this.x, this.y);
    }
    else if(this.vx<0){
      animation(runningLeftAnimation, this.x, this.y);
    }
    else if(this.facingRight){
      animation(standingRightAnimation, this.x, this.y);
    } else{
      animation(standingLeftAnimation, this.x, this.y);
    }
  }

}

PlayerMobile.prototype.shoot = function() {
  //check state of player
  if(this.shootKeyPressed && this.shot === false){
    //create a new bullet and push it into the array
    this.bulletArray.push(new Bullet(this.x, this.y, this.facingRight,
      this.upKeyPressed,this.bulletSpeed, this.bulletSize, this.bulletColor));

    //play sound
    playerBulletSound.currentTime = 0;
    playerBulletSound.play();

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

//handleBulletCollision()
//
//handles collisions between the player's bullets and the enemy
PlayerMobile.prototype.handleBulletCollision = function(enemy){
  if(this.bulletArray.length > 0){
    //iterate through all the bullets
    for(i = this.bulletArray.length -1; i >=0; i--){
      //check for overlap
      if(this.bulletArray[i].x + this.bulletArray[i].w/2 > enemy.x - enemy.w/2
        && this.bulletArray[i].x - this.bulletArray[i].w/2 < enemy.x + enemy.w/2){
          if(this.bulletArray[i].y + this.bulletArray[i].w/2 > enemy.y - enemy.h/2
            && this.bulletArray[i].y - this.bulletArray[i].w/2 < enemy.y + enemy.h/2){
              //remove bullet from array
              this.bulletArray.splice(i, 1);
              //diminish life of enemy
              enemy.life -=2;
              // console.log(enemy.life);
          }
      }
    }
  }
}


//handleEnemyCollision
//
//handle collision between player and enemy
PlayerMobile.prototype.handleEnemyCollision = function(enemy){
  //check for overlap
  if(this.x + this.w/2 > enemy.x - enemy.w/2
    && this.x - this.w/2 < enemy.x + enemy.w/2
    &&this.y + this.w/2 > enemy.y - enemy.h/2
    && this.y - this.w/2 < enemy.y + enemy.h/2){
      //if was not touching the enemy in the previous frame
      if(!this.touchingEnemy){
        //diminish life of player
        this.life -=8;

        //play sound
        playerHitSound.currentTime = 0;
        playerHitSound.play();
        //dissalow player to be hurt again by the same contact
        this.touchingEnemy = true;
      }
  //whenever player not touching enemy anymore
  }else{
    //allow player to be hurn again
    this.touchingEnemy = false;
  }
}

//displayLifeBar()
//
//Displays amount of player's life on a life bar
//and a picture of the player
PlayerMobile.prototype.displayLifeBar = function(){
  push();
  fill(0,255,0);
  var barLength = map(constrain(this.life, 0,100), 0,100, 0, width/2-150);
  rect(90+barLength/2, 46, barLength, 20, 10 );
  imageMode(CENTER);
  image(playerFace, 46, 46);
  pop();
}
