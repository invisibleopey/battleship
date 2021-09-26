import { player } from '../scripts/player';
import { Gameboard } from '../scripts/gameboard';
import { ship } from '../scripts/ship';

describe('player factory', () => {
  let player1, gameboard, carrier;

  beforeEach(() => {
    player1 = player('opey');
    gameboard = Gameboard();
    carrier = ship('carrier', 5);
  });

  test('the player name returned', () => {
    expect(player1.name).toBe('opey');
  });

  test('coordinates already hit 2d array', () => {
    expect(player1.positionsPrevHit).toEqual([]);
  });

  test('player attack on ship', () => {
    gameboard.placeShip(carrier, 1, 1, true);
    player1.attack(1, 1, gameboard);
    player1.attack(2, 1, gameboard);
    player1.attack(3, 1, gameboard);
    player1.attack(4, 1, gameboard);
    player1.attack(5, 1, gameboard);
    expect(gameboard.isGameOver()).toBe(true);
  });

  test('launch random attacks', () => {
    gameboard.placeShip(carrier, 1, 1, true);
    for (let i = 0; i < 100; i++) {
      player1.randomAttack(gameboard);
    }
    expect(gameboard.isGameOver()).toBe(true);
  });
});
