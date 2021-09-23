const ship = function ship(name, length) {
  const emptyCell = { name: null, hit: false };
  let cells = new Array(length).fill(Object.create(emptyCell));
  return {
    name,
    length,
    isSunk: () => cells.every((cell) => cell.hit),
  };
};

export { ship };
