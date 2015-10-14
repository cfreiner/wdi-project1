//Tile pool constructor
var TilePool = function() {
  this.tiles = [];
  for(var i = 1; i <= 10; i++) {
    for(var j = 0; j < 7; j++) {
      this.tiles.push(i);
    }
  }
  for(var i = 11; i <= 20; i++) {
    this.tiles.push(i);
  }
  this.tiles.push(0, 21, 24, 25, 27, 28, 30, 32, 35, 36,
    40, 42, 45, 48, 49, 50, 54, 56, 60, 63, 64, 70, 72, 80, 81, 90);
}

//Shuffle the tiles using the Fisher-Yates method
//JavaScript implementation from user CoolAJ86 on Stack Overflow
TilePool.prototype.shuffle = function() {
  var current = this.tiles.length;
  var temp;
  var rand;

  while(current !== 0) {
    rand = Math.floor(Math.random() * current);
    current -= 1;
    temp = this.tiles[current];
    this.tiles[current] = this.tiles[rand];
    this.tiles[rand] = temp;
  }
}

//Return a tile from the end of the array
TilePool.prototype.giveTile = function() {
  this.shuffle();
  return this.tiles.pop();
}
