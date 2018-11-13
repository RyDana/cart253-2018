// Prototype 1
// by Dana Ryashy
//
// A simple game prototype for project 3
//
//*****************************************************************************

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
  // Fill the background
  background(155, 100);

  player.handleInputMove();
  player.handleInputJump();
  player.update();

  player.display();

}
