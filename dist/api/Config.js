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

var _express = require('express');

var _sequelize = require('sequelize');

var _toRes = require('../lib/toRes');

var _toRes2 = _interopRequireDefault(_toRes);

var _ConfigModel = require('../models/ConfigModel');

var _ConfigModel2 = _interopRequireDefault(_ConfigModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
	var config = _ref.config,
	    db = _ref.db;

	var api = (0, _express.Router)();

	// 分页接口（后端）
	api.get('/page', function () {
		var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
			var page, limit, sort, order, where, name, result;
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
							name = req.query.name;

							if (name) {
								where.name = (0, _defineProperty3.default)({}, _sequelize.Op.like, '%' + name + '%');
							}

							_context.next = 10;
							return _ConfigModel2.default.findAndCountAll({
								order: [[sort, order]],
								where: where,
								offset: (page - 1) * limit,
								limit: limit
							});

						case 10:
							result = _context.sent;


							result.currPage = page;
							result.pageSize = limit;

							_toRes2.default.page(res, 0, result);
							_context.next = 19;
							break;

						case 16:
							_context.prev = 16;
							_context.t0 = _context['catch'](0);


							_toRes2.default.session(res, 500, '服务器错误！', '', 500);

						case 19:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, undefined, [[0, 16]]);
		}));

		return function (_x, _x2) {
			return _ref2.apply(this, arguments);
		};
	}());

	// 分页接口（前端）
	api.get('/list', function () {
		var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
			var page, limit, sort, order, where, name, result;
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
							name = req.query.name;

							if (name) {
								where.name = (0, _defineProperty3.default)({}, _sequelize.Op.like, '%' + name + '%');
							}

							_context2.next = 10;
							return _ConfigModel2.default.findAndCountAll({
								order: [[sort, order]],
								where: where,
								offset: (page - 1) * limit,
								limit: limit
							});

						case 10:
							result = _context2.sent;


							result.currPage = page;
							result.pageSize = limit;

							_toRes2.default.page(res, 0, result);
							_context2.next = 19;
							break;

						case 16:
							_context2.prev = 16;
							_context2.t0 = _context2['catch'](0);


							_toRes2.default.session(res, 500, '服务器错误！', '', 500);

						case 19:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, undefined, [[0, 16]]);
		}));

		return function (_x3, _x4) {
			return _ref3.apply(this, arguments);
		};
	}());

	// 更新接口
	api.post('/update', function () {
		var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
			return _regenerator2.default.wrap(function _callee3$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							_context3.prev = 0;
							_context3.next = 3;
							return _ConfigModel2.default.update(req.body, {
								where: {
									id: req.body.id
								}
							});

						case 3:

							_toRes2.default.session(res, 0, '编辑成功！');
							_context3.next = 9;
							break;

						case 6:
							_context3.prev = 6;
							_context3.t0 = _context3['catch'](0);


							_toRes2.default.session(res, 500, '服务器错误！', '', 500);

						case 9:
						case 'end':
							return _context3.stop();
					}
				}
			}, _callee3, undefined, [[0, 6]]);
		}));

		return function (_x5, _x6) {
			return _ref4.apply(this, arguments);
		};
	}());

	// 详情接口
	api.get('/info/:id', function () {
		var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
			return _regenerator2.default.wrap(function _callee4$(_context4) {
				while (1) {
					switch (_context4.prev = _context4.next) {
						case 0:
							_context4.prev = 0;
							_context4.t0 = _toRes2.default;
							_context4.t1 = res;
							_context4.next = 5;
							return _ConfigModel2.default.findOne({ where: { id: req.params.id } });

						case 5:
							_context4.t2 = _context4.sent;

							_context4.t0.record.call(_context4.t0, _context4.t1, 0, _context4.t2);

							_context4.next = 12;
							break;

						case 9:
							_context4.prev = 9;
							_context4.t3 = _context4['catch'](0);


							_toRes2.default.session(res, 500, '服务器错误！', '', 500);

						case 12:
						case 'end':
							return _context4.stop();
					}
				}
			}, _callee4, undefined, [[0, 9]]);
		}));

		return function (_x7, _x8) {
			return _ref5.apply(this, arguments);
		};
	}());

	// 配置获取接口（后端）
	api.get('/info', function () {
		var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
			return _regenerator2.default.wrap(function _callee5$(_context5) {
				while (1) {
					switch (_context5.prev = _context5.next) {
						case 0:
							_context5.prev = 0;
							_context5.t0 = _toRes2.default;
							_context5.t1 = res;
							_context5.next = 5;
							return _ConfigModel2.default.findOne({ where: { name: req.query.name } });

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

	// 配置获取接口（前端）
	api.get('/detail', function () {
		var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res) {
			return _regenerator2.default.wrap(function _callee6$(_context6) {
				while (1) {
					switch (_context6.prev = _context6.next) {
						case 0:
							_context6.prev = 0;
							_context6.t0 = _toRes2.default;
							_context6.t1 = res;
							_context6.next = 5;
							return _ConfigModel2.default.findOne({ where: { name: req.query.name } });

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

	return api;
};
//# sourceMappingURL=Config.js.map