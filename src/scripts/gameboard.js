import { ship } from '../scripts/ship';

const Gameboard = () => {
  // Create a 10 x 10 board
  const width = 10;
  const height = 10;
  let board = new Array(width).fill(null).map((x) => new Array(height).fill(null));
  let missedShots = new Array(width).fill(false).map((x) => new Array(height).fill(false));

  // Place ships
  const placeShip = function placeShip(ship, row, column, isVertical) {
    if (!isPlacementPossible(ship, row, column, isVertical)) return false;

    if (isVertical) {
      for (let i = 0; i < ship.length; i++) {
        board[row + i][column] = ship;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        board[row][column + i] = ship;
      }
    }
    return true;
  };

  // Initialize the ships that will be needed
  const ships = [];
  const carrier = new ship('carrier', 5);
  const battleship = new ship('battleship', 4);
  const destroyer = new ship('destroyer', 3);
  const submarine = new ship('submarine', 3);
  const patrolBoat = new ship('patrolBoat', 2);
  ships.push(carrier, battleship, destroyer, submarine, patrolBoat);

  // Randomly place ships
  const placeShipsRandomly = function placeShipsRandomly() {
    if (!isEmpty()) return;

    let succesfulPlacements = 0;

    while (succesfulPlacements < 5) {
      const row = Math.floor(Math.random() * 10);
      const column = Math.floor(Math.random() * 10);
      const isVertical = Math.floor(Math.random() * 2) === 1 ? true : false;

      if (placeShip(ships[succesfulPlacements], row, column, isVertical)) succesfulPlacements++;
    }
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

  function isEmpty() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (board[i][j] !== null) return false;
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

  const receiveAttack = function receiveAttack(row, column) {
    if (row < 0 || row >= 10 || column < 0 || column >= 10) {
      return false;
    }

    if (board[row][column]) {
      let hitIndex = 0;
      // If ship is vertical
      if (column > 0 && board[row][column - 1]) {
        let i = 1;
        while (column - i >= 0 && board[row][column - i]) {
          hitIndex++;
          i++;
        }
      }
      // If ship is horizontal
      else if (row > 0 && board[row - 1][column]) {
        let i = 1;
        while (row - i >= 0 && board[row - i][column]) {
          hitIndex++;
          i++;
        }
      }
      board[row][column].hit(hitIndex);
      return true;
    } else {
      missedShots[row][column] = true;
      return false;
    }
  };

  function isGameOver() {
    let areShipsOnBoard = false;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (board[i][j]) {
          areShipsOnBoard = true;
          if (!board[i][j].isSunk()) {
            return false;
          }
        }
      }
    }
    return areShipsOnBoard ? true : false;
  }

  // The interface functions and properties to be returned
  return {
    board,
    placeShip,
    placeShipsRandomly,
    getEmptyFieldsAmount,
    isPlacementPossible,
    receiveAttack,
    missedShots,
    isGameOver,
    ships,
  };
};

export { Gameboard };
