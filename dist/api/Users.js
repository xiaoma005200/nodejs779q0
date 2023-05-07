'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _package = require('../../package.json');

var _express = require('express');

var _sequelize = require('sequelize');

var _toRes = require('../lib/toRes');

var _toRes2 = _interopRequireDefault(_toRes);

var _UsersModel = require('../models/UsersModel');

var _UsersModel2 = _interopRequireDefault(_UsersModel);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
	var config = _ref.config,
	    db = _ref.db;

	var api = (0, _express.Router)();

	// 用户登录接口
	api.post('/login', function () {
		var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
			var userinfo, token;
			return _regenerator2.default.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							console.log(req.query);
							_context.prev = 1;
							_context.next = 4;
							return _UsersModel2.default.findOne({ where: { username: req.query.username, password: req.query.password } });

						case 4:
							userinfo = _context.sent;

							if (!(userinfo === null)) {
								_context.next = 8;
								break;
							}

							_toRes2.default.session(res, -1, '用户名或密码错误！');
							return _context.abrupt('return');

						case 8:
							token = _jsonwebtoken2.default.sign({
								id: userinfo.dataValues.id,
								username: userinfo.dataValues.username,
								role: userinfo.dataValues.role
							}, config.jwtSecret, {
								expiresIn: 60 * 60 * 24 * 1
							});


							userinfo.dataValues.token = token;
							delete userinfo.dataValues.password;
							req.session.userinfo = userinfo;

							_toRes2.default.session(res, 0, '登录成功！', token);
							_context.next = 19;
							break;

						case 15:
							_context.prev = 15;
							_context.t0 = _context['catch'](1);

							console.log(_context.t0);
							_toRes2.default.session(res, 500, '服务器错误！', '', 500);

						case 19:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, undefined, [[1, 15]]);
		}));

		return function (_x, _x2) {
			return _ref2.apply(this, arguments);
		};
	}());

	// 用户退出接口
	api.all('/logout', function (req, res) {

		if (!_toRes2.default.auth(req, res, '管理员')) return;

		req.session.destroy(function (err) {
			_toRes2.default.session(res, 0, '退出成功！');
		});
	});

	// 注册接口
	api.post('/register', function () {
		var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
			var userinfo;
			return _regenerator2.default.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							_context2.prev = 0;
							_context2.next = 3;
							return _UsersModel2.default.create(req.body);

						case 3:
							userinfo = _context2.sent;


							if (userinfo === null) {

								_toRes2.default.session(res, -1, '注册失败！');
							} else {

								_toRes2.default.session(res, 0, '注册成功！');
							}
							_context2.next = 10;
							break;

						case 7:
							_context2.prev = 7;
							_context2.t0 = _context2['catch'](0);


							_toRes2.default.session(res, 500, '服务器错误！', '', 500);

						case 10:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, undefined, [[0, 7]]);
		}));

		return function (_x3, _x4) {
			return _ref3.apply(this, arguments);
		};
	}());

	// 获取session的接口
	api.all('/session', function () {
		var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
			return _regenerator2.default.wrap(function _callee3$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							_context3.prev = 0;

							if (_toRes2.default.auth(req, res, '管理员')) {
								_context3.next = 3;
								break;
							}

							return _context3.abrupt('return');

						case 3:
							_context3.t0 = _toRes2.default;
							_context3.t1 = res;
							_context3.next = 7;
							return _UsersModel2.default.findOne({ where: { id: req.session.userinfo.id } });

						case 7:
							_context3.t2 = _context3.sent;

							_context3.t0.record.call(_context3.t0, _context3.t1, 0, _context3.t2);

							_context3.next = 14;
							break;

						case 11:
							_context3.prev = 11;
							_context3.t3 = _context3['catch'](0);


							_toRes2.default.session(res, 500, '服务器错误！', '', 500);

						case 14:
						case 'end':
							return _context3.stop();
					}
				}
			}, _callee3, undefined, [[0, 11]]);
		}));

		return function (_x5, _x6) {
			return _ref4.apply(this, arguments);
		};
	}());

	// 分页接口（后端）
	api.get('/page', function () {
		var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
			var page, limit, sort, order, username, where, result;
			return _regenerator2.default.wrap(function _callee4$(_context4) {
				while (1) {
					switch (_context4.prev = _context4.next) {
						case 0:
							_context4.prev = 0;

							if (_toRes2.default.auth(req, res, '管理员')) {
								_context4.next = 3;
								break;
							}

							return _context4.abrupt('return');

						case 3:
							page = parseInt(req.query.page) || 1;
							limit = parseInt(req.query.limit) || 10;
							sort = req.query.sort || 'id';
							order = req.query.order || 'asc';
							username = req.query.username;
							where = {};


							if (username) {
								where.username = (0, _defineProperty3.default)({}, _sequelize.Op.like, username);
							}

							_context4.next = 12;
							return _UsersModel2.default.findAndCountAll({
								order: [[sort, order]],
								where: where,
								offset: (page - 1) * limit,
								limit: limit
							});

						case 12:
							result = _context4.sent;


							result.currPage = page;
							result.pageSize = limit;

							_toRes2.default.page(res, 0, result);
							_context4.next = 21;
							break;

						case 18:
							_context4.prev = 18;
							_context4.t0 = _context4['catch'](0);


							_toRes2.default.session(res, 500, '服务器错误！', '', 500);

						case 21:
						case 'end':
							return _context4.stop();
					}
				}
			}, _callee4, undefined, [[0, 18]]);
		}));

		return function (_x7, _x8) {
			return _ref5.apply(this, arguments);
		};
	}());

	// 保存接口
	api.post('/save', function () {
		var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
			var userinfo;
			return _regenerator2.default.wrap(function _callee5$(_context5) {
				while (1) {
					switch (_context5.prev = _context5.next) {
						case 0:
							_context5.prev = 0;

							if (_toRes2.default.auth(req, res, '管理员')) {
								_context5.next = 3;
								break;
							}

							return _context5.abrupt('return');

						case 3:
							_context5.next = 5;
							return _UsersModel2.default.create(req.body);

						case 5:
							userinfo = _context5.sent;


							if (userinfo === null) {

								_toRes2.default.session(res, -1, '添加失败！');
							} else {

								_toRes2.default.session(res, 0, '添加成功！');
							}
							_context5.next = 12;
							break;

						case 9:
							_context5.prev = 9;
							_context5.t0 = _context5['catch'](0);


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

	// 更新接口
	api.post('/update', function () {
		var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res) {
			return _regenerator2.default.wrap(function _callee6$(_context6) {
				while (1) {
					switch (_context6.prev = _context6.next) {
						case 0:
							_context6.prev = 0;

							if (_toRes2.default.auth(req, res, '管理员')) {
								_context6.next = 3;
								break;
							}

							return _context6.abrupt('return');

						case 3:
							_context6.next = 5;
							return _UsersModel2.default.update(req.body, {
								where: {
									id: req.body.id
								}
							});

						case 5:

							_toRes2.default.session(res, 0, '编辑成功！');
							_context6.next = 11;
							break;

						case 8:
							_context6.prev = 8;
							_context6.t0 = _context6['catch'](0);


							_toRes2.default.session(res, 500, '服务器错误！', '', 500);

						case 11:
						case 'end':
							return _context6.stop();
					}
				}
			}, _callee6, undefined, [[0, 8]]);
		}));

		return function (_x11, _x12) {
			return _ref7.apply(this, arguments);
		};
	}());

	// 删除接口
	api.post('/delete', function () {
		var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(req, res) {
			return _regenerator2.default.wrap(function _callee7$(_context7) {
				while (1) {
					switch (_context7.prev = _context7.next) {
						case 0:
							_context7.prev = 0;

							if (_toRes2.default.auth(req, res, '管理员')) {
								_context7.next = 3;
								break;
							}

							return _context7.abrupt('return');

						case 3:
							_context7.next = 5;
							return _UsersModel2.default.destroy({
								where: {
									id: (0, _defineProperty3.default)({}, _sequelize.Op.in, req.body)
								}
							});

						case 5:

							_toRes2.default.session(res, 0, '删除成功！');
							_context7.next = 11;
							break;

						case 8:
							_context7.prev = 8;
							_context7.t0 = _context7['catch'](0);


							_toRes2.default.session(res, 500, '服务器错误！', '', 500);

						case 11:
						case 'end':
							return _context7.stop();
					}
				}
			}, _callee7, undefined, [[0, 8]]);
		}));

		return function (_x13, _x14) {
			return _ref8.apply(this, arguments);
		};
	}());

	// 详情接口
	api.get('/info/:id', function () {
		var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(req, res) {
			return _regenerator2.default.wrap(function _callee8$(_context8) {
				while (1) {
					switch (_context8.prev = _context8.next) {
						case 0:
							_context8.prev = 0;

							if (_toRes2.default.auth(req, res, '管理员')) {
								_context8.next = 3;
								break;
							}

							return _context8.abrupt('return');

						case 3:
							_context8.t0 = _toRes2.default;
							_context8.t1 = res;
							_context8.next = 7;
							return _UsersModel2.default.findOne({ where: { id: req.params.id } });

						case 7:
							_context8.t2 = _context8.sent;

							_context8.t0.record.call(_context8.t0, _context8.t1, 0, _context8.t2);

							_context8.next = 14;
							break;

						case 11:
							_context8.prev = 11;
							_context8.t3 = _context8['catch'](0);


							_toRes2.default.session(res, 500, '服务器错误！', '', 500);

						case 14:
						case 'end':
							return _context8.stop();
					}
				}
			}, _callee8, undefined, [[0, 11]]);
		}));

		return function (_x15, _x16) {
			return _ref9.apply(this, arguments);
		};
	}());

	return api;
};
//# sourceMappingURL=Users.js.map