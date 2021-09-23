const ship = function ship(name, length) {
  const emptyCell = { name: null, hit: false };
  let cells = new Array(length).fill(Object.create(emptyCell));
  let hits = [];
  return {
    get name() {
      return name;
    },
    get length() {
      return length;
    },
    get hits() {
      return [...hits];
    },
    isSunk: () => cells.every((cell) => cell.hit),
  };
};

const destroyer = ship('destroyer', 3);
console.log(destroyer);
export { ship };
