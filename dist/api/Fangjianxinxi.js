'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _package = require('../../package.json');

var _express = require('express');

var _sequelize = require('sequelize');

var _sequelize2 = require('../models/sequelize');

var _sequelize3 = _interopRequireDefault(_sequelize2);

var _toRes = require('../lib/toRes');

var _toRes2 = _interopRequireDefault(_toRes);

var _FangjianxinxiModel = require('../models/FangjianxinxiModel');

var _FangjianxinxiModel2 = _interopRequireDefault(_FangjianxinxiModel);

var _md5Node = require('md5-node');

var _md5Node2 = _interopRequireDefault(_md5Node);

var _util = require('../lib/util');

var _util2 = _interopRequireDefault(_util);

var _StoreupModel = require('../models/StoreupModel');

var _StoreupModel2 = _interopRequireDefault(_StoreupModel);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
	var config = _ref.config,
	    db = _ref.db;

	var api = (0, _express.Router)();

	// 分页接口（后端）
	api.get('/page', function () {
		var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
			var page, limit, sort, order, where, fangjianmingcheng, fangjianlouceng, fangjianleixing, fangjiantupian, fangjiansheshi, fangjianjiage, fangjianzhuangtai, dingfangdianhua, fangjianjieshao, clicktime, result;
			return _regenerator2.default.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.prev = 0;
							page = parseInt(req.query.page) || 1;
							limit = parseInt(req.query.limit) || 10;
							sort = req.query.sort || 'id';
							order = req.query.order || 'asc';
							where = {};
							fangjianmingcheng = req.query.fangjianmingcheng;

							if (fangjianmingcheng) {

								if (fangjianmingcheng.indexOf('%') != -1) {
									where.fangjianmingcheng = (0, _defineProperty3.default)({}, _sequelize.Op.like, fangjianmingcheng);
								} else {
									where.fangjianmingcheng = (0, _defineProperty3.default)({}, _sequelize.Op.eq, fangjianmingcheng);
								}
							}
							fangjianlouceng = req.query.fangjianlouceng;

							if (fangjianlouceng) {

								if (fangjianlouceng.indexOf('%') != -1) {
									where.fangjianlouceng = (0, _defineProperty3.default)({}, _sequelize.Op.like, fangjianlouceng);
								} else {
									where.fangjianlouceng = (0, _defineProperty3.default)({}, _sequelize.Op.eq, fangjianlouceng);
								}
							}
							fangjianleixing = req.query.fangjianleixing;

							if (fangjianleixing) {

								if (fangjianleixing.indexOf('%') != -1) {
									where.fangjianleixing = (0, _defineProperty3.default)({}, _sequelize.Op.like, fangjianleixing);
								} else {
									where.fangjianleixing = (0, _defineProperty3.default)({}, _sequelize.Op.eq, fangjianleixing);
								}
							}
							fangjiantupian = req.query.fangjiantupian;

							if (fangjiantupian) {

								if (fangjiantupian.indexOf('%') != -1) {
									where.fangjiantupian = (0, _defineProperty3.default)({}, _sequelize.Op.like, fangjiantupian);
								} else {
									where.fangjiantupian = (0, _defineProperty3.default)({}, _sequelize.Op.eq, fangjiantupian);
								}
							}
							fangjiansheshi = req.query.fangjiansheshi;

							if (fangjiansheshi) {

								if (fangjiansheshi.indexOf('%') != -1) {
									where.fangjiansheshi = (0, _defineProperty3.default)({}, _sequelize.Op.like, fangjiansheshi);
								} else {
									where.fangjiansheshi = (0, _defineProperty3.default)({}, _sequelize.Op.eq, fangjiansheshi);
								}
							}
							fangjianjiage = req.query.fangjianjiage;

							if (fangjianjiage) {

								if (fangjianjiage.indexOf('%') != -1) {
									where.fangjianjiage = (0, _defineProperty3.default)({}, _sequelize.Op.like, fangjianjiage);
								} else {
									where.fangjianjiage = (0, _defineProperty3.default)({}, _sequelize.Op.eq, fangjianjiage);
								}
							}
							fangjianzhuangtai = req.query.fangjianzhuangtai;

							if (fangjianzhuangtai) {

								if (fangjianzhuangtai.indexOf('%') != -1) {
									where.fangjianzhuangtai = (0, _defineProperty3.default)({}, _sequelize.Op.like, fangjianzhuangtai);
								} else {
									where.fangjianzhuangtai = (0, _defineProperty3.default)({}, _sequelize.Op.eq, fangjianzhuangtai);
								}
							}
							dingfangdianhua = req.query.dingfangdianhua;

							if (dingfangdianhua) {

								if (dingfangdianhua.indexOf('%') != -1) {
									where.dingfangdianhua = (0, _defineProperty3.default)({}, _sequelize.Op.like, dingfangdianhua);
								} else {
									where.dingfangdianhua = (0, _defineProperty3.default)({}, _sequelize.Op.eq, dingfangdianhua);
								}
							}
							fangjianjieshao = req.query.fangjianjieshao;

							if (fangjianjieshao) {

								if (fangjianjieshao.indexOf('%') != -1) {
									where.fangjianjieshao = (0, _defineProperty3.default)({}, _sequelize.Op.like, fangjianjieshao);
								} else {
									where.fangjianjieshao = (0, _defineProperty3.default)({}, _sequelize.Op.eq, fangjianjieshao);
								}
							}
							clicktime = req.query.clicktime;

							if (clicktime) {

								if (clicktime.indexOf('%') != -1) {
									where.clicktime = (0, _defineProperty3.default)({}, _sequelize.Op.like, clicktime);
								} else {
									where.clicktime = (0, _defineProperty3.default)({}, _sequelize.Op.eq, clicktime);
								}
							}

							_context.next = 28;
							return _FangjianxinxiModel2.default.findAndCountAll({
								order: [[sort, order]],
								where: where,
								offset: (page - 1) * limit,
								limit: limit
							});

						case 28:
							result = _context.sent;


							result.currPage = page;
							result.pageSize = limit;

							_toRes2.default.page(res, 0, result);
							_context.next = 37;
							break;

						case 34:
							_context.prev = 34;
							_context.t0 = _context['catch'](0);


							_toRes2.default.session(res, 500, '服务器错误！', '', 500);

						case 37:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, undefined, [[0, 34]]);
		}));

		return function (_x, _x2) {
			return _ref2.apply(this, arguments);
		};
	}());

	// 分页接口（前端）
	api.get('/list', function () {
		var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
			var page, limit, sort, order, where, fangjianmingcheng, fangjianleixing, fangjianzhuangtai, result;
			return _regenerator2.default.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							_context2.prev = 0;
							page = parseInt(req.query.page) || 1;
							limit = parseInt(req.query.limit) || 10;
							sort = req.query.sort || 'id';
							order = req.query.order || 'asc';
							where = {};
							fangjianmingcheng = req.query.fangjianmingcheng;

							if (fangjianmingcheng) {

								if (fangjianmingcheng.indexOf('%') != -1) {
									where.fangjianmingcheng = (0, _defineProperty3.default)({}, _sequelize.Op.like, fangjianmingcheng);
								} else {
									where.fangjianmingcheng = (0, _defineProperty3.default)({}, _sequelize.Op.eq, fangjianmingcheng);
								}
							}
							fangjianleixing = req.query.fangjianleixing;

							if (fangjianleixing) {

								if (fangjianleixing.indexOf('%') != -1) {
									where.fangjianleixing = (0, _defineProperty3.default)({}, _sequelize.Op.like, fangjianleixing);
								} else {
									where.fangjianleixing = (0, _defineProperty3.default)({}, _sequelize.Op.eq, fangjianleixing);
								}
							}
							fangjianzhuangtai = req.query.fangjianzhuangtai;

							if (fangjianzhuangtai) {

								if (fangjianzhuangtai.indexOf('%') != -1) {
									where.fangjianzhuangtai = (0, _defineProperty3.default)({}, _sequelize.Op.like, fangjianzhuangtai);
								} else {
									where.fangjianzhuangtai = (0, _defineProperty3.default)({}, _sequelize.Op.eq, fangjianzhuangtai);
								}
							}

							_context2.next = 14;
							return _FangjianxinxiModel2.default.findAndCountAll({
								order: [[sort, order]],
								where: where,
								offset: (page - 1) * limit,
								limit: limit
							});

						case 14:
							result = _context2.sent;


							result.currPage = page;
							result.pageSize = limit;

							_toRes2.default.page(res, 0, result);
							_context2.next = 23;
							break;

						case 20:
							_context2.prev = 20;
							_context2.t0 = _context2['catch'](0);


							_toRes2.default.session(res, 401, '您的权限不够！', '', 200);

						case 23:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, undefined, [[0, 20]]);
		}));

		return function (_x3, _x4) {
			return _ref3.apply(this, arguments);
		};
	}());

	// 保存接口（后端）
	api.post('/save', function () {
		var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
			var userinfo;
			return _regenerator2.default.wrap(function _callee3$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							_context3.prev = 0;


							Object.keys(req.body).forEach(function (item) {
								if (req.body[item] == '') delete req.body[item];
							});

							req.body.clicktime = (0, _moment2.default)(Date.now()).format('YYYY-MM-DD HH:mm:ss');

							_context3.next = 5;
							return _FangjianxinxiModel2.default.create(req.body);

						case 5:
							userinfo = _context3.sent;


							if (userinfo === null) {

								_toRes2.default.session(res, -1, '添加失败！');
							} else {

								_toRes2.default.session(res, 0, '添加成功！');
							}
							_context3.next = 12;
							break;

						case 9:
							_context3.prev = 9;
							_context3.t0 = _context3['catch'](0);


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

	// 保存接口（前端）
	api.post('/add', function () {
		var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
			var userinfo;
			return _regenerator2.default.wrap(function _callee4$(_context4) {
				while (1) {
					switch (_context4.prev = _context4.next) {
						case 0:
							_context4.prev = 0;


							Object.keys(req.body).forEach(function (item) {
								if (req.body[item] == '') delete req.body[item];
							});

							if (_jsonwebtoken2.default.decode(req.headers.token) == null) {
								_toRes2.default.session(res, 401, '请登录后再操作', '', 401);
							}

							req.body.clicktime = (0, _moment2.default)(Date.now()).format('YYYY-MM-DD HH:mm:ss');

							_context4.next = 6;
							return _FangjianxinxiModel2.default.create(req.body);

						case 6:
							userinfo = _context4.sent;


							if (userinfo === null) {

								_toRes2.default.session(res, -1, '添加失败！');
							} else {

								_toRes2.default.session(res, 0, '添加成功！');
							}
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

	// 更新接口
	api.post('/update', function () {
		var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
			return _regenerator2.default.wrap(function _callee5$(_context5) {
				while (1) {
					switch (_context5.prev = _context5.next) {
						case 0:
							_context5.prev = 0;
							_context5.next = 3;
							return _FangjianxinxiModel2.default.update(req.body, {
								where: {
									id: req.body.id || 0
								}
							});

						case 3:

							_toRes2.default.session(res, 0, '编辑成功！');
							_context5.next = 9;
							break;

						case 6:
							_context5.prev = 6;
							_context5.t0 = _context5['catch'](0);


							_toRes2.default.session(res, 500, '服务器错误！', '', 500);

						case 9:
						case 'end':
							return _context5.stop();
					}
				}
			}, _callee5, undefined, [[0, 6]]);
		}));

		return function (_x9, _x10) {
			return _ref6.apply(this, arguments);
		};
	}());

	// 删除接口
	api.post('/delete', function () {
		var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res) {
			return _regenerator2.default.wrap(function _callee6$(_context6) {
				while (1) {
					switch (_context6.prev = _context6.next) {
						case 0:
							_context6.prev = 0;
							_context6.next = 3;
							return _FangjianxinxiModel2.default.destroy({
								where: {
									id: (0, _defineProperty3.default)({}, _sequelize.Op.in, req.body)
								}
							});

						case 3:

							_toRes2.default.session(res, 0, '删除成功！');
							_context6.next = 9;
							break;

						case 6:
							_context6.prev = 6;
							_context6.t0 = _context6['catch'](0);


							_toRes2.default.session(res, 500, '服务器错误！', '', 500);

						case 9:
						case 'end':
							return _context6.stop();
					}
				}
			}, _callee6, undefined, [[0, 6]]);
		}));

		return function (_x11, _x12) {
			return _ref7.apply(this, arguments);
		};
	}());

	// 详情接口（后端）
	api.all('/info/:id', function () {
		var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(req, res) {
			return _regenerator2.default.wrap(function _callee7$(_context7) {
				while (1) {
					switch (_context7.prev = _context7.next) {
						case 0:
							_context7.prev = 0;
							_context7.next = 3;
							return _FangjianxinxiModel2.default.update({
								clicktime: (0, _moment2.default)(Date.now()).format('YYYY-MM-DD HH:mm:ss')
							}, {
								where: {
									id: req.params.id
								}
							});

						case 3:
							_context7.t0 = _toRes2.default;
							_context7.t1 = res;
							_context7.next = 7;
							return _FangjianxinxiModel2.default.findOne({ where: { id: req.params.id } });

						case 7:
							_context7.t2 = _context7.sent;

							_context7.t0.record.call(_context7.t0, _context7.t1, 0, _context7.t2);

							_context7.next = 14;
							break;

						case 11:
							_context7.prev = 11;
							_context7.t3 = _context7['catch'](0);


							_toRes2.default.session(res, 500, '服务器错误！', '', 500);

						case 14:
						case 'end':
							return _context7.stop();
					}
				}
			}, _callee7, undefined, [[0, 11]]);
		}));

		return function (_x13, _x14) {
			return _ref8.apply(this, arguments);
		};
	}());

	// 详情接口（前端）
	api.all('/detail/:id', function () {
		var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(req, res) {
			return _regenerator2.default.wrap(function _callee8$(_context8) {
				while (1) {
					switch (_context8.prev = _context8.next) {
						case 0:
							_context8.prev = 0;
							_context8.next = 3;
							return _FangjianxinxiModel2.default.update({
								clicktime: (0, _moment2.default)(Date.now()).format('YYYY-MM-DD HH:mm:ss')
							}, {
								where: {
									id: req.params.id
								}
							});

						case 3:
							_context8.t0 = _toRes2.default;
							_context8.t1 = res;
							_context8.next = 7;
							return _FangjianxinxiModel2.default.findOne({ where: { id: req.params.id } });

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

	// 获取需要提醒的记录数接口
	api.get('/remind/:columnName/:type', function () {
		var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(req, res) {
			var sql, remindStart, remindEnd, _remindStart, _remindEnd, results;

			return _regenerator2.default.wrap(function _callee9$(_context9) {
				while (1) {
					switch (_context9.prev = _context9.next) {
						case 0:
							_context9.prev = 0;
							sql = 'SELECT 0 AS count';


							if (req.params.type == 1) {
								if (req.query.remindstart) sql = "SELECT COUNT(*) AS count FROM fangjianxinxi WHERE " + req.params.columnName + " >= '" + req.query.remindstart + "'";
								if (req.query.remindend) sql = "SELECT COUNT(*) AS count FROM fangjianxinxi WHERE " + req.params.columnName + " <= '" + req.query.remindend + "'";

								if (req.query.remindstart && req.query.remindend) {
									sql = "SELECT COUNT(*) AS count FROM fangjianxinxi WHERE " + req.params.columnName + " >= '" + req.query.remindstart + "' AND " + req.params.columnName + " <= '" + req.query.remindend + "'";
								}
							}

							if (req.params.type == 2) {
								if (req.query.remindstart) {
									remindStart = _util2.default.getDateTimeFormat(0 + Number(req.query.remindstart), "yyyy-MM-dd");

									sql = "SELECT COUNT(*) AS count FROM fangjianxinxi WHERE " + req.params.columnName + " >= '" + remindStart + "'";
								}
								if (req.query.remindend) {
									remindEnd = _util2.default.getDateTimeFormat(req.query.remindend, "yyyy-MM-dd");

									sql = "SELECT COUNT(*) AS count FROM fangjianxinxi WHERE " + req.params.columnName + " <= '" + remindEnd + "'";
								}

								if (req.query.remindstart && req.query.remindend) {
									_remindStart = _util2.default.getDateTimeFormat(0 + Number(req.query.remindstart), "yyyy-MM-dd");
									_remindEnd = _util2.default.getDateTimeFormat(req.query.remindend, "yyyy-MM-dd");

									sql = "SELECT COUNT(*) AS count FROM fangjianxinxi WHERE " + req.params.columnName + " >= '" + _remindStart + "' AND " + req.params.columnName + " <= '" + _remindEnd + "'";
								}
							}

							_context9.next = 6;
							return _sequelize3.default.query(sql, {
								plain: true,
								raw: true,
								type: _sequelize.QueryTypes.SELECT
							});

						case 6:
							results = _context9.sent;


							_toRes2.default.count(res, 0, results.count);
							_context9.next = 13;
							break;

						case 10:
							_context9.prev = 10;
							_context9.t0 = _context9['catch'](0);


							_toRes2.default.session(res, 500, '服务器错误！', '', 500);

						case 13:
						case 'end':
							return _context9.stop();
					}
				}
			}, _callee9, undefined, [[0, 10]]);
		}));

		return function (_x17, _x18) {
			return _ref10.apply(this, arguments);
		};
	}());

	// 智能推荐接口
	api.get('/autoSort', function () {
		var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(req, res) {
			var page, limit, sort, order, result;
			return _regenerator2.default.wrap(function _callee10$(_context10) {
				while (1) {
					switch (_context10.prev = _context10.next) {
						case 0:
							_context10.prev = 0;
							page = parseInt(req.query.page) || 1;
							limit = parseInt(req.query.limit) || 5;
							sort = req.query.sort || 'clicktime';
							order = req.query.order || 'desc';
							_context10.next = 7;
							return _FangjianxinxiModel2.default.findAndCountAll({
								order: [[sort, order]],
								offset: (page - 1) * limit,
								limit: limit
							});

						case 7:
							result = _context10.sent;


							result.currPage = page;
							result.pageSize = limit;

							_toRes2.default.page(res, 0, result);
							_context10.next = 16;
							break;

						case 13:
							_context10.prev = 13;
							_context10.t0 = _context10['catch'](0);


							_toRes2.default.session(res, 500, '服务器错误！', '', 500);

						case 16:
						case 'end':
							return _context10.stop();
					}
				}
			}, _callee10, undefined, [[0, 13]]);
		}));

		return function (_x19, _x20) {
			return _ref11.apply(this, arguments);
		};
	}());

	// 智能推荐接口
	api.get('/autoSort2', function () {
		var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(req, res) {
			var page, limit, whereStoreup, storeupList, arr, where, result, result1;
			return _regenerator2.default.wrap(function _callee11$(_context11) {
				while (1) {
					switch (_context11.prev = _context11.next) {
						case 0:
							_context11.prev = 0;
							page = parseInt(req.query.page) || 1;
							limit = parseInt(req.query.limit) || 5;
							whereStoreup = {};

							whereStoreup.userid = (0, _defineProperty3.default)({}, _sequelize.Op.eq, _jsonwebtoken2.default.decode(req.headers.token).id);
							whereStoreup.tablename = (0, _defineProperty3.default)({}, _sequelize.Op.eq, 'fangjianxinxi');
							_context11.next = 8;
							return _StoreupModel2.default.findAndCountAll({
								attributes: ['inteltype'],
								order: [['addtime', 'desc']],
								where: whereStoreup,
								offset: (page - 1) * limit,
								limit: limit
							});

						case 8:
							storeupList = _context11.sent;
							arr = [];

							storeupList.rows.forEach(function (item) {
								arr.push(item.dataValues.inteltype);
							});

							where = {};

							where.fangjianleixing = (0, _defineProperty3.default)({}, _sequelize.Op.in, arr);

							_context11.next = 15;
							return _FangjianxinxiModel2.default.findAndCountAll({
								where: where,
								offset: (page - 1) * limit,
								limit: limit
							});

						case 15:
							result = _context11.sent;


							where = {};
							where.fangjianleixing = (0, _defineProperty3.default)({}, _sequelize.Op.notIn, arr);

							_context11.next = 20;
							return _FangjianxinxiModel2.default.findAndCountAll({
								where: where,
								offset: (page - 1) * limit,
								limit: limit - result.count
							});

						case 20:
							result1 = _context11.sent;


							result.rows = result.rows.concat(result1.rows);

							result.currPage = page;
							result.pageSize = limit;
							result.total = result.count + result1.count;
							result.count = result.total;

							_toRes2.default.page(res, 0, result);
							_context11.next = 32;
							break;

						case 29:
							_context11.prev = 29;
							_context11.t0 = _context11['catch'](0);


							_toRes2.default.session(res, 500, '服务器错误！', '', 500);

						case 32:
						case 'end':
							return _context11.stop();
					}
				}
			}, _callee11, undefined, [[0, 29]]);
		}));

		return function (_x21, _x22) {
			return _ref12.apply(this, arguments);
		};
	}());

	// 分组统计接口
	api.get('/group/:columnName', function () {
		var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(req, res) {
			var sql, columnName, where;
			return _regenerator2.default.wrap(function _callee12$(_context12) {
				while (1) {
					switch (_context12.prev = _context12.next) {
						case 0:
							_context12.prev = 0;
							sql = "";
							columnName = req.params.columnName;
							// let tableName = "fangjianxinxi"

							where = " WHERE 1 = 1 ";

							sql = "SELECT COUNT(*) AS total, " + columnName + " FROM fangjianxinxi " + where + " GROUP BY " + columnName + " LIMIT 10";
							_context12.t0 = _toRes2.default;
							_context12.t1 = res;
							_context12.next = 9;
							return _sequelize3.default.query(sql, {
								plain: false,
								raw: true,
								type: _sequelize.QueryTypes.SELECT
							});

						case 9:
							_context12.t2 = _context12.sent;

							_context12.t0.record.call(_context12.t0, _context12.t1, 0, _context12.t2);

							_context12.next = 16;
							break;

						case 13:
							_context12.prev = 13;
							_context12.t3 = _context12['catch'](0);


							_toRes2.default.session(res, 500, '服务器错误！', '', 500);

						case 16:
						case 'end':
							return _context12.stop();
					}
				}
			}, _callee12, undefined, [[0, 13]]);
		}));

		return function (_x23, _x24) {
			return _ref13.apply(this, arguments);
		};
	}());

	// 统计指定字段
	api.get('/value/:xColumnName/:yColumnName', function () {
		var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13(req, res) {
			var sql, xColumnName, yColumnName, where;
			return _regenerator2.default.wrap(function _callee13$(_context13) {
				while (1) {
					switch (_context13.prev = _context13.next) {
						case 0:
							_context13.prev = 0;
							sql = "";
							xColumnName = req.params.xColumnName;
							yColumnName = req.params.yColumnName;
							// let tableName = "fangjianxinxi"

							where = " WHERE 1 = 1 ";

							if ("fangjianxinxi" == "orders") {
								where += " AND status IN ('已支付', '已发货', '已完成') ";
							}

							sql = "SELECT " + xColumnName + ", SUM(" + yColumnName + ") AS total FROM fangjianxinxi " + where + " GROUP BY " + xColumnName + " DESC LIMIT 10";

							_context13.t0 = _toRes2.default;
							_context13.t1 = res;
							_context13.next = 11;
							return _sequelize3.default.query(sql, {
								plain: false,
								raw: true,
								type: _sequelize.QueryTypes.SELECT
							});

						case 11:
							_context13.t2 = _context13.sent;

							_context13.t0.record.call(_context13.t0, _context13.t1, 0, _context13.t2);

							_context13.next = 18;
							break;

						case 15:
							_context13.prev = 15;
							_context13.t3 = _context13['catch'](0);


							_toRes2.default.session(res, 500, '服务器错误！', '', 500);

						case 18:
						case 'end':
							return _context13.stop();
					}
				}
			}, _callee13, undefined, [[0, 15]]);
		}));

		return function (_x25, _x26) {
			return _ref14.apply(this, arguments);
		};
	}());

	// 按日期统计
	api.get('/value/:xColumnName/:yColumnName/:timeStatType', function () {
		var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14(req, res) {
			var sql, xColumnName, yColumnName, timeStatType, tableName, where;
			return _regenerator2.default.wrap(function _callee14$(_context14) {
				while (1) {
					switch (_context14.prev = _context14.next) {
						case 0:
							_context14.prev = 0;
							sql = "";
							xColumnName = req.params.xColumnName;
							yColumnName = req.params.yColumnName;
							timeStatType = req.params.timeStatType;
							tableName = "fangjianxinxi";
							where = " WHERE 1 = 1 ";

							if ("fangjianxinxi" == "orders") {
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
							_context14.t0 = _toRes2.default;
							_context14.t1 = res;
							_context14.next = 13;
							return _sequelize3.default.query(sql, {
								plain: false,
								raw: true,
								type: _sequelize.QueryTypes.SELECT
							});

						case 13:
							_context14.t2 = _context14.sent;

							_context14.t0.record.call(_context14.t0, _context14.t1, 0, _context14.t2);

							_context14.next = 20;
							break;

						case 17:
							_context14.prev = 17;
							_context14.t3 = _context14['catch'](0);


							_toRes2.default.session(res, 500, '服务器错误！', '', 500);

						case 20:
						case 'end':
							return _context14.stop();
					}
				}
			}, _callee14, undefined, [[0, 17]]);
		}));

		return function (_x27, _x28) {
			return _ref15.apply(this, arguments);
		};
	}());

	return api;
};
//# sourceMappingURL=Fangjianxinxi.js.map