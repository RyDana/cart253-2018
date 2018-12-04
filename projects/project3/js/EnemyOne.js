// EnemyOne
//
// A class that defines how the first enemy behaves

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
  this.timer = 0;
  this.movingTowardsPlayer = false;
  this.color = [0,0,0];
  this.speed = 3;
  this.jumping = false;
  this.jumpSpeed = 15; //speed upwards during jump
  this.facingRight = true; //Check which side of canvas player is facing
  this.bulletArray = []; //An array containing bullets shot by player
  this.bulletSpeed = 5;
  this.bulletSize = 10;
  this.bulletColor = [247, 173, 61];
  this.bulletsShot = 0;
  this.shot = false; //boolean showing if mouse press released a bullet
}

EnemyOne.prototype.update = function(playerX){
  //move by a certain amount of distance towards player
  //every three seconds (every 180 frames) for 40 frames
  if(this.timer%180 === 0 && this.timer !==0){
    this.movingTowardsPlayer = true;
    this.vy = -this.jumpSpeed; //upwards velocity
  } else if (this.timer%180 === 60){
    this.movingTowardsPlayer = false;
  }

  if(playerX-this.x > 0){
    this.facingRight = true;
  }else{
    this.facingRight = false;
  }

  if(this.movingTowardsPlayer){
    this.vx = (playerX-this.x)/40;
    this.bulletsShot = 0;
  } else{
    if(this.timer%40 ===0 && this.bulletsShot < 2){
        this.bulletArray.push(new Bullet(this.x, this.y, this.facingRight, false,
        this.bulletSpeed, this.bulletSize, this.bulletColor));
      this.bulletsShot++;
    }
    this.vx = 0;
  }

  //gravity
  if(this.y !== 0){
    this.vy += 0.5;
  } else {
    this.vy = 0;
  }

  this.y += this.vy;
  this.y = constrain(this.y,0+this.h/2,height-this.h/2);

  this.x +=this.vx;
  this.x = constrain(this.x,0+this.w/2,width-this.w/2);

  this.timer++;
}

// display()
//
// Draw the player as a rectangle on the screen with a little ellipse as an eye
EnemyOne.prototype.display = function() {
  // push();
  // fill(this.color[0], this.color[1],this.color[2]); //black
  // rect(this.x,this.y,this.w,this.h);
  // //fill(255); // white
  // // if(this.facingRight){
  // //   ellipse(this.x + this.w/4, this.y - this.h/2 + 5, 5);
  // // } else{
  // //   ellipse(this.x - this.w/4, this.y - this.h/2 + 5, 5);
  // // }
  // pop();

  // animate the sprite sheet
  //if(this.y + this.h/2 !== height){
    if(this.facingRight){
      animation(enemOneStandingRightAnimation, this.x, this.y);
    }
    else{
      animation(enemOneStandingLeftAnimation, this.x, this.y);
    }
  //}
  // else if(this.vx>0){
  //   animation(runningRightAnimation, this.x, this.y);
  // }
  // else if(this.vx<0){
  //   animation(runningLeftAnimation, this.x, this.y);
  // }
  // else if(this.facingRight){
  //   animation(standingRightAnimation, this.x, this.y);
  // } else{
  //   animation(standingLeftAnimation, this.x, this.y);
  // }

}

//updateBullets()
//
//Updates all the bullets' positions in the bullet array
EnemyOne.prototype.updateBullets = function (){
  if(this.bulletArray.length > 0){
    for(i = 0; i < this.bulletArray.length; i++){
      this.bulletArray[i].update();
    }

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

EnemyOne.prototype.handleBulletCollision = function(player){
  if(this.bulletArray.length > 0){
    for(i = this.bulletArray.length -1; i >=0; i--){
      if(this.bulletArray[i].x + this.bulletArray[i].w/2 > player.x - player.w/2
        && this.bulletArray[i].x - this.bulletArray[i].w/2 < player.x + player.w/2){
          if(this.bulletArray[i].y + this.bulletArray[i].w/2 > player.y - player.h/2
            && this.bulletArray[i].y - this.bulletArray[i].w/2 < player.y + player.h/2){
              this.bulletArray.splice(i, 1);
              player.life -= 5;
              // console.log(enemy.life);
          }
      }
    }
  }
}

EnemyOne.prototype.displayLifeBar = function(){
  push();
  fill(255,0,0);
  var barLength = map(constrain(this.life, 0,100), 0,100, 0, width/2-150);
  rect(width-90-barLength/2, 46, barLength, 20, 10 );
  imageMode(CENTER);
  image(enemyOneFace, width-46, 46);
  pop();
}
