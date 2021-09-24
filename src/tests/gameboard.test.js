import { Gameboard } from '../scripts/gameboard';

test('test the width of the board', () => {
  const gameboard = Gameboard();
  expect(gameboard.board.length).toBe(10);
});

test('test the height of the board', () => {
  const gameboard = Gameboard();
  expect(gameboard.board[0].length).toBe(10);
});
