//Bullet
//

function Bullet(x,y,xDirection){
  this.x = x;
  this.y = y;
  this.speed = 5;
  this.vx = this.speed * xDirection;
  this.r = 2; //corner radius
  this.width = 8;
  this.height = 2;
  this.color = [0,0,255];
}

Bullet.prototype.update = function () {
  // Update position with velocity
  this.x += this.vx;

}

Bullet.prototype.isOffScreen = function() {
  if (this.x + this.width/2 < 0 || this.x - this.width/2 > width) {
    return true;
  }
  else {
    return false ;
  }
}

Bullet.prototype.handleCollision = function(paddle) {
  // Check if the ball overlaps the paddle on x axis
  if (this.x + this.width/2 > paddle.x - paddle.w/2 && this.x - this.width/2 < paddle.x + paddle.w/2) {
    // Check if the ball overlaps the paddle on y axis
    if (this.y + this.height/2 > paddle.y - paddle.h/2 && this.y - this.height/2  < paddle.y + paddle.h/2) {


      //Changes the paddle proprety that triggers a disadvantage
      paddle.wasHit = true;

      //Play sound
      hitSound.play();

      return true;
    }
  }

  return false
}
