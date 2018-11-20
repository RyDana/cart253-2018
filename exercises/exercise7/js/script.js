// Prototype 1
// by Dana Ryashy
//
// A simple game prototype for project 3
//
//*****************************************************************************

//Detect if user on Phone
var onMobile;

// Game colors
var bgColor = 0;
var fgColor = 255;

//Sounds
var beepSound;

//player
var player;

//Functions detecting of player on mobile
document.window.onload = function() {DetectIphone()}
function DetectIphone()
{
   //var uagent = navigator.userAgent.toLowerCase();
   if (/Android|iPhone|iPad|iPod|IEMobile|Windows Phone/i.test(navigator.userAgent)){
      onMobile = true;
   }else{
      onMobile = false;
   }
}

// preload()
//
// Loads
function preload() {
  beepSound = loadSound("assets/sounds/beep.wav")
}

// setup()
//
// Creates the canvas, sets up the drawing modes,
function setup() {
  // Create canvas and set drawing modes
  createCanvas(1280,480);
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

//TODO: currently the player seems to not be able to shoot while its moving
//TODO: Allow player to shoot towards the left as well