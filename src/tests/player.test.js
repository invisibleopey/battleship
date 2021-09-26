import { player } from '../scripts/player';

describe('player factory', () => {
  let player1, gameboard, carrier;

  beforeEach(() => {
    player1 = player('opey');
  });

  test('test the player name returned', () => {
    expect(player1.name).toBe('opey');
  });

  test('coordinates already hit 2d array', () => {
    expect(player1.coordsPrevHit).toEqual([]);
  });
});
