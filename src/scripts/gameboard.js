const Gameboard = () => {
  const width = 10;
  const height = 10;
  let board = new Array(width).fill(null).map((x) => new Array(height).fill(null));
  return {
    board,
  };
};

export { Gameboard };
