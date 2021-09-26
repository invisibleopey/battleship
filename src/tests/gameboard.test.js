import { Gameboard } from '../scripts/gameboard';
import { ship } from '../scripts/ship';

describe('Gameboard tests', () => {
  let gameboard;
  let carrier;
  let fakeBoard;

  beforeEach(() => {
    gameboard = Gameboard();
    carrier = ship('carrier', 5);
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
    fakeBoard[1][1] = carrier.name;
    fakeBoard[2][1] = carrier.name;
    fakeBoard[3][1] = carrier.name;
    fakeBoard[4][1] = carrier.name;
    fakeBoard[5][1] = carrier.name;
    expect(gameboard.board).toEqual(fakeBoard);
  });

  test('place 5 ships randomly', () => {
    gameboard.placeShipsRandomly();
    expect(gameboard.getEmptyFieldsAmount()).toBe(83);
  });
});