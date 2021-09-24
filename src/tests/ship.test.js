import { ship } from '../scripts/ship';

test('tests the returned get name method', () => {
  let carrier = ship('carrier', 4);
  expect(carrier.name).toBe('carrier');
});

test('tests the returned get length method', () => {
  let carrier = ship('carrier', 5);
  expect(carrier.length).toBe(5);
});

test('tests the returned get hits method', () => {
  let carrier = ship('carrier', 5);
  expect(carrier.hits).toStrictEqual(['', '', '', '', '']);
});

test('tests the returned isSunk method with false', () => {
  let carrier = ship('carrier', 5);
  expect(carrier.isSunk()).toBe(false);
});

test('tests the returned isSunk method with true', () => {
  let carrier = ship('carrier', 5);
  carrier.hit(0);
  carrier.hit(1);
  carrier.hit(2);
  carrier.hit(3);
  carrier.hit(4);
  expect(carrier.isSunk()).toBe(true);
});

test('tests the returned hit method', () => {
  let carrier = ship('carrier', 5);
  carrier.hit(2);
  expect(carrier.hits[2]).toBe('X');
});
