// Bullet
//
// A class that defines how a bullet behaves

// Bullet constructor
//
// Sets the properties with the provided arguments or defaults
function Bullet(x,y,facingRight,pointingUp,bulletSpeed,bulletSize, color) {
  this.x = x;
  this.y = y;
  //this.angle = angle; //angle at which bullet travels
  this.vx = 0;
  this.vy = 0;
  this.w = bulletSize; //size
  this.color = color;
  this.speed = bulletSpeed;
  this.facingRight = facingRight;
  this.pointingUp = pointingUp;
}


// update()
//
// Update position based on velocity and direction
Bullet.prototype.update = function() {
  //this was used when user controlled bullet with mouse click
  // this.vy = this.speed * sin(this.angle);
  // this.y += this.vy;
  //
  // this.vx = this.speed * cos(this.angle);
  // this.x += this.vx;

  //bullet moves upwards if player was pointing up
  if(this.pointingUp){
    this.vy = -this.speed;
  }else{
    this.vy = 0;
  }

  //bullet moves either right or left, depending which side player was facing
  //when bullet was shot
  if(this.facingRight){
    this.vx = this.speed;
  }else{
    this.vx = -this.speed;
  }

  this.x += this.vx;
  this.y += this.vy;

}

// display()
//
// Draw the bullet as an ellipse
Bullet.prototype.display = function() {
  push();
  fill(this.color[0], this.color[1],this.color[2]); //pink
  ellipse(this.x, this.y, this.w);
  pop();
}

// outOfCanvas()
//
// Draw the bullet as an ellipse
Bullet.prototype.outOfCanvas = function() {
  if(this.x - this.w/2 > width || this.x + this.w/2 < 0){
    return true;
  } else{
    return false;
  }
}
