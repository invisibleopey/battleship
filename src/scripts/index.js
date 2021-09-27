import { ship } from './ship';
import { Gameboard } from './gameboard';
import { player } from './player';
import { renderGameboard, renderUserShips } from './dom-interaction';

const player1 = player('User');
const computer = player('Computer');
const player1Gameboard = Gameboard();
const computerGameboard = Gameboard();
player1Gameboard.placeShipsRandomly();
computerGameboard.placeShipsRandomly();
renderGameboard(player1Gameboard, 'player1');
renderGameboard(computerGameboard, 'computer');
renderUserShips(player1Gameboard);

let compAttackIndex = 0;
function gameLoop(e) {
  if (e.target.className !== 'cells') return;
  if (!(player1Gameboard.isGameOver() || computerGameboard.isGameOver())) {
    let row = e.path[0].dataset.xIndex;
    let column = e.path[0].dataset.yIndex;
    player1.attack(row, column, computerGameboard);
    if (computerGameboard.missedShots[row][column]) {
      e.target.classList.add('miss');
    } else {
      e.target.classList.add('hit');
    }
    checkWinner();
    computerAttack();
  }
}

function computerAttack() {
  if (!(player1Gameboard.isGameOver() || computerGameboard.isGameOver())) {
    computer.randomAttack(player1Gameboard);
    let row = computer.positionsPrevHit[compAttackIndex][0];
    let column = computer.positionsPrevHit[compAttackIndex][1];
    let targetCell = document.querySelector(
      ".user-board div[data-x-index='" + row + "']" + "[data-y-index='" + column + "']",
    );
    if (player1Gameboard.missedShots[row][column]) {
      targetCell.classList.add('miss');
    } else {
      targetCell.classList.remove('userShips');
      targetCell.classList.add('hit');
    }
    compAttackIndex++;
    checkWinner();
  }
}

function checkWinner() {
  if (player1Gameboard.isGameOver()) {
    document.querySelector('.messages').textContent = 'The Computer Won';
  } else if (computerGameboard.isGameOver()) {
    document.querySelector('.messages').textContent = 'You won!';
  }
}
export { gameLoop };
