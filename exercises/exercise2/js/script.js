/*********************************************************

Exercise 2 - The Artful Dodger
Dana Ryashy

A game of dodging: move the happy green avatar around so it doesnt bump into
the weird white dudes.

*********************************************************/

// The position and size of our avatar
var avatarX;
var avatarY;
var avatarSize = 50;
//How much bigger or smaller the avatar will get after a dodge
var avatarSizeChange;

// The speed and velocity of our avatar
var avatarSpeed = 10;
var avatarVX = 0;
var avatarVY = 0;
//How much faster or slower the avatar will get after a dodge
var avatarSpeedChange;

//Offset of avatar's position from the mouse
//if a finger is used to play on a touch screen
var avatarMouseOffset = 50;

// The position and size of the enemy
var enemyX;
var enemyY;
var enemySize = 50;
// How much bigger the enemy gets with each successful dodge
var enemySizeIncrease = 5;

// The speed and velocity of our enemy
var enemySpeed = 5;
var enemyVX = 5;
// How much faster the enemy gets with each successful dodge
var enemySpeedIncrease = 0.5;

//Variables necessary for avatar and enemy limb movement
var limbPosition = 0;
var pi;
var angle1;
var angle2;
//Avatar limbs
var avatarLegX;
var avatarLegY;
var avatarRightArmX;
var avatarLeftArmX;
var avatarArmY;
//Enemy limbs
var enemyLegX;
var enemyLegY;
var enemyRightArmX;
var enemyLeftArmX;
var enemyArmY;

// How many dodges the player has made
var dodges = 0;

//Font and images
var myFont;
var scaredFaceImage;
var happyFaceImage;

//RGB variables for background color
var r = 255;
var g = 0;
var b = 0;

//preload()
//
//loads a font and images
function preload() {
  myFont = loadFont('assets/fonts/FontdinerdotcomHuggable.ttf');
  scaredFaceImage = loadImage('assets/images/scared_face2.png');
  happyFaceImage = loadImage('assets/images/happy_face.png');
}

// setup()
//
// Make the canvas, initialise pi variables, position the avatar and enemy
function setup() {
  // Create our playing area
  createCanvas(500,500);

  //Initialize the pi variables
  pi = -PI;
  pi2 = -PI;

  // Put the avatar in the centre
  avatarX = width/2;
  avatarY = height/2;

  // Put the enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(0,height);

  // No stroke so it looks cleaner
  noStroke();

  //Set imageMode
  imageMode(CENTER);
}

// draw()
//
// Handle moving the avatar and enemy and checking for dodges and
// game over situations.
function draw() {
  // A changing background
  background(r,g,b);
  if(r == 255 && g < 255 && b == 0){
    g++;
  }else if (r <= 255 && r > 0 && g == 255 && b == 0){
    r--;
  }else if (r == 0 && g == 255 && b >= 0 && b < 255){
    b++;
  }else if (r == 0 && g <= 255 && g > 0 && b == 255){
    g--;
  }else if (r < 255 && g == 0 && b == 255){
    r++;
  }else if (r == 255 && g == 0 && b <=255 && b >0){
    b--;
  }

  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;

  //Check if player decides to play with mouse (or touch) or keyboard
  if (mouseIsPressed) {
    avatarX = mouseX - avatarMouseOffset;
    avatarY = mouseY - avatarMouseOffset;
  } else {
    // Check which keys are down and set the avatar's velocity based on its
    // speed appropriately

    // Left and right
    if (keyIsDown(LEFT_ARROW)) {
      avatarVX = -avatarSpeed;
    }
    else if (keyIsDown(RIGHT_ARROW)) {
      avatarVX = avatarSpeed;
    }

    // Up and down (separate if-statements so you can move vertically and
    // horizontally at the same time)
    if (keyIsDown(UP_ARROW)) {
      avatarVY = -avatarSpeed;
    }
    else if (keyIsDown(DOWN_ARROW)) {
      avatarVY = avatarSpeed;
    }

    // Move the avatar according to its calculated velocity
    avatarX = avatarX + avatarVX;
    avatarY = avatarY + avatarVY;

  }



  // The enemy always moves at enemySpeed (which increases)
  enemyVX = enemySpeed;
  // Update the enemy's position based on its velocity
  enemyX = enemyX + enemyVX;

  // Check if the enemy and avatar overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the enemy
  // and the centre of the avatar is less that their combined radii
  if (dist(enemyX,enemyY,avatarX,avatarY) < enemySize/2 + avatarSize/2) {
    // Tell the player they lost
    console.log("YOU LOSE!");
    // Reset the enemy's position
    enemyX = 0;
    enemyY = random(0,height);
    // Reset the enemy's size and speed
    enemySize = 50;
    enemySpeed = 5;
    // Reset the avatar's position
    avatarX = width/2;
    avatarY = height/2;
    // Reset the avatar's size and speed
    avatarSize = 50;
    avatarSpeed = 10;
    // Reset the dodge counter
    dodges = 0;
  }

  // Check if the avatar has gone off the screen (cheating!)
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    // If they went off the screen they lose in the same way as above.
    console.log("YOU LOSE!");
    enemyX = 0;
    enemyY = random(0,height);
    enemySize = 50;
    enemySpeed = 5;
    avatarX = width/2;
    avatarY = height/2;
    avatarSize = 50;
    avatarSpeed = 10;
    dodges = 0;
  }

  // Check if the enemy has moved all the way across the screen
  if (enemyX > width) {
    // This means the player dodged so update its dodge statistic
    dodges = dodges + 1;
    // Tell them how many dodges they have made
    console.log(dodges + " DODGES!");
    // Reset the enemy's position to the left at a random height
    enemyX = 0;
    enemyY = random(0,height);
    // Increase the enemy's speed and size to make the game harder
    enemySpeed = enemySpeed + enemySpeedIncrease;
    enemySize = enemySize + enemySizeIncrease;
    //Randomly increase/decrease avatar's size and speed to make the game harder
    //Put in a loop that verifies that neither speed and size are too small
    do{
      avatarSizeChange = random(-10,10);
      avatarSpeedChange = random(-3,3);
      avatarSize += avatarSizeChange;
      avatarSpeed += avatarSpeedChange;
    }while(avatarSize <= 5 || avatarSpeed <= 0);
  }


  //DRAWING THE AVATAR

  //Starting with the limbs

  //Position the limbs
  avatarLegX = avatarX
  avatarLegY = avatarY + avatarSize/2 - 2;
  avatarRightArmX = avatarX - avatarSize/2 + 2;
  avatarLeftArmX = avatarX + avatarSize/2 - 2;
  avatarArmY = avatarY;

  //Set the angle of the limb position
  angle1 = (limbPosition/20) * pi;
  angle2 = (limbPosition/20) * -pi + 3;

  //Flip the movement of the limbs from one direction to another
  if(limbPosition%20 == 0){
    pi = -pi;
  }

  //Increase the variable controlling the limb position
  limbPosition++;

  //Set the the weight and color of the limbs
  stroke(23, 117, 25);
  strokeWeight(avatarSize/10);

  //Draw the limbs using a custom function
  //use push and pop to "contain" the transforms and prevent their accumulation

  //Right leg
  push();
  segment(avatarLegX-4, avatarLegY, angle1, avatarSize); //thigh
  segment(avatarSize/5, 0, 6, avatarSize); //calf
  pop();

  //Right arm
  push();
  segment(avatarRightArmX, avatarArmY, angle1, avatarSize);//arm
  segment(avatarSize/5, 0, 1, avatarSize);//forearm
  pop();

  //Avatar's body
  noStroke();
  // The player is green
  fill(48, 165, 50);
  // Draw the body as a circle
  ellipse(avatarX,avatarY,avatarSize,avatarSize);
  // Add a face
  image(happyFaceImage,avatarX,avatarY,avatarSize/1.3,avatarSize/1.3);

  //Draw the rest of the limbs
  //Set wight and color
  stroke(23, 117, 25);
  strokeWeight(avatarSize/10);

  //Left leg
  push();
  segment(avatarLegX+4, avatarLegY, angle2, avatarSize);
  segment(avatarSize/5, 0, 6, avatarSize);
  pop();

  //left arm
  push();
  segment(avatarLeftArmX, avatarArmY, angle2, avatarSize);
  segment(avatarSize/5, 0, 1, avatarSize);
  pop();

  //DRAWING THE ENEMY

  //Position the limbs
  enemyLegX = enemyX
  enemyLegY = enemyY + enemySize/2 - 2;
  enemyRightArmX = enemyX - enemySize/2 + 2;
  enemyLeftArmX = enemyX + enemySize/2 - 2;
  enemyArmY = enemyY;

  //Set the color and weight of the limbs
  stroke(186);
  strokeWeight(enemySize/10);

  //Draw the limbs using custom function
  //use push and pop to "contain" the transforms and prevent their accumulation

  //Right leg
  push();
  segment(enemyLegX-4, enemyLegY, angle1, enemySize);
  segment(enemySize/5, 0, 6, enemySize);
  pop();
  //Right arm
  push();
  segment(enemyRightArmX, enemyArmY, angle1, enemySize);
  segment(enemySize/5, 0, 1, enemySize);
  pop();

  //Draw enemy's body
  noStroke();
  // The enemy is white
  fill(250);
  // Draw the enemy's body as a circle
  ellipse(enemyX,enemyY,enemySize,enemySize);
  //Add a face
  image(scaredFaceImage, enemyX, enemyY, enemySize, enemySize);

  //Draw the rest of the limbs
  //Set the weight and color of the limbs
  stroke(186);
  strokeWeight(enemySize/10);
  //Left leg
  push();
  segment(enemyLegX+4, enemyLegY, angle2, enemySize);
  segment(enemySize/5, 0, 6, enemySize);
  pop();
  //Left arm
  push();
  segment(enemyLeftArmX, enemyArmY, angle2, enemySize);
  segment(enemySize/5, 0, 1, enemySize);
  pop();


  //Score Display
  textAlign(RIGHT,CENTER);
  fill(255);
  noStroke();
  textSize(30);
  textFont(myFont);
  text("DODGES: " + dodges, width-20, 20);

}

//function for drawing limb segments
function segment(x, y, a, s) {
  translate(x, y); //position the limb
  rotate(a); //ritate the limb
  line(0, 0, s/5, 0); //draw the limb
  //console.log("drawing segment");
}
