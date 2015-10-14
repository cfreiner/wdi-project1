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
  $('.start-form p').fadeIn('fast').fadeOut('fast');
  if(players.length >= 2) {
    $('#start').removeClass('hide');
    $('.start-form p').css('right','115px');
  }
});
$('#start').on('click', function(e) {
  e.preventDefault();
  game = new Game();
  game.players = players;
  $('.start-form').fadeOut('fast');
  game.renderBoard();
  game.renderPlayers();
  $('#middle-row, #bottom-row').fadeIn('fast');
  game.players[game.activePlayerIndex].draw(game.pool);
  game.players[game.activePlayerIndex].renderScore();
});

$('#middle-row, #bottom-row').hide();
$('.start-form p').hide();
