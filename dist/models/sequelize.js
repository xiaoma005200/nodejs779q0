'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _sequelize = require('sequelize');

var _config = require('../config.json');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sequelize = new _sequelize.Sequelize(_config2.default.dbConnection.database, _config2.default.dbConnection.username, _config2.default.dbConnection.password, {
	host: 'localhost', // 数据库服务器
	dialect: _config2.default.dbConnection.dbtype, // 这里可以改成任意一种关系型数据库
	logging: false
});

exports.default = sequelize;

// 第一个参数：连接的数据库名
// 第二个参数：数据库的用户名
// 第三个参数：数据库的密码
//# sourceMappingURL=sequelize.js.map