$(function() {

  var currentPlayer;
  var plays;

  function restartGame() {
    switchCurrentPlayer();

    plays = [
      null, null, null,
      null, null, null,
      null, null, null
    ];

    $('.winner-state').hide();
    $('.winner-message').empty();
    $('.game-piece').removeClass('claimed');
    $('.game-piece').removeClass('claimed-by-X');
    $('.game-piece').removeClass('claimed-by-O');
  };

  function checkForWinner() {
    /*
      0, 1, 2 = Top row
      3, 4, 5 = Middle row
      6, 7, 8 = Bottom row

      0, 4, 8 = Top left to bottom right
      2, 4, 6 = Bottom left to top right

      0, 3, 6 = Left column
      1, 4, 7 = Middle column
      2, 5, 8 = Right column
    */

    if (plays[0] === plays[1] && plays[1] === plays[2] && plays[0] !== null) {
      setWinner( plays[0] );
    } else if (plays[3] === plays[4] && plays[4] === plays[5] && plays[3] !== null) {
      setWinner( plays[3] );
    } else if (plays[6] === plays[7] && plays[7] === plays[8] && plays[6] !== null) {
      setWinner( plays[6] );
    } else if (plays[0] === plays[4] && plays[4] === plays[8] && plays[0] !== null) {
      setWinner( plays[0] );
    } else if (plays[2] === plays[4] && plays[4] === plays[6] && plays[2] !== null) {
      setWinner( plays[2] );
    } else if (plays[0] === plays[3] && plays[3] === plays[6] && plays[0] !== null) {
      setWinner( plays[0] );
    } else if (plays[1] === plays[4] && plays[4] === plays[7] && plays[1] !== null) {
      setWinner( plays[1] );
    } else if (plays[2] === plays[5] && plays[5] === plays[8] && plays[2] !== null) {
      setWinner( plays[2] );
    }
  };

  function setWinner(winner) {
    $('.winner-state').show();
    $('.winner-message').text(winner + ' Won! Click to replay.');
  };

  function switchCurrentPlayer() {
    if (currentPlayer === 'X') {
      currentPlayer = 'O';
    } else {
      currentPlayer = 'X';
    }
    $('body').removeClass();
    $('body').addClass('current-player-' + currentPlayer);
  };


  $('.game-piece').click(function(event) {
    var position = $(this).index();

    if (plays[position]) {
      return;
    } else {
      plays[position] = currentPlayer;
    }

    $(this).addClass('claimed-by-' + currentPlayer);
    $(this).addClass('claimed');

    checkForWinner();
    switchCurrentPlayer();

  });

  $('.winner-state').click(function(event) {
    restartGame();
  });

  restartGame();
});
