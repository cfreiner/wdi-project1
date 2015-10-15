//Player constructor
var Player = function(name) {
  this.name = name;
  this.rack = [];
  this.score = 0;
};

//Draw a number of tiles from the specified pool
//If no number is specified, it will draw until the rack is full (7 tiles)
Player.prototype.draw = function(pool, numTiles) {
  if(pool.length === 0) {
    return;
  }
  if(numTiles) {
    for(var i = 0; i < numTiles; i++) {
      this.rack.push(pool.giveTile());
    }
  } else {
    while(this.rack.length < 7) {
      this.rack.push(pool.giveTile());
    }
  }
  this.renderRack();
};

//Add a number to the player's score
Player.prototype.incrementScore = function(num) {
  this.score += num;
};

//Remove a tile from the player's rack
Player.prototype.removeTileFromRack = function(num) {
  this.rack.splice(this.rack.indexOf(num), 1);
  this.renderRack();
};

//Render a player's rack in the DOM
Player.prototype.renderRack = function() {
  var domRack = $('#rack');
  domRack.children().remove();
  for(var i = 0; i < this.rack.length; i++) {
    domRack.append('<div class="square rack-' + i + '">' + this.rack[i] + '</div>');
  }
};

//Render the player's info to the DOM
Player.prototype.renderScore = function() {
  $('#active-player').text(this.name);
};
