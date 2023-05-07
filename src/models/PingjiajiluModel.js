import { Sequelize, DataTypes } from 'sequelize'
import moment from 'moment'
import sequelize from './sequelize'

// 评价记录
const PingjiajiluModel = sequelize.define('PingjiajiluModel', {
	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		comment: '主键id'
	},
	tuifangdanhao: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '退房单号'
	},
	fangjianmingcheng: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '房间名称'
	},
	fangjiantupian: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '房间图片'
	},
	tuifangshijian: {
		type: DataTypes.DATE,
		allowNull: true,
		get() {
            return moment(this.getDataValue('tuifangshijian')).format('YYYY-MM-DD HH:mm:ss')
        },
		comment: '退房时间'
	},
	tuifangbeizhu: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '退房备注'
	},
	fangjianpingfen: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '房间评分'
	},
	fangjianpingjia: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '房间评价'
	},
	yijianfankui: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '意见反馈'
	},
	yonghuming: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '用户名'
	},
	shouji: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '手机'
	},
	crossuserid: {
		type: DataTypes.BIGINT,
		defaultValue: 0,
		allowNull: true,
		comment: '跨表用户id'
	},
	crossrefid: {
		type: DataTypes.BIGINT,
		defaultValue: 0,
		allowNull: true,
		comment: '跨表主键id'
	},
	shhf: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '回复内容'
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
	tableName: 'pingjiajilu'
})

export default PingjiajiluModel
