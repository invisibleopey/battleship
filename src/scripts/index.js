import { ship } from './ship';
import { Gameboard } from './gameboard';
import { player } from './player';
import { renderGameboard } from './dom-interaction';

const player1 = player('User');
const computer = player('Computer');
const player1Gameboard = Gameboard();
const computerGameboard = Gameboard();
player1Gameboard.placeShipsRandomly();
computerGameboard.placeShipsRandomly();
renderGameboard(player1Gameboard, 'player1');
renderGameboard(computerGameboard, 'computer');
