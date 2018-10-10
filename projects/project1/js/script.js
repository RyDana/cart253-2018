/******************************************************

Game - Chaser
Dana Ryashy

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
var playerRoundness;
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

//Enemy constants
var enemyRadius = 25;
var enemyMaxSpeed = 5;
// Enemy fill color
var enemyFill = 50;
//Enemy array
var enemyArray = [];

// Amount of health obtained per frame of "eating" the prey
var eatHealth = 10;
//Amount of health removed when hitting a competitor
var hitHealth = 20;
// Health bar width;
var healthBarWidth;
// Number of prey eaten during the game
var preyEaten = 0;

//Fonts and images
var myFont;

//Enemy()
//
//Constructs the enemy object:
// initialises position, speed, radius, perlin noise time
function Enemy() {
  this.enemyX = random(0,width);
  this.enemyY = random(0,height);
  this.enemyRadius = enemyRadius;
  this.enemyVX = -enemyMaxSpeed;
  this.enemyVY = enemyMaxSpeed;
  this.enemyTX = random(0,1000);
  this.enemyTY = random(0,1000);
}

// move()
//
// Updates enemy position based on velocity,
// wraps around the edges.
Enemy.prototype.moveEnemy = function() {
  // Change the enemy's velocity using the Perlin noise
  // Use map() to convert from the 0-1 range of the noise() function
  // to the appropriate range of velocities for the enemy
  this.enemyVX = map(noise(this.enemyTX),0,1,-enemyMaxSpeed,enemyMaxSpeed);
  this.enemyVY = map(noise(this.enemyTY),0,1,-enemyMaxSpeed,enemyMaxSpeed);
  //Change time value so the noise value will be different on the next frame
  this.enemyTX += 0.01;
  this.enemyTY += 0.01;

  // Update enemy position based on velocity
  this.enemyX += this.enemyVX;
  this.enemyY += this.enemyVY;

  // Screen wrapping
  if (this.enemyX < 0) {
    this.enemyX += width;
  }
  else if (this.enemyX > width) {
    this.enemyX -= width;
  }

  if (this.enemyY < 0) {
    this.enemyY += height;
  }
  else if (this.enemyY > height) {
    this.enemyY -= height;
  }
}

//checkHit()
//
//Checks collision between player and enemy, removes player health
Enemy.prototype.checkHit = function() {
  // Get distance of player to enemy
  var d = dist(playerX,playerY,this.enemyX,this.enemyY);
  // Check if it's an overlap
  if (d < playerRadius + enemyRadius) {
    // Reduce the player health
    playerHealth = constrain(playerHealth - hitHealth,0,playerMaxHealth);
    // Reduce player's roundness
    playerRoundness = constrain(playerRoundness - 2,0,playerRadius);

    // Move the "new" enemy to a random position
    this.enemyX = random(0,width);
    this.enemyY = random(0,height);
    console.log("Enemy died!");

  }
}

//draw()
//
//Draws enemy
Enemy.prototype.drawEnemy = function() {
    fill(enemyFill, 50);
    rect(this.enemyX,this.enemyY,enemyRadius*2,enemyRadius*2);
}

//preload()
//
//loads a font and images
function preload() {
  myFont = loadFont('assets/fonts/FontdinerdotcomHuggable.ttf');
}

// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(500,500);
  rectMode(CENTER);

  noStroke();

  setupPrey();
  //setupCompetitor();
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

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4*width/5;
  playerY = height/2;
  playerRoundness = 0;
  playerHealth = playerMaxHealth;
}

// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps), checks hits (overlaps)
// displays the agents.
// When the game is over, shows the game over screen.
function draw() {
  background(100,100,200);

  if (!gameOver) {
    handleInput();

    movePlayer();
    movePrey();
    //Move enemies if there are some
    if (enemyArray.length >0){
      for (i = 0; i <enemyArray.length; i++){
        enemyArray[i].moveEnemy();
      }
    }

    updateHealth();
    checkEating();
    //Check if player was hit by each enemy
    if (enemyArray.length >0){
      for (i = 0; i <enemyArray.length; i++){
        enemyArray[i].checkHit();
      }
    }

    drawPrey();
    drawPlayer();
    //Draw each enemy if there are some
    if (enemyArray.length >0){
      for (i = 0; i <enemyArray.length; i++){
        enemyArray[i].drawEnemy();
      }
    }

    drawHealthBar();

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
      //Add an enemy to the game
      enemyArray.push(new Enemy());
      //Decreases enemy and prey size
      playerRoundness = constrain(playerRoundness - 2,0,playerRadius);
      preyRadius--;
      enemyRadius--;
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

// drawPrey()
//
// Draw the prey as an ellipse with alpha based on health
function drawPrey() {
  fill(preyFill,preyHealth);
  ellipse(preyX,preyY,preyRadius*2);
}

// drawPlayer()
//
// Draw the player as an square
function drawPlayer() {
  fill(153, 153, 255);
  rect(playerX,playerY,playerRadius*2,playerRadius*2, playerRoundness);
}

// drawHealthBar()
//
// Draws a health bar at the bottom of the canvas
function drawHealthBar(){
  push();
  rectMode(CORNER);
  fill(100,100,200);
  rect(width/4 - 5,height-35,width/2 + 10,30);
  fill(153, 153, 255);
  healthBarWidth = map(playerHealth,0,playerMaxHealth, 0, width/2);
  rect(width/4, height-30,healthBarWidth,20);
  pop();
}

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  fill(43, 43, 114);
  textFont(myFont);
  textSize(32);
  textAlign(CENTER,CENTER);
  var gameOverText = "GAME OVER\n";
  gameOverText += "Score: " + preyEaten + " ideal(s) chased";
  text(gameOverText,width/2,height/2);
}
