/******************************************************************************
Exercise 3 - Where's Sausage Dog? Plus
by Dana Ryashy

An algorithmic version of a Where's Wally searching game where you
need to click on the sausage dog you're searching for in amongst all
the visual noise of other animals.

Animal images from:
https://creativenerds.co.uk/freebies/80-free-wildlife-icons-the-best-ever-animal-icon-set/
Light beams image from:
https://www.freeiconspng.com/uploads/light-png-22.png
******************************************************************************/

// Position, size and image of the sausage dog we're searching for
var targetX;
var targetY;
var targetWidth;
var targetHeight;
var targetImage;

//Movement variables for the sausage dog once found
var targetVX;
var targetVY;
var targetMaxWidth = 350;

//Light beams image displayed once dog is found
var beamImage;
var beamImageHeight = 1;
var beamImageWidth = 1;

//RGB values for winning text
var r = 255;
var g = 0;
var b = 0;

//Reference image for the sausage dog
var referenceX;
var referenceY;
//Margin between the sausage dog image and edge of the rectangle it's in
var referenceMargin = 40;
//Corner rounding value of the background rectangle of the reference image
var roundedCorner = 10;
//Caption serving as the instruction for the game
var captionText = "WHERE AM I?";

//Winning text displayed once the dog is found
var winningText = "YOU HAVE WINNED";

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

// The number of decoys to show on the screen
var numDecoys;

// Image scaling variable, allowing the images to be different sizes every game
var imageScaling;

// Keep track of whether they've won
var gameOver = false;

// preload()
//
// Loads the target, decoy and light beam images before the program starts
function preload() {
  targetImage = loadImage("assets/images/animals-target.png");
  beamImage = loadImage("assets/images/beams.png");

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

  //Assign the random number of decoys
  numDecoys = random(100,200);

  //Assign the image scaling variable at a random value
  imageScaling = random(0.3, 2);

  //Assign the target's height and with so it can be changed for the winning animation
  targetWidth = targetImage.width*imageScaling;
  targetHeight = targetImage.height*imageScaling;

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
      image(decoyImage1,x,y,
        decoyImage1.width*imageScaling, decoyImage1.height*imageScaling);
    }
    else if (r < 0.2) {
      image(decoyImage2,x,y,
        decoyImage2.width*imageScaling, decoyImage2.height*imageScaling);
    }
    else if (r < 0.3) {
      image(decoyImage3,x,y,
        decoyImage3.width*imageScaling, decoyImage3.height*imageScaling);
    }
    else if (r < 0.4) {
      image(decoyImage4,x,y,
        decoyImage4.width*imageScaling, decoyImage4.height*imageScaling);
    }
    else if (r < 0.5) {
      image(decoyImage5,x,y,
        decoyImage5.width*imageScaling, decoyImage5.height*imageScaling);
    }
    else if (r < 0.6) {
      image(decoyImage6,x,y,
        decoyImage6.width*imageScaling, decoyImage6.height*imageScaling);
    }
    else if (r < 0.7) {
      image(decoyImage7,x,y,
        decoyImage7.width*imageScaling, decoyImage7.height*imageScaling);
    }
    else if (r < 0.8) {
      image(decoyImage8,x,y,
        decoyImage8.width*imageScaling, decoyImage8.height*imageScaling);
    }
    else if (r < 0.9) {
      image(decoyImage9,x,y,
        decoyImage9.width*imageScaling, decoyImage9.height*imageScaling);
    }
    else if (r < 1.0) {
      image(decoyImage10,x,y,
        decoyImage10.width*imageScaling, decoyImage10.height*imageScaling);
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
  image(targetImage,targetX,targetY,
    targetImage.width*imageScaling, targetImage.height*imageScaling);

}


// draw()
//
// Performs an animation once the game is won
function draw() {
  if (gameOver) {
    //Create a new background of the same yellow color than in setup()
    background("#ffff00");

    //Draws a rotating light beam image
    push();
    translate(width*0.5, height*0.5);
    rotate(frameCount / 50.0);
    image(beamImage, 0,0, beamImageWidth, beamImageHeight);
    pop();

    //Increases the size of the light beam image from 1x1 pixels
    //until it is around its original size
    if (beamImageWidth < beamImage.width){
      beamImageWidth+=20;
      beamImageHeight+=20;
    }

    //Animation making the found sausage dog come front and center

    //Sets the velocity of the image according to
    //its distance from the center of the screen
    targetVX = width/2 - targetX;
    targetVY = height/2 - targetY;
    //Moves the position of the sausage dog image
    targetX += targetVX*0.1;
    targetY += targetVY*0.1;
    //Increases the size of the sausage dog image so its around 350px wide
    if(targetWidth<targetMaxWidth){
      targetWidth += 4;
      targetHeight += 4;
    }
    //Draws the sausage dog
    image(targetImage,targetX,targetY,targetWidth, targetHeight);


    // Prepare our typography for the winning text
    // A changing fill
    fill(r,g,b);
    if(r == 255 && g < 255 && b == 0){
      g+=5;
    }else if (r <= 255 && r > 0 && g == 255 && b == 0){
      r-=5;
    }else if (r == 0 && g == 255 && b >= 0 && b < 255){
      b+=5;
    }else if (r == 0 && g <= 255 && g > 0 && b == 255){
      g-=5;
    }else if (r < 255 && g == 0 && b == 255){
      r+=5;
    }else if (r == 255 && g == 0 && b <=255 && b >0){
      b-=5;
    }
    //A big size
    textSize(128);
    noStroke();
    // Tell them they won!
    text(winningText,width/2,height/4);
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
