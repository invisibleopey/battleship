import { ship } from '../scripts/ship';

describe('Test ship factory', () => {
  let carrier;

  beforeEach(() => {
    carrier = ship('carrier', 5);
  });

  test('tests the returned get name method', () => {
    expect(carrier.name).toBe('carrier');
  });

  test('tests the returned get length method', () => {
    expect(carrier.length).toBe(5);
  });

  test('tests the returned get hits method', () => {
    expect(carrier.hits).toStrictEqual([]);
  });

  test('tests the returned isSunk method with false', () => {
    expect(carrier.isSunk()).toBe(false);
  });

  test('tests the returned isSunk method with true', () => {
    carrier.hit(0);
    carrier.hit(1);
    carrier.hit(2);
    carrier.hit(3);
    carrier.hit(4);
    expect(carrier.isSunk()).toBe(true);
  });

  test('tests the returned hit method', () => {
    carrier.hit(2);
    expect(carrier.hits).toEqual([2]);
  });

  test.todo('test the returned object of ship factory function');
});
