// Prototype 1
// by Dana Ryashy
//
// A simple game prototype for project 3
//
//*****************************************************************************

//Detect if user on Phone
var onMobile = false;
//Detect when user rotated phone
var rotationDetected = false;
//detect if the canvas was created
var canvasCreated = false;

//Sounds
var beepSound;

//player
var player;

// preload()
//
// Loads
function preload() {
  beepSound = loadSound("assets/sounds/beep.wav")

  //detecting if user is on a phone (implying possibility for touch)
  detectPhone();
}

// setup()
//
// Creates the canvas, sets up the drawing modes, initialises the player
function setup() {
  // Create canvas and set drawing modes
  if(onMobile){
    createCanvas(window.innerWidth , window.innerHeight);
    // Fill the background
    background(0, 216, 255);
    //create player using PlayerMobile constructor (for touch capabilities)
    player = new PlayerMobile(width/2, height/2);

  }else{
    createCanvas(1280,480);
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
  if (onMobile && window.innerWidth < window.innerHeight && !rotationDetected){
    text("turn your screen to landscape mode", width/2, height/2);

  } else{
    //recreate canvas to fit mobile device once rotated (called once)
    if(!canvasCreated){
      recreateCanvasOnMobile();
      //avoid canvas creation on subsequent frames
      canvasCreated = true;
    }

    //different background colors for testing purposes
    if(onMobile){
      background(0, 216, 255, 100);
    }else{
      background(155, 100);
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

//recreateCanvasOnMobile()
//
//Recreates a canvas that fits the player's window on mobile
//(or else the dimentions of the previous canvas would've been kept)
function recreateCanvasOnMobile(){
  if(onMobile){
    createCanvas(window.innerWidth,window.innerHeight);
    //do not ask to rotate the sceen again
    rotationDetected = true;
  }
}
