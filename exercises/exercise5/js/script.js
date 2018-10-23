// Basic OO Pong
// by Pippin Barr
//
// A primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP.

// Variable to contain the objects representing our ball and paddles
var ball;
var leftPaddle;
var rightPaddle;

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
// Creates the ball and paddles
function setup() {
  createCanvas(640,480);
  rectMode(CENTER);
  noStroke();
  // Create a ball
  ball = new Ball(width/2,height/2,5,5,10,5);
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width-20,height/2,15,60,10,DOWN_ARROW,UP_ARROW,10);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(20,height/2,15,60,10,83,87,-10);
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0, 100);

  leftPaddle.handleInput();
  rightPaddle.handleInput();

  ball.update();
  leftPaddle.update();
  rightPaddle.update();

  //TODO: this is weird
  ball.isOffScreen();
  // if (ball.isOffScreen(rightPaddle,leftPaddle,levelUpSound,pointSound)) {
  //   ball.reset();
  // }

  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);

  ball.display();
  leftPaddle.display();
  rightPaddle.display();

  ////////NEW////////
  //Creates an animation for the point winner
  if(leftPaddle.hasScored){
    leftPaddle.winningAnimation();
  }

  if(rightPaddle.hasScored){
    rightPaddle.winningAnimation();
  }
  ////////END NEW////////
}
