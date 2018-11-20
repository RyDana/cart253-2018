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

  detectPhone();
}

// setup()
//
// Creates the canvas, sets up the drawing modes,
function setup() {
  // Create canvas and set drawing modes
  if(onMobile){
    createCanvas(window.innerWidth , window.innerHeight);
    background(0, 216, 255, 100);
    //create player
    player = new PlayerMobile(width/2, height/2);
  }else{
    // Fill the background
    createCanvas(1280,480);
    //Create Player
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

  if (onMobile && window.innerWidth < window.innerHeight && !rotationDetected){
    text("turn your screen to landscape mode", width/2, height/2);
  } else{

      if(onMobile && !canvasCreated){
        createCanvas(window.innerWidth,window.innerHeight);
        canvasCreated = true;
        rotationDetected = true;
      }

      if(onMobile){
        background(0, 216, 255, 100);
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
   if (/Android|iPhone|iPad|iPod|IEMobile|Windows Phone/i.test(navigator.userAgent)){
     //alert('true: ' + navigator.userAgent);
      onMobile = true;
   }else{
     //alert('false: ' + navigator.userAgent);
      onMobile = false;
   }
}

// function drawControls(){
//   push();
//   noFill();
//   stroke(0);
//   ellipse(width)
// }
