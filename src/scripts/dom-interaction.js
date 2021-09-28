import { gameLoop } from './index';

function renderGameboard(gameboard, owner) {
  let container;
  if (owner === 'player1') {
    container = document.querySelector('.user-board');
  } else if (owner === 'computer') {
    container = document.querySelector('.computer-board');
  }
  for (let i = 0; i < gameboard.board.length; i++) {
    for (let j = 0; j < gameboard.board[i].length; j++) {
      const div = document.createElement('div');
      div.classList.add('cells');
      div.dataset.xIndex = [i];
      div.dataset.yIndex = [j];

      container.appendChild(div);
    }
  }
}

function renderUserShips(gameboard) {
  for (let i = 0; i < gameboard.board.length; i++) {
    for (let j = 0; j < gameboard.board[i].length; j++) {
      if (gameboard.board[i][j]) {
        let currentCell = document.querySelector(
          ".user-board div[data-x-index='" + i + "']" + "[data-y-index='" + j + "']",
        );
        currentCell.classList.add('userShips');
      }
    }
  }
}

const computerBoard = document.querySelector('.computer-board');
computerBoard.addEventListener('click', gameLoop);

// Control Modal
document.getElementById('enterCoordsBtn').addEventListener('click', () => {
  document.querySelector('.bg-modal').style.display = 'flex';
});

document.querySelector('.close').addEventListener('click', () => {
  document.querySelector('.bg-modal').style.display = 'none';
});
export { renderGameboard, renderUserShips };
