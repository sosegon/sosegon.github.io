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

	function Agent(direction) {
		_classCallCheck(this, Agent);

		return _possibleConstructorReturn(this, (Agent.__proto__ || Object.getPrototypeOf(Agent)).call(this, direction));
	}

	_createClass(Agent, [{
		key: "maxCell",
		value: function maxCell(token, board) {
			// direction: true vertical, false horizontal
			// Simply select the cell with the highest value
			var tokenRowIndex = token.rowIndex;
			var tokenColIndex = token.colIndex;
			if (this.direction) {
				var indexMaxValue = -1;
				var maxValue = -1;
				for (var i = 0; i < Board.size; i++) {
					var cell = board.cells[i][tokenColIndex];
					if (cell.value > maxValue) {
						maxValue = cell.value;
						indexMaxValue = i;
					}
				}
				if (maxValue > 0) {
					return [indexMaxValue, tokenColIndex];
				}
			} else {
				var _indexMaxValue = -1;
				var _maxValue = -1;
				for (var _i = 0; _i < Board.size; _i++) {
					var _cell = board.cells[tokenRowIndex][_i];
					if (_cell.value > _maxValue) {
						_maxValue = _cell.value;
						_indexMaxValue = _i;
					}
				}
				if (_maxValue > 0) {
					return [tokenRowIndex, _indexMaxValue];
				}
			}

			return [-1, -1];
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
				for (var _i2 = 0; _i2 < Board.size; _i2++) {
					var _cell2 = this.cells[tokenRowIndex][_i2];
					if (_cell2.value > 0) return true;
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
	}]);

	return Board;
}();

Board.size = 6;

function randomInteger(min, max) {
	var r = Math.random();
	return min + Math.round(r * (max - min));
}