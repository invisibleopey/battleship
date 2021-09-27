import { ship } from './ship';
import { Gameboard } from './gameboard';
import { player } from './player';
import { renderGameboard } from './dom-interaction';

const player1 = player('User');
const computer = player('Computer');
const player1Gameboard = Gameboard();
const computerGameboard = Gameboard();
player1Gameboard.placeShipsRandomly();
computerGameboard.placeShipsRandomly();
renderGameboard(player1Gameboard, 'player1');
renderGameboard(computerGameboard, 'computer');

function attackCell(e) {
  if (e.target.className !== 'cells') return;
  let row = e.path[0].dataset.xIndex;
  let column = e.path[0].dataset.yIndex;
  player1.attack(row, column, computerGameboard);
}

export { attackCell };
