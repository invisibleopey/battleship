const player = function player(name) {
  const positionsPrevHit = [];

  const attack = function attack(row, column, gameboard) {
    if (hasPositionBeenPrevHit(row, column)) return;
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
  };
};

export { player };
