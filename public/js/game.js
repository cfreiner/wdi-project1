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
}

var Player = function(name) {
  this.name = name;
  this.rack = [];
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

Player.prototype.rederRack = function() {
  var domRack = $('#rack');
  for(var i = 0; i < 7; i++) {

  }
}

var game = new Game();
game.renderBoard();
var testRack = [7, 3, 12, 4, 6, 8, 2]
