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

// 会员
var HuiyuanModel = _sequelize3.default.define('HuiyuanModel', {
	id: {
		type: _sequelize.DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		comment: '主键id'
	},
	yonghuming: {
		type: _sequelize.DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '用户名'
	},
	mima: {
		type: _sequelize.DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '密码'
	},
	xingming: {
		type: _sequelize.DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '姓名'
	},
	xingbie: {
		type: _sequelize.DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '性别'
	},
	touxiang: {
		type: _sequelize.DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '头像'
	},
	shouji: {
		type: _sequelize.DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '手机'
	},
	shenfenzheng: {
		type: _sequelize.DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '身份证'
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
	tableName: 'huiyuan'
});

exports.default = HuiyuanModel;
//# sourceMappingURL=HuiyuanModel.js.map