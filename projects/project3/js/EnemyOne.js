// EnemyOne
//
// A class that defines how the first enemy behaves and is displayed

// EnemyOne constructor
//
// Sets the properties with the provided arguments or defaults
function EnemyOne(x,y) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.w = 68;
  this.h = 62;
  this.life = 100;
  this.timer = 0; //necessary to coordinate enemy movement
  this.movingTowardsPlayer = false; //trigger movement towards player
  this.jumpSpeed = 15; //speed upwards during jump
  this.facingRight = true; //Check which side of canvas enemy is facing
  this.bulletArray = []; //An array containing bullets shot by enemy
  this.bulletSpeed = 5;
  this.bulletSize = 10;
  this.bulletColor = [247, 173, 61];
  this.bulletsShot = 0; //count amout of bullets shot
}

//update
//
//Updates position and actions of enemy
EnemyOne.prototype.update = function(playerX){
  //move by a certain amount of distance towards player
  //every three seconds (every 180 frames) for 60 frames
  if(this.timer%180 === 0 && this.timer !==0){
    //allow movement towards player
    this.movingTowardsPlayer = true;

    //jump
    this.vy = -this.jumpSpeed; //upwards velocity

    //sound
    enemyJumpSound.play();
  } else if (this.timer%180 === 60){
    this.movingTowardsPlayer = false;
  }

  //check what direction enemy should face (towards player)
  if(playerX-this.x > 0){
    this.facingRight = true;
  }else{
    this.facingRight = false;
  }

  //move towards player in decreasing speed
  if(this.movingTowardsPlayer){
    this.vx = (playerX-this.x)/40;
    this.bulletsShot = 0;

  //if movement not allowed, shoot player every 40 frames, 3 times
  } else{
    if(this.timer%40 ===0 && this.bulletsShot < 2){
      //create and push bullet onto array
      this.bulletArray.push(new Bullet(this.x, this.y, this.facingRight, false,
        this.bulletSpeed, this.bulletSize, this.bulletColor));

      //play sound
      enemyBulletSound.currentTime = 0;
      enemyBulletSound.play();
      //increase counter of bullets shot
      this.bulletsShot++;
    }

    //do not move
    this.vx = 0;
  }

  //gravity applied only when enemy is in the air
  if(this.y !== 0){
    this.vy += 0.5;
  } else {
    this.vy = 0;
  }

  //update and constrain position
  this.y += this.vy;
  this.y = constrain(this.y,0+this.h/2,height-this.h/2);

  this.x +=this.vx;
  this.x = constrain(this.x,0+this.w/2,width-this.w/2);

  //increase timer
  this.timer++;
}

// display()
//
// Draw the enemy with its sprites
EnemyOne.prototype.display = function() {
  if(this.facingRight){
    animation(enemOneStandingRightAnimation, this.x, this.y);
  }
  else{
    animation(enemOneStandingLeftAnimation, this.x, this.y);
  }
}

//updateBullets()
//
//Updates all the bullets' positions in the bullet array
EnemyOne.prototype.updateBullets = function (){
  if(this.bulletArray.length > 0){
    for(i = 0; i < this.bulletArray.length; i++){
      this.bulletArray[i].update();
    }

    //removes bullet if is out of canvas
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
EnemyOne.prototype.displayBullets = function (){
  if(this.bulletArray.length > 0){
    for(i = 0; i < this.bulletArray.length; i++){
      this.bulletArray[i].display();
    }
  }
}

//handleBulletCollision()
//
//handles collisions between the enemy's bullets and the player
EnemyOne.prototype.handleBulletCollision = function(player){
  if(this.bulletArray.length > 0){
    for(i = this.bulletArray.length -1; i >=0; i--){
      if(this.bulletArray[i].x + this.bulletArray[i].w/2 > player.x - player.w/2
        && this.bulletArray[i].x - this.bulletArray[i].w/2 < player.x + player.w/2){
          if(this.bulletArray[i].y + this.bulletArray[i].w/2 > player.y - player.h/2
            && this.bulletArray[i].y - this.bulletArray[i].w/2 < player.y + player.h/2){
              this.bulletArray.splice(i, 1);
              player.life -= 5;

              //play sound
              playerHitSound.currentTime = 0;
              playerHitSound.play();
              // console.log(enemy.life);
        }
      }
    }
  }
}

//displayLifeBar()
//
//Displays amount of enemy's life on a life bar
//and a picture of the enemy
EnemyOne.prototype.displayLifeBar = function(){
  push();
  fill(255,0,0);
  var barLength = map(constrain(this.life, 0,100), 0,100, 0, width/2-150);
  rect(width-90-barLength/2, 46, barLength, 20, 10 );
  imageMode(CENTER);
  image(enemyOneFace, width-46, 46);
  pop();
}
