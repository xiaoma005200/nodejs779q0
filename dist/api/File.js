'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _toRes = require('../lib/toRes');

var _toRes2 = _interopRequireDefault(_toRes);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
	var config = _ref.config,
	    db = _ref.db;

	var api = (0, _express.Router)();
	var storage = _multer2.default.diskStorage({
		destination: function destination(req, file, cb) {

			cb(null, _path2.default.join(__dirname, '../views/upload'));
		},
		filename: function filename(req, file, cb) {

			cb(null, _path2.default.parse(file.originalname).name + '-' + Date.now() + _path2.default.extname(file.originalname));
		}
	});
	var upload = (0, _multer2.default)({ storage: storage });

	// 文件上传接口
	api.post('/upload', upload.any(), function (req, res) {

		try {

			_toRes2.default.file(res, 0, req.files[0].filename);
		} catch (err) {

			_toRes2.default.session(res, 500, '服务器错误！', '', 500);
		}
	});

	// 文件下载接口
	api.get('/download', function (req, res) {

		try {

			res.download(_path2.default.join(__dirname, '../views/upload/' + req.query.fileName));
		} catch (err) {

			_toRes2.default.session(res, 500, '服务器错误！', '', 500);
		}
	});

	return api;
};
//# sourceMappingURL=File.js.map