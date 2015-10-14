var Game = function() {
  this.board = [];
  for(var i = 0; i < 14; i++) {
    this.board.push([]);
    for(var j = 0; j < 14; j++) {
      this.board[i][j] = null;
    }
  }

  //Populate the initial state of the board
  this.board[0][0] = new Piece('3x', 'times-three');
  this.board[0][6] = new Piece('3x', 'times-three');
  this.board[0][7] = new Piece('3x', 'times-three');
  this.board[0][13] = new Piece('3x', 'times-three');
  this.board[6][0] = new Piece('3x', 'times-three');
  this.board[7][0] = new Piece('3x', 'times-three');
  this.board[13][0] = new Piece('3x', 'times-three');
  this.board[13][6] = new Piece('3x', 'times-three');
  this.board[13][7] = new Piece('3x', 'times-three');
  this.board[13][13] = new Piece('3x', 'times-three');
  this.board[6][13] = new Piece('3x', 'times-three');
  this.board[7][13] = new Piece('3x', 'times-three');
  this.board[1][1] = new Piece('2x', 'times-two');
  this.board[1][12] = new Piece('2x', 'times-two');;
  this.board[2][2] = new Piece('2x', 'times-two');;
  this.board[2][11] = new Piece('2x', 'times-two');;
  this.board[3][3] = new Piece('2x', 'times-two');;
  this.board[3][10] = new Piece('2x', 'times-two');;
  this.board[4][4] = new Piece('2x', 'times-two');;
  this.board[4][9] = new Piece('2x', 'times-two');;
  this.board[9][4] = new Piece('2x', 'times-two');;
  this.board[9][9] = new Piece('2x', 'times-two');;
  this.board[10][3] = new Piece('2x', 'times-two');;
  this.board[10][10] = new Piece('2x', 'times-two');;
  this.board[11][2] = new Piece('2x', 'times-two');;
  this.board[11][11] = new Piece('2x', 'times-two');;
  this.board[12][1] = new Piece('2x', 'times-two');;
  this.board[12][12] = new Piece('2x', 'times-two');;
  this.board[1][4] = new Piece('&divide', 'operation');
  this.board[1][9] = new Piece('&divide', 'operation');
  this.board[4][1] = new Piece('&divide', 'operation');
  this.board[4][12] = new Piece('&divide', 'operation');
  this.board[9][1] = new Piece('&divide', 'operation');
  this.board[9][12] = new Piece('&divide', 'operation');
  this.board[12][4] = new Piece('&divide', 'operation');
  this.board[12][9] = new Piece('&divide', 'operation');
  this.board[2][5] = new Piece('-', 'operation');
  this.board[2][8] = new Piece('-', 'operation');
  this.board[5][2] = new Piece('-', 'operation');
  this.board[5][11] = new Piece('-', 'operation');
  this.board[8][2] = new Piece('-', 'operation');
  this.board[8][11] = new Piece('-', 'operation');
  this.board[11][5] = new Piece('-', 'operation');
  this.board[11][8] = new Piece('-', 'operation');
  this.board[3][6] = new Piece('+', 'operation');
  this.board[4][7] = new Piece('+', 'operation');
  this.board[6][4] = new Piece('+', 'operation');
  this.board[7][3] = new Piece('+', 'operation');
  this.board[6][10] = new Piece('+', 'operation');
  this.board[7][9] = new Piece('+', 'operation');
  this.board[9][6] = new Piece('+', 'operation');
  this.board[10][7] = new Piece('+', 'operation');
  this.board[3][7] = new Piece('x', 'operation');
  this.board[4][6] = new Piece('x', 'operation');
  this.board[6][3] = new Piece('x', 'operation');
  this.board[7][4] = new Piece('x', 'operation');
  this.board[6][9] = new Piece('x', 'operation');
  this.board[7][10] = new Piece('x', 'operation');
  this.board[9][7] = new Piece('x', 'operation');
  this.board[10][6] = new Piece('x', 'operation');
  this.board[6][6] = new Piece(1, 'tile');
  this.board[6][7] = new Piece(2, 'tile');
  this.board[7][6] = new Piece(3, 'tile');
  this.board[7][7] = new Piece(4, 'tile');

  //Empty player array to start
  //First active player will be at index 0
  this.players = [];
  this.activePlayerIndex = 0;

  //Create the pool of tiles for players to use
  this.pool = new TilePool();

  //Counter used to determine the end of the game
  this.passCount = 0;
}

//Constructor for game pieces/tiles/board markings
var Piece = function(content, displayType) {
  this.content = content;
  this.displayType = displayType;
}

//Render the game board in the DOM
Game.prototype.renderBoard = function() {
  var domBoard = $('#board');
  domBoard.children().remove();
  for(var i = 0; i < 14; i++) {
    for(var j = 0; j < 14; j++) {
      if(this.board[i][j]) {
        domBoard.append('<div class="square ' + this.board[i][j].displayType + '" row="' + i + '" col="' + j + '">' + this.board[i][j].content + '</div>');
      } else {
        domBoard.append('<div class="square" row="' + i + '" col="' + j + '">&nbsp</div>');
      }
    }
  }
}

//Render the list of players to the DOM
Game.prototype.renderPlayers = function() {
  var list = $('#player-list');
  list.children().remove();
  var current = null;
  for(var i = 0; i < this.players.length; i++) {
    current = this.players[i];
    if(i === this.activePlayerIndex) {
      list.append('<tr class="active"><td>' + current.name + '</td><td>' + current.score + '</tr>');
    } else {
      list.append('<tr><td>' + current.name + '</td><td>' + current.score + '</tr>');
    }
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

  //Two squares below
  var down1 = parseInt($('.square[row="' + (boardX + 1) + '"][col="' + boardY + '"]').text());
  var down2 = parseInt($('.square[row="' + (boardX + 2) + '"][col="' + boardY + '"]').text());

  //Two squares left
  var left1 = parseInt($('.square[row="' + boardX + '"][col="' + (boardY - 1) + '"]').text());
  var left2 = parseInt($('.square[row="' + boardX + '"][col="' + (boardY - 2) + '"]').text());

  //Two squares right
  var right1 = parseInt($('.square[row="' + boardX + '"][col="' + (boardY + 1) + '"]').text());
  var right2 = parseInt($('.square[row="' + boardX + '"][col="' + (boardY + 2) + '"]').text());

  //Evaluate based on the symbol on the square
  var numSolutions = 0;
  switch(boardSelection.text()) {
    case '+':
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
  if (validMove === 0) {
    swal('Illegal move!');
    return false;
  };

  passed = false;

  //Make the move in the board array, then re-render the board to reflect the move
  currentPlayer.removeTileFromRack(rackTile);
  this.board[boardSpace.attr('row')][boardSpace.attr('col')] = new Piece(rackTile, 'tile');
  this.renderBoard();

  //Determine the move's score and increment the player's score by that number
  var moveScore = this.determineScore(rackTile, boardText, validMove);
  currentPlayer.incrementScore(moveScore);
  currentPlayer.renderScore();
  this.renderPlayers();

  //If the player successfully played on an operation sign, they draw a free tile
  if(boardText === '+' || boardText === '-' || boardText === 'x' || boardText === '&divide') {
    currentPlayer.draw(this.pool, 1);
  }

  //Check if the player's turn should be over. If it is, hide the move button and show the end turn button.
  if(this.determineEndOfTurn(currentPlayer)) {
    // alert('end of turn');
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

var passed = false;

//Switch the turn to the next player
Game.prototype.nextTurn = function() {
  //Make sure everyone hasn't passed consecutively without making a move, which would mean the game is over.
  if(passed) {
    this.passCount++;
  }
  if(this.passCount >= this.players.length) {
    this.end();
  }
  if(this.determineEndOfGame()) {
    this.end();
  }
  passed = true;

  if(this.activePlayerIndex === this.players.length - 1) {
    this.activePlayerIndex = 0;
  } else {
    this.activePlayerIndex++;
  }
  this.players[this.activePlayerIndex].draw(this.pool);
  this.players[this.activePlayerIndex].renderScore();
  this.renderPlayers();
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

//Determine if the game should be over because there are no more legal moves
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

//End the game and display the winner
Game.prototype.end = function() {
  var winners = [];
  var topScore = 0;
  this.players.forEach(function(player) {
    if(player.score > topScore) {
      console.log('in greater score if');
      topScore = player.score;
      winners = [];
      winners.push(player);
    } else
    if(player.score === topScore) {
      console.log('in tie if');
      topScore = player.score;
      winners.push(player);
    }
  });
  if(winners.length > 1) {
    swal('Game Over!', 'It was a tie at ' + topScore + ' points.');
  } else {
    swal('Game Over!', winners[0].name + ' won with ' + topScore + ' points.')
  }
  console.log(winners);
  // $('#board','#rack','button').off();
  $('#buttons').hide();
  $('#reset').show();
}

var players = [];
