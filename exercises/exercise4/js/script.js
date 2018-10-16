// Pong Plus
// by Dana Ryashy
//
// A simple Pong game with color-coded scorekeeping
// Score follows the rainbow-ordered colors:
// red meaning 1 point, orange meaning 2, yellow is 3 points, etc.
// An additional, small recrangle is added to the paddle once 10 points are reached.
// The additional rectangle represents the tens of points:
// a red one is 1 ten of points (10), an orange one is 2 tens (20), etc.

// Game colors
var bgColor = 0;
var fgColor = 255;

// BALL

// Basic definition of a ball object with its key properties of
// position, size, velocity, and speed
var ball = {
  x: 0,
  y: 0,
  size: 20,
  r: 5, //corner radius
  vx: 0,
  vy: 0,
  speed: 5
}

// PADDLES

// How far in from the walls the paddles should be drawn on x
var paddleInset = 50;

//by how many pixels the small rectangle of the paddle is smaller then the paddle
var smallPaddleMargin = 10;

// LEFT PADDLE

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, score, color and speed
var leftPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vx: 0,
  vy: 0,
  speed: 5,
  /////////NEW/////////
  r: 5, //corner radius
  sr: 5, //corner radius of additional (small) rectangle
  score: 0,
  color: [255, 255, 255], //RGB array of color for paddle color
  smallColor: [255,255,255],//RGB array of color for paddle's small rectangle color
  smallPaddleOffset: -20, //offset between paddle and additional rectangle
  smallPresence: false, //true or false of presence of additional rectangle
  upKeyCode: 87, // The key code for W
  downKeyCode: 83, // The key code for S
  hasScored: false, //boolean telling if paddle has scored the last point
  animationTime: 0, //timer for the animation played once point scored
  animationEllipseSize: 20, //the animation is of an ellipse appearing at paddle position
  animationEllipseOpacity: 50 //the animation ellipse has changing opacity
  /////////END NEW/////////
}

// RIGHT PADDLE

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, score, color and speed
var rightPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vx: 0,
  vy: 0,
  speed: 5,
  /////////NEW/////////
  r: 5, //corner radius
  sr: 5, //corner radius of small rectangle
  score: 0,
  color: [255, 255, 255],
  smallColor: [255,255,255],
  smallPaddleOffset: 20,
  smallPresence: false,
  upKeyCode: 38, // The key code for the UP ARROW
  downKeyCode: 40, // The key code for the DOWN ARROW
  hasScored: false,
  animationTime: 0,
  animationEllipseSize: 20,
  animationEllipseOpacity: 50
  /////////END NEW/////////
}

// A variable to hold the beep sound we will play on bouncing
var beepSFX;
var pointSound;
var levelUpSound;

// preload()
//
// Loads the beep audio for the sound of bouncing
function preload() {
  beepSFX = new Audio("assets/sounds/beep.wav");
  pointSound = new Audio("assets/sounds/point.wav");
  levelUpSound = new Audio("assets/sounds/level-up.wav");
}

// setup()
//
// Creates the canvas, sets up the drawing modes,
// Sets initial values for paddle and ball positions
// and velocities.
function setup() {
  // Create canvas and set drawing modes
  createCanvas(640,480);
  rectMode(CENTER);
  noStroke();
  fill(fgColor);

  setupPaddles();
  setupBall();
}

// setupPaddles()
//
// Sets the positions of the two paddles
function setupPaddles() {
  // Initialise the left paddle
  leftPaddle.x = paddleInset;
  leftPaddle.y = height/2;

  // Initialise the right paddle
  rightPaddle.x = width - paddleInset;
  rightPaddle.y = height/2;
}

// setupBall()
//
// Sets the position and velocity of the ball
function setupBall() {
  ball.x = width/2;
  ball.y = height/2;
  ball.vx = ball.speed;
  ball.vy = ball.speed;
}

// draw()
//
// Calls the appropriate functions to run the game
function draw() {
  // Fill the background
  background(bgColor, 100);

  // Handle input
  // Notice how we're using the SAME FUNCTION to handle the input
  // for the two paddles!
  handleInput(leftPaddle);
  handleInput(rightPaddle);

  // Update positions of all objects
  // Notice how we're using the SAME FUNCTION to handle the input
  // for all three objects!
  updatePosition(leftPaddle);
  updatePosition(rightPaddle);
  updatePosition(ball);

  // Handle collisions
  handleBallWallCollision();
  handleBallPaddleCollision(leftPaddle);
  handleBallPaddleCollision(rightPaddle);

  // Handle the ball going off screen
  handleBallOffScreen();

  // Display the paddles and ball
  displayPaddle(leftPaddle);
  displayPaddle(rightPaddle);
  displayBall();

  ////////NEW////////
  //Creates an animation for the point winner
  if(leftPaddle.hasScored){
    winningAnimation(leftPaddle);
  }

  if(rightPaddle.hasScored){
    winningAnimation(rightPaddle);
  }
  ////////END NEW////////
}

// handleInput(paddle)
//
// Updates the paddle's velocity based on whether one of its movement
// keys are pressed or not.
// Takes one parameter: the paddle to handle.
function handleInput(paddle) {

  // Set the velocity based on whether one or neither of the keys is pressed

  // NOTE how we can change properties in the object, like .vy and they will
  // actually CHANGE THE OBJECT PASSED IN, this allows us to change the velocity
  // of WHICHEVER paddle is passed as a parameter by changing it's .vy.

  // UNLIKE most variables passed into functions, which just pass their VALUE,
  // when we pass JAVASCRIPT OBJECTS into functions it's the object itself that
  // gets passed, so we can change its properties etc.

  // Check whether the upKeyCode is being pressed
  // NOTE how this relies on the paddle passed as a parameter having the
  // property .upKey
  if (keyIsDown(paddle.upKeyCode)) {
    // Move up
    paddle.vy = -paddle.speed;
  }
  // Otherwise if the .downKeyCode is being pressed
  else if (keyIsDown(paddle.downKeyCode)) {
    // Move down
    paddle.vy = paddle.speed;
  }
  else {
    // Otherwise stop moving
    paddle.vy = 0;
  }
}

// updatePosition(object)
//
// Sets the position of the object passed in based on its velocity
// Takes one parameter: the object to update, which will be a paddle or a ball
//
// NOTE how this relies on the object passed in have .x, .y, .vx, and .vy
// properties, which is true of both the two paddles and the ball
function updatePosition(object) {
  object.x += object.vx;
  object.y += object.vy;
}

// handleBallWallCollision()
//
// Checks if the ball has overlapped the upper or lower 'wall' (edge of the screen)
// and is so reverses its vy
function handleBallWallCollision() {

  // Calculate edges of ball for clearer if statement below
  var ballTop = ball.y - ball.size/2;
  var ballBottom = ball.y + ball.size/2;
  var ballLeft = ball.x - ball.size/2;
  var ballRight = ball.x + ball.size/2;

  // Check for ball colliding with top and bottom
  if (ballTop < 0 || ballBottom > height) {
    // If it touched the top or bottom, reverse its vy
    ball.vy = -ball.vy;
    // Play our bouncing sound effect by rewinding and then playing
    beepSFX.currentTime = 0;
    beepSFX.play();
  }
}

// handleBallPaddleCollision(paddle)
//
// Checks if the ball overlaps the specified paddle and if so
// reverses the ball's vx so it bounces
function handleBallPaddleCollision(paddle) {

  // Calculate edges of ball for clearer if statements below
  var ballTop = ball.y - ball.size/2;
  var ballBottom = ball.y + ball.size/2;
  var ballLeft = ball.x - ball.size/2;
  var ballRight = ball.x + ball.size/2;

  // Calculate edges of paddle for clearer if statements below
  var paddleTop = paddle.y - paddle.h/2;
  var paddleBottom = paddle.y + paddle.h/2;
  var paddleLeft = paddle.x - paddle.w/2;
  var paddleRight = paddle.x + paddle.w/2;

  // First check it is in the vertical range of the paddle
  if (ballBottom > paddleTop && ballTop < paddleBottom) {
    // Then check if it is touching the paddle horizontally
    if (ballLeft < paddleRight && ballRight > paddleLeft) {
      // Then the ball is touching the paddle so reverse its vx
      ball.vx = -ball.vx;
      // Play our bouncing sound effect by rewinding and then playing
      beepSFX.currentTime = 0;
      beepSFX.play();
    }
  }
}

// handleBallOffScreen()
//
// Checks if the ball has gone off screen to the left or right
// and moves it back to the centre if so
function handleBallOffScreen() {

  // Calculate edges of ball for clearer if statement below
  var ballLeft = ball.x - ball.size/2;
  var ballRight = ball.x + ball.size/2;

  ////////NEW///////
  // Check for ball going off the sides
  if (ballRight < 0 ) {
    // If it went off the left side
    //Increase score of right paddle
    rightPaddle.score ++;
    //changing the color of the paddle
    changeColorPaddle(rightPaddle);
    //Call ball reset, the ball will move in positive vx (function's parameter)
    reset(1);
    //Trigger winning point animation and sounds
    rightPaddle.hasScored = true;
    if (rightPaddle.score%10 == 0){
      levelUpSound.play();
    } else {
      pointSound.play();
    }
  } else if (ballLeft > width){
    //If it went off the right side
    //Increase score of left paddle
    leftPaddle.score ++;
    //changing the color of the paddle
    changeColorPaddle(leftPaddle);
    //Call ball reset, the ball will move in negative vx (function's parameter)
    reset(-1);
    //Trigger winning point animation and sounds
    leftPaddle.hasScored = true;
    if (leftPaddle.score%10 == 0){
      levelUpSound.play();
    } else {
      pointSound.play();
    }
  }
  ////////END NEW////////
}

// displayBall()
//
// Draws ball on screen based on its properties
function displayBall() {
  rect(ball.x,ball.y,ball.size,ball.size, ball.r);
}

// displayPaddle(paddle)
//
// Draws the specified paddle on screen based on its properties
function displayPaddle(paddle) {
  push();
  fill(paddle.color[0], paddle.color[1], paddle.color[2]);
  rect(paddle.x,paddle.y,paddle.w,paddle.h, paddle.r);
  pop();
  if(paddle.score >= 10){
    push();
    fill(paddle.smallColor[0], paddle.smallColor[1], paddle.smallColor[2]);
    rect(paddle.x + paddle.smallPaddleOffset,paddle.y,paddle.w - smallPaddleMargin,paddle.h - smallPaddleMargin, paddle.sr);
    pop();
  }
}

//////NEW//////

//changleColorPaddle(paddle)
//
//Changes the color of the paddle according to the score
function changeColorPaddle(paddle){
  scoreUnits = paddle.score % 10;
  scoreTens = Math.floor(paddle.score/10);

  setColorPaddlesParts(scoreUnits, paddle.color);
  if(paddle.score >= 10){
    setColorPaddlesParts(scoreTens, paddle.smallColor);
  }
}

//setColorPaddlesParts(score, colorArray)
//
//Sets the color of the rectangles of the paddle
function setColorPaddlesParts(score, colorArray){
  switch(score) {
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

//reset()
//
//Resets the ball in the center, makes it move towards the
//paddle that won the most recent point with a random y velocity
function reset(xDirection){
  ball.x = width/2;
  ball.y = height/2;

  ball.vx = xDirection * ball.speed;
  ball.vy = random(3,10);

}

//winningAnimation(paddle)
//
//Creates a winning animation when a player earns a point
function winningAnimation(paddle){
  //The animation lasts 60 frames
  if(paddle.animationTime<60){
    //The animated ellipse is of the color of the paddle
    push();
    fill(paddle.color[0],paddle.color[1],paddle.color[2], paddle.animationEllipseOpacity);
    ellipse(paddle.x, paddle.y,paddle.animationEllipseSize);
    pop();
    //It increases in size at every frame
    //And decreases in opacity at every frame
    paddle.animationTime++;
    paddle.animationEllipseSize += 10;
    paddle.animationEllipseOpacity --;
  }else{
    //resetting the variables once the animation is over
    paddle.hasScored = false;
    paddle.animationTime = 0;
    paddle.animationEllipseSize = 20;
    paddle.animationEllipseOpacity = 50;
  }
}

////////END NEW////////
