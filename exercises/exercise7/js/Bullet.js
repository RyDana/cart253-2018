// Bullet
//
// A class that defines how a bullet behaves

// Bullet constructor
//
// Sets the properties with the provided arguments or defaults
function Bullet(x,y,angle) {
  this.x = x;
  this.y = y;
  this.angle = angle; //angle at which bullet travels
  this.vx = 0;
  this.vy = 0;
  this.w = 20; //size
  this.color = [0,0,0];
  this.speed = 5;
}


// update()
//
// Update position based on velocity and angle
Bullet.prototype.update = function() {

  this.vy = this.speed * sin(this.angle);
  this.y += this.vy;

  this.vx = this.speed * cos(this.angle);
  this.x += this.vx;

}

// display()
//
// Draw the bullet as an ellipse
Bullet.prototype.display = function() {
  push();
  fill(this.color[0], this.color[1],this.color[2]); //black
  ellipse(this.x, this.y, this.w);
  pop();
}
