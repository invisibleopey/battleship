/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/dom-interaction.js":
/*!****************************************!*\
  !*** ./src/scripts/dom-interaction.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderGameboard": () => (/* binding */ renderGameboard),
/* harmony export */   "renderUserShips": () => (/* binding */ renderUserShips)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/scripts/index.js");


function renderGameboard(gameboard, owner) {
  let container;
  if (owner === 'player1') {
    container = document.querySelector('.user-board');
  } else if (owner === 'computer') {
    container = document.querySelector('.computer-board');
  }
  for (let i = 0; i < gameboard.board.length; i++) {
    for (let j = 0; j < gameboard.board[i].length; j++) {
      const div = document.createElement('div');
      div.classList.add('cells');
      div.dataset.xIndex = [i];
      div.dataset.yIndex = [j];

      container.appendChild(div);
    }
  }
}

function renderUserShips(gameboard) {
  for (let i = 0; i < gameboard.board.length; i++) {
    for (let j = 0; j < gameboard.board[i].length; j++) {
      if (gameboard.board[i][j]) {
        let currentCell = document.querySelector(
          ".user-board div[data-x-index='" + i + "']" + "[data-y-index='" + j + "']",
        );
        currentCell.classList.add('userShips');
      }
    }
  }
}

const computerBoard = document.querySelector('.computer-board');
computerBoard.addEventListener('click', _index__WEBPACK_IMPORTED_MODULE_0__.gameLoop);

// Control Modal
document.getElementById('enterCoordsBtn').addEventListener('click', () => {
  document.querySelector('.bg-modal').style.display = 'flex';
});

document.querySelector('.close').addEventListener('click', () => {
  document.querySelector('.bg-modal').style.display = 'none';
});



/***/ }),

/***/ "./src/scripts/gameboard.js":
/*!**********************************!*\
  !*** ./src/scripts/gameboard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Gameboard": () => (/* binding */ Gameboard)
/* harmony export */ });
/* harmony import */ var _scripts_ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scripts/ship */ "./src/scripts/ship.js");


const Gameboard = () => {
  // Create a 10 x 10 board
  const width = 10;
  const height = 10;
  let board = new Array(width).fill(null).map((x) => new Array(height).fill(null));
  let missedShots = new Array(width).fill(false).map((x) => new Array(height).fill(false));

  // Place ships
  const placeShip = function placeShip(ship, row, column, isVertical) {
    if (!isPlacementPossible(ship, row, column, isVertical)) return false;

    if (isVertical) {
      for (let i = 0; i < ship.length; i++) {
        board[row + i][column] = ship;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        board[row][column + i] = ship;
      }
    }
    return true;
  };

  // Initialize the ships that will be needed
  const ships = [];
  const carrier = new _scripts_ship__WEBPACK_IMPORTED_MODULE_0__.ship('carrier', 5);
  const battleship = new _scripts_ship__WEBPACK_IMPORTED_MODULE_0__.ship('battleship', 4);
  const destroyer = new _scripts_ship__WEBPACK_IMPORTED_MODULE_0__.ship('destroyer', 3);
  const submarine = new _scripts_ship__WEBPACK_IMPORTED_MODULE_0__.ship('submarine', 3);
  const patrolBoat = new _scripts_ship__WEBPACK_IMPORTED_MODULE_0__.ship('patrolBoat', 2);
  ships.push(carrier, battleship, destroyer, submarine, patrolBoat);

  // Randomly place ships
  const placeShipsRandomly = function placeShipsRandomly() {
    if (!isEmpty()) return;

    let succesfulPlacements = 0;

    while (succesfulPlacements < 5) {
      const row = Math.floor(Math.random() * 10);
      const column = Math.floor(Math.random() * 10);
      const isVertical = Math.floor(Math.random() * 2) === 1 ? true : false;

      if (placeShip(ships[succesfulPlacements], row, column, isVertical)) succesfulPlacements++;
    }
  };

  function isPlacementPossible(ship, row, column, isVertical) {
    // Is it out of the gameboard
    if (row < 0 || row > height - 1 || column < 0 || column > width - 1) return false;

    // If ship doesn't fit in gameboard
    if (isVertical) {
      if (row + ship.length > 10) return false;
    } else {
      if (column + ship.length > 10) return false;
    }

    // Are any of the fields already taken
    if (isVertical) {
      for (let i = 0; i < ship.length; i++) {
        if (board[row + i][column]) return false;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        if (board[row][column + i]) return false;
      }
    }

    // Are any of the neighbour fields already taken
    if (isVertical) {
      for (let i = 0; i < ship.length; i++) {
        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            if (row + x + i < 0 || row + x + i >= 10 || column + y < 0 || column + y >= 10)
              continue;
            if (board[row + x + i][column + y]) return false;
          }
        }
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            if (row + x < 0 || row + x >= 10 || column + y + i < 0 || column + y + i >= 10)
              continue;
            if (board[row + x][column + y + i]) return false;
          }
        }
      }
    }
    return true;
  }

  function isEmpty() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (board[i][j] !== null) return false;
      }
    }
    return true;
  }

  function getEmptyFieldsAmount() {
    let total = 0;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (board[i][j] === null) total++;
      }
    }
    return total;
  }

  const receiveAttack = function receiveAttack(row, column) {
    if (row < 0 || row >= 10 || column < 0 || column >= 10) {
      return false;
    }

    if (board[row][column]) {
      let hitIndex = 0;
      // If ship is vertical
      if (column > 0 && board[row][column - 1]) {
        let i = 1;
        while (column - i >= 0 && board[row][column - i]) {
          hitIndex++;
          i++;
        }
      }
      // If ship is horizontal
      else if (row > 0 && board[row - 1][column]) {
        let i = 1;
        while (row - i >= 0 && board[row - i][column]) {
          hitIndex++;
          i++;
        }
      }
      board[row][column].hit(hitIndex);
      return true;
    } else {
      missedShots[row][column] = true;
      return false;
    }
  };

  function isGameOver() {
    let areShipsOnBoard = false;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (board[i][j]) {
          areShipsOnBoard = true;
          if (!board[i][j].isSunk()) {
            return false;
          }
        }
      }
    }
    return areShipsOnBoard ? true : false;
  }

  // The interface functions and properties to be returned
  return {
    board,
    placeShip,
    placeShipsRandomly,
    getEmptyFieldsAmount,
    isPlacementPossible,
    receiveAttack,
    missedShots,
    isGameOver,
    ships,
  };
};




/***/ }),

/***/ "./src/scripts/index.js":
/*!******************************!*\
  !*** ./src/scripts/index.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gameLoop": () => (/* binding */ gameLoop)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/scripts/ship.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ "./src/scripts/gameboard.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player */ "./src/scripts/player.js");
/* harmony import */ var _dom_interaction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom-interaction */ "./src/scripts/dom-interaction.js");





const player1 = (0,_player__WEBPACK_IMPORTED_MODULE_2__.player)('User');
const computer = (0,_player__WEBPACK_IMPORTED_MODULE_2__.player)('Computer');
const player1Gameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard)();
const computerGameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard)();
let compAttackIndex = 0;

// Start Game
const startGame = function startGame() {
  computerGameboard.placeShipsRandomly();
  (0,_dom_interaction__WEBPACK_IMPORTED_MODULE_3__.renderGameboard)(player1Gameboard, 'player1');
  (0,_dom_interaction__WEBPACK_IMPORTED_MODULE_3__.renderGameboard)(computerGameboard, 'computer');
  (0,_dom_interaction__WEBPACK_IMPORTED_MODULE_3__.renderUserShips)(player1Gameboard);
};

function gameLoop(e) {
  if (e.target.className !== 'cells') return;
  if (!(player1Gameboard.isGameOver() || computerGameboard.isGameOver())) {
    let row = e.path[0].dataset.xIndex;
    let column = e.path[0].dataset.yIndex;
    player1.attack(row, column, computerGameboard);
    if (computerGameboard.missedShots[row][column]) {
      e.target.classList.add('miss');
    } else {
      e.target.classList.add('hit');
    }
    checkWinner();
    computerAttack();
  }
}

function computerAttack() {
  if (!(player1Gameboard.isGameOver() || computerGameboard.isGameOver())) {
    computer.randomAttack(player1Gameboard);
    let row = computer.positionsPrevHit[compAttackIndex][0];
    let column = computer.positionsPrevHit[compAttackIndex][1];
    let targetCell = document.querySelector(
      ".user-board div[data-x-index='" + row + "']" + "[data-y-index='" + column + "']",
    );
    if (player1Gameboard.missedShots[row][column]) {
      targetCell.classList.add('miss');
    } else {
      targetCell.classList.remove('userShips');
      targetCell.classList.add('hit');
    }
    compAttackIndex++;
    checkWinner();
  }
}

function checkWinner() {
  if (player1Gameboard.isGameOver()) {
    document.querySelector('.messages').textContent = 'The Computer Won';
  } else if (computerGameboard.isGameOver()) {
    document.querySelector('.messages').textContent = 'You won!';
  }
}

// Place Ships
// Random placement of ships
const shipPlacementDiv = document.querySelector('#ship-placement');
const randomShipsBtn = document.querySelector('#randomShipsBtn');
randomShipsBtn.addEventListener('click', () => {
  player1Gameboard.placeShipsRandomly();
  startGame();
  shipPlacementDiv.style.display = 'none';
});

// Placement of ships after Capturing of Coords
const manualShipsBtn = document.querySelector('#place-ships');
manualShipsBtn.addEventListener('click', () => {
  placeShipsWithCoords();
  startGame();
  document.querySelector('#ships-coords-form').reset();
  shipPlacementDiv.style.display = 'none';
  document.querySelector('.bg-modal').style.display = 'none';
});

function placeShipsWithCoords() {
  let carrierX = Number(document.querySelector('#carrier-x').value);
  let carrierY = Number(document.querySelector('#carrier-y').value);
  let isCarrierVertical;
  if (document.querySelector('#carrier-vertical').checked) {
    isCarrierVertical = true;
  } else {
    isCarrierVertical = false;
  }
  player1Gameboard.placeShip(player1Gameboard.ships[0], carrierX, carrierY, isCarrierVertical);

  let battleshipX = Number(document.querySelector('#battleship-x').value);
  let battleshipY = Number(document.querySelector('#battleship-y').value);
  let isBattleshipVertical;
  if (document.querySelector('#battleship-vertical').checked) {
    isBattleshipVertical = true;
  } else {
    isBattleshipVertical = false;
  }
  player1Gameboard.placeShip(
    player1Gameboard.ships[1],
    battleshipX,
    battleshipY,
    isBattleshipVertical,
  );

  let destroyerX = Number(document.querySelector('#destroyer-x').value);
  let destroyerY = Number(document.querySelector('#destroyer-y').value);
  let isDestroyerVertical;
  if (document.querySelector('#destroyer-vertical').checked) {
    isDestroyerVertical = true;
  } else {
    isDestroyerVertical = false;
  }
  player1Gameboard.placeShip(
    player1Gameboard.ships[2],
    destroyerX,
    destroyerY,
    isDestroyerVertical,
  );

  let subMarineX = Number(document.querySelector('#sub-marine-x').value);
  let subMarineY = Number(document.querySelector('#sub-marine-y').value);
  let isSubMarineVertical;
  if (document.querySelector('#sub-marine-vertical').checked) {
    isSubMarineVertical = true;
  } else {
    isSubMarineVertical = false;
  }
  player1Gameboard.placeShip(
    player1Gameboard.ships[3],
    subMarineX,
    subMarineY,
    isSubMarineVertical,
  );

  let patrolBoatX = Number(document.querySelector('#patrol-boat-x').value);
  let patrolBoatY = Number(document.querySelector('#patrol-boat-y').value);
  let isPatrolBoatVertical;
  if (document.querySelector('#patrol-boat-vertical').checked) {
    isPatrolBoatVertical = true;
  } else {
    isPatrolBoatVertical = false;
  }
  player1Gameboard.placeShip(
    player1Gameboard.ships[4],
    patrolBoatX,
    patrolBoatY,
    isPatrolBoatVertical,
  );
}




/***/ }),

/***/ "./src/scripts/player.js":
/*!*******************************!*\
  !*** ./src/scripts/player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "player": () => (/* binding */ player)
/* harmony export */ });
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




/***/ }),

/***/ "./src/scripts/ship.js":
/*!*****************************!*\
  !*** ./src/scripts/ship.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ship": () => (/* binding */ ship)
/* harmony export */ });
const ship = function ship(name, length) {
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
    isSunk: () => {
      if (hits.length === length) return true;
      return false;
    },
    hit: (target) => {
      if (hits.includes(target) || target < 0 || target >= length) return;
      hits.push(target);
    },
  };
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scripts/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRW9COzs7Ozs7Ozs7Ozs7Ozs7QUMxSnBCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IsNkJBQTZCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFa0I7Ozs7Ozs7Ozs7Ozs7OztBQzFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVnQjs7Ozs7OztVQ3ZCaEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvZG9tLWludGVyYWN0aW9uLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL2luZGV4LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnYW1lTG9vcCB9IGZyb20gJy4vaW5kZXgnO1xuXG5mdW5jdGlvbiByZW5kZXJHYW1lYm9hcmQoZ2FtZWJvYXJkLCBvd25lcikge1xuICBsZXQgY29udGFpbmVyO1xuICBpZiAob3duZXIgPT09ICdwbGF5ZXIxJykge1xuICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51c2VyLWJvYXJkJyk7XG4gIH0gZWxzZSBpZiAob3duZXIgPT09ICdjb21wdXRlcicpIHtcbiAgICBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tcHV0ZXItYm9hcmQnKTtcbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVib2FyZC5ib2FyZC5sZW5ndGg7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgZ2FtZWJvYXJkLmJvYXJkW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKCdjZWxscycpO1xuICAgICAgZGl2LmRhdGFzZXQueEluZGV4ID0gW2ldO1xuICAgICAgZGl2LmRhdGFzZXQueUluZGV4ID0gW2pdO1xuXG4gICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVuZGVyVXNlclNoaXBzKGdhbWVib2FyZCkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVib2FyZC5ib2FyZC5sZW5ndGg7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgZ2FtZWJvYXJkLmJvYXJkW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICBpZiAoZ2FtZWJvYXJkLmJvYXJkW2ldW2pdKSB7XG4gICAgICAgIGxldCBjdXJyZW50Q2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgXCIudXNlci1ib2FyZCBkaXZbZGF0YS14LWluZGV4PSdcIiArIGkgKyBcIiddXCIgKyBcIltkYXRhLXktaW5kZXg9J1wiICsgaiArIFwiJ11cIixcbiAgICAgICAgKTtcbiAgICAgICAgY3VycmVudENlbGwuY2xhc3NMaXN0LmFkZCgndXNlclNoaXBzJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmNvbnN0IGNvbXB1dGVyQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tcHV0ZXItYm9hcmQnKTtcbmNvbXB1dGVyQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBnYW1lTG9vcCk7XG5cbi8vIENvbnRyb2wgTW9kYWxcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbnRlckNvb3Jkc0J0bicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmctbW9kYWwnKS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xufSk7XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmctbW9kYWwnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xufSk7XG5leHBvcnQgeyByZW5kZXJHYW1lYm9hcmQsIHJlbmRlclVzZXJTaGlwcyB9O1xuIiwiaW1wb3J0IHsgc2hpcCB9IGZyb20gJy4uL3NjcmlwdHMvc2hpcCc7XG5cbmNvbnN0IEdhbWVib2FyZCA9ICgpID0+IHtcbiAgLy8gQ3JlYXRlIGEgMTAgeCAxMCBib2FyZFxuICBjb25zdCB3aWR0aCA9IDEwO1xuICBjb25zdCBoZWlnaHQgPSAxMDtcbiAgbGV0IGJvYXJkID0gbmV3IEFycmF5KHdpZHRoKS5maWxsKG51bGwpLm1hcCgoeCkgPT4gbmV3IEFycmF5KGhlaWdodCkuZmlsbChudWxsKSk7XG4gIGxldCBtaXNzZWRTaG90cyA9IG5ldyBBcnJheSh3aWR0aCkuZmlsbChmYWxzZSkubWFwKCh4KSA9PiBuZXcgQXJyYXkoaGVpZ2h0KS5maWxsKGZhbHNlKSk7XG5cbiAgLy8gUGxhY2Ugc2hpcHNcbiAgY29uc3QgcGxhY2VTaGlwID0gZnVuY3Rpb24gcGxhY2VTaGlwKHNoaXAsIHJvdywgY29sdW1uLCBpc1ZlcnRpY2FsKSB7XG4gICAgaWYgKCFpc1BsYWNlbWVudFBvc3NpYmxlKHNoaXAsIHJvdywgY29sdW1uLCBpc1ZlcnRpY2FsKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgaWYgKGlzVmVydGljYWwpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBib2FyZFtyb3cgKyBpXVtjb2x1bW5dID0gc2hpcDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGJvYXJkW3Jvd11bY29sdW1uICsgaV0gPSBzaGlwO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICAvLyBJbml0aWFsaXplIHRoZSBzaGlwcyB0aGF0IHdpbGwgYmUgbmVlZGVkXG4gIGNvbnN0IHNoaXBzID0gW107XG4gIGNvbnN0IGNhcnJpZXIgPSBuZXcgc2hpcCgnY2FycmllcicsIDUpO1xuICBjb25zdCBiYXR0bGVzaGlwID0gbmV3IHNoaXAoJ2JhdHRsZXNoaXAnLCA0KTtcbiAgY29uc3QgZGVzdHJveWVyID0gbmV3IHNoaXAoJ2Rlc3Ryb3llcicsIDMpO1xuICBjb25zdCBzdWJtYXJpbmUgPSBuZXcgc2hpcCgnc3VibWFyaW5lJywgMyk7XG4gIGNvbnN0IHBhdHJvbEJvYXQgPSBuZXcgc2hpcCgncGF0cm9sQm9hdCcsIDIpO1xuICBzaGlwcy5wdXNoKGNhcnJpZXIsIGJhdHRsZXNoaXAsIGRlc3Ryb3llciwgc3VibWFyaW5lLCBwYXRyb2xCb2F0KTtcblxuICAvLyBSYW5kb21seSBwbGFjZSBzaGlwc1xuICBjb25zdCBwbGFjZVNoaXBzUmFuZG9tbHkgPSBmdW5jdGlvbiBwbGFjZVNoaXBzUmFuZG9tbHkoKSB7XG4gICAgaWYgKCFpc0VtcHR5KCkpIHJldHVybjtcblxuICAgIGxldCBzdWNjZXNmdWxQbGFjZW1lbnRzID0gMDtcblxuICAgIHdoaWxlIChzdWNjZXNmdWxQbGFjZW1lbnRzIDwgNSkge1xuICAgICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgY29uc3QgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgY29uc3QgaXNWZXJ0aWNhbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpID09PSAxID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgICBpZiAocGxhY2VTaGlwKHNoaXBzW3N1Y2Nlc2Z1bFBsYWNlbWVudHNdLCByb3csIGNvbHVtbiwgaXNWZXJ0aWNhbCkpIHN1Y2Nlc2Z1bFBsYWNlbWVudHMrKztcbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gaXNQbGFjZW1lbnRQb3NzaWJsZShzaGlwLCByb3csIGNvbHVtbiwgaXNWZXJ0aWNhbCkge1xuICAgIC8vIElzIGl0IG91dCBvZiB0aGUgZ2FtZWJvYXJkXG4gICAgaWYgKHJvdyA8IDAgfHwgcm93ID4gaGVpZ2h0IC0gMSB8fCBjb2x1bW4gPCAwIHx8IGNvbHVtbiA+IHdpZHRoIC0gMSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgLy8gSWYgc2hpcCBkb2Vzbid0IGZpdCBpbiBnYW1lYm9hcmRcbiAgICBpZiAoaXNWZXJ0aWNhbCkge1xuICAgICAgaWYgKHJvdyArIHNoaXAubGVuZ3RoID4gMTApIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGNvbHVtbiArIHNoaXAubGVuZ3RoID4gMTApIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBBcmUgYW55IG9mIHRoZSBmaWVsZHMgYWxyZWFkeSB0YWtlblxuICAgIGlmIChpc1ZlcnRpY2FsKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGJvYXJkW3JvdyArIGldW2NvbHVtbl0pIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChib2FyZFtyb3ddW2NvbHVtbiArIGldKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQXJlIGFueSBvZiB0aGUgbmVpZ2hib3VyIGZpZWxkcyBhbHJlYWR5IHRha2VuXG4gICAgaWYgKGlzVmVydGljYWwpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBmb3IgKGxldCB4ID0gLTE7IHggPD0gMTsgeCsrKSB7XG4gICAgICAgICAgZm9yIChsZXQgeSA9IC0xOyB5IDw9IDE7IHkrKykge1xuICAgICAgICAgICAgaWYgKHJvdyArIHggKyBpIDwgMCB8fCByb3cgKyB4ICsgaSA+PSAxMCB8fCBjb2x1bW4gKyB5IDwgMCB8fCBjb2x1bW4gKyB5ID49IDEwKVxuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGlmIChib2FyZFtyb3cgKyB4ICsgaV1bY29sdW1uICsgeV0pIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IHggPSAtMTsgeCA8PSAxOyB4KyspIHtcbiAgICAgICAgICBmb3IgKGxldCB5ID0gLTE7IHkgPD0gMTsgeSsrKSB7XG4gICAgICAgICAgICBpZiAocm93ICsgeCA8IDAgfHwgcm93ICsgeCA+PSAxMCB8fCBjb2x1bW4gKyB5ICsgaSA8IDAgfHwgY29sdW1uICsgeSArIGkgPj0gMTApXG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYgKGJvYXJkW3JvdyArIHhdW2NvbHVtbiArIHkgKyBpXSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzRW1wdHkoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgaWYgKGJvYXJkW2ldW2pdICE9PSBudWxsKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RW1wdHlGaWVsZHNBbW91bnQoKSB7XG4gICAgbGV0IHRvdGFsID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICBpZiAoYm9hcmRbaV1bal0gPT09IG51bGwpIHRvdGFsKys7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0b3RhbDtcbiAgfVxuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSBmdW5jdGlvbiByZWNlaXZlQXR0YWNrKHJvdywgY29sdW1uKSB7XG4gICAgaWYgKHJvdyA8IDAgfHwgcm93ID49IDEwIHx8IGNvbHVtbiA8IDAgfHwgY29sdW1uID49IDEwKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKGJvYXJkW3Jvd11bY29sdW1uXSkge1xuICAgICAgbGV0IGhpdEluZGV4ID0gMDtcbiAgICAgIC8vIElmIHNoaXAgaXMgdmVydGljYWxcbiAgICAgIGlmIChjb2x1bW4gPiAwICYmIGJvYXJkW3Jvd11bY29sdW1uIC0gMV0pIHtcbiAgICAgICAgbGV0IGkgPSAxO1xuICAgICAgICB3aGlsZSAoY29sdW1uIC0gaSA+PSAwICYmIGJvYXJkW3Jvd11bY29sdW1uIC0gaV0pIHtcbiAgICAgICAgICBoaXRJbmRleCsrO1xuICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gSWYgc2hpcCBpcyBob3Jpem9udGFsXG4gICAgICBlbHNlIGlmIChyb3cgPiAwICYmIGJvYXJkW3JvdyAtIDFdW2NvbHVtbl0pIHtcbiAgICAgICAgbGV0IGkgPSAxO1xuICAgICAgICB3aGlsZSAocm93IC0gaSA+PSAwICYmIGJvYXJkW3JvdyAtIGldW2NvbHVtbl0pIHtcbiAgICAgICAgICBoaXRJbmRleCsrO1xuICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYm9hcmRbcm93XVtjb2x1bW5dLmhpdChoaXRJbmRleCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWlzc2VkU2hvdHNbcm93XVtjb2x1bW5dID0gdHJ1ZTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gaXNHYW1lT3ZlcigpIHtcbiAgICBsZXQgYXJlU2hpcHNPbkJvYXJkID0gZmFsc2U7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgaWYgKGJvYXJkW2ldW2pdKSB7XG4gICAgICAgICAgYXJlU2hpcHNPbkJvYXJkID0gdHJ1ZTtcbiAgICAgICAgICBpZiAoIWJvYXJkW2ldW2pdLmlzU3VuaygpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcmVTaGlwc09uQm9hcmQgPyB0cnVlIDogZmFsc2U7XG4gIH1cblxuICAvLyBUaGUgaW50ZXJmYWNlIGZ1bmN0aW9ucyBhbmQgcHJvcGVydGllcyB0byBiZSByZXR1cm5lZFxuICByZXR1cm4ge1xuICAgIGJvYXJkLFxuICAgIHBsYWNlU2hpcCxcbiAgICBwbGFjZVNoaXBzUmFuZG9tbHksXG4gICAgZ2V0RW1wdHlGaWVsZHNBbW91bnQsXG4gICAgaXNQbGFjZW1lbnRQb3NzaWJsZSxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIG1pc3NlZFNob3RzLFxuICAgIGlzR2FtZU92ZXIsXG4gICAgc2hpcHMsXG4gIH07XG59O1xuXG5leHBvcnQgeyBHYW1lYm9hcmQgfTtcbiIsImltcG9ydCB7IHNoaXAgfSBmcm9tICcuL3NoaXAnO1xuaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSAnLi9nYW1lYm9hcmQnO1xuaW1wb3J0IHsgcGxheWVyIH0gZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IHsgcmVuZGVyR2FtZWJvYXJkLCByZW5kZXJVc2VyU2hpcHMgfSBmcm9tICcuL2RvbS1pbnRlcmFjdGlvbic7XG5cbmNvbnN0IHBsYXllcjEgPSBwbGF5ZXIoJ1VzZXInKTtcbmNvbnN0IGNvbXB1dGVyID0gcGxheWVyKCdDb21wdXRlcicpO1xuY29uc3QgcGxheWVyMUdhbWVib2FyZCA9IEdhbWVib2FyZCgpO1xuY29uc3QgY29tcHV0ZXJHYW1lYm9hcmQgPSBHYW1lYm9hcmQoKTtcbmxldCBjb21wQXR0YWNrSW5kZXggPSAwO1xuXG4vLyBTdGFydCBHYW1lXG5jb25zdCBzdGFydEdhbWUgPSBmdW5jdGlvbiBzdGFydEdhbWUoKSB7XG4gIGNvbXB1dGVyR2FtZWJvYXJkLnBsYWNlU2hpcHNSYW5kb21seSgpO1xuICByZW5kZXJHYW1lYm9hcmQocGxheWVyMUdhbWVib2FyZCwgJ3BsYXllcjEnKTtcbiAgcmVuZGVyR2FtZWJvYXJkKGNvbXB1dGVyR2FtZWJvYXJkLCAnY29tcHV0ZXInKTtcbiAgcmVuZGVyVXNlclNoaXBzKHBsYXllcjFHYW1lYm9hcmQpO1xufTtcblxuZnVuY3Rpb24gZ2FtZUxvb3AoZSkge1xuICBpZiAoZS50YXJnZXQuY2xhc3NOYW1lICE9PSAnY2VsbHMnKSByZXR1cm47XG4gIGlmICghKHBsYXllcjFHYW1lYm9hcmQuaXNHYW1lT3ZlcigpIHx8IGNvbXB1dGVyR2FtZWJvYXJkLmlzR2FtZU92ZXIoKSkpIHtcbiAgICBsZXQgcm93ID0gZS5wYXRoWzBdLmRhdGFzZXQueEluZGV4O1xuICAgIGxldCBjb2x1bW4gPSBlLnBhdGhbMF0uZGF0YXNldC55SW5kZXg7XG4gICAgcGxheWVyMS5hdHRhY2socm93LCBjb2x1bW4sIGNvbXB1dGVyR2FtZWJvYXJkKTtcbiAgICBpZiAoY29tcHV0ZXJHYW1lYm9hcmQubWlzc2VkU2hvdHNbcm93XVtjb2x1bW5dKSB7XG4gICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdtaXNzJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAgIH1cbiAgICBjaGVja1dpbm5lcigpO1xuICAgIGNvbXB1dGVyQXR0YWNrKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY29tcHV0ZXJBdHRhY2soKSB7XG4gIGlmICghKHBsYXllcjFHYW1lYm9hcmQuaXNHYW1lT3ZlcigpIHx8IGNvbXB1dGVyR2FtZWJvYXJkLmlzR2FtZU92ZXIoKSkpIHtcbiAgICBjb21wdXRlci5yYW5kb21BdHRhY2socGxheWVyMUdhbWVib2FyZCk7XG4gICAgbGV0IHJvdyA9IGNvbXB1dGVyLnBvc2l0aW9uc1ByZXZIaXRbY29tcEF0dGFja0luZGV4XVswXTtcbiAgICBsZXQgY29sdW1uID0gY29tcHV0ZXIucG9zaXRpb25zUHJldkhpdFtjb21wQXR0YWNrSW5kZXhdWzFdO1xuICAgIGxldCB0YXJnZXRDZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIFwiLnVzZXItYm9hcmQgZGl2W2RhdGEteC1pbmRleD0nXCIgKyByb3cgKyBcIiddXCIgKyBcIltkYXRhLXktaW5kZXg9J1wiICsgY29sdW1uICsgXCInXVwiLFxuICAgICk7XG4gICAgaWYgKHBsYXllcjFHYW1lYm9hcmQubWlzc2VkU2hvdHNbcm93XVtjb2x1bW5dKSB7XG4gICAgICB0YXJnZXRDZWxsLmNsYXNzTGlzdC5hZGQoJ21pc3MnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGFyZ2V0Q2VsbC5jbGFzc0xpc3QucmVtb3ZlKCd1c2VyU2hpcHMnKTtcbiAgICAgIHRhcmdldENlbGwuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG4gICAgfVxuICAgIGNvbXBBdHRhY2tJbmRleCsrO1xuICAgIGNoZWNrV2lubmVyKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2hlY2tXaW5uZXIoKSB7XG4gIGlmIChwbGF5ZXIxR2FtZWJvYXJkLmlzR2FtZU92ZXIoKSkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZXNzYWdlcycpLnRleHRDb250ZW50ID0gJ1RoZSBDb21wdXRlciBXb24nO1xuICB9IGVsc2UgaWYgKGNvbXB1dGVyR2FtZWJvYXJkLmlzR2FtZU92ZXIoKSkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZXNzYWdlcycpLnRleHRDb250ZW50ID0gJ1lvdSB3b24hJztcbiAgfVxufVxuXG4vLyBQbGFjZSBTaGlwc1xuLy8gUmFuZG9tIHBsYWNlbWVudCBvZiBzaGlwc1xuY29uc3Qgc2hpcFBsYWNlbWVudERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaGlwLXBsYWNlbWVudCcpO1xuY29uc3QgcmFuZG9tU2hpcHNCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmFuZG9tU2hpcHNCdG4nKTtcbnJhbmRvbVNoaXBzQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBwbGF5ZXIxR2FtZWJvYXJkLnBsYWNlU2hpcHNSYW5kb21seSgpO1xuICBzdGFydEdhbWUoKTtcbiAgc2hpcFBsYWNlbWVudERpdi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xufSk7XG5cbi8vIFBsYWNlbWVudCBvZiBzaGlwcyBhZnRlciBDYXB0dXJpbmcgb2YgQ29vcmRzXG5jb25zdCBtYW51YWxTaGlwc0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGFjZS1zaGlwcycpO1xubWFudWFsU2hpcHNCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIHBsYWNlU2hpcHNXaXRoQ29vcmRzKCk7XG4gIHN0YXJ0R2FtZSgpO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2hpcHMtY29vcmRzLWZvcm0nKS5yZXNldCgpO1xuICBzaGlwUGxhY2VtZW50RGl2LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iZy1tb2RhbCcpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG59KTtcblxuZnVuY3Rpb24gcGxhY2VTaGlwc1dpdGhDb29yZHMoKSB7XG4gIGxldCBjYXJyaWVyWCA9IE51bWJlcihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2Fycmllci14JykudmFsdWUpO1xuICBsZXQgY2FycmllclkgPSBOdW1iZXIoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhcnJpZXIteScpLnZhbHVlKTtcbiAgbGV0IGlzQ2FycmllclZlcnRpY2FsO1xuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhcnJpZXItdmVydGljYWwnKS5jaGVja2VkKSB7XG4gICAgaXNDYXJyaWVyVmVydGljYWwgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIGlzQ2FycmllclZlcnRpY2FsID0gZmFsc2U7XG4gIH1cbiAgcGxheWVyMUdhbWVib2FyZC5wbGFjZVNoaXAocGxheWVyMUdhbWVib2FyZC5zaGlwc1swXSwgY2FycmllclgsIGNhcnJpZXJZLCBpc0NhcnJpZXJWZXJ0aWNhbCk7XG5cbiAgbGV0IGJhdHRsZXNoaXBYID0gTnVtYmVyKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNiYXR0bGVzaGlwLXgnKS52YWx1ZSk7XG4gIGxldCBiYXR0bGVzaGlwWSA9IE51bWJlcihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYmF0dGxlc2hpcC15JykudmFsdWUpO1xuICBsZXQgaXNCYXR0bGVzaGlwVmVydGljYWw7XG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYmF0dGxlc2hpcC12ZXJ0aWNhbCcpLmNoZWNrZWQpIHtcbiAgICBpc0JhdHRsZXNoaXBWZXJ0aWNhbCA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgaXNCYXR0bGVzaGlwVmVydGljYWwgPSBmYWxzZTtcbiAgfVxuICBwbGF5ZXIxR2FtZWJvYXJkLnBsYWNlU2hpcChcbiAgICBwbGF5ZXIxR2FtZWJvYXJkLnNoaXBzWzFdLFxuICAgIGJhdHRsZXNoaXBYLFxuICAgIGJhdHRsZXNoaXBZLFxuICAgIGlzQmF0dGxlc2hpcFZlcnRpY2FsLFxuICApO1xuXG4gIGxldCBkZXN0cm95ZXJYID0gTnVtYmVyKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXN0cm95ZXIteCcpLnZhbHVlKTtcbiAgbGV0IGRlc3Ryb3llclkgPSBOdW1iZXIoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Rlc3Ryb3llci15JykudmFsdWUpO1xuICBsZXQgaXNEZXN0cm95ZXJWZXJ0aWNhbDtcbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXN0cm95ZXItdmVydGljYWwnKS5jaGVja2VkKSB7XG4gICAgaXNEZXN0cm95ZXJWZXJ0aWNhbCA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgaXNEZXN0cm95ZXJWZXJ0aWNhbCA9IGZhbHNlO1xuICB9XG4gIHBsYXllcjFHYW1lYm9hcmQucGxhY2VTaGlwKFxuICAgIHBsYXllcjFHYW1lYm9hcmQuc2hpcHNbMl0sXG4gICAgZGVzdHJveWVyWCxcbiAgICBkZXN0cm95ZXJZLFxuICAgIGlzRGVzdHJveWVyVmVydGljYWwsXG4gICk7XG5cbiAgbGV0IHN1Yk1hcmluZVggPSBOdW1iZXIoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N1Yi1tYXJpbmUteCcpLnZhbHVlKTtcbiAgbGV0IHN1Yk1hcmluZVkgPSBOdW1iZXIoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N1Yi1tYXJpbmUteScpLnZhbHVlKTtcbiAgbGV0IGlzU3ViTWFyaW5lVmVydGljYWw7XG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3ViLW1hcmluZS12ZXJ0aWNhbCcpLmNoZWNrZWQpIHtcbiAgICBpc1N1Yk1hcmluZVZlcnRpY2FsID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBpc1N1Yk1hcmluZVZlcnRpY2FsID0gZmFsc2U7XG4gIH1cbiAgcGxheWVyMUdhbWVib2FyZC5wbGFjZVNoaXAoXG4gICAgcGxheWVyMUdhbWVib2FyZC5zaGlwc1szXSxcbiAgICBzdWJNYXJpbmVYLFxuICAgIHN1Yk1hcmluZVksXG4gICAgaXNTdWJNYXJpbmVWZXJ0aWNhbCxcbiAgKTtcblxuICBsZXQgcGF0cm9sQm9hdFggPSBOdW1iZXIoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BhdHJvbC1ib2F0LXgnKS52YWx1ZSk7XG4gIGxldCBwYXRyb2xCb2F0WSA9IE51bWJlcihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGF0cm9sLWJvYXQteScpLnZhbHVlKTtcbiAgbGV0IGlzUGF0cm9sQm9hdFZlcnRpY2FsO1xuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BhdHJvbC1ib2F0LXZlcnRpY2FsJykuY2hlY2tlZCkge1xuICAgIGlzUGF0cm9sQm9hdFZlcnRpY2FsID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBpc1BhdHJvbEJvYXRWZXJ0aWNhbCA9IGZhbHNlO1xuICB9XG4gIHBsYXllcjFHYW1lYm9hcmQucGxhY2VTaGlwKFxuICAgIHBsYXllcjFHYW1lYm9hcmQuc2hpcHNbNF0sXG4gICAgcGF0cm9sQm9hdFgsXG4gICAgcGF0cm9sQm9hdFksXG4gICAgaXNQYXRyb2xCb2F0VmVydGljYWwsXG4gICk7XG59XG5cbmV4cG9ydCB7IGdhbWVMb29wIH07XG4iLCJjb25zdCBwbGF5ZXIgPSBmdW5jdGlvbiBwbGF5ZXIobmFtZSkge1xuICBjb25zdCBwb3NpdGlvbnNQcmV2SGl0ID0gW107XG5cbiAgY29uc3QgYXR0YWNrID0gZnVuY3Rpb24gYXR0YWNrKHJvdywgY29sdW1uLCBnYW1lYm9hcmQpIHtcbiAgICBpZiAoaGFzUG9zaXRpb25CZWVuUHJldkhpdChyb3csIGNvbHVtbikpIHJldHVybjtcbiAgICBwb3NpdGlvbnNQcmV2SGl0LnB1c2goW3JvdywgY29sdW1uXSk7XG4gICAgZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2socm93LCBjb2x1bW4pO1xuICB9O1xuXG4gIGNvbnN0IHJhbmRvbUF0dGFjayA9IGZ1bmN0aW9uIHJhbmRvbUF0dGFjayhnYW1lYm9hcmQpIHtcbiAgICBpZiAocG9zaXRpb25zUHJldkhpdC5sZW5ndGggPT09IDEwMCkgcmV0dXJuO1xuXG4gICAgbGV0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBsZXQgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuXG4gICAgLy8gSWYgcG9zaXRpb24gaGFzIGJlZW4gaGl0LCBkbyB0aGUgcmFuZG9taXphdGlvbiBhZ2FpblxuICAgIHdoaWxlIChoYXNQb3NpdGlvbkJlZW5QcmV2SGl0KHJvdywgY29sdW1uKSkge1xuICAgICAgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIH1cblxuICAgIHBvc2l0aW9uc1ByZXZIaXQucHVzaChbcm93LCBjb2x1bW5dKTtcbiAgICBnYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNvbHVtbik7XG4gIH07XG5cbiAgZnVuY3Rpb24gaGFzUG9zaXRpb25CZWVuUHJldkhpdChyb3csIGNvbHVtbikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9zaXRpb25zUHJldkhpdC5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHBvc2l0aW9uc1ByZXZIaXRbaV1bMF0gPT09IHJvdyAmJiBwb3NpdGlvbnNQcmV2SGl0W2ldWzFdID09PSBjb2x1bW4pIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbmFtZSxcbiAgICBwb3NpdGlvbnNQcmV2SGl0LFxuICAgIGF0dGFjayxcbiAgICByYW5kb21BdHRhY2ssXG4gIH07XG59O1xuXG5leHBvcnQgeyBwbGF5ZXIgfTtcbiIsImNvbnN0IHNoaXAgPSBmdW5jdGlvbiBzaGlwKG5hbWUsIGxlbmd0aCkge1xuICBsZXQgaGl0cyA9IFtdO1xuICByZXR1cm4ge1xuICAgIGdldCBuYW1lKCkge1xuICAgICAgcmV0dXJuIG5hbWU7XG4gICAgfSxcbiAgICBnZXQgbGVuZ3RoKCkge1xuICAgICAgcmV0dXJuIGxlbmd0aDtcbiAgICB9LFxuICAgIGdldCBoaXRzKCkge1xuICAgICAgcmV0dXJuIFsuLi5oaXRzXTtcbiAgICB9LFxuICAgIGlzU3VuazogKCkgPT4ge1xuICAgICAgaWYgKGhpdHMubGVuZ3RoID09PSBsZW5ndGgpIHJldHVybiB0cnVlO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG4gICAgaGl0OiAodGFyZ2V0KSA9PiB7XG4gICAgICBpZiAoaGl0cy5pbmNsdWRlcyh0YXJnZXQpIHx8IHRhcmdldCA8IDAgfHwgdGFyZ2V0ID49IGxlbmd0aCkgcmV0dXJuO1xuICAgICAgaGl0cy5wdXNoKHRhcmdldCk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCB7IHNoaXAgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvc2NyaXB0cy9pbmRleC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==