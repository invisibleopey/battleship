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
});
