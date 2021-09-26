import { ship } from '../scripts/ship';

const Gameboard = () => {
  // Create a 10 x 10 board
  const width = 10;
  const height = 10;
  let board = new Array(width).fill(null).map((x) => new Array(height).fill(null));

  // Place ships
  const placeShip = function placeShip(ship, row, column, isVertical) {
    if (!isPlacementPossible(ship, row, column, isVertical)) return false;

    if (isVertical) {
      for (let i = 0; i < ship.length; i++) {
        board[row + i][column] = ship.name;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        board[row][column + i] = ship.name;
      }
    }
    return true;
  };

  function isPlacementPossible(ship, row, column, isVertical) {
    // Is it out of the gameboard
    if (row < 0 || row > height - 1 || column < 0 || column > width - 1) return false;

    // If ship doesn't fit in gameboard
    if (isVertical) {
      if (row + ship.length > 10) return false;
    } else {
      if (column + ship.length > 10) return false;
    }

    // Are any of the fields already taken
    if (isVertical) {
      for (let i = 0; i < ship.length; i++) {
        if (board[row + i][column]) return false;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        if (board[row][column + i]) return false;
      }
    }

    // Are any of the neighbour fields already taken
    if (isVertical) {
      for (let i = 0; i < ship.length; i++) {
        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            if (row + x + i < 0 || row + x + i >= 10 || column + y < 0 || column + y >= 10)
              continue;
            if (board[row + x + i][column + y]) return false;
          }
        }
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            if (row + x < 0 || row + x >= 10 || column + y + i < 0 || column + y + i >= 10)
              continue;
            if (board[row + x][column + y + i]) return false;
          }
        }
      }
    }
    return true;
  }

  function getEmptyFieldsAmount() {
    let total = 0;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (board[i][j] === null) total++;
      }
    }
    return total;
  }

  // The interface functions and properties to be returned
  return {
    board,
    placeShip,
    placeShipsRandomly,
    getEmptyFieldsAmount,
  };
};

export { Gameboard };
