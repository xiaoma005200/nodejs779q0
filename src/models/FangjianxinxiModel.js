import { Sequelize, DataTypes } from 'sequelize'
import moment from 'moment'
import sequelize from './sequelize'

// 房间信息
const FangjianxinxiModel = sequelize.define('FangjianxinxiModel', {
	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		comment: '主键id'
	},
	fangjianmingcheng: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '房间名称'
	},
	fangjianlouceng: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '房间楼层'
	},
	fangjianleixing: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '房间类型'
	},
	fangjiantupian: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '房间图片'
	},
	fangjiansheshi: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '房间设施'
	},
	fangjianjiage: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
		allowNull: true,
		comment: '房间价格'
	},
	fangjianzhuangtai: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '房间状态'
	},
	dingfangdianhua: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '订房电话'
	},
	fangjianjieshao: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '房间介绍'
	},
	clicktime: {
		type: DataTypes.DATE,
		allowNull: true,
		get() {
            return moment(this.getDataValue('clicktime')).format('YYYY-MM-DD HH:mm:ss')
        },
		comment: '最近点击时间'
	},
	addtime: {
  		type: DataTypes.DATE,
  		defaultValue: DataTypes.NOW,
    	allowNull: false,
    	get() {
            return moment(this.getDataValue('addtime')).format('YYYY-MM-DD HH:mm:ss')
        },
		comment: '添加时间'
	}
}, {
	timestamps: false,
	freezeTableName: true,
	tableName: 'fangjianxinxi'
})

export default FangjianxinxiModel
