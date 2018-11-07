//BallMultiplier
//
//A class defining how the ball multiplier moves and behaves
//The ball multiplier adds a ball or an enemy ball to the game whenever a ball
// or enemy ball passes on it.

// BallMultiplier constructor
//
// Sets the properties
function BallMultiplier(){
  this.x = width/2;
  this.y = height/2-200;
  this.vx = 0;
  this.vy = 0;
  this.radius = 20;
  this.angle = 0;
  this.fillA = [0,0,0];
  this.fillB = [255,255,255];
  this.maxSpeed = 6;
  this.tx = random(0,1000);
  this.ty= random(0,1000);
  this.canSpawnBall = true;
  this.spawnTimer = 60;
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
// Draw the multiplier as a series of ellipses
BallMultiplier.prototype.display = function () {
  //The four ellipses of the multiplier will be growing and shrinking
  //following a sin function
  var growth = sin(this.angle) * (this.radius/2);
  var growth2 = sin(this.angle+0.2) * (this.radius/2);
  var growth3 = sin(this.angle+0.4) * (this.radius/2);
  var growth4 = sin(this.angle+0.6) * (this.radius/2);
  //The angle for the sn function is increased for the next frame
  this.angle += 0.05;

  //first and biggest white ellipse
  fill(this.fillB[0],this.fillB[1],this.fillB[2]);
  ellipse(this.x,this.y,this.radius*2 + growth);

  //then a smaller black ellipse
  fill(this.fillA[0],this.fillA[1],this.fillA[2]);
  ellipse(this.x,this.y,this.radius*2-10 + growth2);

  //A smaller white ellipse
  fill(this.fillB[0],this.fillB[1],this.fillB[2]);
  ellipse(this.x,this.y,this.radius*2-20 + growth3);

  //A small black ellipse
  fill(this.fillA[0],this.fillA[1],this.fillA[2]);
  ellipse(this.x,this.y,this.radius*2-30 + growth4);

}

//handleCollision(ball)
//
//Returns the some propreties of the ball that had collided with the Multiplier
//so that another ball can be spawned in script.js
//Since the call overlaps with the multiplier on multiple frames,
//the mulriplier is rendered inactive for a certain amount of time
BallMultiplier.prototype.handleCollision = function(ball){
  //Check if multiplier is active
  if(this.canSpawnBall){
    // Check if the ball overlaps the multiplier on x axis
    if (ball.x + ball.size/2 > this.x - this.radius && ball.x - ball.size/2 < this.x + this.radius) {
      // Check if the ball overlaps the multiplier on y axis
      if (ball.y + ball.size/2 > this.y - this.radius && ball.y - ball.size/2  < this.y + this.radius) {
          //Reder the multiplier inactive
          this.canSpawnBall = false;
          //return some propreties of the ball
          return [ball.x,ball.y,-ball.vx,-ball.vy,ball.size,ball.speed];
      }
    }
  //if the multiplier is inactive
  } else {
    //decrease its inactivity timer
    this.spawnTimer--;

    //When the timer has reached 0, reset it and make multiplier active again
    if(this.spawnTimer === 0){
      this.canSpawnBall = true;
      this.spawnTimer = 60;
    }
    return null;
  }

}
