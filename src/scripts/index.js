import { ship } from './ship';
import { Gameboard } from './gameboard';
import { player } from './player';
import { renderGameboard, renderUserShips } from './dom-interaction';

const player1 = player('User');
const computer = player('Computer');
const player1Gameboard = Gameboard();
const computerGameboard = Gameboard();
let compAttackIndex = 0;

// Start Game
const startGame = function startGame() {
  computerGameboard.placeShipsRandomly();
  renderGameboard(player1Gameboard, 'player1');
  renderGameboard(computerGameboard, 'computer');
  renderUserShips(player1Gameboard);
};

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

// Place Ships
// Random placement of ships
const shipPlacementDiv = document.querySelector('#ship-placement');
const randomShipsBtn = document.querySelector('#randomShipsBtn');
randomShipsBtn.addEventListener('click', () => {
  player1Gameboard.placeShipsRandomly();
  startGame();
  shipPlacementDiv.style.display = 'none';
});

// Placement of ships after Capturing of Coords
const manualShipsBtn = document.querySelector('#place-ships');
manualShipsBtn.addEventListener('click', () => {
  let carrierX = Number(document.querySelector('#carrier-x').value);
  let carrierY = Number(document.querySelector('#carrier-y').value);
  let isCarrierVertical;
  if (document.querySelector('#carrier-vertical').checked) {
    isCarrierVertical = true;
  } else {
    isCarrierVertical = false;
  }
  player1Gameboard.placeShip(player1Gameboard.ships[0], carrierX, carrierY, isCarrierVertical);

  let battleshipX = Number(document.querySelector('#battleship-x').value);
  let battleshipY = Number(document.querySelector('#battleship-y').value);
  let isBattleshipVertical;
  if (document.querySelector('#battleship-vertical').checked) {
    isBattleshipVertical = true;
  } else {
    isBattleshipVertical = false;
  }
  player1Gameboard.placeShip(
    player1Gameboard.ships[1],
    battleshipX,
    battleshipY,
    isBattleshipVertical,
  );

  let destroyerX = Number(document.querySelector('#destroyer-x').value);
  let destroyerY = Number(document.querySelector('#destroyer-y').value);
  let isDestroyerVertical;
  if (document.querySelector('#destroyer-vertical').checked) {
    isDestroyerVertical = true;
  } else {
    isDestroyerVertical = false;
  }
  player1Gameboard.placeShip(
    player1Gameboard.ships[2],
    destroyerX,
    destroyerY,
    isDestroyerVertical,
  );

  let subMarineX = Number(document.querySelector('#sub-marine-x').value);
  let subMarineY = Number(document.querySelector('#sub-marine-y').value);
  let isSubMarineVertical;
  if (document.querySelector('#sub-marine-vertical').checked) {
    isSubMarineVertical = true;
  } else {
    isSubMarineVertical = false;
  }
  player1Gameboard.placeShip(
    player1Gameboard.ships[3],
    subMarineX,
    subMarineY,
    isSubMarineVertical,
  );

  let patrolBoatX = Number(document.querySelector('#patrol-boat-x').value);
  let patrolBoatY = Number(document.querySelector('#patrol-boat-y').value);
  let isPatrolBoatVertical;
  if (document.querySelector('#patrol-boat-vertical').checked) {
    isPatrolBoatVertical = true;
  } else {
    isPatrolBoatVertical = false;
  }
  player1Gameboard.placeShip(
    player1Gameboard.ships[4],
    patrolBoatX,
    patrolBoatY,
    isPatrolBoatVertical,
  );

  startGame();
  document.querySelector('#ships-coords-form').reset();
  shipPlacementDiv.style.display = 'none';
  document.querySelector('.bg-modal').style.display = 'none';
});
export { gameLoop };
