'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require('express');

var _sequelize = require('sequelize');

var _toRes = require('../lib/toRes');

var _toRes2 = _interopRequireDefault(_toRes);

var _sequelize2 = require('../models/sequelize');

var _sequelize3 = _interopRequireDefault(_sequelize2);

var _util = require('../lib/util');

var _util2 = _interopRequireDefault(_util);

var _ConfigModel = require('../models/ConfigModel');

var _ConfigModel2 = _interopRequireDefault(_ConfigModel);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var process = require("child_process");

exports.default = function (_ref) {
	var config = _ref.config,
	    db = _ref.db;

	var api = (0, _express.Router)();
	// 获取某表的某个字段列表接口
	api.get('/option/:tableName/:columnName', function () {
		var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
			var where, results, result;
			return _regenerator2.default.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.prev = 0;
							where = ' WHERE 1 = 1 ';

							if (req.query.conditionColumn != undefined && req.query.conditionValue != undefined) {
								where += ' AND ' + req.query.conditionColumn + ' = \'' + req.query.conditionValue + '\'';
							}

							_context.next = 5;
							return _sequelize3.default.query('SELECT ' + req.params.columnName + ' FROM ' + req.params.tableName + ' ' + where, {
								plain: false,
								raw: true,
								type: _sequelize.QueryTypes.SELECT
							});

						case 5:
							results = _context.sent;
							result = [];

							if (results.length > 0) {
								results.forEach(function (item) {
									result.push(item[req.params.columnName]);
								});
							}

							_toRes2.default.record(res, 0, result);
							_context.next = 14;
							break;

						case 11:
							_context.prev = 11;
							_context.t0 = _context['catch'](0);


							_toRes2.default.session(res, 500, '服务器错误！', '', 500);

						case 14:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, undefined, [[0, 11]]);
		}));

		return function (_x, _x2) {
			return _ref2.apply(this, arguments);
		};
	}());

	// 获取某表的单行记录接口
	api.get('/follow/:tableName/:columnName', function () {
		var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
			return _regenerator2.default.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							_context2.prev = 0;
							_context2.t0 = _toRes2.default;
							_context2.t1 = res;
							_context2.next = 5;
							return _sequelize3.default.query('SELECT * FROM ' + req.params.tableName + ' WHERE ' + req.params.columnName + ' = \'' + req.query.columnValue + '\'', {
								plain: true,
								raw: true,
								type: _sequelize.QueryTypes.SELECT
							});

						case 5:
							_context2.t2 = _context2.sent;

							_context2.t0.record.call(_context2.t0, _context2.t1, 0, _context2.t2);

							_context2.next = 12;
							break;

						case 9:
							_context2.prev = 9;
							_context2.t3 = _context2['catch'](0);


							_toRes2.default.session(res, 500, '服务器错误！', '', 500);

						case 12:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, undefined, [[0, 9]]);
		}));

		return function (_x3, _x4) {
			return _ref3.apply(this, arguments);
		};
	}());

	// 修改某表的sfsh状态接口
	api.get('/sh/:tableName', function () {
		var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
			var sfsh;
			return _regenerator2.default.wrap(function _callee3$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							_context3.prev = 0;
							sfsh = req.body.sfsh === '是' ? '否' : '是';
							_context3.next = 4;
							return _sequelize3.default.query('UPDATE ' + req.params.tableName + ' SET sfsh = ' + sfsh + ' WHERE id = ' + req.body.id);

						case 4:

							_toRes2.default.session(res, 0, '编辑成功！');
							_context3.next = 10;
							break;

						case 7:
							_context3.prev = 7;
							_context3.t0 = _context3['catch'](0);


							_toRes2.default.session(res, 500, '服务器错误！', '', 500);

						case 10:
						case 'end':
							return _context3.stop();
					}
				}
			}, _callee3, undefined, [[0, 7]]);
		}));

		return function (_x5, _x6) {
			return _ref4.apply(this, arguments);
		};
	}());

	// 获取需要提醒的记录数接口
	api.get('/remind/:tableName/:columnName/:type', function () {
		var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
			var sql, remindStart, remindEnd, results;
			return _regenerator2.default.wrap(function _callee4$(_context4) {
				while (1) {
					switch (_context4.prev = _context4.next) {
						case 0:
							_context4.prev = 0;
							sql = 'SELECT 0 AS count';


							if (req.params.type == 1) {
								if (req.query.remindstart) sql = 'SELECT COUNT(*) AS count FROM ' + req.params.tableName + ' WHERE ' + req.params.columnName + ' >= ' + req.query.remindstart;
								if (req.query.remindend) sql = 'SELECT COUNT(*) AS count FROM ' + req.params.tableName + ' WHERE ' + req.params.columnName + ' <= ' + req.query.remindend;
							}

							if (req.params.type == 2) {
								if (req.query.remindstart) {
									remindStart = _util2.default.getDateTimeFormat(0 - req.query.remindstart, "yyyy-MM-dd");

									sql = 'SELECT COUNT(*) AS count FROM ' + req.params.tableName + ' WHERE ' + req.params.columnName + ' >= \'' + remindStart + '\'';
								}
								if (req.query.remindend) {
									remindEnd = _util2.default.getDateTimeFormat(req.query.remindend, "yyyy-MM-dd");

									sql = 'SELECT COUNT(*) AS count FROM ' + req.params.tableName + ' WHERE ' + req.params.columnName + ' <= \'' + remindEnd + '\'';
								}
							}

							_context4.next = 6;
							return _sequelize3.default.query(sql, {
								plain: true,
								raw: true,
								type: _sequelize.QueryTypes.SELECT
							});

						case 6:
							results = _context4.sent;


							_toRes2.default.count(res, 0, results.count);
							_context4.next = 13;
							break;

						case 10:
							_context4.prev = 10;
							_context4.t0 = _context4['catch'](0);


							_toRes2.default.session(res, 500, '服务器错误！', '', 500);

						case 13:
						case 'end':
							return _context4.stop();
					}
				}
			}, _callee4, undefined, [[0, 10]]);
		}));

		return function (_x7, _x8) {
			return _ref5.apply(this, arguments);
		};
	}());

	// 计算规则接口
	api.get('/cal/:tableName/:columnName', function () {
		var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
			return _regenerator2.default.wrap(function _callee5$(_context5) {
				while (1) {
					switch (_context5.prev = _context5.next) {
						case 0:
							_context5.prev = 0;
							_context5.t0 = _toRes2.default;
							_context5.t1 = res;
							_context5.next = 5;
							return _sequelize3.default.query('SELECT SUM(' + req.params.columnName + ') AS sum, MAX(' + req.params.columnName + ') AS max, MIN(' + req.params.columnName + ') AS min, AVG(' + req.params.columnName + ') AS avg FROM ' + req.params.tableName, {
								plain: true,
								raw: true,
								type: _sequelize.QueryTypes.SELECT
							});

						case 5:
							_context5.t2 = _context5.sent;

							_context5.t0.record.call(_context5.t0, _context5.t1, 0, _context5.t2);

							_context5.next = 12;
							break;

						case 9:
							_context5.prev = 9;
							_context5.t3 = _context5['catch'](0);


							_toRes2.default.session(res, 500, '服务器错误！', '', 500);

						case 12:
						case 'end':
							return _context5.stop();
					}
				}
			}, _callee5, undefined, [[0, 9]]);
		}));

		return function (_x9, _x10) {
			return _ref6.apply(this, arguments);
		};
	}());

	// 类别统计接口
	api.get('/group/:tableName/:columnName', function () {
		var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res) {
			return _regenerator2.default.wrap(function _callee6$(_context6) {
				while (1) {
					switch (_context6.prev = _context6.next) {
						case 0:
							_context6.prev = 0;
							_context6.t0 = _toRes2.default;
							_context6.t1 = res;
							_context6.next = 5;
							return _sequelize3.default.query('SELECT COUNT(*) AS total, ' + req.params.columnName + ' FROM ' + req.params.tableName + ' GROUP BY ' + req.params.columnName, {
								plain: false,
								raw: true,
								type: _sequelize.QueryTypes.SELECT
							});

						case 5:
							_context6.t2 = _context6.sent;

							_context6.t0.record.call(_context6.t0, _context6.t1, 0, _context6.t2);

							_context6.next = 12;
							break;

						case 9:
							_context6.prev = 9;
							_context6.t3 = _context6['catch'](0);


							_toRes2.default.session(res, 500, '服务器错误！', '', 500);

						case 12:
						case 'end':
							return _context6.stop();
					}
				}
			}, _callee6, undefined, [[0, 9]]);
		}));

		return function (_x11, _x12) {
			return _ref7.apply(this, arguments);
		};
	}());

	// 按值统计接口
	api.get('/value/:tableName/:xColumnName/:yColumnName', function () {
		var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(req, res) {
			var columns, where, userInfo;
			return _regenerator2.default.wrap(function _callee7$(_context7) {
				while (1) {
					switch (_context7.prev = _context7.next) {
						case 0:
							_context7.prev = 0;
							_context7.next = 3;
							return _sequelize3.default.query('select group_concat(column_name) from information_schema.columns where table_name = \'' + req.params.tableName + '\'', {
								plain: false,
								raw: true,
								type: _sequelize.QueryTypes.SELECT
							});

						case 3:
							columns = _context7.sent;

							columns = columns[0]['group_concat(column_name)'].split(',');

							where = ' where 1=1 ';
							userInfo = _jsonwebtoken2.default.decode(req.headers.token);

							if (userInfo.role != '管理员') {
								columns.forEach(function (column) {
									if (column == userInfo.loginUserColumn) {
										where += ' and ' + column + ' = \'' + userInfo.username + '\' ';
									}
								});
							}

							_context7.t0 = _toRes2.default;
							_context7.t1 = res;
							_context7.next = 12;
							return _sequelize3.default.query('SELECT ' + req.params.xColumnName + ', SUM(' + req.params.yColumnName + ') AS total FROM ' + req.params.tableName + ' ' + where + ' GROUP BY ' + req.params.xColumnName, {
								plain: false,
								raw: true,
								type: _sequelize.QueryTypes.SELECT
							});

						case 12:
							_context7.t2 = _context7.sent;

							_context7.t0.record.call(_context7.t0, _context7.t1, 0, _context7.t2);

							_context7.next = 19;
							break;

						case 16:
							_context7.prev = 16;
							_context7.t3 = _context7['catch'](0);


							_toRes2.default.session(res, 500, '服务器错误！', '', 500);

						case 19:
						case 'end':
							return _context7.stop();
					}
				}
			}, _callee7, undefined, [[0, 16]]);
		}));

		return function (_x13, _x14) {
			return _ref8.apply(this, arguments);
		};
	}());

	api.get('/value/:tableName/:xColumnName/:yColumnName/:timeStatType', function () {
		var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(req, res) {
			var columns, where, userInfo, sql, tableName, xColumnName, yColumnName, timeStatType;
			return _regenerator2.default.wrap(function _callee8$(_context8) {
				while (1) {
					switch (_context8.prev = _context8.next) {
						case 0:
							_context8.prev = 0;
							_context8.next = 3;
							return _sequelize3.default.query('select group_concat(column_name) from information_schema.columns where table_name = \'' + req.params.tableName + '\'', {
								plain: false,
								raw: true,
								type: _sequelize.QueryTypes.SELECT
							});

						case 3:
							columns = _context8.sent;

							columns = columns[0]['group_concat(column_name)'].split(',');

							where = ' where 1=1 ';
							userInfo = _jsonwebtoken2.default.decode(req.headers.token);

							if (userInfo.role != '管理员') {
								columns.forEach(function (column) {
									if (column == userInfo.loginUserColumn) {
										where += ' and ' + column + ' = \'' + userInfo.username + '\' ';
									}
								});
							}

							sql = "";
							tableName = req.params.tableName;
							xColumnName = req.params.xColumnName;
							yColumnName = req.params.yColumnName;
							timeStatType = req.params.timeStatType;

							if (timeStatType == "日") sql = "SELECT DATE_FORMAT(" + xColumnName + ", '%Y-%m-%d') " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(" + xColumnName + ", '%Y-%m-%d')";
							if (timeStatType == "月") sql = "SELECT DATE_FORMAT(" + xColumnName + ", '%Y-%m') " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(" + xColumnName + ", '%Y-%m')";
							if (timeStatType == "年") sql = "SELECT DATE_FORMAT(" + xColumnName + ", '%Y') " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(" + xColumnName + ", '%Y')";

							_context8.t0 = _toRes2.default;
							_context8.t1 = res;
							_context8.next = 20;
							return _sequelize3.default.query(sql, {
								plain: false,
								raw: true,
								type: _sequelize.QueryTypes.SELECT
							});

						case 20:
							_context8.t2 = _context8.sent;

							_context8.t0.record.call(_context8.t0, _context8.t1, 0, _context8.t2);

							_context8.next = 27;
							break;

						case 24:
							_context8.prev = 24;
							_context8.t3 = _context8['catch'](0);


							_toRes2.default.session(res, 500, _context8.t3, '', 500);

						case 27:
						case 'end':
							return _context8.stop();
					}
				}
			}, _callee8, undefined, [[0, 24]]);
		}));

		return function (_x15, _x16) {
			return _ref9.apply(this, arguments);
		};
	}());

	// 人脸对比
	api.get('/matchFace', function () {
		var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(req, res) {
			var APIKeyInfo, SecretKeyInfo, APIKey, SecretKey, param, rawData;
			return _regenerator2.default.wrap(function _callee9$(_context9) {
				while (1) {
					switch (_context9.prev = _context9.next) {
						case 0:
							_context9.prev = 0;
							_context9.next = 3;
							return _ConfigModel2.default.findOne({ where: { name: 'APIKey' } });

						case 3:
							APIKeyInfo = _context9.sent;
							_context9.next = 6;
							return _ConfigModel2.default.findOne({ where: { name: 'SecretKey' } });

						case 6:
							SecretKeyInfo = _context9.sent;
							APIKey = APIKeyInfo.dataValues.value;
							SecretKey = SecretKeyInfo.dataValues.value;
							param = _querystring2.default.stringify({
								'grant_type': 'client_credentials',
								'client_id': APIKey,
								'client_secret': SecretKey
							});
							rawData = '';

							_https2.default.get({
								hostname: 'aip.baidubce.com',
								path: '/oauth/2.0/token?' + param,
								agent: false
							}, function (resc) {
								resc.on('data', function (chunk) {
									rawData += chunk;
								});

								resc.on('end', function () {
									var rawDataObj = JSON.parse(rawData);
									var access_token = rawDataObj.access_token;
									var face1 = _path2.default.join(__dirname, '..', 'views', 'upload', req.query.face1);
									var face2 = _path2.default.join(__dirname, '..', 'views', 'upload', req.query.face2);

									var bitmap = _fs2.default.readFileSync(face1);
									var bitmap2 = _fs2.default.readFileSync(face2);
									var base64str1 = Buffer.from(bitmap, 'binary').toString('base64');
									var base64str2 = Buffer.from(bitmap2, 'binary').toString('base64');

									var reqParams = [{
										"image": base64str1,
										"image_type": "BASE64",
										"face_type": "LIVE",
										"quality_control": "LOW",
										"liveness_control": "NONE"
									}, {
										"image": base64str2,
										"image_type": "BASE64",
										"face_type": "LIVE",
										"quality_control": "LOW",
										"liveness_control": "NONE"
									}];
									(0, _request2.default)({
										url: 'https://aip.baidubce.com/rest/2.0/face/v3/match?access_token=' + access_token,
										method: "POST",
										json: true,
										headers: {
											"content-type": "application/json"
										},
										body: reqParams
									}, function (error, response, body) {
										if (!error && response.statusCode == 200) {
											res.status(200).json({
												code: 0,
												score: body.result ? body.result.score : 0
											});
										} else {
											res.status(200).json({
												code: -1,
												score: 0
											});
										}
									});
								});
							});
							_context9.next = 17;
							break;

						case 14:
							_context9.prev = 14;
							_context9.t0 = _context9['catch'](0);


							_toRes2.default.session(res, 500, '服务器错误！', '', 500);

						case 17:
						case 'end':
							return _context9.stop();
					}
				}
			}, _callee9, undefined, [[0, 14]]);
		}));

		return function (_x17, _x18) {
			return _ref10.apply(this, arguments);
		};
	}());

	return api;
};
//# sourceMappingURL=Common.js.map