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

// 公告信息
var NewsModel = _sequelize3.default.define('NewsModel', {
	id: {
		type: _sequelize.DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		comment: '主键id'
	},
	title: {
		type: _sequelize.DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '标题'
	},
	introduction: {
		type: _sequelize.DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '简介'
	},
	picture: {
		type: _sequelize.DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '图片'
	},
	content: {
		type: _sequelize.DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '内容'
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
	tableName: 'news'
});

exports.default = NewsModel;
//# sourceMappingURL=NewsModel.js.map