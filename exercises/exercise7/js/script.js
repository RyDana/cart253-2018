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

// Game colors
var bgColor = 0;
var fgColor = 255;

//Sounds
var beepSound;

//player
var player;

// preload()
//
// Loads
function preload() {
  beepSound = loadSound("assets/sounds/beep.wav")

  detectPhone();
}

// setup()
//
// Creates the canvas, sets up the drawing modes,
function setup() {
  // Create canvas and set drawing modes
  if(onMobile){
    createCanvas(window.innerWidth , window.innerHeight);
  }else{
    // Fill the background
    createCanvas(1280,480);
  }
  rectMode(CENTER);
  noStroke();
  fill(fgColor);

  //Create Player
  player = new Player(width/2, height/2);


}

// draw()
//
// Calls the appropriate functions to run the game
function draw() {

  if (onMobile && window.innerWidth < window.innerHeight && !rotationDetected){
    text("turn your screen to landscape mode", width/2, height/2);
  } else{

      if(onMobile && !canvasCreated){
        createCanvas(window.innerWidth,window.innerHeight);
        canvasCreated = true;
        rotationDetected = true;
      }
      
      if(onMobile){
        background(255,0,0);
      }else{
        // Fill the background
        background(155, 100);
      }
      //Handle inputs of player
      player.handleInputMove();
      player.handleInputJump();
      player.handleInputCrouch();
      player.shoot();

      //Updates playerand bullets shot
      player.update();
      player.updateBullets();

      //Displays player and bullets shot
      player.display();
      player.displayBullets();
  }


}

//detectPhone()
//
//Functions detecting if player is on mobile
function detectPhone()
{
   //var uagent = navigator.userAgent.toLowerCase();
   if (/Android|iPhone|iPad|iPod|IEMobile|Windows Phone/i.test(navigator.userAgent)){
      onMobile = true;
   }else{
      onMobile = false;
   }
}
