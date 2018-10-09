/******************************************************

Game - Chaser
Pippin Barr

A simple game of cat and mouse.

Physics-based movement, keyboard controls, health/stamina,
sprinting, random movement, screen wrap.

******************************************************/

// Track whether the game is over
var gameOver = false;

// Player position, size, velocity
var playerX;
var playerY;
var playerRadius = 25;
var playerVX = 0;
var playerVY = 0;
var playerMaxSpeed;
// Player health
var playerHealth;
var playerMaxHealth = 255;
var playerHealthLoss;
// Player fill color
var playerFill = 50;

// Prey position, size, velocity, Perlin noise's time
var preyX;
var preyY;
var preyRadius = 25;
var preyVX;
var preyVY;
var preyMaxSpeed = 4;
var preyTX;
var preyTY;
// Prey health
var preyHealth;
var preyMaxHealth = 100;
// Prey fill color
var preyFill = 200;

//Competitor position, size, velocity, Perlin noise's time
var compX;
var compY;
var compRadius = 25;
var compVX;
var compVY;
var compMaxSpeed = 10;
var compTX;
var compTY;
// Prey health
var compHealth;
var compMaxHealth = 100;
// Prey fill color
var compFill = 100;

// Amount of health obtained per frame of "eating" the prey
var eatHealth = 10;
//Amount of health removed when hitting a competitor
var hitHealth = 20;
// Number of prey eaten during the game
var preyEaten = 0;

// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(500,500);
  rectMode(CENTER);

  noStroke();

  setupPrey();
  setupCompetitor();
  setupPlayer();
}

// setupPrey()
//
// Initialises prey's position, velocity, health and Perlin time
function setupPrey() {
  preyX = width/5;
  preyY = height/2;
  preyVX = -preyMaxSpeed;
  preyVY = preyMaxSpeed;
  preyTX = random(0,1000);
  preyTY = random(0,1000);
  preyHealth = preyMaxHealth;
}

//setupCompetitor()
//
//Initialises competitor's position, velocity, health and Perlin noise time
function setupCompetitor() {
  compX = width/2;
  compY = height/5;
  compVX = -compMaxSpeed;
  compVY = compMaxSpeed;
  compTX = random(0,1000);
  compTY = random(0,1000);
  compHealth = compMaxHealth;
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4*width/5;
  playerY = height/2;
  playerHealth = playerMaxHealth;
}

// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {
  background(100,100,200);

  if (!gameOver) {
    handleInput();

    movePlayer();
    movePrey();
    moveCompetitor();

    updateHealth();
    checkEating();
    checkHit();

    drawPrey();
    drawPlayer();
    drawCompetitor();
  }
  else {
    showGameOver();
  }
}

// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
// Handles the sprinting proprety
function handleInput() {
  /////////NEW/////////
  //Check for sprint or normal speed
  //Increase maxSpeed and increase the health loss when sprinting
  if (keyIsDown(SHIFT))
  {
    playerMaxSpeed = 5;
    playerHealthLoss = 2;
  }else{
    playerMaxSpeed = 2;
    playerHealthLoss = 0.5;
  }
  /////////END NEW/////////

  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerMaxSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerMaxSpeed;
  }
  else {
    playerVX = 0;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerMaxSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerMaxSpeed;
  }
  else {
    playerVY = 0;
  }
}

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX += playerVX;
  playerY += playerVY;

  // Wrap when player goes off the canvas
  if (playerX < 0) {
    playerX += width;
  }
  else if (playerX > width) {
    playerX -= width;
  }

  if (playerY < 0) {
    playerY += height;
  }
  else if (playerY > height) {
    playerY -= height;
  }
}

// updateHealth()
//
// Reduce the player's health (every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health, constrain to reasonable range
  playerHealth = constrain(playerHealth - playerHealthLoss,0,playerMaxHealth);
  // Check if the player is dead
  if (playerHealth === 0) {
    // If so, the game is over
    gameOver = true;
  }
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  var d = dist(playerX,playerY,preyX,preyY);
  // Check if it's an overlap
  if (d < playerRadius + preyRadius) {
    // Increase the player health
    playerHealth = constrain(playerHealth + eatHealth,0,playerMaxHealth);
    // Reduce the prey health
    preyHealth = constrain(preyHealth - eatHealth,0,preyMaxHealth);

    // Check if the prey died
    if (preyHealth === 0) {
      // Move the "new" prey to a random position
      preyX = random(0,width);
      preyY = random(0,height);
      // Give it full health
      preyHealth = preyMaxHealth;
      // Track how many prey were eaten
      preyEaten++;
    }
  }
}

//checkHit()
//
//Checks if the player has hit the competitor and updates health of both
function checkHit(){
  // Get distance of player to competitor
  var d = dist(playerX,playerY,compX,compY);
  // Check if it's an overlap
  if (d < playerRadius + compRadius) {
    // Reduce the player health
    playerHealth = constrain(playerHealth - hitHealth,0,playerMaxHealth);
    // Reduce the competitor's health
    compHealth = 0;//constrain(compHealth - hitHealth,0,compMaxHealth);

    // Check if the competitor died
    if (compHealth === 0) {
      // Move the "new" competitor to a random position
      compX = random(0,width);
      compY = random(0,height);
      // Give it full health
      compHealth = compMaxHealth;
      // Console log
      console.log("Competitor died!");
    }
  }
}


// movePrey()
//
// Moves the prey based on Perlin noise based velocity changes
function movePrey() {
  ////////NEW////////
  // Change the prey's velocity using the Perlin noise
  // Use map() to convert from the 0-1 range of the noise() function
  // to the appropriate range of velocities for the prey
  preyVX = map(noise(preyTX),0,1,-preyMaxSpeed,preyMaxSpeed);
  preyVY = map(noise(preyTY),0,1,-preyMaxSpeed,preyMaxSpeed);
  //Change time value so the noise value will be different on the next frame
  preyTX += 0.01;
  preyTY += 0.01;
  ////////END NEW////////

  // Update prey position based on velocity
  preyX += preyVX;
  preyY += preyVY;

  // Screen wrapping
  if (preyX < 0) {
    preyX += width;
  }
  else if (preyX > width) {
    preyX -= width;
  }

  if (preyY < 0) {
    preyY += height;
  }
  else if (preyY > height) {
    preyY -= height;
  }
}

// moveCompetitor()
//
// Moves the competitor based on Perlin noise based velocity changes
function moveCompetitor() {
  // Change the prey's velocity using the Perlin noise
  // Use map() to convert from the 0-1 range of the noise() function
  // to the appropriate range of velocities for the prey
  compVX = map(noise(compTX),0,1,-compMaxSpeed,compMaxSpeed);
  compVY = map(noise(compTY),0,1,-compMaxSpeed,compMaxSpeed);
  //Change time value so the noise value will be different on the next frame
  compTX += 0.01;
  compTY += 0.01;

  // Update prey position based on velocity
  compX += compVX;
  compY += compVY;

  // Screen wrapping
  if (compX < 0) {
    compX += width;
  }
  else if (compX > width) {
    compX -= width;
  }

  if (compY < 0) {
    compY += height;
  }
  else if (compY > height) {
    compY -= height;
  }
}


// drawPrey()
//
// Draw the prey as an ellipse with alpha based on health
function drawPrey() {
  fill(preyFill,preyHealth);
  ellipse(preyX,preyY,preyRadius*2);
}

// drawCompetitor()
//
// Draw the prey as an ellipse with alpha based on health
function drawCompetitor() {
  fill(compFill,compHealth);
  rect(compX,compY,compRadius*2,compRadius*2);
}

// drawPlayer()
//
// Draw the player as an ellipse with alpha based on health
function drawPlayer() {
  fill(playerFill,playerHealth);
  ellipse(playerX,playerY,playerRadius*2);
}

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  textSize(32);
  textAlign(CENTER,CENTER);
  fill(0);
  var gameOverText = "GAME OVER\n";
  gameOverText += "You ate " + preyEaten + " prey\n";
  gameOverText += "before you died."
  text(gameOverText,width/2,height/2);
}
