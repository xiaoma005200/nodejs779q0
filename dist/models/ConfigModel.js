'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = require('./sequelize');

var _sequelize3 = _interopRequireDefault(_sequelize2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConfigModel = _sequelize3.default.define('ConfigModel', {
	id: {
		type: _sequelize.DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		comment: '主键id'
	},
	name: {
		type: _sequelize.DataTypes.STRING,
		allowNull: false,
		comment: '配置参数名称'
	},
	value: {
		type: _sequelize.DataTypes.STRING,
		allowNull: true,
		comment: '配置参数值'
	}
}, {
	timestamps: false,
	freezeTableName: true,
	tableName: 'config'
});

exports.default = ConfigModel;
//# sourceMappingURL=ConfigModel.js.map