const ship = function ship(name, length) {
  let hits = new Array(length).fill('');
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
    isSunk: () => {
      for (let i = 0; i < hits.length; i += 1) {
        if (hits[i] !== 'X') {
          return false;
        } else {
          return true;
        }
      }
    },
    hit: (target) => {
      if (target < length) {
        hits[target] = 'X';
      } else {
        throw 'Out of range';
      }
    },
  };
};

const destroyer = ship('destroyer', 3);
export { ship };
