// Exercise 1 - Moving pictures
// Dana Ryashy
//
// It moves five pictures around on the canvas.
// One moves linearly down the screen.
// One moves linearly from right to left.
// Two move toward the mouse cursor, at different speeds.
// One is kept at the mouse cursor position.
// One moves in a sine movement.


// The image of a clown face
var clownImage;
// The current position of the clown face
var clownImageX;
var clownImageY;

// The transparent image of "felt" that wipes down the canvas
var feltTextureImage;
// The current position of the transparent image of "felt"
var feltTextureImageX;
var feltTextureImageY;

// The image of a thumb up emoji
var thumbUpImage;
// The current position of the thumb up images
var thumbUpImageX;
var thumbUpImageY;
// The size of the thumb up image
var thumbUpImageWdth;
var thumbUpImageHght;

//The image of a grandpa emoji
var grandpaImage;
//The curent position of the grandpa images
var grandpaImageX;
var grandpaImageY;
//The size of the grandpa image
var grandpaImageWdth;
var grandpaImageHght;

//The image of a burrito
var burritoImage;
//The current position of the burrito image
var burritoImageX;
var burritoImageY;
//The size of the burrito image
var burritoImageWdth;
var burritoImageHght;

//The image of a heart
var heartImage;
//The current position of the heart image
var heartImageX;
var heartImageY;
//The size of the heart image
var heartImageWdth;
var heartImageHght;


// preload()
//
// Load the five images we're using before the program starts

function preload() {
  clownImage = loadImage("assets/images/clown.png");
  feltTextureImage = loadImage("assets/images/black-felt-texture.png");
  thumbUpImage = loadImage("assets/images/thumbs-up.png");
  grandpaImage = loadImage("assets/images/white_grandpa.png");
  burritoImage = loadImage("assets/images/burrito.png");
  heartImage = loadImage("assets/images/sparkly-heart.png");
}


// setup()
//
// Set up the canvas, position the images, set the image mode.

function setup() {
  // Create our canvas
  createCanvas(640,640);

  // Start the clown image at the centre of the canvas
  clownImageX = width/2;
  clownImageY = height/2;

  // Start the grandpa image at the centre of the canvas
  grandpaImageX = width/2;
  grandpaImageY = height/2;

  //Set the size of the grandpa image
  grandpaImageWdth = width/20;
  grandpaImageHght = height/20;

  // Start the felt image perfectly off screen above the canvas
  feltTextureImageX = width/2;
  feltTextureImageY = 0 - feltTextureImage.height/2;

  //Start the thumb up image at the left of the canvas, centered vertically
  thumbUpImageX = 0;
  thumbUpImageY = height/2;

  //Set the size of the thumb up image
  thumbUpImageWdth = width/10;
  thumbUpImageHght = height/10;

  //Start the burrito image at the centre of the canvas
  burritoImageX = width/2;
  burritoImageY = height/2;

  //Set the size of the burrito image
  burritoImageWdth = width/8;
  burritoImageHght = height/8;

  //Start the heart image at the left of the canvas
  heartImageX = 0;

  //Set the size of the heart image
  heartImageWdth = width/4;
  heartImageHght = height/4;

  // We'll use imageMode CENTER for this script
  imageMode(CENTER);
}


// draw()
//
// Moves the felt image linearly
// Moves the clown face toward the current mouse location
// Moves the thumbs up from left to right
// Sets the grandpa image on the mouse position
// Moves the burrito images towards the current mouse location
// Moves the heart image in a sine wave, from left to right

function draw() {

  // Move the felt image down by increasing its y position
  feltTextureImageY += 1;

  // Display the felt image
  image(feltTextureImage,feltTextureImageX,feltTextureImageY);

  //Move the thumbs up image to the right by increasing the x position
  thumbUpImageX += 1;

  // Display the thumbs up image
  image(thumbUpImage,thumbUpImageX, thumbUpImageY, thumbUpImageWdth, thumbUpImageHght);

  // Move the clown by moving it 1/10th of its current distance from the mouse

  // Calculate the distance in X and in Y
  var xDistance = mouseX - clownImageX;
  var yDistance = mouseY - clownImageY;
  // Add 1/10th of the x and y distance to the clown's current (x,y) location
  clownImageX = clownImageX + xDistance/10;
  clownImageY = clownImageY + yDistance/10;

  // Display the clown image
  image(clownImage,clownImageX,clownImageY);

  //Position the grandpa image so that it follows the mouse
  grandpaImageX = mouseX;
  grandpaImageY = mouseY;

  //Display the grandpa image
  image(grandpaImage,grandpaImageX,grandpaImageY,grandpaImageWdth,grandpaImageHght);

  // Move the burrito by moving it 1/20th of its current distance from the mouse

  // Calculate the distance in X and in Y
  xDistance = mouseX - burritoImageX;
  yDistance = mouseY - burritoImageY;
  // Add 1/20th of the x and y distance to the burrito's current (x,y) location
  burritoImageX += xDistance/20;
  burritoImageY += yDistance/20;

  //Display the burrito image
  image(burritoImage,burritoImageX, burritoImageY, burritoImageWdth, burritoImageHght);

  //Move the heart image to the right by increasing the x position
  heartImageX += 1;
  //Move the hearth image up and down according to the sine equation
  heartImageY = 10*sin(heartImageX/10) + 200;

  //Display the heart image
  image(heartImage,heartImageX,heartImageY,heartImageWdth,heartImageHght);
}
