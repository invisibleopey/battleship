import { ship } from '../scripts/ship';

test('return ship object length', () => {
  let carrier = ship('carrier', 5);
  expect(carrier.length).toBe(5);
});

test('return ship object name', () => {
  let carrier = ship('carrier', 5);
  expect(carrier.name).toBe('carrier');
});

test('return ship object isSunk function', () => {
  let carrier = ship('carrier', 5);
  expect(carrier.isSunk()).toBe(false);
});
