import { Sequelize, DataTypes } from 'sequelize'
import moment from 'moment'
import sequelize from './sequelize'

// 预定记录
const YudingjiluModel = sequelize.define('YudingjiluModel', {
	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		comment: '主键id'
	},
	yudingdanhao: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '预订单号'
	},
	fangjianmingcheng: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '房间名称'
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
	fangjianjiage: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
		allowNull: true,
		comment: '房间价格'
	},
	yudingriqi: {
		type: DataTypes.DATEONLY,
		allowNull: true,
		get() {
            return moment(this.getDataValue('yudingriqi')).format('YYYY-MM-DD')
        },
		comment: '预定日期'
	},
	ruzhushijian: {
		type: DataTypes.DATE,
		allowNull: true,
		get() {
            return moment(this.getDataValue('ruzhushijian')).format('YYYY-MM-DD HH:mm:ss')
        },
		comment: '入住时间'
	},
	ruzhurenshu: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '入住人数'
	},
	ruzhutianshu: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
		allowNull: true,
		comment: '入住天数'
	},
	dingdanjine: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
		allowNull: true,
		comment: '订单金额'
	},
	yonghuming: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '用户名'
	},
	xingming: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '姓名'
	},
	shouji: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '手机'
	},
	shenfenzheng: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '身份证'
	},
	shhf: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '回复内容'
	},
	ispay: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '是否支付'
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
	tableName: 'yudingjilu'
})

export default YudingjiluModel
