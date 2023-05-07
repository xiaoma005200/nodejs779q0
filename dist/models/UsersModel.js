'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _sequelize = require('sequelize');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _sequelize2 = require('./sequelize');

var _sequelize3 = _interopRequireDefault(_sequelize2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UsersModel = _sequelize3.default.define('UsersModel', {
	id: {
		type: _sequelize.DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		comment: '主键id'
	},
	username: {
		type: _sequelize.DataTypes.STRING,
		allowNull: false,
		comment: '用户名'
	},
	password: {
		type: _sequelize.DataTypes.STRING,
		allowNull: false,
		comment: '用户密码'
	},
	role: {
		type: _sequelize.DataTypes.STRING,
		allowNull: true,
		comment: '用户角色'
	},
	addtime: {
		type: _sequelize.DataTypes.DATE,
		defaultValue: _sequelize.DataTypes.NOW,
		allowNull: false,
		get: function get() {
			return (0, _moment2.default)(this.getDataValue('addtime')).format('YYYY-MM-DD HH:mm:ss');
		},

		comment: '添加时间'
	}
}, {
	timestamps: false,
	freezeTableName: true,
	tableName: 'users'
});

exports.default = UsersModel;
//# sourceMappingURL=UsersModel.js.map