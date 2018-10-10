/******************************************************

Game - I don't wanna be a square
Dana Ryashy

Help little square achieve roundness by chasing his ideal shape.
Be careful of the ghosts of his square-shaped past as they might hit his self esteem.

Physics-based movement, keyboard controls, health/stamina,
sprinting, random movement, screen wrap.

Sources of sounds:
-Background song: Awesomesauce.wav by eardeer,
  found on: https://freesound.org/people/eardeer/sounds/402955/
-Game over sound: j1game_over_mono.wav by jivatma07
  found on: https://freesound.org/people/jivatma07/sounds/173859/

******************************************************/

// Track whether the game is over
var gameOver = false;

//RGB values for background
var r = 255;
var g = 0;
var b = 0;

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

//Fonts, images and sounds
var myFont;
var songSound;
var gameOverSound;
var gameOverSongPlayed = 0;
var starImage;
var ghostFace;
var playerFace;

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

  }
}

//draw()
//
//Draws enemy
Enemy.prototype.drawEnemy = function() {
    fill(enemyFill,120);
    rect(this.enemyX,this.enemyY,enemyRadius*2,enemyRadius*2);
    image(ghostFace,this.enemyX,this.enemyY,enemyRadius*2,enemyRadius*2);
}

//preload()
//
//loads a font and images
function preload() {
  myFont = loadFont('assets/fonts/FontdinerdotcomHuggable.ttf');
  playerFace = loadImage('assets/images/player_face.png');
  starImage = loadImage('assets/images/star.png');
  ghostFace = loadImage('assets/images/ghost_face.png');
  songSound = new Audio("assets/sounds/chiptune.mp3");
  gameOverSound = new Audio("assets/sounds/gameOver.wav");

}

// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(500,500);
  rectMode(CENTER);
  imageMode(CENTER);

  noStroke();

  setupPrey();
  //setupCompetitor();
  setupPlayer();
  songSound.play();
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
  background(r,g,b);
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
      playerRoundness = constrain(playerRoundness + 4,0,playerRadius);
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
  fill(255, 221, 221, 100+preyHealth);
  ellipse(preyX,preyY,preyRadius*2);
  push();
  translate(preyX, preyY);
  rotate(frameCount / 50.0);
  image(starImage,0,0,preyRadius,preyRadius);
  pop();

}

// drawPlayer()
//
// Draw the player as an square
function drawPlayer() {
  fill(153, 153, 255);
  rect(playerX,playerY,playerRadius*2,playerRadius*2, playerRoundness);
  image(playerFace,playerX,playerY,playerRadius*2,playerRadius*2);
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
  //Stop current song and play game over sound once
  songSound.pause();
  if(gameOverSongPlayed < 1){
    gameOverSound.play();
    gameOverSongPlayed++;
  }
  fill(43, 43, 114);
  textFont(myFont);
  textSize(32);
  textAlign(CENTER,CENTER);
  var gameOverText = "GAME OVER\n";
  gameOverText += "Score: " + preyEaten + " shape(s) chased";
  text(gameOverText,width/2,height/2);
}
