// Prototype 1
// by Dana Ryashy
//
// A simple game prototype for project 3
//
//*****************************************************************************

// Game colors
var bgColor = 0;
var fgColor = 255;


// preload()
//
// Loads
function preload() {

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

}

// draw()
//
// Calls the appropriate functions to run the game
function draw() {
  // Fill the background
  background(bgColor, 100);


}
