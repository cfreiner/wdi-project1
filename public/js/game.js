var Game = function() {
  this.board = [];
  for(var i = 0; i < 14; i++) {
    this.board.push([]);
    for(var j = 0; j < 14; j++) {
      this.board[i][j] = null;
    }
  }

  //Populate the initial state of the board
  this.board[0][0] = '3x';
  this.board[0][6] = '3x';
  this.board[0][7] = '3x';
  this.board[0][13] = '3x';
  this.board[6][0] = '3x';
  this.board[7][0] = '3x';
  this.board[13][0] = '3x';
  this.board[13][6] = '3x';
  this.board[13][7] = '3x';
  this.board[13][13] = '3x';
  this.board[6][13] = '3x';
  this.board[7][13] = '3x';
  this.board[1][1] = '2x';
  this.board[1][12] = '2x';
  this.board[2][2] = '2x';
  this.board[2][11] = '2x';
  this.board[3][3] = '2x';
  this.board[3][10] = '2x';
  this.board[4][4] = '2x';
  this.board[4][9] = '2x';
  this.board[9][4] = '2x';
  this.board[9][9] = '2x';
  this.board[10][3] = '2x';
  this.board[10][10] = '2x';
  this.board[11][2] = '2x';
  this.board[11][11] = '2x';
  this.board[12][1] = '2x';
  this.board[12][12] = '2x';
  this.board[1][4] = '&divide';
  this.board[1][9] = '&divide';
  this.board[4][1] = '&divide';
  this.board[4][12] = '&divide';
  this.board[9][1] = '&divide';
  this.board[9][12] = '&divide';
  this.board[12][4] = '&divide';
  this.board[12][9] = '&divide';
  this.board[2][5] = '-';
  this.board[2][8] = '-';
  this.board[5][2] = '-';
  this.board[5][11] = '-';
  this.board[8][2] = '-';
  this.board[8][11] = '-';
  this.board[11][5] = '-';
  this.board[11][8] = '-';
  this.board[3][6] = '+';
  this.board[4][7] = '+';
  this.board[6][4] = '+';
  this.board[7][3] = '+';
  this.board[6][10] = '+';
  this.board[7][9] = '+';
  this.board[9][6] = '+';
  this.board[10][7] = '+';
  this.board[3][7] = 'x';
  this.board[4][6] = 'x';
  this.board[6][3] = 'x';
  this.board[7][4] = 'x';
  this.board[6][9] = 'x';
  this.board[7][10] = 'x';
  this.board[9][7] = 'x';
  this.board[10][6] = 'x';
  this.board[6][6] = 1;
  this.board[6][7] = 2;
  this.board[7][6] = 3;
  this.board[7][7] = 4;

  //Empty player array to start
  this.players = [];

  //Create the pool of tiles for players to use
  this.pool = new TilePool;
}

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
//Implementation from user CoolAJ86 on Stack Overflow
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

var Player = function(name) {
  this.name = name;
  this.rack = [];
}

Player.prototype.draw = function() {
  if(this.rack.length < 7) {

  }
}

//Render the game board in the DOM
Game.prototype.renderBoard = function() {
  var domBoard = $('#board');
  for(var i = 0; i < 14; i++) {
    for(var j = 0; j < 14; j++) {
      if(this.board[i][j]) {
        domBoard.append('<div class="square" row="' + i + '" col="' + j + '">' + this.board[i][j] + '</div>');
      } else {
        domBoard.append('<div class="square" row="' + i + '" col="' + j + '">&nbsp</div>');
      }
    }
  }
}

//Render a player's rack in the DOM
Player.prototype.renderRack = function() {
  var domRack = $('#rack');
  for(var i = 0; i < 7; i++) {
    domRack.append('<div class="square rack-' + i + '">' + this.rack[i] + '</div>');
  }
}

var selectSquare = function(e) {
  $(e.target).toggleClass('selected');
}

//Returns the number of directions for which the move provides a solution
//Max would be all 4 directions
var evaluatePlacement = function() {
  var rackSelection = parseInt($('#rack .selected').text());
  var boardSelection = $('#board .selected').text();
  console.log(rackSelection);
  console.log(boardSelection);
  var boardX = $('#board .selected').attr('row');
  var boardY = $('#board .selected').attr('col');

  //Two squares above the selection
  var up1 = $('.square[row="' + (boardX - 1) + '"][col="' + boardY + '"]').text();
  var up2 = $('.square[row="' + (boardX - 2) + '"][col="' + boardY + '"]').text();

  //Two squares below
  var down1 = $('.square[row="' + (boardX + 1) + '"][col="' + boardY + '"]').text();
  var down2 = $('.square[row="' + (boardX + 2) + '"][col="' + boardY + '"]').text();

  //Two squares left
  var left1 = parseInt($('.square[row="' + boardX + '"][col="' + (boardY - 1) + '"]').text());
  var left2 = parseInt($('.square[row="' + boardX + '"][col="' + (boardY - 2) + '"]').text());

  //Two squares right
  var right1 = $('.square[row="' + boardX + '"][col="' + (boardY + 1) + '"]').text();
  var right2 = $('.square[row="' + boardX + '"][col="' + (boardY + 2) + '"]').text();

  console.log(left1, left2);

  //Evaluate based on the symbol on the square
  var numSolutions = 0;
  switch(boardSelection) {
    case '+':
      console.log('in the plus case');
      if(checkAdd(up1, up2, rackSelection)) {
        numSolutions++;
      }
      if(checkAdd(down1, down2, rackSelection)) {
        numSolutions++;
      }
      if(checkAdd(left1, left2, rackSelection)) {
        numSolutions++;
      }
      if(checkAdd(right1, left2, rackSelection)) {
        numSolutions++;
      }
      return numSolutions;
    case '-':
      if(checkSubtract(up1, up2, rackSelection)) {
        numSolutions++;
      }
      if(checkSubtract(down1, down2, rackSelection)) {
        numSolutions++;
      }
      if(checkSubtract(left1, left2, rackSelection)) {
        numSolutions++;
      }
      if(checkSubtract(right1, left2, rackSelection)) {
        numSolutions++;
      }
      return numSolutions;
    case 'x':
      if(checkMultiply(up1, up2, rackSelection)) {
        numSolutions++;
      }
      if(checkMultiply(down1, down2, rackSelection)) {
        numSolutions++;
      }
      if(checkMultiply(left1, left2, rackSelection)) {
        numSolutions++;
      }
      if(checkMultiply(right1, left2, rackSelection)) {
        numSolutions++;
      }
      return numSolutions;
    case '&divide':
      if(checkDivide(up1, up2, rackSelection)) {
        numSolutions++;
      }
      if(checkDivide(down1, down2, rackSelection)) {
        numSolutions++;
      }
      if(checkDivide(left1, left2, rackSelection)) {
        numSolutions++;
      }
      if(checkDivide(right1, left2, rackSelection)) {
        numSolutions++;
      }
      return numSolutions;
    default:
      console.log('default case');
      if(checkAll(up1, up2, rackSelection)) {
        numSolutions++;
      }
      if(checkAll(down1, down2, rackSelection)) {
        numSolutions++;
      }
      if(checkAll(left1, left2, rackSelection)) {
        numSolutions++;
      }
      if(checkAll(right1, left2, rackSelection)) {
        numSolutions++;
      }
      return numSolutions;
  }
}

Game.prototype.commitMove = function() {
  var validMove = evaluatePlacement();
  if (validMove === 0) { return false };
  $('#board .selected').text($('#rack .selected').text());
}

//Functions for checking valid moves
var checkAdd = function(a, b, c) {
  return a + b === c;
};

var checkSubtract = function(a, b, c) {
  return a - b === c || b - a === c;
};

var checkMultiply = function(a, b, c) {
  return a * b === c;
};

var checkDivide = function(a, b, c) {
  return a / b === c || b / a === c;
};

var checkAll = function(a, b, c) {
  return checkAdd(a, b, c) || checkSubtract(a, b, c) || checkMultiply(a, b, c) || checkDivide(a, b, c);
}

$('#rack, #board').on('click', 'div', selectSquare);


var game = new Game();
game.renderBoard();
var player = new Player();
player.rack = [7, 3, 12, 4, 6, 8, 2]
player.renderRack();
