const player = function player(name) {
  const positionsPrevHit = [];

  const attack = function attack(row, column, gameboard) {
    if (hasPositionBeenPrevHit(row, column)) return;
    positionsPrevHit.push([row, column]);
    gameboard.receiveAttack(row, column);
  };

  const randomAttack = function randomAttack(gameboard) {
    if (positionsPrevHit.length === 100) return;

    let row = Math.floor(Math.random() * 10);
    let column = Math.floor(Math.random() * 10);

    // If position has been hit, do the randomization again
    while (hasPositionBeenPrevHit(row, column)) {
      row = Math.floor(Math.random() * 10);
      column = Math.floor(Math.random() * 10);
    }

    positionsPrevHit.push([row, column]);
    gameboard.receiveAttack(row, column);
  };

  function hasPositionBeenPrevHit(row, column) {
    for (let i = 0; i < positionsPrevHit.length; i++) {
      if (positionsPrevHit[i][0] === row && positionsPrevHit[i][1] === column) {
        return true;
      }
    }
    return false;
  }

  return {
    name,
    positionsPrevHit,
    attack,
    randomAttack,
  };
};

export { player };
