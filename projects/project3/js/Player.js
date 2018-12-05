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
  this.h = 32;
  this.life = 100;
  this.color = [0,0,0];
  this.speed = 3;
  this.touchingEnemy = false;
  this.jumping = false;
  this.jumpSpeed = 15; //speed upwards during jump
  this.downKey = 83; //S key
  this.upKey = 87; //W key
  this.leftKey = 65; //A key
  this.rightKey  = 68; //D key
  this.jumpKey = 80; //P key
  this.shootKey = 79; //O key
  this.facingRight = true; //Check which side of canvas player is facing
  this.lookingUp = false; //Check if player looking up
  this.bulletArray = []; //An array containing bullets shot by player
  this.bulletSpeed = 10;
  this.bulletSize = 5;
  this.bulletColor= [255, 24, 238];
  this.shot = false; //boolean showing if key press released a bullet
}

//handleInputUp()
//
//Checks if player is looking up (up key pressed)
Player.prototype.handleInputUp = function(){
  if(keyIsDown(this.upKey)){
    this.lookingUp = true;
  } else{
    this.lookingUp = false;
  }
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
}

// handleInputCrouch()
//
// Check if the crouch (down) key is pressed and change player size accordingly
Player.prototype.handleInputCrouch = function() {
  //If downKey pressed and player is not jumping
  if (keyIsDown(this.downKey) && this.jumping === false) {
    this.h = 26;
  } else{
    this.h = 32;
  }

}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Player.prototype.update = function() {
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
// Draw the player using loaded sprites
Player.prototype.display = function() {

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

//shoot
//
//allows player to shoot bullets from the weapon
Player.prototype.shoot = function() {
  //check state of player if shoot key pressed and if player has not shot yet
  if(keyIsDown(this.shootKey) && this.shot === false){
      //create a new bullet and push it into the array
      this.bulletArray.push(new Bullet(this.x, this.y, this.facingRight,
        keyIsDown(this.upKey),this.bulletSpeed, this.bulletSize, this.bulletColor));
      //play sound
      playerBulletSound.currentTime = 0;
      playerBulletSound.play();
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

    //remove bullet from array if it's out of canvas
    for(var j = this.bulletArray.length - 1; j >= 0; j--) {
      if(this.bulletArray[j].outOfCanvas()) {
         this.bulletArray.splice(j, 1);
      }
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

//handleBulletCollision()
//
//handles collisions between the player's bullets and the enemy
Player.prototype.handleBulletCollision = function(enemy){
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
Player.prototype.handleEnemyCollision = function(enemy){
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
Player.prototype.displayLifeBar = function(){
  push();
  fill(0,255,0);
  var barLength = map(constrain(this.life, 0,100), 0,100, 0, width/2-150);
  rect(90+barLength/2, 46, barLength, 20, 10 );
  imageMode(CENTER);
  image(playerFace, 46, 46);
  pop();
}
