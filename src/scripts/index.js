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

let compAttackIndex = 0;
function gameLoop(e) {
  if (e.target.className !== 'cells') return;
  let row = e.path[0].dataset.xIndex;
  let column = e.path[0].dataset.yIndex;
  player1.attack(row, column, computerGameboard);
  if (computerGameboard.missedShots[row][column]) {
    e.target.classList.add('miss');
  } else {
    e.target.classList.add('hit');
  }
  computerAttack();
}

function computerAttack() {
  computer.randomAttack(player1Gameboard);
  let row = computer.positionsPrevHit[compAttackIndex][0];
  let column = computer.positionsPrevHit[compAttackIndex][1];
  let targetCell = document.querySelector(
    ".user-board div[data-x-index='" + row + "']" + "[data-y-index='" + column + "']",
  );
  if (player1Gameboard.missedShots[row][column]) {
    targetCell.classList.add('miss');
  } else {
    targetCell.classList.add('hit');
  }
  compAttackIndex++;
}

export { gameLoop };
