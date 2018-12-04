// Project 3
// by Dana Ryashy
//
//
//
//*****************************************************************************

//Detect if user on Phone
var onMobile = false;
//detect if the canvas was created
var canvasCreated = false;
// Track whether we're in fullscreen
var isFullScreen = false;
// Track the canvas element
var canvas;

//Sounds
var beepSound;

//sprite
var spriteSheet;

//player animations
var standingLeftAnimation;
var standingRightAnimation;
var runningLeftAnimation;
var runningRightAnimation;
var jumpingRightAnimation;
var jumpingleftAnimation;
var crouchRightAnimation;
var crouchLeftAnimation;

var upStandingLeftAnimation;
var upStandingRightAnimation;
var upRunningLeftAnimation;
var upRunningRightAnimation;
var upCrouchRightAnimation;
var upCrouchLeftAnimation;

//player images
var playerFace;
var crouchRight;
var crouchLeft;
var upCrouchRight;
var upCrouchLeft;

//Enemy Animations
var enemOneStandingLeftAnimation;
var enemOneStandingRightAnimation;
//enemy images
var enemyOneFace;

//player
var player;

//enemies
var enemyOne;

//text
var putToLandscape = "Turn your screen to \n landscape mode";

//Intro variables
var introPlaying = true; //detects when intro should stop being played
var myFont; //font for text display
var textOpacity = 0; //text will have a changing opacity for fade-in effect
var xPressed = false; //Detects when the x key is pressed to start game
var introStarts = true;

//Game Over variables
var winnerDisplayText;
var gameOverStarts = true;

var gameStarts = true;

// preload()
//
// Loads
function preload() {
  beepSound = loadSound("assets/sounds/beep.wav");

  //loading font
  myFont = loadFont('assets/fonts/half_bold_pixel-7.ttf');

  //loading player animation files
  standingLeftAnimation = loadAnimation(
    'assets/images/playerStanding/player_standing0.png',
    'assets/images/playerStanding/player_standing7.png');

  standingRightAnimation = loadAnimation(
      'assets/images/playerStandingRight/player_standing_right0.png',
      'assets/images/playerStandingRight/player_standing_right7.png');

  runningRightAnimation = loadAnimation(
    'assets/images/playerRunningRight/player_running_right00.png',
    'assets/images/playerRunningRight/player_running_right09.png'
  );

  runningLeftAnimation = loadAnimation(
    'assets/images/playerRunningLeft/player_running_left00.png',
    'assets/images/playerRunningLeft/player_running_left09.png'
  );

  jumpingRightAnimation = loadAnimation(
    'assets/images/playerJumpingUp/player_jumping_up0.png',
    'assets/images/playerJumpingUp/player_jumping_up6.png'
  );

  jumpingLeftAnimation = loadAnimation(
    'assets/images/playerJumpingLeft/player_jumping_left0.png',
    'assets/images/playerJumpingLeft/player_jumping_left6.png'
  );

  jumpingRightAnimation.looping = false;
  jumpingLeftAnimation.looping = false;

  crouchLeftAnimation = loadAnimation(
    'assets/images/playerCrouchWalkingLeft/player_crouch_walking_left0.png',
    'assets/images/playerCrouchWalkingLeft/player_crouch_walking_left7.png'
  );

  crouchRightAnimation = loadAnimation(
    'assets/images/playerCrouchWalkingRight/player_crouch_walking_right0.png',
    'assets/images/playerCrouchWalkingRight/player_crouch_walking_right7.png'
  );

  upStandingLeftAnimation = loadAnimation(
    'assets/images/upPlayerStandingLeft/up_player_standing_left0.png',
    'assets/images/upPlayerStandingLeft/up_player_standing_left7.png'
    );

  upStandingRightAnimation = loadAnimation(
    'assets/images/upPlayerStandingRight/up_player_standing_right0.png',
    'assets/images/upPlayerStandingRight/up_player_standing_right7.png'
  );

  upRunningLeftAnimation = loadAnimation(
    'assets/images/upPlayerRunningLeft/up_running_left00.png',
    'assets/images/upPlayerRunningLeft/up_running_left09.png'
  );

  upRunningRightAnimation = loadAnimation(
    'assets/images/upPlayerRunningRight/ip_player_running_right00.png',
    'assets/images/upPlayerRunningRight/ip_player_running_right09.png'
  );

  upCrouchRightAnimation = loadAnimation(
    'assets/images/upPlayerCrouchWalkingRight/up_crouch_walking_right0.png',
    'assets/images/upPlayerCrouchWalkingRight/up_crouch_walking_right7.png',
  );

  upCrouchLeftAnimation = loadAnimation(
    'assets/images/upPlayerCrouchWalkingLeft/up_crouch_walking_left0.png',
    'assets/images/upPlayerCrouchWalkingLeft/up_crouch_walking_left7.png',
  );


  //loading enemy animation files

  enemOneStandingLeftAnimation = loadAnimation(
    'assets/images/MonsterOneStandingLeft/monsterOne_standing_left0.png',
    'assets/images/MonsterOneStandingLeft/monsterOne_standing_left7.png'
  );

  enemOneStandingRightAnimation = loadAnimation(
    'assets/images/MonsterOneStandingRight/monsterOne_standing_right0.png',
    'assets/images/MonsterOneStandingRight/monsterOne_standing_right7.png'
  );

  //loading enemy images
  enemyOneFace = loadImage('assets/images/enemyOne_face.png');

  //loading player images
  playerFace = loadImage('assets/images/player_face.png');
  crouchRight = loadImage('assets/images/player_crouch_right.png');
  crouchLeft = loadImage('assets/images/player_crouch_left.png');
  upCrouchRight = loadImage('assets/images/upPlayerCrouchWalkingRight/up_crouch_walking_right0.png');
  upCrouchLeft = loadImage('assets/images/upPlayerCrouchWalkingLeft/up_crouch_walking_left0.png');

  //detecting if user is on a phone (implying possibility for touch)
  detectPhone();
}

// setup()
//
// Creates the canvas, sets up the drawing modes, initialises the player
function setup() {
  // Create canvas and set drawing modes
  if(onMobile){
    // create canvas
    canvas = createCanvas(window.innerWidth , window.innerHeight);
    // Fill the background
    background(0, 216, 255);
    //create player using PlayerMobile constructor (for touch capabilities)
    player = new PlayerMobile(width/2, height/2);

  }else{
    canvas = createCanvas(1280,480);
    //Create Player using Player constructor (for keyboard capabilities)
    player = new Player(width/2, height/2);

    enemyOne = new EnemyOne(width/4, height/2);
  }

  rectMode(CENTER);
  noStroke();
  textSize(30);
  textAlign(CENTER,CENTER);
  textFont(myFont);
}

// draw()
//
// Calls the appropriate functions to run the game
function draw() {
  //Asks user to put phone in ladscape mode if user on a phone
  if(onMobile && window.innerWidth < window.innerHeight){
    text(putToLandscape, width/2, height/2);

    //the correct landscape canvas was not recreted yet
    canvasCreated = false;
  }
  else{
    //recreate canvas to fit mobile device once rotated (called once)
    if(!canvasCreated && onMobile){
      canvas = createCanvas(window.innerWidth,window.innerHeight);
      //avoid canvas creation on subsequent frames
      canvasCreated = true;
    }

    //different background colors for testing purposes
    if(onMobile){
      background(0, 216, 255, 100);
    }else{
      background(0);
    }

    if (introPlaying){
      if(introStarts){
        //play intro music
        // introMusic.loop = true;
        // introMusic.currentTime = 0;
        // introMusic.play();
        introStarts = false;
      }
      displayIntro(); //Starting with an intro
    } else if (player.life <= 0 || enemyOne.life <= 0){
      //Turn off game music, rewind it, and play outro music once
      // gameMusic.pause();
      // gameMusic.currentTime = 0;
      if(gameOverStarts){
        // gameOverMusic.loop = false;
        // gameOverMusic.play();
        gameOverStarts = false;
      }
      displayGameOver(); //End with a game over
    }else {
      //analyse touch inputs and convert them to player controls if on mobile
      if(onMobile){
        player.playerController();
      }
      //Handle inputs of player
      player.handleInputMove();
      player.handleInputJump();
      player.handleInputCrouch();
      player.handleInputUp();
      player.shoot();

      player.handleBulletCollision(enemyOne);
      enemyOne.handleBulletCollision(player);
      player.handleEnemyCollision(enemyOne);

      //Updates player and bullets shot
      enemyOne.update(player.x);
      enemyOne.updateBullets();
      player.update();
      player.updateBullets();

      //Displays player and bullets shot
      enemyOne.display();
      enemyOne.displayBullets();
      player.display();
      player.displayBullets();

      enemyOne.displayLifeBar();
      player.displayLifeBar();

      //display controller if on mobile
      if(onMobile){
        player.drawControls();
      }
    }
  }
}

//detectPhone()
//
//Functions detecting if player is on mobile
function detectPhone(){
   if (/Android|iPhone|iPad|iPod|IEMobile|Windows Phone/i.test(navigator.userAgent)){
     //alert('true: ' + navigator.userAgent);
      onMobile = true;
   }else{
     //alert('false: ' + navigator.userAgent);
      onMobile = false;
   }
}

//touchMoved()
//
//redefines the original p5 method and prevents dragging screen around
function touchMoved() {
  return false;
}


//goFullScreen()
//
//Puts the game in fullscreen
//Adjusts canvas size on mobile to fit the display
//Is not currently used because causes bugs with p5.play.js
function goFullScreen() {
  //if(mouseX < 80 && mouseX > 0 && mouseY > 0 && mouseY < 80){
    // When the mouse is pressed we toggle the variable tracking fullscreen
    isFullScreen = !isFullScreen;
    // And set fullscreen to the result
    fullscreen(isFullScreen);

    if(onMobile){
      if(isFullScreen){
        //if phone is in portrait mode when page loaded, but is rotated to landscape
        if(displayWidth < displayHeight && window.innerWidth > window.innerHeight){
          //invert the height and width during canvas creation
          canvas = createCanvas(displayHeight,displayWidth);
        } else {
          canvas = createCanvas(displayWidth, displayHeight);
        }

      } else{
        canvas = createCanvas(window.innerWidth,window.innerHeight);
      }

      rectMode(CENTER);
      noStroke();
      textSize(30);
      textAlign(CENTER,CENTER);
    }



    // // Now we calculate the desired height of the canvas based on whether we're
    // // in fullscreen (and want displayHeight) or not (and want the regular height)
    // var newHeight = 0;
    // if (isFullScreen) {
    //   newHeight = displayHeight;
    //   newWidth = displayWidth;
    // }
    // else {
    //   newHeight = height;
    //   newWidth = width;
    // }
    // // Finally, using p5.dom's style() method we set the height and width of the
    // // canvas element to the new height
    // canvas.style("height:" + newWidth * canvasRatio + "px");
    // // And we calculate and set the width based on the ratio
    // canvas.style("width:" + newWidth + "px");

}

//displayIntro()
//
//Displays title of game, controls, and creates countdown once player starts game
function displayIntro(){
  //setting some text
  //textFont(myFont);
  textSize(50);
  textAlign(CENTER,CENTER);

  //detect is x key has been pressed
  if(keyIsDown(88)){
    xPressed = true;
  }

  //stop the intro at key press
  if(xPressed){
    introPlaying = false;
  //if the x has not been pressed, display Title text
  } else {
    fill(random(200,255), constrain(textOpacity,0,255));
    textSize(50);
    text("BFBFBF",width/2,height/2-100);
    textSize(14);
    text("(Boss Fight, Boss Fight, Boss Fight)",width/2,height/2-50);
    // text("Up and down arrows control the right player", width/2, height/2);
    // text("W and S keys control the left player", width/2, height/2 + 20);
    // text("Avoid the red ball or your controls will be inverted for 5 seconds", width/2, height/2 + 40);
    // text("A ball multiplier roams around to duplicate every ball that touches it", width/2, height/2 + 60);

    textSize(25);
    text("Press x to start the game", width/2, height/2 + 100);
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
  text("GAME OVER",width/2,height/2-100);

  //Display who won
  textSize(25);
  if(player.life <= 0){
    winnerDisplayText = "You've been defeated";
  } else {
    winnerDisplayText = "YOU WON!";
  }
  text(winnerDisplayText, width/2, height/2);

  //Displays "press x to restart"
  //text("press x to restart game", width/2, height/2+100);

  // //detect if x key has been pressed
  // if(keyIsDown(88)){
  //   //Resets balls and players
  //   ball.reset();
  //   ballArray = [ball];
  //   enemyBall.reset();
  //   leftPaddle.reset();
  //   rightPaddle.reset();
  //
  //   //Stop outro music, rewinf it and reset trigger
  //   gameOverMusic.pause();
  //   gameOverMusic.currentTime = 0;
  //   gameOverStarts = true;
  //
  //   // Triggers the intro sequence
  //   introPlaying = true;
  //   // Skips the title screen
  //   xPressed = true;
  // }
}

//TODO: disable copy pop-up on long press in mobile
