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

var _sequelize2 = require('../models/sequelize');

var _sequelize3 = _interopRequireDefault(_sequelize2);

var _toRes = require('../lib/toRes');

var _toRes2 = _interopRequireDefault(_toRes);

var _HuiyuanModel = require('../models/HuiyuanModel');

var _HuiyuanModel2 = _interopRequireDefault(_HuiyuanModel);

var _md5Node = require('md5-node');

var _md5Node2 = _interopRequireDefault(_md5Node);

var _util = require('../lib/util');

var _util2 = _interopRequireDefault(_util);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
	var config = _ref.config,
	    db = _ref.db;

	var api = (0, _express.Router)();

	// 用户登录接口
	api.all('/login', function () {
		var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
			var pwd, userinfo, token;
			return _regenerator2.default.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.prev = 0;
							pwd = req.query.password;
							_context.next = 4;
							return _HuiyuanModel2.default.findOne({ where: { yonghuming: req.query.username, mima: pwd } });

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
								username: userinfo.dataValues.yonghuming,
								role: '会员',
								loginUserColumn: 'yonghuming',
								tableName: 'huiyuan'
							}, config.jwtSecret, {
								expiresIn: 60 * 60 * 24 * 1
							});


							userinfo.dataValues.token = token;
							userinfo.dataValues.role = '会员';
							userinfo.dataValues.loginUserColumn = 'yonghuming';
							userinfo.dataValues.tableName = 'huiyuan';
							delete userinfo.dataValues.mima;
							req.session.userinfo = userinfo;

							_toRes2.default.session(res, 0, '登录成功！', token);
							_context.next = 22;
							break;

						case 18:
							_context.prev = 18;
							_context.t0 = _context['catch'](0);

							console.log(_context.t0);
							_toRes2.default.session(res, 500, '服务器错误！', '', 500);

						case 22:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, undefined, [[0, 18]]);
		}));

		return function (_x, _x2) {
			return _ref2.apply(this, arguments);
		};
	}());

	// 用户退出接口
	api.all('/logout', function (req, res) {

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


							Object.keys(req.body).forEach(function (item) {
								if (req.body[item] == '') delete req.body[item];
							});

							_context2.next = 4;
							return _HuiyuanModel2.default.create(req.body);

						case 4:
							userinfo = _context2.sent;


							if (userinfo === null) {

								_toRes2.default.session(res, -1, '注册失败！');
							} else {

								_toRes2.default.session(res, 0, '注册成功！');
							}
							_context2.next = 11;
							break;

						case 8:
							_context2.prev = 8;
							_context2.t0 = _context2['catch'](0);


							_toRes2.default.session(res, -2, '请检查是否正确输入或用户名重复！', '', 200);

						case 11:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, undefined, [[0, 8]]);
		}));

		return function (_x3, _x4) {
			return _ref3.apply(this, arguments);
		};
	}());

	// 获取session接口
	api.all('/session', function () {
		var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
			return _regenerator2.default.wrap(function _callee3$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							_context3.prev = 0;
							_context3.t0 = _toRes2.default;
							_context3.t1 = res;
							_context3.next = 5;
							return _HuiyuanModel2.default.findOne({ where: { id: req.session.userinfo === undefined ? _jsonwebtoken2.default.decode(req.headers.token).id : req.session.userinfo.id } });

						case 5:
							_context3.t2 = _context3.sent;

							_context3.t0.record.call(_context3.t0, _context3.t1, 0, _context3.t2);

							_context3.next = 12;
							break;

						case 9:
							_context3.prev = 9;
							_context3.t3 = _context3['catch'](0);


							_toRes2.default.session(res, 500, '服务器错误！', '', 500);

						case 12:
						case 'end':
							return _context3.stop();
					}
				}
			}, _callee3, undefined, [[0, 9]]);
		}));

		return function (_x5, _x6) {
			return _ref4.apply(this, arguments);
		};
	}());

	// 忘记密码（找回密码）
	api.all('/resetPass', function () {
		var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
			var pwd;
			return _regenerator2.default.wrap(function _callee4$(_context4) {
				while (1) {
					switch (_context4.prev = _context4.next) {
						case 0:
							_context4.prev = 0;
							pwd = '123456';
							_context4.next = 4;
							return _HuiyuanModel2.default.update({
								mima: pwd
							}, {
								where: {
									yonghuming: req.query.username
								}
							});

						case 4:

							_toRes2.default.session(res, 0, '密码已重置为：123456');
							_context4.next = 10;
							break;

						case 7:
							_context4.prev = 7;
							_context4.t0 = _context4['catch'](0);


							_toRes2.default.session(res, 500, '服务器错误！', '', 500);

						case 10:
						case 'end':
							return _context4.stop();
					}
				}
			}, _callee4, undefined, [[0, 7]]);
		}));

		return function (_x7, _x8) {
			return _ref5.apply(this, arguments);
		};
	}());

	// 分页接口（后端）
	api.get('/page', function () {
		var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
			var page, limit, sort, order, where, yonghuming, mima, xingming, xingbie, touxiang, shouji, shenfenzheng, result;
			return _regenerator2.default.wrap(function _callee5$(_context5) {
				while (1) {
					switch (_context5.prev = _context5.next) {
						case 0:
							_context5.prev = 0;
							page = parseInt(req.query.page) || 1;
							limit = parseInt(req.query.limit) || 10;
							sort = req.query.sort || 'id';
							order = req.query.order || 'asc';
							where = {};
							yonghuming = req.query.yonghuming;

							if (yonghuming) {

								if (yonghuming.indexOf('%') != -1) {
									where.yonghuming = (0, _defineProperty3.default)({}, _sequelize.Op.like, yonghuming);
								} else {
									where.yonghuming = (0, _defineProperty3.default)({}, _sequelize.Op.eq, yonghuming);
								}
							}

							mima = req.query.mima;

							if (mima) {

								if (mima.indexOf('%') != -1) {
									where.mima = (0, _defineProperty3.default)({}, _sequelize.Op.like, mima);
								} else {
									where.mima = (0, _defineProperty3.default)({}, _sequelize.Op.eq, mima);
								}
							}
							xingming = req.query.xingming;

							if (xingming) {

								if (xingming.indexOf('%') != -1) {
									where.xingming = (0, _defineProperty3.default)({}, _sequelize.Op.like, xingming);
								} else {
									where.xingming = (0, _defineProperty3.default)({}, _sequelize.Op.eq, xingming);
								}
							}
							xingbie = req.query.xingbie;

							if (xingbie) {

								if (xingbie.indexOf('%') != -1) {
									where.xingbie = (0, _defineProperty3.default)({}, _sequelize.Op.like, xingbie);
								} else {
									where.xingbie = (0, _defineProperty3.default)({}, _sequelize.Op.eq, xingbie);
								}
							}
							touxiang = req.query.touxiang;

							if (touxiang) {

								if (touxiang.indexOf('%') != -1) {
									where.touxiang = (0, _defineProperty3.default)({}, _sequelize.Op.like, touxiang);
								} else {
									where.touxiang = (0, _defineProperty3.default)({}, _sequelize.Op.eq, touxiang);
								}
							}
							shouji = req.query.shouji;

							if (shouji) {

								if (shouji.indexOf('%') != -1) {
									where.shouji = (0, _defineProperty3.default)({}, _sequelize.Op.like, shouji);
								} else {
									where.shouji = (0, _defineProperty3.default)({}, _sequelize.Op.eq, shouji);
								}
							}
							shenfenzheng = req.query.shenfenzheng;

							if (shenfenzheng) {

								if (shenfenzheng.indexOf('%') != -1) {
									where.shenfenzheng = (0, _defineProperty3.default)({}, _sequelize.Op.like, shenfenzheng);
								} else {
									where.shenfenzheng = (0, _defineProperty3.default)({}, _sequelize.Op.eq, shenfenzheng);
								}
							}

							_context5.next = 22;
							return _HuiyuanModel2.default.findAndCountAll({
								order: [[sort, order]],
								where: where,
								offset: (page - 1) * limit,
								limit: limit
							});

						case 22:
							result = _context5.sent;


							result.currPage = page;
							result.pageSize = limit;

							_toRes2.default.page(res, 0, result);
							_context5.next = 31;
							break;

						case 28:
							_context5.prev = 28;
							_context5.t0 = _context5['catch'](0);


							_toRes2.default.session(res, 500, '服务器错误！', '', 500);

						case 31:
						case 'end':
							return _context5.stop();
					}
				}
			}, _callee5, undefined, [[0, 28]]);
		}));

		return function (_x9, _x10) {
			return _ref6.apply(this, arguments);
		};
	}());

	// 分页接口（前端）
	api.get('/list', function () {
		var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res) {
			var page, limit, sort, order, where, yonghuming, xingming, result;
			return _regenerator2.default.wrap(function _callee6$(_context6) {
				while (1) {
					switch (_context6.prev = _context6.next) {
						case 0:
							_context6.prev = 0;
							page = parseInt(req.query.page) || 1;
							limit = parseInt(req.query.limit) || 10;
							sort = req.query.sort || 'id';
							order = req.query.order || 'asc';
							where = {};
							yonghuming = req.query.yonghuming;

							if (yonghuming) {

								if (yonghuming.indexOf('%') != -1) {
									where.yonghuming = (0, _defineProperty3.default)({}, _sequelize.Op.like, yonghuming);
								} else {
									where.yonghuming = (0, _defineProperty3.default)({}, _sequelize.Op.eq, yonghuming);
								}
							}
							xingming = req.query.xingming;

							if (xingming) {

								if (xingming.indexOf('%') != -1) {
									where.xingming = (0, _defineProperty3.default)({}, _sequelize.Op.like, xingming);
								} else {
									where.xingming = (0, _defineProperty3.default)({}, _sequelize.Op.eq, xingming);
								}
							}

							_context6.next = 12;
							return _HuiyuanModel2.default.findAndCountAll({
								order: [[sort, order]],
								where: where,
								offset: (page - 1) * limit,
								limit: limit
							});

						case 12:
							result = _context6.sent;


							result.currPage = page;
							result.pageSize = limit;

							_toRes2.default.page(res, 0, result);
							_context6.next = 21;
							break;

						case 18:
							_context6.prev = 18;
							_context6.t0 = _context6['catch'](0);


							_toRes2.default.session(res, 401, '您的权限不够！', '', 200);

						case 21:
						case 'end':
							return _context6.stop();
					}
				}
			}, _callee6, undefined, [[0, 18]]);
		}));

		return function (_x11, _x12) {
			return _ref7.apply(this, arguments);
		};
	}());

	// 保存接口（后端）
	api.post('/save', function () {
		var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(req, res) {
			var userinfo;
			return _regenerator2.default.wrap(function _callee7$(_context7) {
				while (1) {
					switch (_context7.prev = _context7.next) {
						case 0:
							_context7.prev = 0;


							Object.keys(req.body).forEach(function (item) {
								if (req.body[item] == '') delete req.body[item];
							});

							_context7.next = 4;
							return _HuiyuanModel2.default.create(req.body);

						case 4:
							userinfo = _context7.sent;


							if (userinfo === null) {

								_toRes2.default.session(res, -1, '添加失败！');
							} else {

								_toRes2.default.session(res, 0, '添加成功！');
							}
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

	// 保存接口（前端）
	api.post('/add', function () {
		var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(req, res) {
			var userinfo;
			return _regenerator2.default.wrap(function _callee8$(_context8) {
				while (1) {
					switch (_context8.prev = _context8.next) {
						case 0:
							_context8.prev = 0;


							Object.keys(req.body).forEach(function (item) {
								if (req.body[item] == '') delete req.body[item];
							});

							if (_jsonwebtoken2.default.decode(req.headers.token) == null) {
								_toRes2.default.session(res, 401, '请登录后再操作', '', 401);
							}

							_context8.next = 5;
							return _HuiyuanModel2.default.create(req.body);

						case 5:
							userinfo = _context8.sent;


							if (userinfo === null) {

								_toRes2.default.session(res, -1, '添加失败！');
							} else {

								_toRes2.default.session(res, 0, '添加成功！');
							}
							_context8.next = 12;
							break;

						case 9:
							_context8.prev = 9;
							_context8.t0 = _context8['catch'](0);


							_toRes2.default.session(res, 500, '服务器错误！', '', 500);

						case 12:
						case 'end':
							return _context8.stop();
					}
				}
			}, _callee8, undefined, [[0, 9]]);
		}));

		return function (_x15, _x16) {
			return _ref9.apply(this, arguments);
		};
	}());

	// 更新接口
	api.post('/update', function () {
		var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(req, res) {
			return _regenerator2.default.wrap(function _callee9$(_context9) {
				while (1) {
					switch (_context9.prev = _context9.next) {
						case 0:
							_context9.prev = 0;
							_context9.next = 3;
							return _HuiyuanModel2.default.update(req.body, {
								where: {
									id: req.body.id || 0
								}
							});

						case 3:

							_toRes2.default.session(res, 0, '编辑成功！');
							_context9.next = 9;
							break;

						case 6:
							_context9.prev = 6;
							_context9.t0 = _context9['catch'](0);


							_toRes2.default.session(res, 500, '服务器错误！', '', 500);

						case 9:
						case 'end':
							return _context9.stop();
					}
				}
			}, _callee9, undefined, [[0, 6]]);
		}));

		return function (_x17, _x18) {
			return _ref10.apply(this, arguments);
		};
	}());

	// 删除接口
	api.post('/delete', function () {
		var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(req, res) {
			return _regenerator2.default.wrap(function _callee10$(_context10) {
				while (1) {
					switch (_context10.prev = _context10.next) {
						case 0:
							_context10.prev = 0;
							_context10.next = 3;
							return _HuiyuanModel2.default.destroy({
								where: {
									id: (0, _defineProperty3.default)({}, _sequelize.Op.in, req.body)
								}
							});

						case 3:

							_toRes2.default.session(res, 0, '删除成功！');
							_context10.next = 9;
							break;

						case 6:
							_context10.prev = 6;
							_context10.t0 = _context10['catch'](0);


							_toRes2.default.session(res, 500, '服务器错误！', '', 500);

						case 9:
						case 'end':
							return _context10.stop();
					}
				}
			}, _callee10, undefined, [[0, 6]]);
		}));

		return function (_x19, _x20) {
			return _ref11.apply(this, arguments);
		};
	}());

	// 详情接口（后端）
	api.all('/info/:id', function () {
		var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(req, res) {
			return _regenerator2.default.wrap(function _callee11$(_context11) {
				while (1) {
					switch (_context11.prev = _context11.next) {
						case 0:
							_context11.prev = 0;
							_context11.t0 = _toRes2.default;
							_context11.t1 = res;
							_context11.next = 5;
							return _HuiyuanModel2.default.findOne({ where: { id: req.params.id } });

						case 5:
							_context11.t2 = _context11.sent;

							_context11.t0.record.call(_context11.t0, _context11.t1, 0, _context11.t2);

							_context11.next = 12;
							break;

						case 9:
							_context11.prev = 9;
							_context11.t3 = _context11['catch'](0);


							_toRes2.default.session(res, 500, '服务器错误！', '', 500);

						case 12:
						case 'end':
							return _context11.stop();
					}
				}
			}, _callee11, undefined, [[0, 9]]);
		}));

		return function (_x21, _x22) {
			return _ref12.apply(this, arguments);
		};
	}());

	// 详情接口（前端）
	api.all('/detail/:id', function () {
		var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(req, res) {
			return _regenerator2.default.wrap(function _callee12$(_context12) {
				while (1) {
					switch (_context12.prev = _context12.next) {
						case 0:
							_context12.prev = 0;
							_context12.t0 = _toRes2.default;
							_context12.t1 = res;
							_context12.next = 5;
							return _HuiyuanModel2.default.findOne({ where: { id: req.params.id } });

						case 5:
							_context12.t2 = _context12.sent;

							_context12.t0.record.call(_context12.t0, _context12.t1, 0, _context12.t2);

							_context12.next = 12;
							break;

						case 9:
							_context12.prev = 9;
							_context12.t3 = _context12['catch'](0);


							_toRes2.default.session(res, 500, '服务器错误！', '', 500);

						case 12:
						case 'end':
							return _context12.stop();
					}
				}
			}, _callee12, undefined, [[0, 9]]);
		}));

		return function (_x23, _x24) {
			return _ref13.apply(this, arguments);
		};
	}());

	// 获取需要提醒的记录数接口
	api.get('/remind/:columnName/:type', function () {
		var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13(req, res) {
			var sql, remindStart, remindEnd, _remindStart, _remindEnd, results;

			return _regenerator2.default.wrap(function _callee13$(_context13) {
				while (1) {
					switch (_context13.prev = _context13.next) {
						case 0:
							_context13.prev = 0;
							sql = 'SELECT 0 AS count';


							if (req.params.type == 1) {
								if (req.query.remindstart) sql = "SELECT COUNT(*) AS count FROM huiyuan WHERE " + req.params.columnName + " >= '" + req.query.remindstart + "'";
								if (req.query.remindend) sql = "SELECT COUNT(*) AS count FROM huiyuan WHERE " + req.params.columnName + " <= '" + req.query.remindend + "'";

								if (req.query.remindstart && req.query.remindend) {
									sql = "SELECT COUNT(*) AS count FROM huiyuan WHERE " + req.params.columnName + " >= '" + req.query.remindstart + "' AND " + req.params.columnName + " <= '" + req.query.remindend + "'";
								}
							}

							if (req.params.type == 2) {
								if (req.query.remindstart) {
									remindStart = _util2.default.getDateTimeFormat(0 + Number(req.query.remindstart), "yyyy-MM-dd");

									sql = "SELECT COUNT(*) AS count FROM huiyuan WHERE " + req.params.columnName + " >= '" + remindStart + "'";
								}
								if (req.query.remindend) {
									remindEnd = _util2.default.getDateTimeFormat(req.query.remindend, "yyyy-MM-dd");

									sql = "SELECT COUNT(*) AS count FROM huiyuan WHERE " + req.params.columnName + " <= '" + remindEnd + "'";
								}

								if (req.query.remindstart && req.query.remindend) {
									_remindStart = _util2.default.getDateTimeFormat(0 + Number(req.query.remindstart), "yyyy-MM-dd");
									_remindEnd = _util2.default.getDateTimeFormat(req.query.remindend, "yyyy-MM-dd");

									sql = "SELECT COUNT(*) AS count FROM huiyuan WHERE " + req.params.columnName + " >= '" + _remindStart + "' AND " + req.params.columnName + " <= '" + _remindEnd + "'";
								}
							}

							_context13.next = 6;
							return _sequelize3.default.query(sql, {
								plain: true,
								raw: true,
								type: _sequelize.QueryTypes.SELECT
							});

						case 6:
							results = _context13.sent;


							_toRes2.default.count(res, 0, results.count);
							_context13.next = 13;
							break;

						case 10:
							_context13.prev = 10;
							_context13.t0 = _context13['catch'](0);


							_toRes2.default.session(res, 500, '服务器错误！', '', 500);

						case 13:
						case 'end':
							return _context13.stop();
					}
				}
			}, _callee13, undefined, [[0, 10]]);
		}));

		return function (_x25, _x26) {
			return _ref14.apply(this, arguments);
		};
	}());

	// 分组统计接口
	api.get('/group/:columnName', function () {
		var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14(req, res) {
			var sql, columnName, where;
			return _regenerator2.default.wrap(function _callee14$(_context14) {
				while (1) {
					switch (_context14.prev = _context14.next) {
						case 0:
							_context14.prev = 0;
							sql = "";
							columnName = req.params.columnName;
							// let tableName = "huiyuan"

							where = " WHERE 1 = 1 ";

							sql = "SELECT COUNT(*) AS total, " + columnName + " FROM huiyuan " + where + " GROUP BY " + columnName + " LIMIT 10";
							_context14.t0 = _toRes2.default;
							_context14.t1 = res;
							_context14.next = 9;
							return _sequelize3.default.query(sql, {
								plain: false,
								raw: true,
								type: _sequelize.QueryTypes.SELECT
							});

						case 9:
							_context14.t2 = _context14.sent;

							_context14.t0.record.call(_context14.t0, _context14.t1, 0, _context14.t2);

							_context14.next = 16;
							break;

						case 13:
							_context14.prev = 13;
							_context14.t3 = _context14['catch'](0);


							_toRes2.default.session(res, 500, '服务器错误！', '', 500);

						case 16:
						case 'end':
							return _context14.stop();
					}
				}
			}, _callee14, undefined, [[0, 13]]);
		}));

		return function (_x27, _x28) {
			return _ref15.apply(this, arguments);
		};
	}());

	// 统计指定字段
	api.get('/value/:xColumnName/:yColumnName', function () {
		var _ref16 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15(req, res) {
			var sql, xColumnName, yColumnName, where;
			return _regenerator2.default.wrap(function _callee15$(_context15) {
				while (1) {
					switch (_context15.prev = _context15.next) {
						case 0:
							_context15.prev = 0;
							sql = "";
							xColumnName = req.params.xColumnName;
							yColumnName = req.params.yColumnName;
							// let tableName = "huiyuan"

							where = " WHERE 1 = 1 ";

							if ("huiyuan" == "orders") {
								where += " AND status IN ('已支付', '已发货', '已完成') ";
							}

							sql = "SELECT " + xColumnName + ", SUM(" + yColumnName + ") AS total FROM huiyuan " + where + " GROUP BY " + xColumnName + " DESC LIMIT 10";

							_context15.t0 = _toRes2.default;
							_context15.t1 = res;
							_context15.next = 11;
							return _sequelize3.default.query(sql, {
								plain: false,
								raw: true,
								type: _sequelize.QueryTypes.SELECT
							});

						case 11:
							_context15.t2 = _context15.sent;

							_context15.t0.record.call(_context15.t0, _context15.t1, 0, _context15.t2);

							_context15.next = 18;
							break;

						case 15:
							_context15.prev = 15;
							_context15.t3 = _context15['catch'](0);


							_toRes2.default.session(res, 500, '服务器错误！', '', 500);

						case 18:
						case 'end':
							return _context15.stop();
					}
				}
			}, _callee15, undefined, [[0, 15]]);
		}));

		return function (_x29, _x30) {
			return _ref16.apply(this, arguments);
		};
	}());

	// 按日期统计
	api.get('/value/:xColumnName/:yColumnName/:timeStatType', function () {
		var _ref17 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee16(req, res) {
			var sql, xColumnName, yColumnName, timeStatType, tableName, where;
			return _regenerator2.default.wrap(function _callee16$(_context16) {
				while (1) {
					switch (_context16.prev = _context16.next) {
						case 0:
							_context16.prev = 0;
							sql = "";
							xColumnName = req.params.xColumnName;
							yColumnName = req.params.yColumnName;
							timeStatType = req.params.timeStatType;
							tableName = "huiyuan";
							where = " WHERE 1 = 1 ";

							if ("huiyuan" == "orders") {
								where += " AND status IN ('已支付', '已发货', '已完成') ";
							}

							if (config.dbConnection.dbtype.toLowerCase() == "mysql") {
								if (timeStatType == "日") sql = "SELECT DATE_FORMAT(" + xColumnName + ", '%Y-%m-%d') " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(" + xColumnName + ", '%Y-%m-%d') LIMIT 10";
								if (timeStatType == "月") sql = "SELECT DATE_FORMAT(" + xColumnName + ", '%Y-%m') " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(" + xColumnName + ", '%Y-%m')  LIMIT 10";
								if (timeStatType == "年") sql = "SELECT DATE_FORMAT(" + xColumnName + ", '%Y') " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(" + xColumnName + ", '%Y')  LIMIT 10";
							} else {
								if (timeStatType == "日") sql = "SELECT DATE_FORMAT(VARCHAR(10)," + xColumnName + ", 120) " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(VARCHAR(10)," + xColumnName + ", 120)  LIMIT 10";
								if (timeStatType == "月") sql = "SELECT DATE_FORMAT(VARCHAR(7)," + xColumnName + ", 120) " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(VARCHAR(7)," + xColumnName + ", 120)  LIMIT 10";
								if (timeStatType == "年") sql = "SELECT DATE_FORMAT(VARCHAR(4)," + xColumnName + ", 120) " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(VARCHAR(4)," + xColumnName + ", 120)  LIMIT 10";
							}
							_context16.t0 = _toRes2.default;
							_context16.t1 = res;
							_context16.next = 13;
							return _sequelize3.default.query(sql, {
								plain: false,
								raw: true,
								type: _sequelize.QueryTypes.SELECT
							});

						case 13:
							_context16.t2 = _context16.sent;

							_context16.t0.record.call(_context16.t0, _context16.t1, 0, _context16.t2);

							_context16.next = 20;
							break;

						case 17:
							_context16.prev = 17;
							_context16.t3 = _context16['catch'](0);


							_toRes2.default.session(res, 500, '服务器错误！', '', 500);

						case 20:
						case 'end':
							return _context16.stop();
					}
				}
			}, _callee16, undefined, [[0, 17]]);
		}));

		return function (_x31, _x32) {
			return _ref17.apply(this, arguments);
		};
	}());

	return api;
};
//# sourceMappingURL=Huiyuan.js.map