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

//animations
var standingLeftAnimation;
var standingRightAnimation;
var runningLeftAnimation;
var runningRightAnimation;
var jumpingRightAnimation;

//player
var player;


//text
var putToLandscape = "Turn your screen to \n landscape mode";

// preload()
//
// Loads
function preload() {
  beepSound = loadSound("assets/sounds/beep.wav");

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
  )

  runningLeftAnimation = loadAnimation(
    'assets/images/playerRunningLeft/player_running_left00.png',
    'assets/images/playerRunningLeft/player_running_left09.png'
  )

  jumpingRightAnimation = loadAnimation(
    'assets/images/playerJumpingUp/player_jumping_up0.png',
    'assets/images/playerJumpingUp/player_jumping_up6.png'
  )

  jumpingLeftAnimation = loadAnimation(
    'assets/images/playerJumpingLeft/player_jumping_left0.png',
    'assets/images/playerJumpingLeft/player_jumping_left6.png'
  )

  jumpingRightAnimation.looping = false;
  jumpingLeftAnimation.looping = false;

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
  }

  rectMode(CENTER);
  noStroke();
  textSize(30);
  textAlign(CENTER,CENTER);
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
      background(155);
    }

    //analyse touch inputs and convert them to player controls if on mobile
    if(onMobile){
      player.playerController();
    }
    //Handle inputs of player
    player.handleInputMove();
    player.handleInputJump();
    player.handleInputCrouch();
    player.shoot();

    //Updates player and bullets shot
    player.update();
    player.updateBullets();

    //Displays player and bullets shot
    player.display();
    player.displayBullets();

    //display controller if on mobile
    if(onMobile){
      player.drawControls();
    }

  }

  //TODO: put game to fullscreen at least on Mobile
  //TODO: make touch controls smaller
  //TODO: enemies!

}

//detectPhone()
//
//Functions detecting if player is on mobile
function detectPhone()
{
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

//TODO: disable copy pop-up on long press in mobile
