"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
	function Game(state) {
		_classCallCheck(this, Game);

		var boardSize = Board.size;
		if (state) {
			boardSize = Math.sqrt(state.board.length);
			this.reset(boardSize);

			this.board.setCellValues(state.board);
			var tokenPos = this.board.findTokenPosition();
			this.token.set(tokenPos[0], tokenPos[1]);

			this.player1.direction = state.direction1;
			this.player2.direction = !state.direction1;
			this.player1.score = state.score1;
			this.player2.score = state.score2;

			this.turn = state.turn;
			this.started = state.started;
			this.isOver = state.isOver;
		} else {
			this.reset(boardSize);
		}
	}

	_createClass(Game, [{
		key: "reset",
		value: function reset(boardSize) {
			this.board = new Board(boardSize);
			this.token = new Token(boardSize);
			this.board.update(this.token);
			this.player1 = new Player();
			this.player2 = new Agent();
			this.lastValue = 0;
			this.turn = true; // player 1
			this.started = false;
			this.isOver = false;
			this.status = 0; //0: resting, 1: moving token
		}
	}, {
		key: "moveToken",
		value: function moveToken(rowIndex, colIndex) {
			this.token.moveTo(rowIndex, colIndex);
			if (!this.started) {
				var direction = void 0;
				if (this.token.oldRowIndex === this.token.rowIndex) direction = false;else if (this.token.oldColIndex === this.token.colIndex) direction = true;

				if (this.turn) {
					this.player1.direction = direction;
					this.player2.direction = !direction;
				} else {
					this.player2.direction = direction;
					this.player1.direction = !direction;
				}
				this.started = !this.started;
			}
		}
	}, {
		key: "takeCell",
		value: function takeCell() {
			this.lastValue = this.board.takeCurrentValue(this.token);
		}
	}, {
		key: "updateBoard",
		value: function updateBoard() {
			this.board.update(this.token);
		}
	}, {
		key: "updateScores",
		value: function updateScores() {
			if (this.turn) {
				this.player1.incrementScore(this.lastValue);
			} else {
				this.player2.incrementScore(this.lastValue);
			}
		}
	}, {
		key: "passToken",
		value: function passToken() {
			this.turn = !this.turn;
		}
	}, {
		key: "canContinue",
		value: function canContinue() {
			return this.board.isNextTurnPossible(this.turn ? this.player1 : this.player2, this.token);
		}
	}, {
		key: "getCurrentPlayer",
		value: function getCurrentPlayer() {
			return this.turn ? this.player1 : this.player2;
		}
	}, {
		key: "getNextPlayer",
		value: function getNextPlayer() {
			return this.turn ? this.player2 : this.player1;
		}
	}, {
		key: "serialize",
		value: function serialize() {
			return {
				isOver: this.isOver,
				score1: this.player1.score,
				score2: this.player2.score,
				turn: this.turn,
				started: this.started,
				direction1: this.player1.direction,
				board: this.board.serialize()
			};
		}
	}]);

	return Game;
}();

var Player = function () {
	function Player() {
		_classCallCheck(this, Player);

		this.score = 0;
		this.direction = null; // Direction is set once the game starts
	}

	_createClass(Player, [{
		key: "incrementScore",
		value: function incrementScore(value) {
			this.score += value;
		}
	}]);

	return Player;
}();

var Agent = function (_Player) {
	_inherits(Agent, _Player);

	function Agent() {
		_classCallCheck(this, Agent);

		return _possibleConstructorReturn(this, (Agent.__proto__ || Object.getPrototypeOf(Agent)).call(this));
	}

	_createClass(Agent, [{
		key: "maxCell",
		value: function maxCell(token, boardMatrix) {
			// direction: true vertical, false horizontal
			// Simply select the cell with the highest value
			var nBoardMatrix = boardMatrix;
			var nTokenColIndex = token.colIndex;

			if (!this.direction) {
				nBoardMatrix = rotateClockwise(boardMatrix);
				var indices = rotateIndicesClockwise(token.rowIndex, token.colIndex, nBoardMatrix.length);
				nTokenColIndex = indices[1];
			}

			var indexMaxValue = -1;
			var maxValue = -1;
			for (var i = 0; i < nBoardMatrix.length; i++) {
				var cell = nBoardMatrix[i][nTokenColIndex];
				if (cell > maxValue) {
					maxValue = cell;
					indexMaxValue = i;
				}
			}

			if (maxValue > 0) {
				if (!this.direction) {
					return rotateIndicesCounterClockwise(indexMaxValue, nTokenColIndex, nBoardMatrix.length);
				}
				return [indexMaxValue, nTokenColIndex];
			}

			return [-1, -1];
		}
	}, {
		key: "maxGain",
		value: function maxGain(token, boardMatrix) {
			// direction: true vertical, false horizontal
			// Get the cell with highest gain with respect to next turn
			var nBoardMatrix = boardMatrix;
			var nTokenColIndex = token.colIndex;
			var nTokenRowIndex = token.rowIndex;

			if (!this.direction) {
				nBoardMatrix = rotateClockwise(nBoardMatrix);
				var indices = rotateIndicesClockwise(token.rowIndex, token.colIndex, nBoardMatrix.length);
				nTokenRowIndex = indices[0];
				nTokenColIndex = indices[1];
			}

			var gainsMatrix = getGainsMatrix(nTokenColIndex, nBoardMatrix);
			var indexBestGain = getBestGain(nTokenRowIndex, nTokenColIndex, gainsMatrix, nBoardMatrix);

			var position = [-1, -1];
			if (indexBestGain >= 0) {
				if (!this.direction) {
					position = rotateIndicesCounterClockwise(indexBestGain, nTokenColIndex, nBoardMatrix.length);
				} else {
					position = [indexBestGain, nTokenColIndex];
				}
			}

			// if(boardMatrix[position[0]][position[1]] <= 0) {
			// 	debugger;
			// }

			return position;
		}
	}]);

	return Agent;
}(Player);

var Token = function () {
	function Token(boardSize) {
		_classCallCheck(this, Token);

		// random position
		this.rowIndex = randomInteger(0, boardSize - 1);
		this.colIndex = randomInteger(0, boardSize - 1);
		this.oldRowIndex = this.rowIndex;
		this.oldColIndex = this.colIndex;
	}

	_createClass(Token, [{
		key: "moveTo",
		value: function moveTo(rowIndex, colIndex) {
			this.oldRowIndex = this.rowIndex;
			this.oldColIndex = this.colIndex;
			this.rowIndex = rowIndex;
			this.colIndex = colIndex;
		}
	}, {
		key: "set",
		value: function set(rowIndex, colIndex) {
			this.rowIndex = rowIndex;
			this.colIndex = colIndex;
			this.oldRowIndex = this.rowIndex;
			this.oldColIndex = this.colIndex;
		}
	}]);

	return Token;
}();

var Cell = function () {
	// Value is a number between 1 and 9 when the cell
	// has not been taken by a player yet
	// Value is 0 if it is the wildcard
	// Value is -1 if it was taken in a previous turn
	function Cell(value, rowIndex, colIndex) {
		_classCallCheck(this, Cell);

		this.value = value || 0;
		this.rowIndex = rowIndex;
		this.colIndex = colIndex;
	}

	_createClass(Cell, [{
		key: "update",
		value: function update(value) {
			this.value = value;
		}
	}, {
		key: "isSelectable",
		value: function isSelectable() {
			return this.value > 0;
		}
	}]);

	return Cell;
}();

var Board = function () {
	function Board(boardSize) {
		_classCallCheck(this, Board);

		this.cells = [];
		for (var i = 0; i < boardSize; i++) {
			var row = [];
			for (var j = 0; j < boardSize; j++) {
				row.push(new Cell(randomInteger(1, 9), i, j));
			}
			this.cells.push(row);
		}
	}

	_createClass(Board, [{
		key: "isCellSelectable",
		value: function isCellSelectable(rowIndex, colIndex) {
			return this.cells[rowIndex][colIndex].isSelectable();
		}
	}, {
		key: "update",
		value: function update(token) {
			// The old position has to be set to -1
			this.cells[token.oldRowIndex][token.oldColIndex].update(-1);
			// The current position has to be set to 0
			this.cells[token.rowIndex][token.colIndex].update(0);
		}
	}, {
		key: "takeCurrentValue",
		value: function takeCurrentValue(token) {
			return this.cells[token.rowIndex][token.colIndex].value;
		}
	}, {
		key: "isNextTurnPossible",
		value: function isNextTurnPossible(player, token) {
			var tokenRowIndex = token.rowIndex;
			var tokenColIndex = token.colIndex;
			var direction = player.direction;
			if (direction) {
				for (var i = 0; i < Board.size; i++) {
					var cell = this.cells[i][tokenColIndex];
					if (cell.value > 0) return true;
				}
			} else {
				for (var _i = 0; _i < Board.size; _i++) {
					var _cell = this.cells[tokenRowIndex][_i];
					if (_cell.value > 0) return true;
				}
			}
			return false;
		}
	}, {
		key: "setCellValues",
		value: function setCellValues(values) {
			var size = Math.sqrt(values.length);
			this.cells.forEach(function (row, rowIndex) {
				row.forEach(function (cell, columnIndex) {
					cell.update(values[rowIndex * size + columnIndex]);
				});
			});
		}
	}, {
		key: "findTokenPosition",
		value: function findTokenPosition() {
			for (var i = 0; i < this.cells.length; i++) {
				for (var j = 0; j < this.cells.length; j++) {
					if (this.cells[i][j].value === 0) {
						return [i, j];
					}
				}
			}
			return [-1, -1];
		}
	}, {
		key: "serialize",
		value: function serialize() {
			var values = [];
			this.cells.forEach(function (row) {
				row.forEach(function (cell) {
					values.push(cell.value);
				});
			});

			return values;
		}
	}, {
		key: "asMatrix",
		value: function asMatrix() {
			var size = this.cells.length;
			var matrix = [];
			for (var i = 0; i < size; i++) {
				var row = [];
				for (var j = 0; j < size; j++) {
					row.push(this.cells[i][j].value);
				}
				matrix.push(row);
			}
			return matrix;
		}
	}]);

	return Board;
}();

Board.size = 8;

function randomInteger(min, max) {
	var r = Math.random();
	return min + Math.round(r * (max - min));
}

function rotateClockwise(matrix) {
	var size = matrix.length;
	var newMatrix = [];
	for (var i = 0; i < size; i++) {
		var row = [];
		for (var j = 0; j < size; j++) {
			row.push(matrix[size - j - 1][i]);
		}
		newMatrix.push(row);
	}

	return newMatrix;
}

function rotateCounterClockwise(matrix) {
	var size = matrix.length;
	var newMatrix = [];
	for (var i = 0; i < size; i++) {
		var row = [];
		for (var j = 0; j < size; j++) {
			row.push(matrix[j][size - i - 1]);
		}
		newMatrix.push(row);
	}

	return newMatrix;
}

function rotateIndicesClockwise(rowIndex, colIndex, size) {
	return [colIndex, size - rowIndex - 1];
}

function rotateIndicesCounterClockwise(rowIndex, colIndex, size) {
	return [size - colIndex - 1, rowIndex];
}

function getGainsMatrix(tokenColIndex, gameMatrix) {
	// Assume the direction is vertical, so the agent
	// selects over a column
	var size = gameMatrix.length;
	var gainsMatrix = [];
	var nGameMatrix = gameMatrix;
	var nTokenColIndex = tokenColIndex;

	for (var i = 0; i < size; i++) {
		var row = [];
		for (var j = 0; j < size; j++) {
			if (nGameMatrix[i][nTokenColIndex] <= 0) {
				row.push(0);
			} else {
				row.push(nGameMatrix[i][nTokenColIndex] - nGameMatrix[i][j]);
			}
		}
		gainsMatrix.push(row);
	}

	return gainsMatrix;
}

function getBestGain(tokenRowIndex, tokenColIndex, gainsMatrix, boardMatrix) {
	// assume the direction is vertical
	var size = gainsMatrix.length;
	var minGains = [];

	// get the min gains in every row
	for (var i = 0; i < size; i++) {
		var minGain = null;
		for (var j = 0; j < size; j++) {
			if (j === tokenColIndex) {
				// avoid the column of the token
				continue;
			}
			if (minGain === null || minGain > gainsMatrix[i][j]) {
				minGain = gainsMatrix[i][j];
			}
		}
		minGains.push(minGain);
	}

	// obtain the index of the max gain
	var rowIndex = -1;
	var maxGain = null;
	for (var _i2 = 0; _i2 < size; _i2++) {
		// The token has to move to other position: tokenRowIndex !== i
		// Also, a cell has to be in the position: boardMatrix[i][tokenColIndex] > 0
		if ((maxGain === null || maxGain < minGains[_i2]) && tokenRowIndex !== _i2 && boardMatrix[_i2][tokenColIndex] > 0) {
			maxGain = minGains[_i2];
			rowIndex = _i2;
		}
	}

	return rowIndex;
}