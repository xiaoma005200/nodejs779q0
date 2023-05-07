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

// 房间信息
var FangjianxinxiModel = _sequelize3.default.define('FangjianxinxiModel', {
	id: {
		type: _sequelize.DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		comment: '主键id'
	},
	fangjianmingcheng: {
		type: _sequelize.DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '房间名称'
	},
	fangjianlouceng: {
		type: _sequelize.DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '房间楼层'
	},
	fangjianleixing: {
		type: _sequelize.DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '房间类型'
	},
	fangjiantupian: {
		type: _sequelize.DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '房间图片'
	},
	fangjiansheshi: {
		type: _sequelize.DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '房间设施'
	},
	fangjianjiage: {
		type: _sequelize.DataTypes.INTEGER,
		defaultValue: 0,
		allowNull: true,
		comment: '房间价格'
	},
	fangjianzhuangtai: {
		type: _sequelize.DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '房间状态'
	},
	dingfangdianhua: {
		type: _sequelize.DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '订房电话'
	},
	fangjianjieshao: {
		type: _sequelize.DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '房间介绍'
	},
	clicktime: {
		type: _sequelize.DataTypes.DATE,
		allowNull: true,
		get: function get() {
			return (0, _moment2.default)(this.getDataValue('clicktime')).format('YYYY-MM-DD HH:mm:ss');
		},

		comment: '最近点击时间'
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
	tableName: 'fangjianxinxi'
});

exports.default = FangjianxinxiModel;
//# sourceMappingURL=FangjianxinxiModel.js.map