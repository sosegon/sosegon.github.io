"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FinderView = function (_React$Component) {
	_inherits(FinderView, _React$Component);

	function FinderView(props) {
		_classCallCheck(this, FinderView);

		var _this = _possibleConstructorReturn(this, (FinderView.__proto__ || Object.getPrototypeOf(FinderView)).call(this, props));

		_this.setup();
		return _this;
	}

	_createClass(FinderView, [{
		key: "setup",
		value: function setup() {
			// The step indicates the state of the GUI when interacting
			// with the user: 0 = idle, 1 = streaming, 2 = file, 3 = processing
			this.state = { step: 0, message: "" };
		}
	}, {
		key: "shoot",
		value: function shoot() {
			var videoElem = this.refs.videoRef;
			var height = videoElem.height;
			var width = videoElem.width;

			// OpenCV elements
			var srcMat = new cv.Mat(height, width, cv.CV_8UC4);
			var cap = new cv.VideoCapture(videoElem);
			cap.read(srcMat);

			this.stopCamera();
			this.streaming = false;
			this.detectWatch(srcMat);
		}
	}, {
		key: "detectWatch",
		value: function detectWatch(srcMat) {
			// This is the canvas where the video captured by the camera will be displayed
			var canvasOutput = this.refs.canvasOutRef;

			detector.detect(srcMat);
			var detections = detector.detections;
			if (detections.size() > 0) {
				var watchMat = detector.extract(srcMat)[0];
				var detection = detections.get(0);
				var final = utils.highlightBox(srcMat, detection);
				detector.drawDetections(final, canvasOutput, 1);
				this.setState({ step: 3, message: "Searching!" });
				this.search(watchMat);
			} else {
				this.setState({ step: 0, message: "No watch detected!" });
			}
		}
	}, {
		key: "search",
		value: function search(watchMat) {
			// TODO: Implement the search
			var self = this;
			setTimeout(function () {
				self.setState({ step: 0, message: "" });
			}, 500);
		}
	}, {
		key: "startCamera",
		value: function startCamera() {
			var videoElem = this.refs.videoRef;
			var self = this;
			navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(function (stream) {
				videoElem.srcObject = stream;
				videoElem.play();
				self.stream = stream;
				self.streaming = true;
				self.processVideo();
				self.setState({ step: 1, message: "" });
			}).catch(function (err) {
				console.log("An error occured! " + err);
				self.state({ step: 0 });
			});
		}
	}, {
		key: "stopCamera",
		value: function stopCamera() {
			var videoElem = this.refs.videoRef;
			videoElem.pause();
			videoElem.srcObject = null;

			if (this.stream) {
				this.stream.getVideoTracks()[0].stop();
			}
		}
	}, {
		key: "processVideo",
		value: function processVideo() {
			var videoElem = this.refs.videoRef;
			var height = videoElem.height;
			var width = videoElem.width;

			// Where we draw what is captured by the camera
			var canvasOutput = this.refs.canvasOutRef;

			// OpenCV elements
			var srcMat = new cv.Mat(height, width, cv.CV_8UC4);
			var cap = new cv.VideoCapture(videoElem);

			var self = this;
			var FPS = 30;
			var loop = function loop() {

				if (!self.streaming) {
					srcMat.delete();
					return;
				}

				var begin = Date.now();
				cap.read(srcMat);

				detector.detect(srcMat);
				detector.drawDetections(srcMat, canvasOutput, 1);

				// schedule next one.
				var delay = 100 / FPS - (Date.now() - begin);
				setTimeout(loop, delay);
			};
			setTimeout(loop, 0);
		}
	}, {
		key: "loadImage",
		value: function loadImage(event) {
			if (event.target.files && event.target.files[0]) {
				var canvasOutput = this.refs.canvasOutRef;
				var height = canvasOutput.height;
				var width = canvasOutput.width;
				var ctx = canvasOutput.getContext('2d');

				var self = this;

				var reader = new FileReader();
				reader.onload = function (e) {
					var img = new Image();
					img.crossOrigin = 'anonymous';
					img.onload = function () {
						ctx.drawImage(img, 0, 0, width, height);
						self.setState({ step: 2, message: "" });
						self.detectWatch(new cv.imread(canvasOutput));
					};
					img.src = e.target.result;
				};
				reader.readAsDataURL(event.target.files[0]);
			}
		}
	}, {
		key: "bindToInput",
		value: function bindToInput() {
			var inputImg = this.refs.inputImgRef;
			inputImg.click();
		}
	}, {
		key: "render",
		value: function render() {
			var sourceButtonsClass = ["buttons-container"];
			var shootButtonsClass = ["buttons-container"];
			if (this.state.step === 0) {
				shootButtonsClass.push("buttons-container-disabled");
			} else if (this.state.step === 1) {
				sourceButtonsClass.push("buttons-container-disabled");
			} else if (this.state.step === 3) {
				shootButtonsClass.push("buttons-container-disabled");
				sourceButtonsClass.push("buttons-container-disabled");
			}
			sourceButtonsClass = sourceButtonsClass.join(" ");
			shootButtonsClass = shootButtonsClass.join(" ");

			var message = this.state.message !== "" ? React.createElement(
				"span",
				{ className: "message" },
				this.state.message
			) : React.createElement("span", null);
			return React.createElement(
				"div",
				null,
				React.createElement("video", { id: "video-source", ref: "videoRef", height: "240", width: "320" }),
				React.createElement("canvas", { className: "canvas-image", ref: "canvasOutRef", height: "240", width: "320" }),
				React.createElement(
					"div",
					{ className: sourceButtonsClass },
					React.createElement("span", { className: "button", id: "camera-button", onClick: this.startCamera.bind(this) }),
					React.createElement("span", { className: "button", id: "folder-button", onClick: this.bindToInput.bind(this) }),
					React.createElement("input", { className: "button", id: "image-input", ref: "inputImgRef", type: "file", accept: "image/*", onChange: this.loadImage.bind(this) })
				),
				React.createElement(
					"div",
					{ className: shootButtonsClass },
					React.createElement("span", { className: "button", id: "shooter-button", onClick: this.shoot.bind(this) })
				),
				React.createElement(
					"div",
					{ className: "message-container" },
					message
				)
			);
		}
	}]);

	return FinderView;
}(React.Component);

var utils = new Utils('errorMessage');
var detector = new Detector("cascade.xml", utils);

var FinderViewRendered = ReactDOM.render(React.createElement(FinderView, null), document.getElementById('boardDiv'));