// Paddle
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down

// Paddle constructor
//
// Sets the properties with the provided arguments or defaults
function Paddle(x,y,w,h,speed,downKey,upKey,smallPaddleOffset) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.w = w;
  this.h = h;
  this.speed = speed;
  this.downKey = downKey;
  this.upKey = upKey;
  this.r = 5; //corner radius
  this.sr = 5; //corner radius of small rectangle
  this.score = 0; //player score
  this.color = [255,255,255]; //paddle color
  this.smallPaddleColor = [255,255,255]; //paddle color of small rectangle
  this.smallPaddleOffset = smallPaddleOffset; //small rectangle offset from the Paddle
  this.smallPaddleSize = 10 //by how much the small rectangle is smaller than the paddle
  this.hasScored = false; //detection if player scored the last point
  this.animationTime = 0; //timer for animation once player scored
  this.animationEllipseSize = 20; //size of ellipse involved in animation
  this.animationEllipseOpacity = 50; //opacity of ellipse involved in animation

  ////////NEW////////
  // when the paddle is hit by enemy ball, this becomes true and triggers events
  this.wasHit = false;
  //when hit by enemy ball, the paddle will have a disadvantage for 300 frames
  this.disadvantageTimer = 300;
  this.maxDisadvantageTime = 300;

}

// handleInput()
//
// Check if the up or down keys are pressed and update velocity
// appropriately
Paddle.prototype.handleInput = function() {
  if (keyIsDown(this.upKey)) {
    this.vy = -this.speed;
  }
  else if (keyIsDown(this.downKey)) {
    this.vy = this.speed;
  }
  else {
    this.vy = 0;
  }
}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Paddle.prototype.update = function() {
  this.y += this.vy;
  this.y = constrain(this.y,0+this.h/2,height-this.h/2);
}

// display()
//
// Draw the paddle as a rectangle on the screen
Paddle.prototype.display = function() {
  push();
  fill(this.color[0], this.color[1],this.color[2]);
  rect(this.x,this.y,this.w,this.h, this.r);
  fill(this.smallPaddleColor[0], this.smallPaddleColor[1], this.smallPaddleColor[2]);
  rect(this.x + this.smallPaddleOffset,
    this.y,
    this.w - this.smallPaddleSize,
    this.h - this.smallPaddleSize,
    this.sr);
  pop();
}

// changePaddleColor()
//
// controls sequences of events once a player has scored
Paddle.prototype.scored = function() {
  //Increase score of the player
  this.score ++;

  //Trigger winning point animation by making hasScored variable true
  this.hasScored = true;

  //Score is divided into units and tens
  var scoreUnits = this.score % 10;
  var scoreTens = Math.floor(this.score/10);

  // //the Units "color" the main paddle
  // this.setColorPaddlesParts(scoreUnits, this.color);

  //color the small rectangle of the paddle
  this.setColorPaddlesParts(scoreUnits, this.smallPaddleColor);

  //Triggers sound of either "scoring a point"
  //or "leveling up" sound every 3 points scored
  if (this.score%3 === 0){
    levelUpSound.play();
  } else {
    pointSound.play();
  }
}

//setColorPaddlesParts(score, colorArray)
//
//Sets the color of either of the rectangles of the paddle
//according to the score number given
Paddle.prototype.setColorPaddlesParts = function(scoreNumber, colorArray){
  switch(scoreNumber) {
    case 1: //red
        colorArray[0] = 239;
        colorArray[1] = 74;
        colorArray[2] = 74;
        break;
    case 2: //orange
        colorArray[0] = 232;
        colorArray[1] = 121;
        colorArray[2] = 82;
        break;
    case 3: //yellow-orange
        colorArray[0] = 239;
        colorArray[1] = 140;
        colorArray[2] = 73;
        break;
    case 4: //yellow
        colorArray[0] = 239;
        colorArray[1] = 236;
        colorArray[2] = 72;
        break;
    case 5: //green
        colorArray[0] = 136;
        colorArray[1] = 239;
        colorArray[2] = 72;
        break;
    case 6: //turqoise
        colorArray[0] = 72;
        colorArray[1] = 239;
        colorArray[2] = 130;
        break;
    case 7: //blue
        colorArray[0] = 72;
        colorArray[1] = 200;
        colorArray[2] = 239;
        break;
    case 8: //purple
        colorArray[0] = 93;
        colorArray[1] = 83;
        colorArray[2] = 232;
        break;
    case 9: //pink
        colorArray[0] = 232;
        colorArray[1] = 82;
        colorArray[2] = 207;
        break;
    default: //when score == 0
        colorArray[0] = 255;
        colorArray[1] = 255;
        colorArray[2] = 255;
  }
}

//winningAnimation(paddle)
//
//Creates a winning animation when a player earns a point
Paddle.prototype.winningAnimation = function(){
  //The animation lasts 60 frames
  if(this.animationTime<60){
    //The animated ellipse is of the color of the small recrangle of paddle
    push();
    fill(this.smallPaddleColor[0],
      this.smallPaddleColor[1],
      this.smallPaddleColor[2],
      this.animationEllipseOpacity);
    ellipse(this.x, this.y,this.animationEllipseSize);
    pop();
    //It increases in size at every frame
    //And decreases in opacity at every frame
    this.animationTime++;
    this.animationEllipseSize += 10;
    this.animationEllipseOpacity --;
  }else{
    //resetting the variables once the animation is over
    this.hasScored = false;
    this.animationTime = 0;
    this.animationEllipseSize = 20;
    this.animationEllipseOpacity = 50;
  }
}

////////NEW////////
//inDisadvantage()
//
//When triggered, puts the paddle in disadvantage for a certain time
// by inverting its speed,thus inverting the controls.
// Changes the color of the paddle
Paddle.prototype.inDisadvantage = function(){
  //Inverts the speed of the paddle only once, at the beginning of the timer
  if(this.disadvantageTimer === this.maxDisadvantageTime){
    this.speed = -this.speed;

    //decreases the timer
    this.disadvantageTimer--;

  //When the timer reaches 0,
  }else if (this.disadvantageTimer === 0){
    //set the speed to positive again
    this.speed = -this.speed;
    //resets the proprety that triggers the disadvantage
    this.wasHit = false;
    //resets the timer
    this.disadvantageTimer = this.maxDisadvantageTime;
    //resets the color of the paddle
    this.color = [255,255,255];
  //While the timer is running
  }else{
    //decrease the timer
    this.disadvantageTimer--;
    //changes the color of the paddle
    this.color = [255,
      map(sin(this.disadvantageTimer*0.3),-1,1,0,255),
      map(sin(this.disadvantageTimer*0.3),-1,1,0,255)
    ];
  }
}

//reset()
//
// Resets paddle propreties that have been changed during the game
Paddle.prototype.reset = function(){
  this.speed = Math.abs(this.speed); //paddle speed (if was inverted)
  this.y = height/2; //y position
  this.score = 0; //player score
  this.color = [255,255,255]; //paddle color
  this.csmallPaddleColor = [255,255,255]; //paddle color
  this.hasScored = false; //detection if player scored the last point
  this.animationTime = 0; //timer for animation once player scored
  this.wasHit = false; //detection of paddle hit by enemy ball
  this.disadvantageTimer = this.maxDisadvantageTime; //timer for paddle being in disadvantage

}
