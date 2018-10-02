/******************************************************************************
Exercise 3 - Where's Sausage Dog? Plus
by Dana Ryashy

An algorithmic version of a Where's Wally searching game where you
need to click on the sausage dog you're searching for in amongst all
the visual noise of other animals.

Animal images from:
https://creativenerds.co.uk/freebies/80-free-wildlife-icons-the-best-ever-animal-icon-set/
******************************************************************************/

// Position and image of the sausage dog we're searching for
var targetX;
var targetY;
var targetImage;

//Reference image for the sausage dog
var referenceX;
var referenceY;
//Margin between the sausage dog image and edge of the rectangle it's in
var referenceMargin = 40;
//Corner rounding value of the background rectangle of the reference image
var roundedCorner = 10;
//Caption serving as the instruction for the game
var captionText = "WHERE AM I?";

// The ten decoy images
var decoyImage1;
var decoyImage2;
var decoyImage3;
var decoyImage4;
var decoyImage5;
var decoyImage6;
var decoyImage7;
var decoyImage8;
var decoyImage9;
var decoyImage10;

// The number of decoys to show on the screen, randomly
// chosen from the decoy images
var numDecoys = 100;

// Keep track of whether they've won
var gameOver = false;

// preload()
//
// Loads the target and decoy images before the program starts
function preload() {
  targetImage = loadImage("assets/images/animals-target.png");

  decoyImage1 = loadImage("assets/images/animals-01.png");
  decoyImage2 = loadImage("assets/images/animals-02.png");
  decoyImage3 = loadImage("assets/images/animals-03.png");
  decoyImage4 = loadImage("assets/images/animals-04.png");
  decoyImage5 = loadImage("assets/images/animals-05.png");
  decoyImage6 = loadImage("assets/images/animals-06.png");
  decoyImage7 = loadImage("assets/images/animals-07.png");
  decoyImage8 = loadImage("assets/images/animals-08.png");
  decoyImage9 = loadImage("assets/images/animals-09.png");
  decoyImage10 = loadImage("assets/images/animals-10.png");
}

// setup()
//
// Creates the canvas, sets basic modes, draws correct number
// of decoys in random positions, then the target
function setup() {
  createCanvas(windowWidth,windowHeight);
  background("#ffff00");
  imageMode(CENTER);
  rectMode(CENTER);

  // Use a for loop to draw as many decoys as we need
  for (var i = 0; i < numDecoys; i++) {
    // Choose a random location for this decoy
    var x = random(0,width);
    var y = random(0,height);
    // Generate a random number we can use for probability
    var r = random();
    // Use the random number to display one of the ten decoy
    // images, each with a 10% chance of being shown
    // We'll talk more about this nice quality of random soon enough
    if (r < 0.1) {
      image(decoyImage1,x,y);
    }
    else if (r < 0.2) {
      image(decoyImage2,x,y);
    }
    else if (r < 0.3) {
      image(decoyImage3,x,y);
    }
    else if (r < 0.4) {
      image(decoyImage4,x,y);
    }
    else if (r < 0.5) {
      image(decoyImage5,x,y);
    }
    else if (r < 0.6) {
      image(decoyImage6,x,y);
    }
    else if (r < 0.7) {
      image(decoyImage7,x,y);
    }
    else if (r < 0.8) {
      image(decoyImage8,x,y);
    }
    else if (r < 0.9) {
      image(decoyImage9,x,y);
    }
    else if (r < 1.0) {
      image(decoyImage10,x,y);
    }
  }

  //Set a location for the reference image
  referenceX = width - targetImage.width/2 - referenceMargin;
  referenceY = targetImage.height/2 + referenceMargin;
  //Draw a white background rectangle for the reference image
  fill(255);
  stroke(24, 48, 68);
  strokeWeight(5);
  rect(referenceX, referenceY, targetImage.width + 2*referenceMargin ,
    targetImage.height+ 2*referenceMargin, roundedCorner);
  //Draw the reference image of the sausage dog on top of everything
  image(targetImage, referenceX, referenceY);
  //Add the caption on top of the image
  //Prepare the typography
  textFont("Helvetica");
  textStyle(BOLD);
  textSize(24);
  textAlign(CENTER,CENTER);
  noStroke();
  fill(24, 48, 68);
  //Display the caption
  text(captionText, referenceX, referenceMargin);

  // We choose a location for the target
  //it should not be behing the reference image's background rectangle
  do{
    targetX = random(0,width);
    targetY = random(0,height);
  }while(targetX > width - targetImage.width*1.5 - referenceMargin*2 &&
    targetY < targetImage.height*1.5 + referenceMargin*2);
  // And draw it (this means it will always be on top)
  image(targetImage,targetX,targetY);

}

function draw() {
  if (gameOver) {
    // Prepare our typography
    textSize(128);
    noStroke();
    fill(random(255));
    // Tell them they won!
    text("YOU WINNED!",width/2,height/2);

    noFill();
    stroke(random(255));
    strokeWeight(10);
    ellipse(targetX,targetY,targetImage.width,targetImage.height);
  }
}

// mousePressed()
//
// Checks if the player clicked on the target and if so tells them they won
function mousePressed() {
  // Check if the mouse is in the x range of the target
  if (mouseX > targetX - targetImage.width/2 && mouseX < targetX + targetImage.width/2) {
    // Check if the mouse is also in the y range of the target
    if (mouseY > targetY - targetImage.height/2 && mouseY < targetY + targetImage.height/2) {
      gameOver = true;
    }
  }
}
