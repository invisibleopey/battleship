import { ship } from '../scripts/ship';

const Gameboard = () => {
  // Create a 10 x 10 board
  const width = 10;
  const height = 10;
  let board = new Array(width).fill(null).map((x) => new Array(height).fill(null));
  // Initialize the 5 ships that will be required
  const ships = [
    ship('Carrier', 5),
    ship('Battleship', 4),
    ship('Destroyer', 3),
    ship('Submarine', 3),
    ship('Patrol Boat', 2),
  ];
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
    return true;
  }
  return {
    board,
    placeShip,
  };
};

export { Gameboard };
