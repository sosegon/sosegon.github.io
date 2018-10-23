"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Detector = function () {
	function Detector(haar_file, utils) {
		_classCallCheck(this, Detector);

		this.haar_file = haar_file;
		this.classifier = new cv.CascadeClassifier();
		this.detections = new cv.RectVector();
		var self = this;

		utils.createFileFromUrl(this.haar_file, this.haar_file, function () {
			self.classifier.load(self.haar_file);
			console.log("Cascade file downloaded!");
		});
	}

	_createClass(Detector, [{
		key: "detect",
		value: function detect(srcMat) {
			// Pre-processing
			var gray = new cv.Mat();
			cv.cvtColor(srcMat, gray, cv.COLOR_RGBA2GRAY, 0);
			// cv.equalizeHist(gray, gray);
			// let ksize = new cv.Size(3, 3);
			// let anchor = new cv.Point(-1, -1);
			// cv.blur(gray, gray, ksize, anchor, cv.BORDER_DEFAULT);

			this.classifier.detectMultiScale(gray, this.detections, 5.1, 6, 0);
			gray.delete();
		}
	}, {
		key: "drawDetections",
		value: function drawDetections(srcMat, canvas, limit) {
			for (var i = 0; i < this.detections.size(); i++) {
				if (i >= limit) {
					break;
				}
				var object = this.detections.get(i);
				var point1 = new cv.Point(object.x, object.y);
				var point2 = new cv.Point(object.x + object.width, object.y + object.height);
				cv.rectangle(srcMat, point1, point2, [255, 0, 0, 255]);
			}
			cv.imshow(canvas, srcMat);
		}
	}, {
		key: "extract",
		value: function extract(srcMat) {
			var mats = [];
			for (var i = 0; i < this.detections.size(); ++i) {
				var object = this.detections.get(i);
				var dst = new cv.Mat();
				dst = srcMat.roi(object);
				mats.push(dst);
			}
			return mats;
		}
	}]);

	return Detector;
}();