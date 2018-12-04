// EnemyOne
//
// A class that defines how the first enemy behaves

// EnemyOne constructor
//
// Sets the properties with the provided arguments or defaults
function EnemyOne(x,y) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.w = 20;
  this.h = 30;
  this.life = 100;
  this.color = [0,0,0];
  this.speed = 3;
  this.jumping = false;
  this.jumpSpeed = 15; //speed upwards during jump
  this.facingRight = true; //Check which side of canvas player is facing
  this.bulletArray = []; //An array containing bullets shot by player
  this.shot = false; //boolean showing if mouse press released a bullet
}
