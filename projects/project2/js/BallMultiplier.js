//BallMultiplier
//
//A class defining how the ball multiplier moves and behaves
//The ball multiplier adds a ball or an enemy ball to the game whenever a ball
// or enemy ball passes on it.

function BallMultiplier(){
  this.x = width/2;
  this.y = height/2;
  this.vx = 0;
  this.vy = 0;
  this.radius = 20;
  this.angle = 0;
  //this.speed = speed;
  this.fillA = [0,0,0];
  this.fillB = [255,255,255];
  this.stroke = [255,255,255];
  //this.minSpeed = 3;
  this.maxSpeed = 6;
  this.tx = random(0,1000);
  this.ty= random(0,1000);

}

// update()
//
// Moves according to Perlin noise and wrapsaround the canvas
BallMultiplier.prototype.update = function () {
  // Change the multiplier's velocity using the Perlin noise
  // Use map() to convert from the 0-1 range of the noise() function
  // to the appropriate range of velocities for the prey
  this.vx = map(noise(this.tx),0,1,-this.maxSpeed,this.maxSpeed);
  this.vy = map(noise(this.ty),0,1,-this.maxSpeed,this.maxSpeed);
  //Change time value so the noise value will be different on the next frame
  this.tx += 0.01;
  this.ty += 0.01;
  // Update prey position based on velocity
  this.x += this.vx;
  this.y += this.vy;

  // Screen wrapping
  if (this.x < 0) {
    this.x += width;
  }
  else if (this.x > width) {
    this.x -= width;
  }

  if (this.y < 0) {
    this.y += height;
  }
  else if (this.y > height) {
    this.y -= height;
  }
}

// display()
//
// Draw the multiplier as a ellipse
BallMultiplier.prototype.display = function () {
  //stroke(this.stroke[0],this.stroke[1],this.stroke[2]);
  var growth = sin(this.angle) * (this.radius/2);
  var growth2 = sin(this.angle+0.2) * (this.radius/2);
  var growth3 = sin(this.angle+0.4) * (this.radius/2);
  var growth4 = sin(this.angle+0.6) * (this.radius/2);

  fill(this.fillB[0],this.fillB[1],this.fillB[2]);
  ellipse(this.x,this.y,this.radius*2 + growth);

  fill(this.fillA[0],this.fillA[1],this.fillA[2]);
  ellipse(this.x,this.y,this.radius*2-10 + growth2);

  fill(this.fillB[0],this.fillB[1],this.fillB[2]);
  ellipse(this.x,this.y,this.radius*2-20 + growth3);

  fill(this.fillA[0],this.fillA[1],this.fillA[2]);
  ellipse(this.x,this.y,this.radius*2-30 + growth4);
  
  this.angle += 0.05;
}
