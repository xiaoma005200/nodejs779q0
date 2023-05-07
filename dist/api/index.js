'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _Users = require('./Users');

var _Users2 = _interopRequireDefault(_Users);

var _File = require('./File');

var _File2 = _interopRequireDefault(_File);

var _Config = require('./Config');

var _Config2 = _interopRequireDefault(_Config);

var _Common = require('./Common');

var _Common2 = _interopRequireDefault(_Common);

var _Huiyuan = require('./Huiyuan');

var _Huiyuan2 = _interopRequireDefault(_Huiyuan);

var _Fangjianleixing = require('./Fangjianleixing');

var _Fangjianleixing2 = _interopRequireDefault(_Fangjianleixing);

var _Fangjianxinxi = require('./Fangjianxinxi');

var _Fangjianxinxi2 = _interopRequireDefault(_Fangjianxinxi);

var _Yudingjilu = require('./Yudingjilu');

var _Yudingjilu2 = _interopRequireDefault(_Yudingjilu);

var _Ruzhujilu = require('./Ruzhujilu');

var _Ruzhujilu2 = _interopRequireDefault(_Ruzhujilu);

var _Pingjiajilu = require('./Pingjiajilu');

var _Pingjiajilu2 = _interopRequireDefault(_Pingjiajilu);

var _Storeup = require('./Storeup');

var _Storeup2 = _interopRequireDefault(_Storeup);

var _News = require('./News');

var _News2 = _interopRequireDefault(_News);

var _Aboutus = require('./Aboutus');

var _Aboutus2 = _interopRequireDefault(_Aboutus);

var _Systemintro = require('./Systemintro');

var _Systemintro2 = _interopRequireDefault(_Systemintro);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
	var config = _ref.config,
	    db = _ref.db;

	var api = (0, _express.Router)();
	api.use('/users', (0, _Users2.default)({ config: config, db: db }));
	api.use('/file', (0, _File2.default)({ config: config, db: db }));
	api.use('/config', (0, _Config2.default)({ config: config, db: db }));
	api.use('/', (0, _Common2.default)({ config: config, db: db }));
	api.use('/huiyuan', (0, _Huiyuan2.default)({ config: config, db: db }));
	api.use('/fangjianleixing', (0, _Fangjianleixing2.default)({ config: config, db: db }));
	api.use('/fangjianxinxi', (0, _Fangjianxinxi2.default)({ config: config, db: db }));
	api.use('/yudingjilu', (0, _Yudingjilu2.default)({ config: config, db: db }));
	api.use('/ruzhujilu', (0, _Ruzhujilu2.default)({ config: config, db: db }));
	api.use('/pingjiajilu', (0, _Pingjiajilu2.default)({ config: config, db: db }));
	api.use('/storeup', (0, _Storeup2.default)({ config: config, db: db }));
	api.use('/news', (0, _News2.default)({ config: config, db: db }));
	api.use('/aboutus', (0, _Aboutus2.default)({ config: config, db: db }));
	api.use('/systemintro', (0, _Systemintro2.default)({ config: config, db: db }));
	return api;
};
//# sourceMappingURL=index.js.map