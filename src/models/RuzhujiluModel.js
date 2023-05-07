import { Sequelize, DataTypes } from 'sequelize'
import moment from 'moment'
import sequelize from './sequelize'

// 入住记录
const RuzhujiluModel = sequelize.define('RuzhujiluModel', {
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
	fangjiantupian: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '房间图片'
	},
	dingdanjine: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
		allowNull: true,
		comment: '订单金额'
	},
	yudingriqi: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '预定日期'
	},
	ruzhushijian: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '入住时间'
	},
	ruzhurenshu: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '入住人数'
	},
	ruzhutianshu: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '入住天数'
	},
	banliriqi: {
		type: DataTypes.DATEONLY,
		allowNull: true,
		get() {
            return moment(this.getDataValue('banliriqi')).format('YYYY-MM-DD')
        },
		comment: '办理日期'
	},
	tiwenqingkuang: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '体温情况'
	},
	xinxibeizhu: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '信息备注'
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
	tableName: 'ruzhujilu'
})

export default RuzhujiluModel
