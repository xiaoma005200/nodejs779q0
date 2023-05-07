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

// 预定记录
var YudingjiluModel = _sequelize3.default.define('YudingjiluModel', {
	id: {
		type: _sequelize.DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		comment: '主键id'
	},
	yudingdanhao: {
		type: _sequelize.DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '预订单号'
	},
	fangjianmingcheng: {
		type: _sequelize.DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '房间名称'
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
	fangjianjiage: {
		type: _sequelize.DataTypes.INTEGER,
		defaultValue: 0,
		allowNull: true,
		comment: '房间价格'
	},
	yudingriqi: {
		type: _sequelize.DataTypes.DATEONLY,
		allowNull: true,
		get: function get() {
			return (0, _moment2.default)(this.getDataValue('yudingriqi')).format('YYYY-MM-DD');
		},

		comment: '预定日期'
	},
	ruzhushijian: {
		type: _sequelize.DataTypes.DATE,
		allowNull: true,
		get: function get() {
			return (0, _moment2.default)(this.getDataValue('ruzhushijian')).format('YYYY-MM-DD HH:mm:ss');
		},

		comment: '入住时间'
	},
	ruzhurenshu: {
		type: _sequelize.DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '入住人数'
	},
	ruzhutianshu: {
		type: _sequelize.DataTypes.INTEGER,
		defaultValue: 0,
		allowNull: true,
		comment: '入住天数'
	},
	dingdanjine: {
		type: _sequelize.DataTypes.INTEGER,
		defaultValue: 0,
		allowNull: true,
		comment: '订单金额'
	},
	yonghuming: {
		type: _sequelize.DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '用户名'
	},
	xingming: {
		type: _sequelize.DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '姓名'
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
	shhf: {
		type: _sequelize.DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '回复内容'
	},
	ispay: {
		type: _sequelize.DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '是否支付'
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
	tableName: 'yudingjilu'
});

exports.default = YudingjiluModel;
//# sourceMappingURL=YudingjiluModel.js.map