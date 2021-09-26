import { Gameboard } from '../scripts/gameboard';
import { ship } from '../scripts/ship';

describe('Gameboard tests', () => {
  let gameboard;
  let carrier;
  let destroyer;
  let fakeBoard;

  beforeEach(() => {
    gameboard = Gameboard();
    carrier = ship('carrier', 5);
    destroyer = ship('destroyer', 3);
    fakeBoard = [
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ];
  });

  test('test the width of the board', () => {
    expect(gameboard.board.length).toBe(10);
  });

  test('test the height of the board', () => {
    expect(gameboard.board[0].length).toBe(10);
  });

  test('the board initialization', () => {
    expect(gameboard.board).toEqual(fakeBoard);
  });

  test('place ship', () => {
    gameboard.placeShip(carrier, 1, 1, true);
    fakeBoard[1][1] = carrier;
    fakeBoard[2][1] = carrier;
    fakeBoard[3][1] = carrier;
    fakeBoard[4][1] = carrier;
    fakeBoard[5][1] = carrier;
    expect(gameboard.board).toEqual(fakeBoard);
  });

  test('place 5 ships randomly', () => {
    gameboard.placeShipsRandomly();
    expect(gameboard.getEmptyFieldsAmount()).toBe(83);
  });

  test('prevent ships being placed outside gameboard', () => {
    gameboard.placeShip(carrier, 1, 1, true);
    expect(gameboard.isPlacementPossible(carrier, 8, 8, true)).toBe(false);
    expect(gameboard.isPlacementPossible(carrier, 10, 10, true)).toBe(false);
  });

  test('prevent ship placement on occupied fields', () => {
    gameboard.placeShip(carrier, 1, 1, true);
    expect(gameboard.isPlacementPossible(carrier, 1, 1, true)).toBe(false);
    expect(gameboard.isPlacementPossible(carrier, 2, 1, true)).toBe(false);
    expect(gameboard.isPlacementPossible(carrier, 3, 1, true)).toBe(false);
  });

  test('prevent ship placement in fields directy neighbouring occupied fields ', () => {
    gameboard.placeShip(destroyer, 1, 1, true);
    expect(gameboard.isPlacementPossible(destroyer, 0, 0, true)).toBe(false);
    expect(gameboard.isPlacementPossible(destroyer, 4, 2, true)).toBe(false);
    expect(gameboard.isPlacementPossible(destroyer, 5, 2, true)).toBe(true);
  });

  test('test receive attack on unoccupied field', () => {
    expect(gameboard.receiveAttack(2, 1)).toBe(false);
  });

  test('test receive attack on an occupied field', () => {
    gameboard.placeShip(carrier, 1, 1, true);
    expect(gameboard.receiveAttack(2, 1)).toBe(true);
  });

  test('test the side effect of receive attack function', () => {
    gameboard.placeShip(carrier, 1, 1, true);
    gameboard.receiveAttack(2, 1);
    expect(gameboard.board[2][1].hits.includes(1)).toBe(true);
  });

  test('keep track of missed shots', () => {
    gameboard.placeShip(carrier, 1, 1, true);
    gameboard.receiveAttack(1, 4);
    expect(gameboard.missedShots[1][4]).toBe(true);
  });

  test('tell if game is over', () => {
    expect(gameboard.isGameOver()).toBe(false);

    gameboard.placeShip(carrier, 1, 1, true);
    expect(gameboard.isGameOver()).toBe(false);
    gameboard.receiveAttack(1, 1);
    gameboard.receiveAttack(2, 1);
    gameboard.receiveAttack(3, 1);
    gameboard.receiveAttack(4, 1);
    gameboard.receiveAttack(5, 1);

    gameboard.placeShip(new ship('destroyer', 3), 5, 5, false);
    gameboard.receiveAttack(5, 5);
    gameboard.receiveAttack(5, 6);
    gameboard.receiveAttack(5, 7);
    expect(gameboard.isGameOver()).toBe(true);
  });
});
