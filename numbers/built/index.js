'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameView = function (_React$Component) {
	_inherits(GameView, _React$Component);

	function GameView(props) {
		_classCallCheck(this, GameView);

		var _this = _possibleConstructorReturn(this, (GameView.__proto__ || Object.getPrototypeOf(GameView)).call(this, props));

		_this.setup();
		return _this;
	}

	_createClass(GameView, [{
		key: 'setup',
		value: function setup() {
			this.storageManager = new LocalStorageManager();
			var previousState = this.storageManager.getGameState();
			var game = new Game(previousState);
			this.state = { game: game };
		}
	}, {
		key: 'reset',
		value: function reset() {
			var game = new Game();
			this.setState({ game: game });
		}
	}, {
		key: 'handleKeyDown',
		value: function handleKeyDown(event) {
			if (this.state.direction !== null) return;
			event.preventDefault();
			if (event.keyCode === 38 || event.keyCode === 40) {
				this.state.direction = true;
			} else if (event.keyCode === 37 || event.keyCode === 39) {
				this.state.direction = false;
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			window.addEventListener('keydown', this.handleKeyDown.bind(this));
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			window.removeEventListener('keydown', this.handleKeyDown.bind(this));
		}
	}, {
		key: 'moveToken',
		value: function moveToken(rowIndex, colIndex) {
			this.state.game.moveToken(rowIndex, colIndex);
			this.state.game.takeCell();
			this.state.game.status = 1;
			this.setState({ game: this.state.game });
		}
	}, {
		key: 'updateScores',
		value: function updateScores() {
			this.state.game.updateScores();
			this.state.game.updateBoard();
			this.state.game.passToken();
			this.state.game.status = 0;
			this.setState({ game: this.state.game });
		}
	}, {
		key: 'finishGame',
		value: function finishGame() {
			this.state.game.isOver = true;
			this.setState({ game: this.state.game });
		}
	}, {
		key: 'saveGameState',
		value: function saveGameState() {
			this.storageManager.setGameState(this.state.game.serialize());
		}
	}, {
		key: 'render',
		value: function render() {
			if (this.state.game.status === 0 && this.state.game.turn || this.state.game.isOver) {
				// not moving token and human turn or game is over
				this.saveGameState();
			}
			var currentGame = this.state.game;
			var gameView = this;
			var cells = this.state.game.board.cells.map(function (row, rowIndex) {
				return React.createElement(
					'div',
					null,
					row.map(function (col, colIndex) {
						return React.createElement(CellView, {
							cell: col,
							game: currentGame,
							gameView: gameView });
					})
				);
			});
			var wildCardCell = React.createElement(WildCardView, { cell: this.state.game.token });
			var scoreA = this.state.game.player1.score;
			var scoreB = this.state.game.player2.score;
			var scorePlayer = React.createElement(ScoreView, { score: scoreA, name: 'You' });
			var scoreAgent = React.createElement(ScoreView, { score: scoreB, name: 'AI' });
			var isOver = this.state.game.isOver;
			return React.createElement(
				'div',
				null,
				React.createElement(
					'div',
					{ className: 'buttons-container' },
					React.createElement(
						'button',
						{ className: 'tryAgain', onClick: this.reset.bind(this) },
						'Restart'
					)
				),
				React.createElement(
					'div',
					{ className: 'board' },
					wildCardCell,
					cells,
					React.createElement(GameEndOverlay, { game: this.state.game })
				),
				React.createElement(
					'div',
					{ className: 'scores-container' },
					scorePlayer,
					' ',
					scoreAgent
				)
			);
		}
	}]);

	return GameView;
}(React.Component);

var delay = 200;

var CellView = function (_React$Component2) {
	_inherits(CellView, _React$Component2);

	function CellView() {
		_classCallCheck(this, CellView);

		return _possibleConstructorReturn(this, (CellView.__proto__ || Object.getPrototypeOf(CellView)).apply(this, arguments));
	}

	_createClass(CellView, [{
		key: 'isSelectable',
		value: function isSelectable() {
			var rowIndex = this.props.cell.rowIndex;
			var colIndex = this.props.cell.colIndex;
			var tokenRowIndex = this.props.game.token.rowIndex;
			var tokenColIndex = this.props.game.token.colIndex;

			if (rowIndex === tokenRowIndex && colIndex === tokenColIndex) {
				// Cell of token is not selectable
				return false;
			}

			var direction = this.props.game.getCurrentPlayer().direction;
			var cellValue = this.props.cell.value;
			if (direction === null) {
				return (rowIndex === tokenRowIndex || colIndex === tokenColIndex) && cellValue > 0;
			} else if (direction === true) {
				return colIndex === tokenColIndex && cellValue > 0;
			} else if (direction === false) {
				return rowIndex === tokenRowIndex && cellValue > 0;
			}
			return false;
		}
	}, {
		key: 'moveToken',
		value: function moveToken(position) {
			this.props.gameView.moveToken(position[0], position[1]);
			return new Promise(function (resolve, reject) {
				setTimeout(function () {
					return resolve();
				}, delay);
			});
		}
	}, {
		key: 'updateScores',
		value: function updateScores() {
			var _this3 = this;

			this.props.gameView.updateScores();
			var game = this.props.game;
			return new Promise(function (resolve, reject) {
				if (game.canContinue()) {
					setTimeout(function () {
						return resolve();
					}, delay);
				} else {
					_this3.props.gameView.finishGame();
				}
			});
		}
	}, {
		key: 'pick',
		value: function pick() {
			var colIndex = this.props.cell.colIndex;
			var rowIndex = this.props.cell.rowIndex;
			var gameView = this.props.gameView;
			var game = this.props.game;

			var self = this;
			new Promise(function (resolve, reject) {
				if (self.isSelectable()) resolve([rowIndex, colIndex]);else {
					// TODO: Visual information
				}
			}).then(function (position) {
				return self.moveToken(position);
			}).then(function () {
				return self.updateScores();
			}).then(function () {
				var agent = game.getCurrentPlayer();
				return new Promise(function (resolve, reject) {
					var position = agent.maxCell(game.token, game.board);
					if (position[0] >= 0 && position[1] >= 0) {
						setTimeout(function () {
							return resolve(position);
						}, delay);
					}
				});
			}).then(function (position) {
				return self.moveToken(position);
			}).then(function () {
				return self.updateScores();
			});
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate() {
			return this.props.game.state !== 1;
		}
	}, {
		key: 'render',
		value: function render() {
			var value = this.props.cell.value;
			var hid = value <= 0;
			var isSelectable = this.isSelectable();
			var game = this.props.game;

			var generateClassName = function generateClassName(isSelectable, hid) {
				var classArray = ['cell'];
				if (isSelectable && game.turn) classArray.push('selectable');else if (isSelectable && !game.turn) classArray.push('agent');

				if (hid) classArray.push('hid');

				return classArray.join(' ');
			};
			return React.createElement(
				'span',
				{ className: generateClassName(isSelectable, hid), onClick: this.pick.bind(this) },
				value
			);
		}
	}]);

	return CellView;
}(React.Component);

var ScoreView = function (_React$Component3) {
	_inherits(ScoreView, _React$Component3);

	function ScoreView() {
		_classCallCheck(this, ScoreView);

		return _possibleConstructorReturn(this, (ScoreView.__proto__ || Object.getPrototypeOf(ScoreView)).apply(this, arguments));
	}

	_createClass(ScoreView, [{
		key: 'render',
		value: function render() {
			var score = this.props.score;
			var name = this.props.name;
			return React.createElement(
				'div',
				{ className: 'score-container' },
				React.createElement(
					'span',
					{ className: 'player-name' },
					name
				),
				React.createElement(
					'span',
					{ className: 'player-score' },
					score
				)
			);
		}
	}]);

	return ScoreView;
}(React.Component);

var WildCardView = function (_React$Component4) {
	_inherits(WildCardView, _React$Component4);

	function WildCardView() {
		_classCallCheck(this, WildCardView);

		return _possibleConstructorReturn(this, (WildCardView.__proto__ || Object.getPrototypeOf(WildCardView)).apply(this, arguments));
	}

	_createClass(WildCardView, [{
		key: 'render',
		value: function render() {
			var cell = this.props.cell;
			var classArray = ['wild-card'];
			classArray.push('position_' + cell.rowIndex + '_' + cell.colIndex);
			classArray.push('row_from_' + cell.oldRowIndex + '_to_' + cell.rowIndex);
			classArray.push('column_from_' + cell.oldColIndex + '_to_' + cell.colIndex);
			var classes = classArray.join(' ');
			return React.createElement(
				'span',
				{ className: classes },
				'\u2605'
			);
		}
	}]);

	return WildCardView;
}(React.Component);

var GameEndOverlay = function GameEndOverlay(_ref) {
	var game = _ref.game;

	var content = '';
	var scoreA = game.player1.score;
	var scoreB = game.player2.score;
	var gameEnd = game.isOver;
	if (gameEnd) {
		if (scoreA > scoreB) {
			content = 'You won';
		} else if (scoreA < scoreB) {
			content = 'You lose';
		} else {
			content = 'Draw';
		}
	}
	if (!content) {
		return null;
	}

	return React.createElement(
		'div',
		{ className: 'overlay' },
		React.createElement(
			'p',
			{ className: 'message' },
			content
		)
	);
};

var GameViewRendered = ReactDOM.render(React.createElement(GameView, null), document.getElementById('boardDiv'));

// Adjust the board to the device's screen
var rescale = function rescale(screenHeight, screenWidth) {
	var screenHeight = screen.height;
	var screenWidth = screen.width;
	// var screenHeight = window.innerHeight;
	// var screenWidth = window.innerWidth;
	// var screenHeight = window.innerHeight * window.devicePixelRatio;
	// var screenWidth = window.innerWidth * window.devicePixelRatio;
	// var screenRatio = screenWidth / screenHeight;

	// Scrolling on the following devices
	// PIXEL 2XL landscape
	// iPhone 5/SE landscape
	// iPhone 6/7/8 landscape
	// iPhone 6/7/8 plus landscape
	// iPhone X landscape
	// iPad landscape and portrait
	// iPad Pro landscape and portrait
	var antiScroll = 1.0;
	var gameWidth = 450 * antiScroll;
	var gameHeight = 733 * antiScroll;
	var gameRatio = gameWidth / gameHeight;

	//console.log("screen ratio: " + screenRatio + ", game ratio: " + gameRatio);
	var scale = 1;

	// gameHeight > gameWidth always
	// The game has to fit the screen device always
	//console.log("screenHeight: " + screenHeight);
	//console.log("screenWidth:  " + screenWidth);
	//console.log("gameHeight:   " + gameHeight);
	//console.log("gameWidth:    " + gameWidth);
	if (screenHeight >= screenWidth) {
		if (screenHeight >= gameHeight && screenWidth >= gameWidth) {
			// Consider ratios
			if (screenRatio >= gameRatio) {
				// Increase gameHeight
				scale = screenHeight / gameHeight;
				//console.log("case 1_1");
			} else {
				// Increase gameWidth
				scale = screenWidth / gameWidth;
				//console.log("case 1_2"); // never happens
			}
		} else if (screenHeight >= gameHeight && screenWidth < gameWidth) {
			// Decrease the gameWidth
			scale = screenWidth / gameWidth;
			//console.log("case 2");
		} else if (screenHeight < gameHeight && screenWidth >= gameWidth) {
			// Decrease the gameHeight
			scale = screenHeight / gameHeight;
			//console.log("case 3");
		} else {
			// Consider ratios
			if (screenRatio >= gameRatio) {
				// Decrease gameHeight
				scale = screenHeight / gameHeight;
				//console.log("case 4_1");
			} else {
				// Decrease gameWidth
				scale = screenWidth / gameWidth;
				//console.log("case 4_2");
			}
		}
	} else {
		if (screenHeight >= gameHeight && screenWidth >= gameWidth) {
			// Consider ratios
			if (screenRatio >= gameRatio) {
				// Increase gameHeight
				scale = screenHeight / gameHeight;
				//console.log("case 5_1");
			} else {
				// Increase gameWidth
				scale = screenWidth / gameWidth;
				//console.log("case 5_2"); // never happens
			}
		} else if (screenHeight >= gameHeight && screenWidth < gameWidth) {
			// Decrease the gameWidth
			scale = screenWidth / gameWidth;
			//console.log("case 6"); // never happens
		} else if (screenHeight < gameHeight && screenWidth >= gameWidth) {
			// Decrease the gameHeight
			scale = screenHeight / gameHeight;
			//console.log("case 7");
		} else {
			// Consider ratios
			if (screenRatio >= gameRatio) {
				// Decrease gameHeight
				scale = screenHeight / gameHeight;
				//console.log("case 8_1");
			} else {
				// Decrease gameWidth
				scale = screenWidth / gameWidth;
				//console.log("case 8_2"); // never happens
			}
		}
	}

	var board = document.getElementById("boardDiv");
	board.style.zoom = scale;
	board.style.display = "block";
	//console.log("scalew: " + scale);
};
rescale();
// window.setTimeout(rescale, 0);