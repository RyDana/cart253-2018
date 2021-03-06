// Basic OO Pong
// by Dana Ryashy
//
// A game of Pong, with some twists
// Score follows the rainbow-ordered colors:
// red meaning 1 point, orange meaning 2, yellow is 3 points, etc.
// An additional, small recrangle is added to the paddle once 10 points are reached.
// The additional rectangle represents the tens of points:
// a red one is 1 ten of points (10), an orange one is 2 tens (20), etc.
//Players should avoid the red ball or their controls will be inverted
//Theres is a ball multiplier that roams around and increases the amounts of
//balls in the game.
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
//-Hit sound:Error.wav sound by Autistic Lucario
//    found on:https://freesound.org/people/Autistic%20Lucario/sounds/142608/
//
//-game music sound: live techno loop  sound by frankum
//    found on:https://freesound.org/people/frankum/sounds/439512/
//
//-intro music: Newtime - electronic music track sound by frankum
//    found on:https://freesound.org/people/frankum/sounds/405603/
//
//-game over sound: music game, win or high score.wav sound by xtrgamr
//    found on:https://freesound.org/people/xtrgamr/sounds/244536/
//
//*****************************************************************************

// Variable to contain the objects representing our ball and paddles
var ball;
var enemyBall;
var leftPaddle;
var rightPaddle;
var ballMultiplier;
var ballArray = [];

// A variable to hold the beep sound we will play on bouncing
var beepSFX;
var pointSound;
var levelUpSound;
var hitSound;
var introMusic;
var gameMusic;
var gameOverMusic;

///////NEW////////
//Intro variables
var introPlaying = true; //detects when intro should stop being played
var myFont; //font for text display
var titleText = "PING PONG PLUS";
var startGameText = "PRESS X TO START THE GAME"
var textOpacity = 0; //text will have a changing opacity for fade-in effect
var xPressed = false; //Detects when the x key is pressed to start game
var coundownTimer = 180; //A countdown of 180ms plays before game starts
var introStarts = true;

//Game Over variables
var winnerDisplayText;
var pointsToWin = 11;
var gameOverText = "GAME OVER";
var restartGameText = "PRESS X TO START ANOTHER GAME"
var gameOverStarts = true;

var gameStarts = true;
///////END NEW////////

// preload()
//
// Loads the beep audio for the sound of bouncing
function preload() {
  beepSFX = new Audio("assets/sounds/beep.wav");
  pointSound = new Audio("assets/sounds/point.wav");
  levelUpSound = new Audio("assets/sounds/level-up.wav");
  hitSound = new Audio("assets/sounds/hit.wav");
  introMusic = new Audio("assets/sounds/intro_music.mp3");
  gameMusic = new Audio("assets/sounds/game-music.mp3");
  gameOverMusic = new Audio("assets/sounds/outro_music.wav");

  myFont = loadFont('assets/fonts/FontdinerdotcomHuggable.ttf');
}

// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(1280,480);
  rectMode(CENTER);
  noStroke();
  ////////NEW////////
  // Create a ball
  ball = new Ball(width/2,height/2,5,5,10,5);
  //Put it into the array
  ballArray.push(ball);
  //Create enemy ball
  enemyBall = new EnemyBall(width/2,height/2,-5,-5,10,5);
  //Create ball ball Multiplier
  ballMultiplier = new BallMultiplier();
  ////////END NEW////////
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
    if(introStarts){
      //play intro music
      introMusic.loop = true;
      introMusic.currentTime = 0;
      introMusic.play();
      introStarts = false;
    }
    displayIntro(); //Starting with an intro
  } else if (leftPaddle.score === pointsToWin || rightPaddle.score === pointsToWin){
    //Turn off game music, rewind it, and play outro music once
    gameMusic.pause();
    gameMusic.currentTime = 0;
    if(gameOverStarts){
      gameOverMusic.loop = false;
      gameOverMusic.play();
    }
    displayGameOver(); //End with a game over
  }else {
    //handle input for paddles
    leftPaddle.handleInput();
    rightPaddle.handleInput();

    //update the position of every ball in the array
    for (i = 0; i <ballArray.length; i++){
      ballArray[i].update();
    }
    //update the rest of the elements
    enemyBall.update();
    ballMultiplier.update();
    leftPaddle.update();
    rightPaddle.update();

    //check for scores
    checkForScores();

    //Check if balls have collided with multiplier and if so create a new one
    checkForMultiplier();

    //handle collisions with paddles of every ball in the array
    for (i = 0; i <ballArray.length; i++){
      ballArray[i].handleCollision(leftPaddle);
      ballArray[i].handleCollision(rightPaddle);
    }

    //handle collision of enemy ball with paddles
    enemyBall.handleCollision(leftPaddle);
    enemyBall.handleCollision(rightPaddle);

    //put paddles in disadvantage if they were hit
    if(leftPaddle.wasHit){
      leftPaddle.inDisadvantage();
    }
    if(rightPaddle.wasHit){
      rightPaddle.inDisadvantage();
    }

    //Draws a center line;
    drawCenterLine();

    //display all the balls of the array
    for (i = 0; i <ballArray.length; i++){
      ballArray[i].display();
    }

    //display enemy and ball multiplier
    enemyBall.display();
    ballMultiplier.display();
    /////////END NEW////////

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

///////NEW////////
//checkForScores()
//
//Checks if ball is off screen, attributes a point and resets ball
function checkForScores(){

  //.ballOffScreen() returns the position of the ball as it leaves the screen
  //Check is done for every ball in the array
  for (i = 0; i <ballArray.length; i++){
    //if it leaves through the left side
    if(ballArray[i].isOffScreen() < leftPaddle.x ){
      //trigger events related to score of right paddle
      rightPaddle.scored();

      //Call ball reset
      ballArray[i].reset();
    }
    //if it leaves through the right
    else if (ballArray[i].isOffScreen() > rightPaddle.x){
      //trigger events related to score of left paddle
      leftPaddle.scored();

      //Call ball reset
      ballArray[i].reset();
    }
  }
}

//displayIntro()
//
//Displays title of game, controls, and creates countdown once player starts game
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
      xPressed = false;
      coundownTimer = 180;
      introStarts = true;
      gameMusic.loop = true;
      gameMusic.play();
    //During the countdown, paddle, ball, centerline,
    //ball multiplier and some text are displayed
    }else{
      //stop the intro music
      introMusic.pause();

      //draw paddles, balls and multiplier on screen
      drawCenterLine();
      ballMultiplier.display();
      ball.display();
      enemyBall.display();
      leftPaddle.display();
      rightPaddle.display();
      fill(255);
      textSize(50);

      ellipse(width/2,height/2 - 95,60);
      fill(0);
      //The text changes dependant on the countdown timer
      if(coundownTimer > 120){
        text("3",width/2,height/2 - 100);
      } else if(coundownTimer > 60) {
        text("2",width/2,height/2 - 100);
      } else {
        text("1",width/2,height/2 - 100);
      }

      //Controls the sounds of countdown
      if(coundownTimer === 180 || coundownTimer === 120 || coundownTimer === 60){
        beepSFX.play();
      }

      //decrease the countdown timer
      coundownTimer--;
    }

  //if the x has not been pressed, display Title text
  } else {
    fill(random(200,255), constrain(textOpacity,0,255));
    textSize(50);
    text(titleText,width/2,height/2-100);
    textSize(14);
    text("Up and down arrows control the right player", width/2, height/2);
    text("W and S keys control the left player", width/2, height/2 + 20);
    text("Avoid the red ball or your controls will be inverted for 5 seconds", width/2, height/2 + 40);
    text("A ball multiplier roams around to duplicate every ball that touches it", width/2, height/2 + 60);

    textSize(25);
    text(startGameText, width/2, height/2 + 100);
    textOpacity++; //text appears in a fade-in, thus with increasing opacity
  }
}

//displayGameOver()
//
//diplays game over text, the winner, and possibility to restart game
function displayGameOver(){
  //Display "Game Ove" the text
  fill(random(200,255));
  textSize(50);
  text(gameOverText,width/2,height/2-100);

  //Display who won
  textSize(25);
  if(rightPaddle.score > leftPaddle.score){
    winnerDisplayText = "RIGHT PLAYER WON";
  } else {
    winnerDisplayText = "LEFT PLAYER WON";
  }
  text(winnerDisplayText, width/2, height/2);

  //Displays "press x to restart"
  text(restartGameText, width/2, height/2+100);

  //detect if x key has been pressed
  if(keyIsDown(88)){
    //Resets balls and players
    ball.reset();
    ballArray = [ball];
    enemyBall.reset();
    leftPaddle.reset();
    rightPaddle.reset();

    //Stop outro music, rewinf it and reset trigger
    gameOverMusic.pause();
    gameOverMusic.currentTime = 0;
    gameOverStarts = true;

    // Triggers the intro sequence
    introPlaying = true;
    // Skips the title screen
    xPressed = true;
  }
}

//checkForMultiplier()
//
//Check if balls have collided with multiplier and if so create a new one
function checkForMultiplier(){
  for (i = 0; i <ballArray.length; i++){
    //retrieve propreties of the ball that has collided with the multiplier
    var package = ballMultiplier.handleCollision(ballArray[i]);

    //if that package is not empty
    if(package != null){
      //Spawn a new ball onto the game
      ballArray.push(new Ball(package[0],
        package[1],
        package[2],
        package[3],
        package[4],
        package[5]));
    }
  }
}

//drawCenterLine()
//
//Draws a line at the center of the field
function drawCenterLine(){
  fill(255);
  rect(width/2, height/2, 2,500);
}


//////END NEW///////
