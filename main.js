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
/* harmony export */   "renderGameboard": () => (/* binding */ renderGameboard)
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

const computerBoard = document.querySelector('.computer-board');
computerBoard.addEventListener('click', _index__WEBPACK_IMPORTED_MODULE_0__.gameLoop);




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
player1Gameboard.placeShipsRandomly();
computerGameboard.placeShipsRandomly();
(0,_dom_interaction__WEBPACK_IMPORTED_MODULE_3__.renderGameboard)(player1Gameboard, 'player1');
(0,_dom_interaction__WEBPACK_IMPORTED_MODULE_3__.renderGameboard)(computerGameboard, 'computer');

let compAttackIndex = 0;
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
      targetCell.classList.add('hit');
    }
    compAttackIndex++;
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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b0JBQW9CLDZCQUE2QjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWtCOzs7Ozs7Ozs7Ozs7Ozs7QUMxQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFZ0I7Ozs7Ozs7VUN2QmhCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL2RvbS1pbnRlcmFjdGlvbi5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2FtZUxvb3AgfSBmcm9tICcuL2luZGV4JztcblxuZnVuY3Rpb24gcmVuZGVyR2FtZWJvYXJkKGdhbWVib2FyZCwgb3duZXIpIHtcbiAgbGV0IGNvbnRhaW5lcjtcbiAgaWYgKG93bmVyID09PSAncGxheWVyMScpIHtcbiAgICBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudXNlci1ib2FyZCcpO1xuICB9IGVsc2UgaWYgKG93bmVyID09PSAnY29tcHV0ZXInKSB7XG4gICAgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbXB1dGVyLWJvYXJkJyk7XG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lYm9hcmQuYm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGdhbWVib2FyZC5ib2FyZFtpXS5sZW5ndGg7IGorKykge1xuICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBkaXYuY2xhc3NMaXN0LmFkZCgnY2VsbHMnKTtcbiAgICAgIGRpdi5kYXRhc2V0LnhJbmRleCA9IFtpXTtcbiAgICAgIGRpdi5kYXRhc2V0LnlJbmRleCA9IFtqXTtcblxuICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7XG4gICAgfVxuICB9XG59XG5cbmNvbnN0IGNvbXB1dGVyQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tcHV0ZXItYm9hcmQnKTtcbmNvbXB1dGVyQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBnYW1lTG9vcCk7XG5cbmV4cG9ydCB7IHJlbmRlckdhbWVib2FyZCB9O1xuIiwiaW1wb3J0IHsgc2hpcCB9IGZyb20gJy4uL3NjcmlwdHMvc2hpcCc7XG5cbmNvbnN0IEdhbWVib2FyZCA9ICgpID0+IHtcbiAgLy8gQ3JlYXRlIGEgMTAgeCAxMCBib2FyZFxuICBjb25zdCB3aWR0aCA9IDEwO1xuICBjb25zdCBoZWlnaHQgPSAxMDtcbiAgbGV0IGJvYXJkID0gbmV3IEFycmF5KHdpZHRoKS5maWxsKG51bGwpLm1hcCgoeCkgPT4gbmV3IEFycmF5KGhlaWdodCkuZmlsbChudWxsKSk7XG4gIGxldCBtaXNzZWRTaG90cyA9IG5ldyBBcnJheSh3aWR0aCkuZmlsbChmYWxzZSkubWFwKCh4KSA9PiBuZXcgQXJyYXkoaGVpZ2h0KS5maWxsKGZhbHNlKSk7XG5cbiAgLy8gUGxhY2Ugc2hpcHNcbiAgY29uc3QgcGxhY2VTaGlwID0gZnVuY3Rpb24gcGxhY2VTaGlwKHNoaXAsIHJvdywgY29sdW1uLCBpc1ZlcnRpY2FsKSB7XG4gICAgaWYgKCFpc1BsYWNlbWVudFBvc3NpYmxlKHNoaXAsIHJvdywgY29sdW1uLCBpc1ZlcnRpY2FsKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgaWYgKGlzVmVydGljYWwpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBib2FyZFtyb3cgKyBpXVtjb2x1bW5dID0gc2hpcDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGJvYXJkW3Jvd11bY29sdW1uICsgaV0gPSBzaGlwO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICAvLyBJbml0aWFsaXplIHRoZSBzaGlwcyB0aGF0IHdpbGwgYmUgbmVlZGVkXG4gIGNvbnN0IHNoaXBzID0gW107XG4gIGNvbnN0IGNhcnJpZXIgPSBuZXcgc2hpcCgnY2FycmllcicsIDUpO1xuICBjb25zdCBiYXR0bGVzaGlwID0gbmV3IHNoaXAoJ2JhdHRsZXNoaXAnLCA0KTtcbiAgY29uc3QgZGVzdHJveWVyID0gbmV3IHNoaXAoJ2Rlc3Ryb3llcicsIDMpO1xuICBjb25zdCBzdWJtYXJpbmUgPSBuZXcgc2hpcCgnc3VibWFyaW5lJywgMyk7XG4gIGNvbnN0IHBhdHJvbEJvYXQgPSBuZXcgc2hpcCgncGF0cm9sQm9hdCcsIDIpO1xuICBzaGlwcy5wdXNoKGNhcnJpZXIsIGJhdHRsZXNoaXAsIGRlc3Ryb3llciwgc3VibWFyaW5lLCBwYXRyb2xCb2F0KTtcblxuICAvLyBSYW5kb21seSBwbGFjZSBzaGlwc1xuICBjb25zdCBwbGFjZVNoaXBzUmFuZG9tbHkgPSBmdW5jdGlvbiBwbGFjZVNoaXBzUmFuZG9tbHkoKSB7XG4gICAgaWYgKCFpc0VtcHR5KCkpIHJldHVybjtcblxuICAgIGxldCBzdWNjZXNmdWxQbGFjZW1lbnRzID0gMDtcblxuICAgIHdoaWxlIChzdWNjZXNmdWxQbGFjZW1lbnRzIDwgNSkge1xuICAgICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgY29uc3QgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgY29uc3QgaXNWZXJ0aWNhbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpID09PSAxID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgICBpZiAocGxhY2VTaGlwKHNoaXBzW3N1Y2Nlc2Z1bFBsYWNlbWVudHNdLCByb3csIGNvbHVtbiwgaXNWZXJ0aWNhbCkpIHN1Y2Nlc2Z1bFBsYWNlbWVudHMrKztcbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gaXNQbGFjZW1lbnRQb3NzaWJsZShzaGlwLCByb3csIGNvbHVtbiwgaXNWZXJ0aWNhbCkge1xuICAgIC8vIElzIGl0IG91dCBvZiB0aGUgZ2FtZWJvYXJkXG4gICAgaWYgKHJvdyA8IDAgfHwgcm93ID4gaGVpZ2h0IC0gMSB8fCBjb2x1bW4gPCAwIHx8IGNvbHVtbiA+IHdpZHRoIC0gMSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgLy8gSWYgc2hpcCBkb2Vzbid0IGZpdCBpbiBnYW1lYm9hcmRcbiAgICBpZiAoaXNWZXJ0aWNhbCkge1xuICAgICAgaWYgKHJvdyArIHNoaXAubGVuZ3RoID4gMTApIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGNvbHVtbiArIHNoaXAubGVuZ3RoID4gMTApIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBBcmUgYW55IG9mIHRoZSBmaWVsZHMgYWxyZWFkeSB0YWtlblxuICAgIGlmIChpc1ZlcnRpY2FsKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGJvYXJkW3JvdyArIGldW2NvbHVtbl0pIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChib2FyZFtyb3ddW2NvbHVtbiArIGldKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQXJlIGFueSBvZiB0aGUgbmVpZ2hib3VyIGZpZWxkcyBhbHJlYWR5IHRha2VuXG4gICAgaWYgKGlzVmVydGljYWwpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBmb3IgKGxldCB4ID0gLTE7IHggPD0gMTsgeCsrKSB7XG4gICAgICAgICAgZm9yIChsZXQgeSA9IC0xOyB5IDw9IDE7IHkrKykge1xuICAgICAgICAgICAgaWYgKHJvdyArIHggKyBpIDwgMCB8fCByb3cgKyB4ICsgaSA+PSAxMCB8fCBjb2x1bW4gKyB5IDwgMCB8fCBjb2x1bW4gKyB5ID49IDEwKVxuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGlmIChib2FyZFtyb3cgKyB4ICsgaV1bY29sdW1uICsgeV0pIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IHggPSAtMTsgeCA8PSAxOyB4KyspIHtcbiAgICAgICAgICBmb3IgKGxldCB5ID0gLTE7IHkgPD0gMTsgeSsrKSB7XG4gICAgICAgICAgICBpZiAocm93ICsgeCA8IDAgfHwgcm93ICsgeCA+PSAxMCB8fCBjb2x1bW4gKyB5ICsgaSA8IDAgfHwgY29sdW1uICsgeSArIGkgPj0gMTApXG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYgKGJvYXJkW3JvdyArIHhdW2NvbHVtbiArIHkgKyBpXSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzRW1wdHkoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgaWYgKGJvYXJkW2ldW2pdICE9PSBudWxsKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RW1wdHlGaWVsZHNBbW91bnQoKSB7XG4gICAgbGV0IHRvdGFsID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICBpZiAoYm9hcmRbaV1bal0gPT09IG51bGwpIHRvdGFsKys7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0b3RhbDtcbiAgfVxuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSBmdW5jdGlvbiByZWNlaXZlQXR0YWNrKHJvdywgY29sdW1uKSB7XG4gICAgaWYgKHJvdyA8IDAgfHwgcm93ID49IDEwIHx8IGNvbHVtbiA8IDAgfHwgY29sdW1uID49IDEwKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKGJvYXJkW3Jvd11bY29sdW1uXSkge1xuICAgICAgbGV0IGhpdEluZGV4ID0gMDtcbiAgICAgIC8vIElmIHNoaXAgaXMgdmVydGljYWxcbiAgICAgIGlmIChjb2x1bW4gPiAwICYmIGJvYXJkW3Jvd11bY29sdW1uIC0gMV0pIHtcbiAgICAgICAgbGV0IGkgPSAxO1xuICAgICAgICB3aGlsZSAoY29sdW1uIC0gaSA+PSAwICYmIGJvYXJkW3Jvd11bY29sdW1uIC0gaV0pIHtcbiAgICAgICAgICBoaXRJbmRleCsrO1xuICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gSWYgc2hpcCBpcyBob3Jpem9udGFsXG4gICAgICBlbHNlIGlmIChyb3cgPiAwICYmIGJvYXJkW3JvdyAtIDFdW2NvbHVtbl0pIHtcbiAgICAgICAgbGV0IGkgPSAxO1xuICAgICAgICB3aGlsZSAocm93IC0gaSA+PSAwICYmIGJvYXJkW3JvdyAtIGldW2NvbHVtbl0pIHtcbiAgICAgICAgICBoaXRJbmRleCsrO1xuICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYm9hcmRbcm93XVtjb2x1bW5dLmhpdChoaXRJbmRleCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWlzc2VkU2hvdHNbcm93XVtjb2x1bW5dID0gdHJ1ZTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gaXNHYW1lT3ZlcigpIHtcbiAgICBsZXQgYXJlU2hpcHNPbkJvYXJkID0gZmFsc2U7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgaWYgKGJvYXJkW2ldW2pdKSB7XG4gICAgICAgICAgYXJlU2hpcHNPbkJvYXJkID0gdHJ1ZTtcbiAgICAgICAgICBpZiAoIWJvYXJkW2ldW2pdLmlzU3VuaygpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcmVTaGlwc09uQm9hcmQgPyB0cnVlIDogZmFsc2U7XG4gIH1cblxuICAvLyBUaGUgaW50ZXJmYWNlIGZ1bmN0aW9ucyBhbmQgcHJvcGVydGllcyB0byBiZSByZXR1cm5lZFxuICByZXR1cm4ge1xuICAgIGJvYXJkLFxuICAgIHBsYWNlU2hpcCxcbiAgICBwbGFjZVNoaXBzUmFuZG9tbHksXG4gICAgZ2V0RW1wdHlGaWVsZHNBbW91bnQsXG4gICAgaXNQbGFjZW1lbnRQb3NzaWJsZSxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIG1pc3NlZFNob3RzLFxuICAgIGlzR2FtZU92ZXIsXG4gIH07XG59O1xuXG5leHBvcnQgeyBHYW1lYm9hcmQgfTtcbiIsImltcG9ydCB7IHNoaXAgfSBmcm9tICcuL3NoaXAnO1xuaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSAnLi9nYW1lYm9hcmQnO1xuaW1wb3J0IHsgcGxheWVyIH0gZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IHsgcmVuZGVyR2FtZWJvYXJkIH0gZnJvbSAnLi9kb20taW50ZXJhY3Rpb24nO1xuXG5jb25zdCBwbGF5ZXIxID0gcGxheWVyKCdVc2VyJyk7XG5jb25zdCBjb21wdXRlciA9IHBsYXllcignQ29tcHV0ZXInKTtcbmNvbnN0IHBsYXllcjFHYW1lYm9hcmQgPSBHYW1lYm9hcmQoKTtcbmNvbnN0IGNvbXB1dGVyR2FtZWJvYXJkID0gR2FtZWJvYXJkKCk7XG5wbGF5ZXIxR2FtZWJvYXJkLnBsYWNlU2hpcHNSYW5kb21seSgpO1xuY29tcHV0ZXJHYW1lYm9hcmQucGxhY2VTaGlwc1JhbmRvbWx5KCk7XG5yZW5kZXJHYW1lYm9hcmQocGxheWVyMUdhbWVib2FyZCwgJ3BsYXllcjEnKTtcbnJlbmRlckdhbWVib2FyZChjb21wdXRlckdhbWVib2FyZCwgJ2NvbXB1dGVyJyk7XG5cbmxldCBjb21wQXR0YWNrSW5kZXggPSAwO1xuZnVuY3Rpb24gZ2FtZUxvb3AoZSkge1xuICBpZiAoZS50YXJnZXQuY2xhc3NOYW1lICE9PSAnY2VsbHMnKSByZXR1cm47XG4gIGlmICghKHBsYXllcjFHYW1lYm9hcmQuaXNHYW1lT3ZlcigpIHx8IGNvbXB1dGVyR2FtZWJvYXJkLmlzR2FtZU92ZXIoKSkpIHtcbiAgICBsZXQgcm93ID0gZS5wYXRoWzBdLmRhdGFzZXQueEluZGV4O1xuICAgIGxldCBjb2x1bW4gPSBlLnBhdGhbMF0uZGF0YXNldC55SW5kZXg7XG4gICAgcGxheWVyMS5hdHRhY2socm93LCBjb2x1bW4sIGNvbXB1dGVyR2FtZWJvYXJkKTtcbiAgICBpZiAoY29tcHV0ZXJHYW1lYm9hcmQubWlzc2VkU2hvdHNbcm93XVtjb2x1bW5dKSB7XG4gICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdtaXNzJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAgIH1cbiAgICBjb21wdXRlckF0dGFjaygpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNvbXB1dGVyQXR0YWNrKCkge1xuICBpZiAoIShwbGF5ZXIxR2FtZWJvYXJkLmlzR2FtZU92ZXIoKSB8fCBjb21wdXRlckdhbWVib2FyZC5pc0dhbWVPdmVyKCkpKSB7XG4gICAgY29tcHV0ZXIucmFuZG9tQXR0YWNrKHBsYXllcjFHYW1lYm9hcmQpO1xuICAgIGxldCByb3cgPSBjb21wdXRlci5wb3NpdGlvbnNQcmV2SGl0W2NvbXBBdHRhY2tJbmRleF1bMF07XG4gICAgbGV0IGNvbHVtbiA9IGNvbXB1dGVyLnBvc2l0aW9uc1ByZXZIaXRbY29tcEF0dGFja0luZGV4XVsxXTtcbiAgICBsZXQgdGFyZ2V0Q2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBcIi51c2VyLWJvYXJkIGRpdltkYXRhLXgtaW5kZXg9J1wiICsgcm93ICsgXCInXVwiICsgXCJbZGF0YS15LWluZGV4PSdcIiArIGNvbHVtbiArIFwiJ11cIixcbiAgICApO1xuICAgIGlmIChwbGF5ZXIxR2FtZWJvYXJkLm1pc3NlZFNob3RzW3Jvd11bY29sdW1uXSkge1xuICAgICAgdGFyZ2V0Q2VsbC5jbGFzc0xpc3QuYWRkKCdtaXNzJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhcmdldENlbGwuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG4gICAgfVxuICAgIGNvbXBBdHRhY2tJbmRleCsrO1xuICB9XG59XG5cbmV4cG9ydCB7IGdhbWVMb29wIH07XG4iLCJjb25zdCBwbGF5ZXIgPSBmdW5jdGlvbiBwbGF5ZXIobmFtZSkge1xuICBjb25zdCBwb3NpdGlvbnNQcmV2SGl0ID0gW107XG5cbiAgY29uc3QgYXR0YWNrID0gZnVuY3Rpb24gYXR0YWNrKHJvdywgY29sdW1uLCBnYW1lYm9hcmQpIHtcbiAgICBpZiAoaGFzUG9zaXRpb25CZWVuUHJldkhpdChyb3csIGNvbHVtbikpIHJldHVybjtcbiAgICBwb3NpdGlvbnNQcmV2SGl0LnB1c2goW3JvdywgY29sdW1uXSk7XG4gICAgZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2socm93LCBjb2x1bW4pO1xuICB9O1xuXG4gIGNvbnN0IHJhbmRvbUF0dGFjayA9IGZ1bmN0aW9uIHJhbmRvbUF0dGFjayhnYW1lYm9hcmQpIHtcbiAgICBpZiAocG9zaXRpb25zUHJldkhpdC5sZW5ndGggPT09IDEwMCkgcmV0dXJuO1xuXG4gICAgbGV0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBsZXQgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuXG4gICAgLy8gSWYgcG9zaXRpb24gaGFzIGJlZW4gaGl0LCBkbyB0aGUgcmFuZG9taXphdGlvbiBhZ2FpblxuICAgIHdoaWxlIChoYXNQb3NpdGlvbkJlZW5QcmV2SGl0KHJvdywgY29sdW1uKSkge1xuICAgICAgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIH1cblxuICAgIHBvc2l0aW9uc1ByZXZIaXQucHVzaChbcm93LCBjb2x1bW5dKTtcbiAgICBnYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNvbHVtbik7XG4gIH07XG5cbiAgZnVuY3Rpb24gaGFzUG9zaXRpb25CZWVuUHJldkhpdChyb3csIGNvbHVtbikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9zaXRpb25zUHJldkhpdC5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHBvc2l0aW9uc1ByZXZIaXRbaV1bMF0gPT09IHJvdyAmJiBwb3NpdGlvbnNQcmV2SGl0W2ldWzFdID09PSBjb2x1bW4pIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbmFtZSxcbiAgICBwb3NpdGlvbnNQcmV2SGl0LFxuICAgIGF0dGFjayxcbiAgICByYW5kb21BdHRhY2ssXG4gIH07XG59O1xuXG5leHBvcnQgeyBwbGF5ZXIgfTtcbiIsImNvbnN0IHNoaXAgPSBmdW5jdGlvbiBzaGlwKG5hbWUsIGxlbmd0aCkge1xuICBsZXQgaGl0cyA9IFtdO1xuICByZXR1cm4ge1xuICAgIGdldCBuYW1lKCkge1xuICAgICAgcmV0dXJuIG5hbWU7XG4gICAgfSxcbiAgICBnZXQgbGVuZ3RoKCkge1xuICAgICAgcmV0dXJuIGxlbmd0aDtcbiAgICB9LFxuICAgIGdldCBoaXRzKCkge1xuICAgICAgcmV0dXJuIFsuLi5oaXRzXTtcbiAgICB9LFxuICAgIGlzU3VuazogKCkgPT4ge1xuICAgICAgaWYgKGhpdHMubGVuZ3RoID09PSBsZW5ndGgpIHJldHVybiB0cnVlO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG4gICAgaGl0OiAodGFyZ2V0KSA9PiB7XG4gICAgICBpZiAoaGl0cy5pbmNsdWRlcyh0YXJnZXQpIHx8IHRhcmdldCA8IDAgfHwgdGFyZ2V0ID49IGxlbmd0aCkgcmV0dXJuO1xuICAgICAgaGl0cy5wdXNoKHRhcmdldCk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCB7IHNoaXAgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvc2NyaXB0cy9pbmRleC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==