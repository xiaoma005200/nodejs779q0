import { Sequelize } from 'sequelize'
import config from '../config.json'

const sequelize = new Sequelize(config.dbConnection.database, config.dbConnection.username, config.dbConnection.password, {
	host: 'localhost',          // 数据库服务器
	dialect: config.dbConnection.dbtype,  // 这里可以改成任意一种关系型数据库
	logging: false
})

export default sequelize;

// 第一个参数：连接的数据库名
// 第二个参数：数据库的用户名
// 第三个参数：数据库的密码