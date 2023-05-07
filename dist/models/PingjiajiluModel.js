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

// 评价记录
var PingjiajiluModel = _sequelize3.default.define('PingjiajiluModel', {
	id: {
		type: _sequelize.DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		comment: '主键id'
	},
	tuifangdanhao: {
		type: _sequelize.DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '退房单号'
	},
	fangjianmingcheng: {
		type: _sequelize.DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '房间名称'
	},
	fangjiantupian: {
		type: _sequelize.DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '房间图片'
	},
	tuifangshijian: {
		type: _sequelize.DataTypes.DATE,
		allowNull: true,
		get: function get() {
			return (0, _moment2.default)(this.getDataValue('tuifangshijian')).format('YYYY-MM-DD HH:mm:ss');
		},

		comment: '退房时间'
	},
	tuifangbeizhu: {
		type: _sequelize.DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '退房备注'
	},
	fangjianpingfen: {
		type: _sequelize.DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '房间评分'
	},
	fangjianpingjia: {
		type: _sequelize.DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '房间评价'
	},
	yijianfankui: {
		type: _sequelize.DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '意见反馈'
	},
	yonghuming: {
		type: _sequelize.DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '用户名'
	},
	shouji: {
		type: _sequelize.DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '手机'
	},
	crossuserid: {
		type: _sequelize.DataTypes.BIGINT,
		defaultValue: 0,
		allowNull: true,
		comment: '跨表用户id'
	},
	crossrefid: {
		type: _sequelize.DataTypes.BIGINT,
		defaultValue: 0,
		allowNull: true,
		comment: '跨表主键id'
	},
	shhf: {
		type: _sequelize.DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '回复内容'
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
	tableName: 'pingjiajilu'
});

exports.default = PingjiajiluModel;
//# sourceMappingURL=PingjiajiluModel.js.map