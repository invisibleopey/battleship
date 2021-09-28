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

const startGame = function startGame() {
  player1Gameboard.placeShipsRandomly();
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

const shipPlacementDiv = document.querySelector('#ship-placement');
const randomShipsBtn = document.querySelector('#randomShipsBtn');
randomShipsBtn.addEventListener('click', () => {
  startGame();
  shipPlacementDiv.style.display = 'none';
});




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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFbUI7Ozs7Ozs7Ozs7Ozs7OztBQ3JFcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9CQUFvQiw2QkFBNkI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVrQjs7Ozs7Ozs7Ozs7Ozs7O0FDMUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRWdCOzs7Ozs7O1VDdkJoQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9kb20taW50ZXJhY3Rpb24uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdhbWVMb29wIH0gZnJvbSAnLi9pbmRleCc7XG5cbmZ1bmN0aW9uIHJlbmRlckdhbWVib2FyZChnYW1lYm9hcmQsIG93bmVyKSB7XG4gIGxldCBjb250YWluZXI7XG4gIGlmIChvd25lciA9PT0gJ3BsYXllcjEnKSB7XG4gICAgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVzZXItYm9hcmQnKTtcbiAgfSBlbHNlIGlmIChvd25lciA9PT0gJ2NvbXB1dGVyJykge1xuICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21wdXRlci1ib2FyZCcpO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZWJvYXJkLmJvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBnYW1lYm9hcmQuYm9hcmRbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoJ2NlbGxzJyk7XG4gICAgICBkaXYuZGF0YXNldC54SW5kZXggPSBbaV07XG4gICAgICBkaXYuZGF0YXNldC55SW5kZXggPSBbal07XG5cbiAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiByZW5kZXJVc2VyU2hpcHMoZ2FtZWJvYXJkKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZWJvYXJkLmJvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBnYW1lYm9hcmQuYm9hcmRbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgIGlmIChnYW1lYm9hcmQuYm9hcmRbaV1bal0pIHtcbiAgICAgICAgbGV0IGN1cnJlbnRDZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBcIi51c2VyLWJvYXJkIGRpdltkYXRhLXgtaW5kZXg9J1wiICsgaSArIFwiJ11cIiArIFwiW2RhdGEteS1pbmRleD0nXCIgKyBqICsgXCInXVwiLFxuICAgICAgICApO1xuICAgICAgICBjdXJyZW50Q2VsbC5jbGFzc0xpc3QuYWRkKCd1c2VyU2hpcHMnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuY29uc3QgY29tcHV0ZXJCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21wdXRlci1ib2FyZCcpO1xuY29tcHV0ZXJCb2FyZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGdhbWVMb29wKTtcblxuLy8gQ29udHJvbCBNb2RhbFxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VudGVyQ29vcmRzQnRuJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iZy1tb2RhbCcpLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG59KTtcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsb3NlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iZy1tb2RhbCcpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG59KTtcbmV4cG9ydCB7IHJlbmRlckdhbWVib2FyZCwgcmVuZGVyVXNlclNoaXBzIH07XG4iLCJpbXBvcnQgeyBzaGlwIH0gZnJvbSAnLi4vc2NyaXB0cy9zaGlwJztcblxuY29uc3QgR2FtZWJvYXJkID0gKCkgPT4ge1xuICAvLyBDcmVhdGUgYSAxMCB4IDEwIGJvYXJkXG4gIGNvbnN0IHdpZHRoID0gMTA7XG4gIGNvbnN0IGhlaWdodCA9IDEwO1xuICBsZXQgYm9hcmQgPSBuZXcgQXJyYXkod2lkdGgpLmZpbGwobnVsbCkubWFwKCh4KSA9PiBuZXcgQXJyYXkoaGVpZ2h0KS5maWxsKG51bGwpKTtcbiAgbGV0IG1pc3NlZFNob3RzID0gbmV3IEFycmF5KHdpZHRoKS5maWxsKGZhbHNlKS5tYXAoKHgpID0+IG5ldyBBcnJheShoZWlnaHQpLmZpbGwoZmFsc2UpKTtcblxuICAvLyBQbGFjZSBzaGlwc1xuICBjb25zdCBwbGFjZVNoaXAgPSBmdW5jdGlvbiBwbGFjZVNoaXAoc2hpcCwgcm93LCBjb2x1bW4sIGlzVmVydGljYWwpIHtcbiAgICBpZiAoIWlzUGxhY2VtZW50UG9zc2libGUoc2hpcCwgcm93LCBjb2x1bW4sIGlzVmVydGljYWwpKSByZXR1cm4gZmFsc2U7XG5cbiAgICBpZiAoaXNWZXJ0aWNhbCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGJvYXJkW3JvdyArIGldW2NvbHVtbl0gPSBzaGlwO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYm9hcmRbcm93XVtjb2x1bW4gKyBpXSA9IHNoaXA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIC8vIEluaXRpYWxpemUgdGhlIHNoaXBzIHRoYXQgd2lsbCBiZSBuZWVkZWRcbiAgY29uc3Qgc2hpcHMgPSBbXTtcbiAgY29uc3QgY2FycmllciA9IG5ldyBzaGlwKCdjYXJyaWVyJywgNSk7XG4gIGNvbnN0IGJhdHRsZXNoaXAgPSBuZXcgc2hpcCgnYmF0dGxlc2hpcCcsIDQpO1xuICBjb25zdCBkZXN0cm95ZXIgPSBuZXcgc2hpcCgnZGVzdHJveWVyJywgMyk7XG4gIGNvbnN0IHN1Ym1hcmluZSA9IG5ldyBzaGlwKCdzdWJtYXJpbmUnLCAzKTtcbiAgY29uc3QgcGF0cm9sQm9hdCA9IG5ldyBzaGlwKCdwYXRyb2xCb2F0JywgMik7XG4gIHNoaXBzLnB1c2goY2FycmllciwgYmF0dGxlc2hpcCwgZGVzdHJveWVyLCBzdWJtYXJpbmUsIHBhdHJvbEJvYXQpO1xuXG4gIC8vIFJhbmRvbWx5IHBsYWNlIHNoaXBzXG4gIGNvbnN0IHBsYWNlU2hpcHNSYW5kb21seSA9IGZ1bmN0aW9uIHBsYWNlU2hpcHNSYW5kb21seSgpIHtcbiAgICBpZiAoIWlzRW1wdHkoKSkgcmV0dXJuO1xuXG4gICAgbGV0IHN1Y2Nlc2Z1bFBsYWNlbWVudHMgPSAwO1xuXG4gICAgd2hpbGUgKHN1Y2Nlc2Z1bFBsYWNlbWVudHMgPCA1KSB7XG4gICAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBjb25zdCBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBjb25zdCBpc1ZlcnRpY2FsID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMikgPT09IDEgPyB0cnVlIDogZmFsc2U7XG5cbiAgICAgIGlmIChwbGFjZVNoaXAoc2hpcHNbc3VjY2VzZnVsUGxhY2VtZW50c10sIHJvdywgY29sdW1uLCBpc1ZlcnRpY2FsKSkgc3VjY2VzZnVsUGxhY2VtZW50cysrO1xuICAgIH1cbiAgfTtcblxuICBmdW5jdGlvbiBpc1BsYWNlbWVudFBvc3NpYmxlKHNoaXAsIHJvdywgY29sdW1uLCBpc1ZlcnRpY2FsKSB7XG4gICAgLy8gSXMgaXQgb3V0IG9mIHRoZSBnYW1lYm9hcmRcbiAgICBpZiAocm93IDwgMCB8fCByb3cgPiBoZWlnaHQgLSAxIHx8IGNvbHVtbiA8IDAgfHwgY29sdW1uID4gd2lkdGggLSAxKSByZXR1cm4gZmFsc2U7XG5cbiAgICAvLyBJZiBzaGlwIGRvZXNuJ3QgZml0IGluIGdhbWVib2FyZFxuICAgIGlmIChpc1ZlcnRpY2FsKSB7XG4gICAgICBpZiAocm93ICsgc2hpcC5sZW5ndGggPiAxMCkgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoY29sdW1uICsgc2hpcC5sZW5ndGggPiAxMCkgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIEFyZSBhbnkgb2YgdGhlIGZpZWxkcyBhbHJlYWR5IHRha2VuXG4gICAgaWYgKGlzVmVydGljYWwpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoYm9hcmRbcm93ICsgaV1bY29sdW1uXSkgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGJvYXJkW3Jvd11bY29sdW1uICsgaV0pIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBcmUgYW55IG9mIHRoZSBuZWlnaGJvdXIgZmllbGRzIGFscmVhZHkgdGFrZW5cbiAgICBpZiAoaXNWZXJ0aWNhbCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IHggPSAtMTsgeCA8PSAxOyB4KyspIHtcbiAgICAgICAgICBmb3IgKGxldCB5ID0gLTE7IHkgPD0gMTsgeSsrKSB7XG4gICAgICAgICAgICBpZiAocm93ICsgeCArIGkgPCAwIHx8IHJvdyArIHggKyBpID49IDEwIHx8IGNvbHVtbiArIHkgPCAwIHx8IGNvbHVtbiArIHkgPj0gMTApXG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYgKGJvYXJkW3JvdyArIHggKyBpXVtjb2x1bW4gKyB5XSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgeCA9IC0xOyB4IDw9IDE7IHgrKykge1xuICAgICAgICAgIGZvciAobGV0IHkgPSAtMTsgeSA8PSAxOyB5KyspIHtcbiAgICAgICAgICAgIGlmIChyb3cgKyB4IDwgMCB8fCByb3cgKyB4ID49IDEwIHx8IGNvbHVtbiArIHkgKyBpIDwgMCB8fCBjb2x1bW4gKyB5ICsgaSA+PSAxMClcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBpZiAoYm9hcmRbcm93ICsgeF1bY29sdW1uICsgeSArIGldKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNFbXB0eSgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICBpZiAoYm9hcmRbaV1bal0gIT09IG51bGwpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRFbXB0eUZpZWxkc0Ftb3VudCgpIHtcbiAgICBsZXQgdG90YWwgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIGlmIChib2FyZFtpXVtqXSA9PT0gbnVsbCkgdG90YWwrKztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRvdGFsO1xuICB9XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IGZ1bmN0aW9uIHJlY2VpdmVBdHRhY2socm93LCBjb2x1bW4pIHtcbiAgICBpZiAocm93IDwgMCB8fCByb3cgPj0gMTAgfHwgY29sdW1uIDwgMCB8fCBjb2x1bW4gPj0gMTApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoYm9hcmRbcm93XVtjb2x1bW5dKSB7XG4gICAgICBsZXQgaGl0SW5kZXggPSAwO1xuICAgICAgLy8gSWYgc2hpcCBpcyB2ZXJ0aWNhbFxuICAgICAgaWYgKGNvbHVtbiA+IDAgJiYgYm9hcmRbcm93XVtjb2x1bW4gLSAxXSkge1xuICAgICAgICBsZXQgaSA9IDE7XG4gICAgICAgIHdoaWxlIChjb2x1bW4gLSBpID49IDAgJiYgYm9hcmRbcm93XVtjb2x1bW4gLSBpXSkge1xuICAgICAgICAgIGhpdEluZGV4Kys7XG4gICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBJZiBzaGlwIGlzIGhvcml6b250YWxcbiAgICAgIGVsc2UgaWYgKHJvdyA+IDAgJiYgYm9hcmRbcm93IC0gMV1bY29sdW1uXSkge1xuICAgICAgICBsZXQgaSA9IDE7XG4gICAgICAgIHdoaWxlIChyb3cgLSBpID49IDAgJiYgYm9hcmRbcm93IC0gaV1bY29sdW1uXSkge1xuICAgICAgICAgIGhpdEluZGV4Kys7XG4gICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBib2FyZFtyb3ddW2NvbHVtbl0uaGl0KGhpdEluZGV4KTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBtaXNzZWRTaG90c1tyb3ddW2NvbHVtbl0gPSB0cnVlO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcblxuICBmdW5jdGlvbiBpc0dhbWVPdmVyKCkge1xuICAgIGxldCBhcmVTaGlwc09uQm9hcmQgPSBmYWxzZTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICBpZiAoYm9hcmRbaV1bal0pIHtcbiAgICAgICAgICBhcmVTaGlwc09uQm9hcmQgPSB0cnVlO1xuICAgICAgICAgIGlmICghYm9hcmRbaV1bal0uaXNTdW5rKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFyZVNoaXBzT25Cb2FyZCA/IHRydWUgOiBmYWxzZTtcbiAgfVxuXG4gIC8vIFRoZSBpbnRlcmZhY2UgZnVuY3Rpb25zIGFuZCBwcm9wZXJ0aWVzIHRvIGJlIHJldHVybmVkXG4gIHJldHVybiB7XG4gICAgYm9hcmQsXG4gICAgcGxhY2VTaGlwLFxuICAgIHBsYWNlU2hpcHNSYW5kb21seSxcbiAgICBnZXRFbXB0eUZpZWxkc0Ftb3VudCxcbiAgICBpc1BsYWNlbWVudFBvc3NpYmxlLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgbWlzc2VkU2hvdHMsXG4gICAgaXNHYW1lT3ZlcixcbiAgfTtcbn07XG5cbmV4cG9ydCB7IEdhbWVib2FyZCB9O1xuIiwiaW1wb3J0IHsgc2hpcCB9IGZyb20gJy4vc2hpcCc7XG5pbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tICcuL2dhbWVib2FyZCc7XG5pbXBvcnQgeyBwbGF5ZXIgfSBmcm9tICcuL3BsYXllcic7XG5pbXBvcnQgeyByZW5kZXJHYW1lYm9hcmQsIHJlbmRlclVzZXJTaGlwcyB9IGZyb20gJy4vZG9tLWludGVyYWN0aW9uJztcblxuY29uc3QgcGxheWVyMSA9IHBsYXllcignVXNlcicpO1xuY29uc3QgY29tcHV0ZXIgPSBwbGF5ZXIoJ0NvbXB1dGVyJyk7XG5jb25zdCBwbGF5ZXIxR2FtZWJvYXJkID0gR2FtZWJvYXJkKCk7XG5jb25zdCBjb21wdXRlckdhbWVib2FyZCA9IEdhbWVib2FyZCgpO1xubGV0IGNvbXBBdHRhY2tJbmRleCA9IDA7XG5cbmNvbnN0IHN0YXJ0R2FtZSA9IGZ1bmN0aW9uIHN0YXJ0R2FtZSgpIHtcbiAgcGxheWVyMUdhbWVib2FyZC5wbGFjZVNoaXBzUmFuZG9tbHkoKTtcbiAgY29tcHV0ZXJHYW1lYm9hcmQucGxhY2VTaGlwc1JhbmRvbWx5KCk7XG4gIHJlbmRlckdhbWVib2FyZChwbGF5ZXIxR2FtZWJvYXJkLCAncGxheWVyMScpO1xuICByZW5kZXJHYW1lYm9hcmQoY29tcHV0ZXJHYW1lYm9hcmQsICdjb21wdXRlcicpO1xuICByZW5kZXJVc2VyU2hpcHMocGxheWVyMUdhbWVib2FyZCk7XG59O1xuXG5mdW5jdGlvbiBnYW1lTG9vcChlKSB7XG4gIGlmIChlLnRhcmdldC5jbGFzc05hbWUgIT09ICdjZWxscycpIHJldHVybjtcbiAgaWYgKCEocGxheWVyMUdhbWVib2FyZC5pc0dhbWVPdmVyKCkgfHwgY29tcHV0ZXJHYW1lYm9hcmQuaXNHYW1lT3ZlcigpKSkge1xuICAgIGxldCByb3cgPSBlLnBhdGhbMF0uZGF0YXNldC54SW5kZXg7XG4gICAgbGV0IGNvbHVtbiA9IGUucGF0aFswXS5kYXRhc2V0LnlJbmRleDtcbiAgICBwbGF5ZXIxLmF0dGFjayhyb3csIGNvbHVtbiwgY29tcHV0ZXJHYW1lYm9hcmQpO1xuICAgIGlmIChjb21wdXRlckdhbWVib2FyZC5taXNzZWRTaG90c1tyb3ddW2NvbHVtbl0pIHtcbiAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ21pc3MnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG4gICAgfVxuICAgIGNoZWNrV2lubmVyKCk7XG4gICAgY29tcHV0ZXJBdHRhY2soKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjb21wdXRlckF0dGFjaygpIHtcbiAgaWYgKCEocGxheWVyMUdhbWVib2FyZC5pc0dhbWVPdmVyKCkgfHwgY29tcHV0ZXJHYW1lYm9hcmQuaXNHYW1lT3ZlcigpKSkge1xuICAgIGNvbXB1dGVyLnJhbmRvbUF0dGFjayhwbGF5ZXIxR2FtZWJvYXJkKTtcbiAgICBsZXQgcm93ID0gY29tcHV0ZXIucG9zaXRpb25zUHJldkhpdFtjb21wQXR0YWNrSW5kZXhdWzBdO1xuICAgIGxldCBjb2x1bW4gPSBjb21wdXRlci5wb3NpdGlvbnNQcmV2SGl0W2NvbXBBdHRhY2tJbmRleF1bMV07XG4gICAgbGV0IHRhcmdldENlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgXCIudXNlci1ib2FyZCBkaXZbZGF0YS14LWluZGV4PSdcIiArIHJvdyArIFwiJ11cIiArIFwiW2RhdGEteS1pbmRleD0nXCIgKyBjb2x1bW4gKyBcIiddXCIsXG4gICAgKTtcbiAgICBpZiAocGxheWVyMUdhbWVib2FyZC5taXNzZWRTaG90c1tyb3ddW2NvbHVtbl0pIHtcbiAgICAgIHRhcmdldENlbGwuY2xhc3NMaXN0LmFkZCgnbWlzcycpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YXJnZXRDZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ3VzZXJTaGlwcycpO1xuICAgICAgdGFyZ2V0Q2VsbC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcbiAgICB9XG4gICAgY29tcEF0dGFja0luZGV4Kys7XG4gICAgY2hlY2tXaW5uZXIoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjaGVja1dpbm5lcigpIHtcbiAgaWYgKHBsYXllcjFHYW1lYm9hcmQuaXNHYW1lT3ZlcigpKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lc3NhZ2VzJykudGV4dENvbnRlbnQgPSAnVGhlIENvbXB1dGVyIFdvbic7XG4gIH0gZWxzZSBpZiAoY29tcHV0ZXJHYW1lYm9hcmQuaXNHYW1lT3ZlcigpKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lc3NhZ2VzJykudGV4dENvbnRlbnQgPSAnWW91IHdvbiEnO1xuICB9XG59XG5cbmNvbnN0IHNoaXBQbGFjZW1lbnREaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2hpcC1wbGFjZW1lbnQnKTtcbmNvbnN0IHJhbmRvbVNoaXBzQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3JhbmRvbVNoaXBzQnRuJyk7XG5yYW5kb21TaGlwc0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgc3RhcnRHYW1lKCk7XG4gIHNoaXBQbGFjZW1lbnREaXYuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbn0pO1xuXG5leHBvcnQgeyBnYW1lTG9vcCB9O1xuIiwiY29uc3QgcGxheWVyID0gZnVuY3Rpb24gcGxheWVyKG5hbWUpIHtcbiAgY29uc3QgcG9zaXRpb25zUHJldkhpdCA9IFtdO1xuXG4gIGNvbnN0IGF0dGFjayA9IGZ1bmN0aW9uIGF0dGFjayhyb3csIGNvbHVtbiwgZ2FtZWJvYXJkKSB7XG4gICAgaWYgKGhhc1Bvc2l0aW9uQmVlblByZXZIaXQocm93LCBjb2x1bW4pKSByZXR1cm47XG4gICAgcG9zaXRpb25zUHJldkhpdC5wdXNoKFtyb3csIGNvbHVtbl0pO1xuICAgIGdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHJvdywgY29sdW1uKTtcbiAgfTtcblxuICBjb25zdCByYW5kb21BdHRhY2sgPSBmdW5jdGlvbiByYW5kb21BdHRhY2soZ2FtZWJvYXJkKSB7XG4gICAgaWYgKHBvc2l0aW9uc1ByZXZIaXQubGVuZ3RoID09PSAxMDApIHJldHVybjtcblxuICAgIGxldCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgbGV0IGNvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcblxuICAgIC8vIElmIHBvc2l0aW9uIGhhcyBiZWVuIGhpdCwgZG8gdGhlIHJhbmRvbWl6YXRpb24gYWdhaW5cbiAgICB3aGlsZSAoaGFzUG9zaXRpb25CZWVuUHJldkhpdChyb3csIGNvbHVtbikpIHtcbiAgICAgIHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGNvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICB9XG5cbiAgICBwb3NpdGlvbnNQcmV2SGl0LnB1c2goW3JvdywgY29sdW1uXSk7XG4gICAgZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2socm93LCBjb2x1bW4pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGhhc1Bvc2l0aW9uQmVlblByZXZIaXQocm93LCBjb2x1bW4pIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBvc2l0aW9uc1ByZXZIaXQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChwb3NpdGlvbnNQcmV2SGl0W2ldWzBdID09PSByb3cgJiYgcG9zaXRpb25zUHJldkhpdFtpXVsxXSA9PT0gY29sdW1uKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG5hbWUsXG4gICAgcG9zaXRpb25zUHJldkhpdCxcbiAgICBhdHRhY2ssXG4gICAgcmFuZG9tQXR0YWNrLFxuICB9O1xufTtcblxuZXhwb3J0IHsgcGxheWVyIH07XG4iLCJjb25zdCBzaGlwID0gZnVuY3Rpb24gc2hpcChuYW1lLCBsZW5ndGgpIHtcbiAgbGV0IGhpdHMgPSBbXTtcbiAgcmV0dXJuIHtcbiAgICBnZXQgbmFtZSgpIHtcbiAgICAgIHJldHVybiBuYW1lO1xuICAgIH0sXG4gICAgZ2V0IGxlbmd0aCgpIHtcbiAgICAgIHJldHVybiBsZW5ndGg7XG4gICAgfSxcbiAgICBnZXQgaGl0cygpIHtcbiAgICAgIHJldHVybiBbLi4uaGl0c107XG4gICAgfSxcbiAgICBpc1N1bms6ICgpID0+IHtcbiAgICAgIGlmIChoaXRzLmxlbmd0aCA9PT0gbGVuZ3RoKSByZXR1cm4gdHJ1ZTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuICAgIGhpdDogKHRhcmdldCkgPT4ge1xuICAgICAgaWYgKGhpdHMuaW5jbHVkZXModGFyZ2V0KSB8fCB0YXJnZXQgPCAwIHx8IHRhcmdldCA+PSBsZW5ndGgpIHJldHVybjtcbiAgICAgIGhpdHMucHVzaCh0YXJnZXQpO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgeyBzaGlwIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3NjcmlwdHMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=