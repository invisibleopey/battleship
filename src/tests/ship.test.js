import { ship } from '../scripts/ship';

test('return ship object', () => {
  let carrier = ship('carrier', 5);
  expect(carrier.length).toBe(5);
});
