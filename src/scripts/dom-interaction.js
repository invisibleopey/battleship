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

export { renderGameboard };
