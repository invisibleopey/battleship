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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************************!*\
  !*** ./src/scripts/index.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOOEI7QUFDVTtBQUNOO0FBQ2tCOztBQUVwRCxnQkFBZ0IsK0NBQU07QUFDdEIsaUJBQWlCLCtDQUFNO0FBQ3ZCLHlCQUF5QixxREFBUztBQUNsQywwQkFBMEIscURBQVM7QUFDbkM7QUFDQTtBQUNBLGlFQUFlO0FBQ2YsaUVBQWUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvZG9tLWludGVyYWN0aW9uLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHJlbmRlckdhbWVib2FyZChnYW1lYm9hcmQsIG93bmVyKSB7XG4gIGxldCBjb250YWluZXI7XG4gIGlmIChvd25lciA9PT0gJ3BsYXllcjEnKSB7XG4gICAgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVzZXItYm9hcmQnKTtcbiAgfSBlbHNlIGlmIChvd25lciA9PT0gJ2NvbXB1dGVyJykge1xuICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21wdXRlci1ib2FyZCcpO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZWJvYXJkLmJvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBnYW1lYm9hcmQuYm9hcmRbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoJ2NlbGxzJyk7XG4gICAgICBkaXYuZGF0YXNldC54SW5kZXggPSBbaV07XG4gICAgICBkaXYuZGF0YXNldC55SW5kZXggPSBbal07XG5cbiAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgeyByZW5kZXJHYW1lYm9hcmQgfTtcbiIsImltcG9ydCB7IHNoaXAgfSBmcm9tICcuLi9zY3JpcHRzL3NoaXAnO1xuXG5jb25zdCBHYW1lYm9hcmQgPSAoKSA9PiB7XG4gIC8vIENyZWF0ZSBhIDEwIHggMTAgYm9hcmRcbiAgY29uc3Qgd2lkdGggPSAxMDtcbiAgY29uc3QgaGVpZ2h0ID0gMTA7XG4gIGxldCBib2FyZCA9IG5ldyBBcnJheSh3aWR0aCkuZmlsbChudWxsKS5tYXAoKHgpID0+IG5ldyBBcnJheShoZWlnaHQpLmZpbGwobnVsbCkpO1xuICBsZXQgbWlzc2VkU2hvdHMgPSBuZXcgQXJyYXkod2lkdGgpLmZpbGwoZmFsc2UpLm1hcCgoeCkgPT4gbmV3IEFycmF5KGhlaWdodCkuZmlsbChmYWxzZSkpO1xuXG4gIC8vIFBsYWNlIHNoaXBzXG4gIGNvbnN0IHBsYWNlU2hpcCA9IGZ1bmN0aW9uIHBsYWNlU2hpcChzaGlwLCByb3csIGNvbHVtbiwgaXNWZXJ0aWNhbCkge1xuICAgIGlmICghaXNQbGFjZW1lbnRQb3NzaWJsZShzaGlwLCByb3csIGNvbHVtbiwgaXNWZXJ0aWNhbCkpIHJldHVybiBmYWxzZTtcblxuICAgIGlmIChpc1ZlcnRpY2FsKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYm9hcmRbcm93ICsgaV1bY29sdW1uXSA9IHNoaXA7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBib2FyZFtyb3ddW2NvbHVtbiArIGldID0gc2hpcDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgLy8gSW5pdGlhbGl6ZSB0aGUgc2hpcHMgdGhhdCB3aWxsIGJlIG5lZWRlZFxuICBjb25zdCBzaGlwcyA9IFtdO1xuICBjb25zdCBjYXJyaWVyID0gbmV3IHNoaXAoJ2NhcnJpZXInLCA1KTtcbiAgY29uc3QgYmF0dGxlc2hpcCA9IG5ldyBzaGlwKCdiYXR0bGVzaGlwJywgNCk7XG4gIGNvbnN0IGRlc3Ryb3llciA9IG5ldyBzaGlwKCdkZXN0cm95ZXInLCAzKTtcbiAgY29uc3Qgc3VibWFyaW5lID0gbmV3IHNoaXAoJ3N1Ym1hcmluZScsIDMpO1xuICBjb25zdCBwYXRyb2xCb2F0ID0gbmV3IHNoaXAoJ3BhdHJvbEJvYXQnLCAyKTtcbiAgc2hpcHMucHVzaChjYXJyaWVyLCBiYXR0bGVzaGlwLCBkZXN0cm95ZXIsIHN1Ym1hcmluZSwgcGF0cm9sQm9hdCk7XG5cbiAgLy8gUmFuZG9tbHkgcGxhY2Ugc2hpcHNcbiAgY29uc3QgcGxhY2VTaGlwc1JhbmRvbWx5ID0gZnVuY3Rpb24gcGxhY2VTaGlwc1JhbmRvbWx5KCkge1xuICAgIGlmICghaXNFbXB0eSgpKSByZXR1cm47XG5cbiAgICBsZXQgc3VjY2VzZnVsUGxhY2VtZW50cyA9IDA7XG5cbiAgICB3aGlsZSAoc3VjY2VzZnVsUGxhY2VtZW50cyA8IDUpIHtcbiAgICAgIGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGNvbnN0IGNvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGNvbnN0IGlzVmVydGljYWwgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKSA9PT0gMSA/IHRydWUgOiBmYWxzZTtcblxuICAgICAgaWYgKHBsYWNlU2hpcChzaGlwc1tzdWNjZXNmdWxQbGFjZW1lbnRzXSwgcm93LCBjb2x1bW4sIGlzVmVydGljYWwpKSBzdWNjZXNmdWxQbGFjZW1lbnRzKys7XG4gICAgfVxuICB9O1xuXG4gIGZ1bmN0aW9uIGlzUGxhY2VtZW50UG9zc2libGUoc2hpcCwgcm93LCBjb2x1bW4sIGlzVmVydGljYWwpIHtcbiAgICAvLyBJcyBpdCBvdXQgb2YgdGhlIGdhbWVib2FyZFxuICAgIGlmIChyb3cgPCAwIHx8IHJvdyA+IGhlaWdodCAtIDEgfHwgY29sdW1uIDwgMCB8fCBjb2x1bW4gPiB3aWR0aCAtIDEpIHJldHVybiBmYWxzZTtcblxuICAgIC8vIElmIHNoaXAgZG9lc24ndCBmaXQgaW4gZ2FtZWJvYXJkXG4gICAgaWYgKGlzVmVydGljYWwpIHtcbiAgICAgIGlmIChyb3cgKyBzaGlwLmxlbmd0aCA+IDEwKSByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChjb2x1bW4gKyBzaGlwLmxlbmd0aCA+IDEwKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gQXJlIGFueSBvZiB0aGUgZmllbGRzIGFscmVhZHkgdGFrZW5cbiAgICBpZiAoaXNWZXJ0aWNhbCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChib2FyZFtyb3cgKyBpXVtjb2x1bW5dKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoYm9hcmRbcm93XVtjb2x1bW4gKyBpXSkgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFyZSBhbnkgb2YgdGhlIG5laWdoYm91ciBmaWVsZHMgYWxyZWFkeSB0YWtlblxuICAgIGlmIChpc1ZlcnRpY2FsKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgeCA9IC0xOyB4IDw9IDE7IHgrKykge1xuICAgICAgICAgIGZvciAobGV0IHkgPSAtMTsgeSA8PSAxOyB5KyspIHtcbiAgICAgICAgICAgIGlmIChyb3cgKyB4ICsgaSA8IDAgfHwgcm93ICsgeCArIGkgPj0gMTAgfHwgY29sdW1uICsgeSA8IDAgfHwgY29sdW1uICsgeSA+PSAxMClcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBpZiAoYm9hcmRbcm93ICsgeCArIGldW2NvbHVtbiArIHldKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBmb3IgKGxldCB4ID0gLTE7IHggPD0gMTsgeCsrKSB7XG4gICAgICAgICAgZm9yIChsZXQgeSA9IC0xOyB5IDw9IDE7IHkrKykge1xuICAgICAgICAgICAgaWYgKHJvdyArIHggPCAwIHx8IHJvdyArIHggPj0gMTAgfHwgY29sdW1uICsgeSArIGkgPCAwIHx8IGNvbHVtbiArIHkgKyBpID49IDEwKVxuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGlmIChib2FyZFtyb3cgKyB4XVtjb2x1bW4gKyB5ICsgaV0pIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiBpc0VtcHR5KCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIGlmIChib2FyZFtpXVtqXSAhPT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEVtcHR5RmllbGRzQW1vdW50KCkge1xuICAgIGxldCB0b3RhbCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgaWYgKGJvYXJkW2ldW2pdID09PSBudWxsKSB0b3RhbCsrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdG90YWw7XG4gIH1cblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gZnVuY3Rpb24gcmVjZWl2ZUF0dGFjayhyb3csIGNvbHVtbikge1xuICAgIGlmIChyb3cgPCAwIHx8IHJvdyA+PSAxMCB8fCBjb2x1bW4gPCAwIHx8IGNvbHVtbiA+PSAxMCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChib2FyZFtyb3ddW2NvbHVtbl0pIHtcbiAgICAgIGxldCBoaXRJbmRleCA9IDA7XG4gICAgICAvLyBJZiBzaGlwIGlzIHZlcnRpY2FsXG4gICAgICBpZiAoY29sdW1uID4gMCAmJiBib2FyZFtyb3ddW2NvbHVtbiAtIDFdKSB7XG4gICAgICAgIGxldCBpID0gMTtcbiAgICAgICAgd2hpbGUgKGNvbHVtbiAtIGkgPj0gMCAmJiBib2FyZFtyb3ddW2NvbHVtbiAtIGldKSB7XG4gICAgICAgICAgaGl0SW5kZXgrKztcbiAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIElmIHNoaXAgaXMgaG9yaXpvbnRhbFxuICAgICAgZWxzZSBpZiAocm93ID4gMCAmJiBib2FyZFtyb3cgLSAxXVtjb2x1bW5dKSB7XG4gICAgICAgIGxldCBpID0gMTtcbiAgICAgICAgd2hpbGUgKHJvdyAtIGkgPj0gMCAmJiBib2FyZFtyb3cgLSBpXVtjb2x1bW5dKSB7XG4gICAgICAgICAgaGl0SW5kZXgrKztcbiAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGJvYXJkW3Jvd11bY29sdW1uXS5oaXQoaGl0SW5kZXgpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1pc3NlZFNob3RzW3Jvd11bY29sdW1uXSA9IHRydWU7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIGZ1bmN0aW9uIGlzR2FtZU92ZXIoKSB7XG4gICAgbGV0IGFyZVNoaXBzT25Cb2FyZCA9IGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIGlmIChib2FyZFtpXVtqXSkge1xuICAgICAgICAgIGFyZVNoaXBzT25Cb2FyZCA9IHRydWU7XG4gICAgICAgICAgaWYgKCFib2FyZFtpXVtqXS5pc1N1bmsoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJlU2hpcHNPbkJvYXJkID8gdHJ1ZSA6IGZhbHNlO1xuICB9XG5cbiAgLy8gVGhlIGludGVyZmFjZSBmdW5jdGlvbnMgYW5kIHByb3BlcnRpZXMgdG8gYmUgcmV0dXJuZWRcbiAgcmV0dXJuIHtcbiAgICBib2FyZCxcbiAgICBwbGFjZVNoaXAsXG4gICAgcGxhY2VTaGlwc1JhbmRvbWx5LFxuICAgIGdldEVtcHR5RmllbGRzQW1vdW50LFxuICAgIGlzUGxhY2VtZW50UG9zc2libGUsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBtaXNzZWRTaG90cyxcbiAgICBpc0dhbWVPdmVyLFxuICB9O1xufTtcblxuZXhwb3J0IHsgR2FtZWJvYXJkIH07XG4iLCJjb25zdCBwbGF5ZXIgPSBmdW5jdGlvbiBwbGF5ZXIobmFtZSkge1xuICBjb25zdCBwb3NpdGlvbnNQcmV2SGl0ID0gW107XG5cbiAgY29uc3QgYXR0YWNrID0gZnVuY3Rpb24gYXR0YWNrKHJvdywgY29sdW1uLCBnYW1lYm9hcmQpIHtcbiAgICBpZiAoaGFzUG9zaXRpb25CZWVuUHJldkhpdChyb3csIGNvbHVtbikpIHJldHVybjtcbiAgICBwb3NpdGlvbnNQcmV2SGl0LnB1c2goW3JvdywgY29sdW1uXSk7XG4gICAgZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2socm93LCBjb2x1bW4pO1xuICB9O1xuXG4gIGNvbnN0IHJhbmRvbUF0dGFjayA9IGZ1bmN0aW9uIHJhbmRvbUF0dGFjayhnYW1lYm9hcmQpIHtcbiAgICBpZiAocG9zaXRpb25zUHJldkhpdC5sZW5ndGggPT09IDEwMCkgcmV0dXJuO1xuXG4gICAgbGV0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBsZXQgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuXG4gICAgLy8gSWYgcG9zaXRpb24gaGFzIGJlZW4gaGl0LCBkbyB0aGUgcmFuZG9taXphdGlvbiBhZ2FpblxuICAgIHdoaWxlIChoYXNQb3NpdGlvbkJlZW5QcmV2SGl0KHJvdywgY29sdW1uKSkge1xuICAgICAgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIH1cblxuICAgIHBvc2l0aW9uc1ByZXZIaXQucHVzaChbcm93LCBjb2x1bW5dKTtcbiAgICBnYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNvbHVtbik7XG4gIH07XG5cbiAgZnVuY3Rpb24gaGFzUG9zaXRpb25CZWVuUHJldkhpdChyb3csIGNvbHVtbikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9zaXRpb25zUHJldkhpdC5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHBvc2l0aW9uc1ByZXZIaXRbaV1bMF0gPT09IHJvdyAmJiBwb3NpdGlvbnNQcmV2SGl0W2ldWzFdID09PSBjb2x1bW4pIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbmFtZSxcbiAgICBwb3NpdGlvbnNQcmV2SGl0LFxuICAgIGF0dGFjayxcbiAgICByYW5kb21BdHRhY2ssXG4gIH07XG59O1xuXG5leHBvcnQgeyBwbGF5ZXIgfTtcbiIsImNvbnN0IHNoaXAgPSBmdW5jdGlvbiBzaGlwKG5hbWUsIGxlbmd0aCkge1xuICBsZXQgaGl0cyA9IFtdO1xuICByZXR1cm4ge1xuICAgIGdldCBuYW1lKCkge1xuICAgICAgcmV0dXJuIG5hbWU7XG4gICAgfSxcbiAgICBnZXQgbGVuZ3RoKCkge1xuICAgICAgcmV0dXJuIGxlbmd0aDtcbiAgICB9LFxuICAgIGdldCBoaXRzKCkge1xuICAgICAgcmV0dXJuIFsuLi5oaXRzXTtcbiAgICB9LFxuICAgIGlzU3VuazogKCkgPT4ge1xuICAgICAgaWYgKGhpdHMubGVuZ3RoID09PSBsZW5ndGgpIHJldHVybiB0cnVlO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG4gICAgaGl0OiAodGFyZ2V0KSA9PiB7XG4gICAgICBpZiAoaGl0cy5pbmNsdWRlcyh0YXJnZXQpIHx8IHRhcmdldCA8IDAgfHwgdGFyZ2V0ID49IGxlbmd0aCkgcmV0dXJuO1xuICAgICAgaGl0cy5wdXNoKHRhcmdldCk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCB7IHNoaXAgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgc2hpcCB9IGZyb20gJy4vc2hpcCc7XG5pbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tICcuL2dhbWVib2FyZCc7XG5pbXBvcnQgeyBwbGF5ZXIgfSBmcm9tICcuL3BsYXllcic7XG5pbXBvcnQgeyByZW5kZXJHYW1lYm9hcmQgfSBmcm9tICcuL2RvbS1pbnRlcmFjdGlvbic7XG5cbmNvbnN0IHBsYXllcjEgPSBwbGF5ZXIoJ1VzZXInKTtcbmNvbnN0IGNvbXB1dGVyID0gcGxheWVyKCdDb21wdXRlcicpO1xuY29uc3QgcGxheWVyMUdhbWVib2FyZCA9IEdhbWVib2FyZCgpO1xuY29uc3QgY29tcHV0ZXJHYW1lYm9hcmQgPSBHYW1lYm9hcmQoKTtcbnBsYXllcjFHYW1lYm9hcmQucGxhY2VTaGlwc1JhbmRvbWx5KCk7XG5jb21wdXRlckdhbWVib2FyZC5wbGFjZVNoaXBzUmFuZG9tbHkoKTtcbnJlbmRlckdhbWVib2FyZChwbGF5ZXIxR2FtZWJvYXJkLCAncGxheWVyMScpO1xucmVuZGVyR2FtZWJvYXJkKGNvbXB1dGVyR2FtZWJvYXJkLCAnY29tcHV0ZXInKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==