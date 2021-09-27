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
(0,_dom_interaction__WEBPACK_IMPORTED_MODULE_3__.renderUserShips)(player1Gameboard);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDb0I7Ozs7Ozs7Ozs7Ozs7OztBQzFEcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9CQUFvQiw2QkFBNkI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVrQjs7Ozs7Ozs7Ozs7Ozs7O0FDMUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRWdCOzs7Ozs7O1VDdkJoQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9kb20taW50ZXJhY3Rpb24uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdhbWVMb29wIH0gZnJvbSAnLi9pbmRleCc7XG5cbmZ1bmN0aW9uIHJlbmRlckdhbWVib2FyZChnYW1lYm9hcmQsIG93bmVyKSB7XG4gIGxldCBjb250YWluZXI7XG4gIGlmIChvd25lciA9PT0gJ3BsYXllcjEnKSB7XG4gICAgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVzZXItYm9hcmQnKTtcbiAgfSBlbHNlIGlmIChvd25lciA9PT0gJ2NvbXB1dGVyJykge1xuICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21wdXRlci1ib2FyZCcpO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZWJvYXJkLmJvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBnYW1lYm9hcmQuYm9hcmRbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoJ2NlbGxzJyk7XG4gICAgICBkaXYuZGF0YXNldC54SW5kZXggPSBbaV07XG4gICAgICBkaXYuZGF0YXNldC55SW5kZXggPSBbal07XG5cbiAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiByZW5kZXJVc2VyU2hpcHMoZ2FtZWJvYXJkKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZWJvYXJkLmJvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBnYW1lYm9hcmQuYm9hcmRbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgIGlmIChnYW1lYm9hcmQuYm9hcmRbaV1bal0pIHtcbiAgICAgICAgbGV0IGN1cnJlbnRDZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBcIi51c2VyLWJvYXJkIGRpdltkYXRhLXgtaW5kZXg9J1wiICsgaSArIFwiJ11cIiArIFwiW2RhdGEteS1pbmRleD0nXCIgKyBqICsgXCInXVwiLFxuICAgICAgICApO1xuICAgICAgICBjdXJyZW50Q2VsbC5jbGFzc0xpc3QuYWRkKCd1c2VyU2hpcHMnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuY29uc3QgY29tcHV0ZXJCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21wdXRlci1ib2FyZCcpO1xuY29tcHV0ZXJCb2FyZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGdhbWVMb29wKTtcblxuZXhwb3J0IHsgcmVuZGVyR2FtZWJvYXJkLCByZW5kZXJVc2VyU2hpcHMgfTtcbiIsImltcG9ydCB7IHNoaXAgfSBmcm9tICcuLi9zY3JpcHRzL3NoaXAnO1xuXG5jb25zdCBHYW1lYm9hcmQgPSAoKSA9PiB7XG4gIC8vIENyZWF0ZSBhIDEwIHggMTAgYm9hcmRcbiAgY29uc3Qgd2lkdGggPSAxMDtcbiAgY29uc3QgaGVpZ2h0ID0gMTA7XG4gIGxldCBib2FyZCA9IG5ldyBBcnJheSh3aWR0aCkuZmlsbChudWxsKS5tYXAoKHgpID0+IG5ldyBBcnJheShoZWlnaHQpLmZpbGwobnVsbCkpO1xuICBsZXQgbWlzc2VkU2hvdHMgPSBuZXcgQXJyYXkod2lkdGgpLmZpbGwoZmFsc2UpLm1hcCgoeCkgPT4gbmV3IEFycmF5KGhlaWdodCkuZmlsbChmYWxzZSkpO1xuXG4gIC8vIFBsYWNlIHNoaXBzXG4gIGNvbnN0IHBsYWNlU2hpcCA9IGZ1bmN0aW9uIHBsYWNlU2hpcChzaGlwLCByb3csIGNvbHVtbiwgaXNWZXJ0aWNhbCkge1xuICAgIGlmICghaXNQbGFjZW1lbnRQb3NzaWJsZShzaGlwLCByb3csIGNvbHVtbiwgaXNWZXJ0aWNhbCkpIHJldHVybiBmYWxzZTtcblxuICAgIGlmIChpc1ZlcnRpY2FsKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYm9hcmRbcm93ICsgaV1bY29sdW1uXSA9IHNoaXA7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBib2FyZFtyb3ddW2NvbHVtbiArIGldID0gc2hpcDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgLy8gSW5pdGlhbGl6ZSB0aGUgc2hpcHMgdGhhdCB3aWxsIGJlIG5lZWRlZFxuICBjb25zdCBzaGlwcyA9IFtdO1xuICBjb25zdCBjYXJyaWVyID0gbmV3IHNoaXAoJ2NhcnJpZXInLCA1KTtcbiAgY29uc3QgYmF0dGxlc2hpcCA9IG5ldyBzaGlwKCdiYXR0bGVzaGlwJywgNCk7XG4gIGNvbnN0IGRlc3Ryb3llciA9IG5ldyBzaGlwKCdkZXN0cm95ZXInLCAzKTtcbiAgY29uc3Qgc3VibWFyaW5lID0gbmV3IHNoaXAoJ3N1Ym1hcmluZScsIDMpO1xuICBjb25zdCBwYXRyb2xCb2F0ID0gbmV3IHNoaXAoJ3BhdHJvbEJvYXQnLCAyKTtcbiAgc2hpcHMucHVzaChjYXJyaWVyLCBiYXR0bGVzaGlwLCBkZXN0cm95ZXIsIHN1Ym1hcmluZSwgcGF0cm9sQm9hdCk7XG5cbiAgLy8gUmFuZG9tbHkgcGxhY2Ugc2hpcHNcbiAgY29uc3QgcGxhY2VTaGlwc1JhbmRvbWx5ID0gZnVuY3Rpb24gcGxhY2VTaGlwc1JhbmRvbWx5KCkge1xuICAgIGlmICghaXNFbXB0eSgpKSByZXR1cm47XG5cbiAgICBsZXQgc3VjY2VzZnVsUGxhY2VtZW50cyA9IDA7XG5cbiAgICB3aGlsZSAoc3VjY2VzZnVsUGxhY2VtZW50cyA8IDUpIHtcbiAgICAgIGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGNvbnN0IGNvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGNvbnN0IGlzVmVydGljYWwgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKSA9PT0gMSA/IHRydWUgOiBmYWxzZTtcblxuICAgICAgaWYgKHBsYWNlU2hpcChzaGlwc1tzdWNjZXNmdWxQbGFjZW1lbnRzXSwgcm93LCBjb2x1bW4sIGlzVmVydGljYWwpKSBzdWNjZXNmdWxQbGFjZW1lbnRzKys7XG4gICAgfVxuICB9O1xuXG4gIGZ1bmN0aW9uIGlzUGxhY2VtZW50UG9zc2libGUoc2hpcCwgcm93LCBjb2x1bW4sIGlzVmVydGljYWwpIHtcbiAgICAvLyBJcyBpdCBvdXQgb2YgdGhlIGdhbWVib2FyZFxuICAgIGlmIChyb3cgPCAwIHx8IHJvdyA+IGhlaWdodCAtIDEgfHwgY29sdW1uIDwgMCB8fCBjb2x1bW4gPiB3aWR0aCAtIDEpIHJldHVybiBmYWxzZTtcblxuICAgIC8vIElmIHNoaXAgZG9lc24ndCBmaXQgaW4gZ2FtZWJvYXJkXG4gICAgaWYgKGlzVmVydGljYWwpIHtcbiAgICAgIGlmIChyb3cgKyBzaGlwLmxlbmd0aCA+IDEwKSByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChjb2x1bW4gKyBzaGlwLmxlbmd0aCA+IDEwKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gQXJlIGFueSBvZiB0aGUgZmllbGRzIGFscmVhZHkgdGFrZW5cbiAgICBpZiAoaXNWZXJ0aWNhbCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChib2FyZFtyb3cgKyBpXVtjb2x1bW5dKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoYm9hcmRbcm93XVtjb2x1bW4gKyBpXSkgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFyZSBhbnkgb2YgdGhlIG5laWdoYm91ciBmaWVsZHMgYWxyZWFkeSB0YWtlblxuICAgIGlmIChpc1ZlcnRpY2FsKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgeCA9IC0xOyB4IDw9IDE7IHgrKykge1xuICAgICAgICAgIGZvciAobGV0IHkgPSAtMTsgeSA8PSAxOyB5KyspIHtcbiAgICAgICAgICAgIGlmIChyb3cgKyB4ICsgaSA8IDAgfHwgcm93ICsgeCArIGkgPj0gMTAgfHwgY29sdW1uICsgeSA8IDAgfHwgY29sdW1uICsgeSA+PSAxMClcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBpZiAoYm9hcmRbcm93ICsgeCArIGldW2NvbHVtbiArIHldKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBmb3IgKGxldCB4ID0gLTE7IHggPD0gMTsgeCsrKSB7XG4gICAgICAgICAgZm9yIChsZXQgeSA9IC0xOyB5IDw9IDE7IHkrKykge1xuICAgICAgICAgICAgaWYgKHJvdyArIHggPCAwIHx8IHJvdyArIHggPj0gMTAgfHwgY29sdW1uICsgeSArIGkgPCAwIHx8IGNvbHVtbiArIHkgKyBpID49IDEwKVxuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGlmIChib2FyZFtyb3cgKyB4XVtjb2x1bW4gKyB5ICsgaV0pIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiBpc0VtcHR5KCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIGlmIChib2FyZFtpXVtqXSAhPT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEVtcHR5RmllbGRzQW1vdW50KCkge1xuICAgIGxldCB0b3RhbCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgaWYgKGJvYXJkW2ldW2pdID09PSBudWxsKSB0b3RhbCsrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdG90YWw7XG4gIH1cblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gZnVuY3Rpb24gcmVjZWl2ZUF0dGFjayhyb3csIGNvbHVtbikge1xuICAgIGlmIChyb3cgPCAwIHx8IHJvdyA+PSAxMCB8fCBjb2x1bW4gPCAwIHx8IGNvbHVtbiA+PSAxMCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChib2FyZFtyb3ddW2NvbHVtbl0pIHtcbiAgICAgIGxldCBoaXRJbmRleCA9IDA7XG4gICAgICAvLyBJZiBzaGlwIGlzIHZlcnRpY2FsXG4gICAgICBpZiAoY29sdW1uID4gMCAmJiBib2FyZFtyb3ddW2NvbHVtbiAtIDFdKSB7XG4gICAgICAgIGxldCBpID0gMTtcbiAgICAgICAgd2hpbGUgKGNvbHVtbiAtIGkgPj0gMCAmJiBib2FyZFtyb3ddW2NvbHVtbiAtIGldKSB7XG4gICAgICAgICAgaGl0SW5kZXgrKztcbiAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIElmIHNoaXAgaXMgaG9yaXpvbnRhbFxuICAgICAgZWxzZSBpZiAocm93ID4gMCAmJiBib2FyZFtyb3cgLSAxXVtjb2x1bW5dKSB7XG4gICAgICAgIGxldCBpID0gMTtcbiAgICAgICAgd2hpbGUgKHJvdyAtIGkgPj0gMCAmJiBib2FyZFtyb3cgLSBpXVtjb2x1bW5dKSB7XG4gICAgICAgICAgaGl0SW5kZXgrKztcbiAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGJvYXJkW3Jvd11bY29sdW1uXS5oaXQoaGl0SW5kZXgpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1pc3NlZFNob3RzW3Jvd11bY29sdW1uXSA9IHRydWU7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIGZ1bmN0aW9uIGlzR2FtZU92ZXIoKSB7XG4gICAgbGV0IGFyZVNoaXBzT25Cb2FyZCA9IGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIGlmIChib2FyZFtpXVtqXSkge1xuICAgICAgICAgIGFyZVNoaXBzT25Cb2FyZCA9IHRydWU7XG4gICAgICAgICAgaWYgKCFib2FyZFtpXVtqXS5pc1N1bmsoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJlU2hpcHNPbkJvYXJkID8gdHJ1ZSA6IGZhbHNlO1xuICB9XG5cbiAgLy8gVGhlIGludGVyZmFjZSBmdW5jdGlvbnMgYW5kIHByb3BlcnRpZXMgdG8gYmUgcmV0dXJuZWRcbiAgcmV0dXJuIHtcbiAgICBib2FyZCxcbiAgICBwbGFjZVNoaXAsXG4gICAgcGxhY2VTaGlwc1JhbmRvbWx5LFxuICAgIGdldEVtcHR5RmllbGRzQW1vdW50LFxuICAgIGlzUGxhY2VtZW50UG9zc2libGUsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBtaXNzZWRTaG90cyxcbiAgICBpc0dhbWVPdmVyLFxuICB9O1xufTtcblxuZXhwb3J0IHsgR2FtZWJvYXJkIH07XG4iLCJpbXBvcnQgeyBzaGlwIH0gZnJvbSAnLi9zaGlwJztcbmltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gJy4vZ2FtZWJvYXJkJztcbmltcG9ydCB7IHBsYXllciB9IGZyb20gJy4vcGxheWVyJztcbmltcG9ydCB7IHJlbmRlckdhbWVib2FyZCwgcmVuZGVyVXNlclNoaXBzIH0gZnJvbSAnLi9kb20taW50ZXJhY3Rpb24nO1xuXG5jb25zdCBwbGF5ZXIxID0gcGxheWVyKCdVc2VyJyk7XG5jb25zdCBjb21wdXRlciA9IHBsYXllcignQ29tcHV0ZXInKTtcbmNvbnN0IHBsYXllcjFHYW1lYm9hcmQgPSBHYW1lYm9hcmQoKTtcbmNvbnN0IGNvbXB1dGVyR2FtZWJvYXJkID0gR2FtZWJvYXJkKCk7XG5wbGF5ZXIxR2FtZWJvYXJkLnBsYWNlU2hpcHNSYW5kb21seSgpO1xuY29tcHV0ZXJHYW1lYm9hcmQucGxhY2VTaGlwc1JhbmRvbWx5KCk7XG5yZW5kZXJHYW1lYm9hcmQocGxheWVyMUdhbWVib2FyZCwgJ3BsYXllcjEnKTtcbnJlbmRlckdhbWVib2FyZChjb21wdXRlckdhbWVib2FyZCwgJ2NvbXB1dGVyJyk7XG5yZW5kZXJVc2VyU2hpcHMocGxheWVyMUdhbWVib2FyZCk7XG5cbmxldCBjb21wQXR0YWNrSW5kZXggPSAwO1xuZnVuY3Rpb24gZ2FtZUxvb3AoZSkge1xuICBpZiAoZS50YXJnZXQuY2xhc3NOYW1lICE9PSAnY2VsbHMnKSByZXR1cm47XG4gIGlmICghKHBsYXllcjFHYW1lYm9hcmQuaXNHYW1lT3ZlcigpIHx8IGNvbXB1dGVyR2FtZWJvYXJkLmlzR2FtZU92ZXIoKSkpIHtcbiAgICBsZXQgcm93ID0gZS5wYXRoWzBdLmRhdGFzZXQueEluZGV4O1xuICAgIGxldCBjb2x1bW4gPSBlLnBhdGhbMF0uZGF0YXNldC55SW5kZXg7XG4gICAgcGxheWVyMS5hdHRhY2socm93LCBjb2x1bW4sIGNvbXB1dGVyR2FtZWJvYXJkKTtcbiAgICBpZiAoY29tcHV0ZXJHYW1lYm9hcmQubWlzc2VkU2hvdHNbcm93XVtjb2x1bW5dKSB7XG4gICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdtaXNzJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAgIH1cbiAgICBjaGVja1dpbm5lcigpO1xuICAgIGNvbXB1dGVyQXR0YWNrKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY29tcHV0ZXJBdHRhY2soKSB7XG4gIGlmICghKHBsYXllcjFHYW1lYm9hcmQuaXNHYW1lT3ZlcigpIHx8IGNvbXB1dGVyR2FtZWJvYXJkLmlzR2FtZU92ZXIoKSkpIHtcbiAgICBjb21wdXRlci5yYW5kb21BdHRhY2socGxheWVyMUdhbWVib2FyZCk7XG4gICAgbGV0IHJvdyA9IGNvbXB1dGVyLnBvc2l0aW9uc1ByZXZIaXRbY29tcEF0dGFja0luZGV4XVswXTtcbiAgICBsZXQgY29sdW1uID0gY29tcHV0ZXIucG9zaXRpb25zUHJldkhpdFtjb21wQXR0YWNrSW5kZXhdWzFdO1xuICAgIGxldCB0YXJnZXRDZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIFwiLnVzZXItYm9hcmQgZGl2W2RhdGEteC1pbmRleD0nXCIgKyByb3cgKyBcIiddXCIgKyBcIltkYXRhLXktaW5kZXg9J1wiICsgY29sdW1uICsgXCInXVwiLFxuICAgICk7XG4gICAgaWYgKHBsYXllcjFHYW1lYm9hcmQubWlzc2VkU2hvdHNbcm93XVtjb2x1bW5dKSB7XG4gICAgICB0YXJnZXRDZWxsLmNsYXNzTGlzdC5hZGQoJ21pc3MnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGFyZ2V0Q2VsbC5jbGFzc0xpc3QucmVtb3ZlKCd1c2VyU2hpcHMnKTtcbiAgICAgIHRhcmdldENlbGwuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG4gICAgfVxuICAgIGNvbXBBdHRhY2tJbmRleCsrO1xuICAgIGNoZWNrV2lubmVyKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2hlY2tXaW5uZXIoKSB7XG4gIGlmIChwbGF5ZXIxR2FtZWJvYXJkLmlzR2FtZU92ZXIoKSkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZXNzYWdlcycpLnRleHRDb250ZW50ID0gJ1RoZSBDb21wdXRlciBXb24nO1xuICB9IGVsc2UgaWYgKGNvbXB1dGVyR2FtZWJvYXJkLmlzR2FtZU92ZXIoKSkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZXNzYWdlcycpLnRleHRDb250ZW50ID0gJ1lvdSB3b24hJztcbiAgfVxufVxuZXhwb3J0IHsgZ2FtZUxvb3AgfTtcbiIsImNvbnN0IHBsYXllciA9IGZ1bmN0aW9uIHBsYXllcihuYW1lKSB7XG4gIGNvbnN0IHBvc2l0aW9uc1ByZXZIaXQgPSBbXTtcblxuICBjb25zdCBhdHRhY2sgPSBmdW5jdGlvbiBhdHRhY2socm93LCBjb2x1bW4sIGdhbWVib2FyZCkge1xuICAgIGlmIChoYXNQb3NpdGlvbkJlZW5QcmV2SGl0KHJvdywgY29sdW1uKSkgcmV0dXJuO1xuICAgIHBvc2l0aW9uc1ByZXZIaXQucHVzaChbcm93LCBjb2x1bW5dKTtcbiAgICBnYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNvbHVtbik7XG4gIH07XG5cbiAgY29uc3QgcmFuZG9tQXR0YWNrID0gZnVuY3Rpb24gcmFuZG9tQXR0YWNrKGdhbWVib2FyZCkge1xuICAgIGlmIChwb3NpdGlvbnNQcmV2SGl0Lmxlbmd0aCA9PT0gMTAwKSByZXR1cm47XG5cbiAgICBsZXQgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIGxldCBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG5cbiAgICAvLyBJZiBwb3NpdGlvbiBoYXMgYmVlbiBoaXQsIGRvIHRoZSByYW5kb21pemF0aW9uIGFnYWluXG4gICAgd2hpbGUgKGhhc1Bvc2l0aW9uQmVlblByZXZIaXQocm93LCBjb2x1bW4pKSB7XG4gICAgICByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgfVxuXG4gICAgcG9zaXRpb25zUHJldkhpdC5wdXNoKFtyb3csIGNvbHVtbl0pO1xuICAgIGdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHJvdywgY29sdW1uKTtcbiAgfTtcblxuICBmdW5jdGlvbiBoYXNQb3NpdGlvbkJlZW5QcmV2SGl0KHJvdywgY29sdW1uKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb3NpdGlvbnNQcmV2SGl0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAocG9zaXRpb25zUHJldkhpdFtpXVswXSA9PT0gcm93ICYmIHBvc2l0aW9uc1ByZXZIaXRbaV1bMV0gPT09IGNvbHVtbikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lLFxuICAgIHBvc2l0aW9uc1ByZXZIaXQsXG4gICAgYXR0YWNrLFxuICAgIHJhbmRvbUF0dGFjayxcbiAgfTtcbn07XG5cbmV4cG9ydCB7IHBsYXllciB9O1xuIiwiY29uc3Qgc2hpcCA9IGZ1bmN0aW9uIHNoaXAobmFtZSwgbGVuZ3RoKSB7XG4gIGxldCBoaXRzID0gW107XG4gIHJldHVybiB7XG4gICAgZ2V0IG5hbWUoKSB7XG4gICAgICByZXR1cm4gbmFtZTtcbiAgICB9LFxuICAgIGdldCBsZW5ndGgoKSB7XG4gICAgICByZXR1cm4gbGVuZ3RoO1xuICAgIH0sXG4gICAgZ2V0IGhpdHMoKSB7XG4gICAgICByZXR1cm4gWy4uLmhpdHNdO1xuICAgIH0sXG4gICAgaXNTdW5rOiAoKSA9PiB7XG4gICAgICBpZiAoaGl0cy5sZW5ndGggPT09IGxlbmd0aCkgcmV0dXJuIHRydWU7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcbiAgICBoaXQ6ICh0YXJnZXQpID0+IHtcbiAgICAgIGlmIChoaXRzLmluY2x1ZGVzKHRhcmdldCkgfHwgdGFyZ2V0IDwgMCB8fCB0YXJnZXQgPj0gbGVuZ3RoKSByZXR1cm47XG4gICAgICBoaXRzLnB1c2godGFyZ2V0KTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IHsgc2hpcCB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9zY3JpcHRzL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9