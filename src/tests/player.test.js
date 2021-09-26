import { player } from '../scripts/player';

describe('player factory', () => {
  let player1;

  beforeEach(() => {
    player1 = player('opey');
  });

  test('test the player name returned', () => {
    expect(player1.name).toBe('opey');
  });
});
