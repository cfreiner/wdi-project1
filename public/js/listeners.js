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

//Event listeners
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
  $('#player-name').val('').focus();
  if(players.length >= 2) {
    $('#start').removeClass('hide');
  }
});
$('#start').on('click', function(e) {
  e.preventDefault();
  game = new Game();
  game.players = players;
  $('.start-form').fadeOut('fast');
  $('table, footer').removeClass('hide');
  game.renderBoard();
  game.renderPlayers();
  game.players[game.activePlayerIndex].draw(game.pool);
  game.players[game.activePlayerIndex].renderScore();
});
