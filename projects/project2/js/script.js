// Basic OO Pong
// by Pippin Barr
//
// A primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.
// Score follows the rainbow-ordered colors:
// red meaning 1 point, orange meaning 2, yellow is 3 points, etc.
// An additional, small recrangle is added to the paddle once 10 points are reached.
// The additional rectangle represents the tens of points:
// a red one is 1 ten of points (10), an orange one is 2 tens (20), etc.
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP.
//
//Sources of sounds:
//-Point sound:videogame_jump.wav by kwahmah_02
//    found on: https://freesound.org/people/kwahmah_02/sounds/262893/
//
//-Level-up sound:Retro game heal sound by lulyc
//    found on:https://freesound.org/people/lulyc/sounds/346116/
//
//*****************************************************************************

// Variable to contain the objects representing our ball and paddles
var ball;
var leftPaddle;
var rightPaddle;

// A variable to hold the beep sound we will play on bouncing
var beepSFX;
var pointSound;
var levelUpSound;

///////NEW////////
//Intro variables
var introPlaying = true; //detects when intro should stop being played
var myFont; //font for text display
var titleText = "PING PONG FOREVER";
var startGameText = "PRESS X TO START THE GAME"
var textOpacity = 0; //text will have a changing opacity for fade-in effect
var xPressed = false; //Detects when the x key is pressed to start game
var coundownTimer = 180; //A countdown of 180ms plays before game starts
///////END NEW////////

// preload()
//
// Loads the beep audio for the sound of bouncing
function preload() {
  beepSFX = new Audio("assets/sounds/beep.wav");
  pointSound = new Audio("assets/sounds/point.wav");
  levelUpSound = new Audio("assets/sounds/level-up.wav");

  myFont = loadFont('assets/fonts/FontdinerdotcomHuggable.ttf');
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
// Plays intro, handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0, 100);

  /////NEW///////
  if (introPlaying){
    displayIntro(); //Starting with an intro
  } else {
  ////////END NEW///////
    leftPaddle.handleInput();
    rightPaddle.handleInput();

    ball.update();
    leftPaddle.update();
    rightPaddle.update();

    checkForScores();

    ball.handleCollision(leftPaddle);
    ball.handleCollision(rightPaddle);

    ball.display();
    leftPaddle.display();
    rightPaddle.display();

    //Creates an animation for the point winner
    //(Needs to be called on multiple frames)
    if(leftPaddle.hasScored){
      leftPaddle.winningAnimation();
    }

    if(rightPaddle.hasScored){
      rightPaddle.winningAnimation();
    }
  }
}

function checkForScores(){
  //.ballOffScreen() returns the position of the ball as it leaves the screen
  //if it leaves through the left
  if(ball.isOffScreen() < leftPaddle.x ){
    // If it went off the left side
    //trigger events related to score of right paddle
    rightPaddle.scored();

    //Call ball reset
    ball.reset();
  }
  //if it leaves through the right
  else if (ball.isOffScreen() > rightPaddle.x){
    // If it went off the right side
    //trigger events related to score of left paddle
    leftPaddle.scored();

    //Call ball reset
    ball.reset();
  }
}

///////NEW////////
function displayIntro(){
  //setting some text
  textFont(myFont);
  textSize(50);
  textAlign(CENTER,CENTER);

  //detect is x key has been pressed
  if(keyIsDown(88)){
    xPressed = true;
  }

  //Play a 3 second countdown after key press
  if(xPressed){
    //the intro stops playing after the countdown is over
    if(coundownTimer === 0){
      introPlaying = false;
    //During the countdown, paddle, ball and some text are displayed
    }else{
      ball.display();
      leftPaddle.display();
      rightPaddle.display();
      fill(255);
      textSize(50);

      //The text changes dependant on the countdown timer
      if(coundownTimer > 120){
        text("3",width/2,height/2 - 100);
      } else if(coundownTimer > 60) {
        text("2",width/2,height/2 - 100);
      } else {
        text("1",width/2,height/2 - 100);
      }

      //decrease the countdown timer
      coundownTimer--;
    }

  //if the x has not been pressed, display Title text
  } else {
    fill(random(200,255), constrain(textOpacity,0,255));
    textSize(50);
    text(titleText,width/2,height/2);
    textSize(25);
    text(startGameText, width/2, height/2 + 100);
    textOpacity++; //text appears in a fade-in, thus with increasing opacity
  }
}

//////END NEW///////
