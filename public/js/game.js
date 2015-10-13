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
  //First active player will be at index 0
  this.players = [];
  this.activePlayerIndex = 0;

  //Create the pool of tiles for players to use
  this.pool = new TilePool();
}

//Render the game board in the DOM
Game.prototype.renderBoard = function() {
  var domBoard = $('#board');
  domBoard.children().remove();
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

var selectedSquare = null;

//Function for the click listener for squares
// var selectSquare = function(e) {
//   if(!selectedSquare) {
//     selectedSquare = $(e.target);
//     selectedSquare.toggleClass('selected');
//   } else {
//     selectedSquare.toggleClass('selected');
//     selectedSquare = $(e.target);
//     selectedSquare.toggleClass('selected');
//   }
// }

//Returns a function for use in the click listener
//Param should be "#board" or "#rack"
var selection = function(parentElement) {
  return function(e) {
    e.stopPropagation();
    var selected = $(parentElement + ' .selected');
    if(selected.length > 0) {
      selected.toggleClass('selected');
    }
    $(e.target).toggleClass('selected');
  }
}

//Returns the number of directions for which the move provides a solution
//Max would be all 4 directions
//Typical rack selection (int): parseInt($('#rack .selected').text())
//Typical board selection (jquery object): $('#board .selected')
var evaluatePlacement = function(rackSelection, boardSelection) {
  var boardX = parseInt(boardSelection.attr('row'));
  var boardY = parseInt(boardSelection.attr('col'));

  //Two squares above the selection
  var up1 = parseInt($('.square[row="' + (boardX - 1) + '"][col="' + boardY + '"]').text());
  var up2 = parseInt($('.square[row="' + (boardX - 2) + '"][col="' + boardY + '"]').text());
  // console.log('up',up1, up2);

  //Two squares below
  var down1 = parseInt($('.square[row="' + (boardX + 1) + '"][col="' + boardY + '"]').text());
  var down2 = parseInt($('.square[row="' + (boardX + 2) + '"][col="' + boardY + '"]').text());
  // console.log('down',down1, down2);

  //Two squares left
  var left1 = parseInt($('.square[row="' + boardX + '"][col="' + (boardY - 1) + '"]').text());
  var left2 = parseInt($('.square[row="' + boardX + '"][col="' + (boardY - 2) + '"]').text());
  // console.log('left',left1, left2);

  //Two squares right
  var right1 = parseInt($('.square[row="' + boardX + '"][col="' + (boardY + 1) + '"]').text());
  var right2 = parseInt($('.square[row="' + boardX + '"][col="' + (boardY + 2) + '"]').text());
  // console.log('right',right1, right2);

  //Evaluate based on the symbol on the square
  var numSolutions = 0;
  switch(boardSelection.text()) {
    case '+':
      // console.log('in the plus case');
      if(checkAdd(up1, up2, rackSelection)) {
        numSolutions++;
      }
      if(checkAdd(down1, down2, rackSelection)) {
        numSolutions++;
      }
      if(checkAdd(left1, left2, rackSelection)) {
        numSolutions++;
      }
      if(checkAdd(right1, right2, rackSelection)) {
        numSolutions++;
      }
      return numSolutions;
    case '-':
      // console.log('in the minus case');
      if(checkSubtract(up1, up2, rackSelection)) {
        numSolutions++;
      }
      if(checkSubtract(down1, down2, rackSelection)) {
        numSolutions++;
      }
      if(checkSubtract(left1, left2, rackSelection)) {
        numSolutions++;
      }
      if(checkSubtract(right1, right2, rackSelection)) {
        numSolutions++;
      }
      return numSolutions;
    case 'x':
      // console.log('in the multiply case');
      if(checkMultiply(up1, up2, rackSelection)) {
        numSolutions++;
      }
      if(checkMultiply(down1, down2, rackSelection)) {
        numSolutions++;
      }
      if(checkMultiply(left1, left2, rackSelection)) {
        numSolutions++;
      }
      if(checkMultiply(right1, right2, rackSelection)) {
        numSolutions++;
      }
      return numSolutions;
    case '&divide':
      // console.log('in the division case');
      if(checkDivide(up1, up2, rackSelection)) {
        numSolutions++;
      }
      if(checkDivide(down1, down2, rackSelection)) {
        numSolutions++;
      }
      if(checkDivide(left1, left2, rackSelection)) {
        numSolutions++;
      }
      if(checkDivide(right1, right2, rackSelection)) {
        numSolutions++;
      }
      return numSolutions;
    default:
      // console.log('default case');
      if(checkAll(up1, up2, rackSelection)) {
        numSolutions++;
      }
      if(checkAll(down1, down2, rackSelection)) {
        numSolutions++;
      }
      if(checkAll(left1, left2, rackSelection)) {
        numSolutions++;
      }
      if(checkAll(right1, right2, rackSelection)) {
        numSolutions++;
      }
      return numSolutions;
  }
}

//Make the move based on which tiles/squares are selected
Game.prototype.commitMove = function() {
  var boardSpace = $('#board .selected');
  var boardText = boardSpace.text();
  var rackTile = parseInt($('#rack .selected').text());
  var currentPlayer = this.players[this.activePlayerIndex];
  //Make sure the move is valid, storing it in a var for scoring purposes
  var validMove = evaluatePlacement(rackTile, boardSpace);
  if (validMove === 0) { alert('Invalid move'); return false; };

  //Make the move in the board array, then re-render the board to reflect the move
  currentPlayer.removeTileFromRack(rackTile);
  this.board[boardSpace.attr('row')][boardSpace.attr('col')] = rackTile;
  this.renderBoard();

  //Determine the move's score and increment the player's score by that number
  var moveScore = this.determineScore(rackTile, boardText, validMove);
  currentPlayer.incrementScore(moveScore);
  currentPlayer.renderScore();

  //If the player successfully played on an operation sign, they draw a free tile
  if(boardText === '+' || boardText === '-' || boardText === 'x' || boardText === '&divide') {
    currentPlayer.draw(this.pool, 1);
  }

  //Check if the player's turn should be over. If it is, hide the move button and show the end turn button.
  if(this.determineEndOfTurn(currentPlayer)) {
    // $('#move-btn').toggleClass('hide');
    alert('end of turn');
  }
};

//Determine the score of a move
//Based on the tile value, the square marking, and the number of equations the tile solves
Game.prototype.determineScore = function(tileValue, squareValue, numSolutions) {
  var score = tileValue * numSolutions;
  if(squareValue === '2x') {
    score *= 2;
  } else if(squareValue === '3x') {
    score *= 3;
  }
  return score;
}

//Switch the turn to the next player
Game.prototype.nextTurn = function() {
  if(this.activePlayerIndex === this.players.length - 1) {
    this.activePlayerIndex = 0;
  } else {
    this.activePlayerIndex++;
  }
  this.players[this.activePlayerIndex].draw(this.pool);
  this.players[this.activePlayerIndex].renderScore();
  // $('#move-btn').toggleClass('hide');
}

//Add a player to the game
Game.prototype.addPlayer = function(player) {
  this.players.push(player);
}

//Get an array of possible moves for a player
//Empty array = no moves = turn over
Game.prototype.getPossibleMoves = function(player) {
  var empty = getAdjacentEmptySquares(this.board);
  var rack = player.rack;
  var possibleMoves = [];
  rack.forEach(function(tile) {
    empty.forEach(function(coord) {
      var space = $('.square[row="' + coord[0] + '"][col="' + coord[1] + '"]');
      if(evaluatePlacement(tile, space)) {
        possibleMoves.push(coord);
      };
    });
  });
  console.log(possibleMoves);
  return possibleMoves;
}

//Determine if a player's turn should be over
//e.g. no tiles left or no legal moves
Game.prototype.determineEndOfTurn = function(player) {
  if(player.rack.length === 0 || this.getPossibleMoves(player).length === 0) {
    return true;
  } else {
    return false;
  }
}

Game.prototype.determineEndOfGame = function() {
  if(this.pool.length === 0) {
    this.players.forEach(function(player) {
      if(!this.determineEndOfTurn(player)) {
        return false;
      }
    });
    return true;
  }
}

//Event listeners
// $('#rack, #board').on('click', 'div', selectSquare);
$('#board').on('click', 'div', selection('#board'));
$('#rack').on('click', 'div', selection('#rack'));
$('#move-btn').on('click', function() {
  game.commitMove();
});
$('#turn-btn').on('click', function() {
  game.nextTurn();
});
$('#add-player').on('click', function(e) {
  e.preventDefault();
  players.push(new Player($('#player-name').val()));
  if(players.length >= 2) {
    $('#start').show();
  }
});
$('#start').on('click', function(e) {
  e.preventDefault();
  game = new Game();
  game.players = players;
  $('.start-form').hide();
  game.renderBoard();
  game.players[game.activePlayerIndex].draw(game.pool);
  game.players[game.activePlayerIndex].renderScore();
});

$('#start').hide();
var players = [];
// var game = new Game();
// game.renderBoard();
// var player = new Player();
// player.rack = [7, 3, 12, 4, 6, 8, 2];
// player.renderRack();
// game.addPlayer(player);
