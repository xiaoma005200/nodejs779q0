import { version } from '../../package.json'
import { Router } from 'express'
import { Sequelize, Op, QueryTypes } from 'sequelize'
import sequelize from '../models/sequelize'
import toRes from '../lib/toRes'
import HuiyuanModel from '../models/HuiyuanModel'
import md5 from 'md5-node'
import util from '../lib/util'
import jwt from 'jsonwebtoken'
import moment from 'moment'


export default ({ config, db }) => {
	let api = Router()

	// 用户登录接口
	api.all('/login', async (req, res) => {

		try {

			let pwd = req.query.password
			let userinfo = await HuiyuanModel.findOne({ where: { yonghuming: req.query.username, mima: pwd } })
			if (userinfo === null) {
				toRes.session(res, -1, '用户名或密码错误！')
				return
			}


			const token = jwt.sign(
				{
					id: userinfo.dataValues.id,
					username: userinfo.dataValues.yonghuming,
					role: '会员',
					loginUserColumn: 'yonghuming',
					tableName: 'huiyuan'
				},
				config.jwtSecret,
				{
					expiresIn: 60 * 60 * 24 * 1
				}
			)

			userinfo.dataValues.token = token
			userinfo.dataValues.role = '会员'
			userinfo.dataValues.loginUserColumn = 'yonghuming'
			userinfo.dataValues.tableName = 'huiyuan'
			delete userinfo.dataValues.mima
			req.session.userinfo = userinfo

			toRes.session(res, 0, '登录成功！', token)
		} catch (err) {
			console.log(err);
			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 用户退出接口
	api.all('/logout', (req, res) => {

		req.session.destroy(err => {
			toRes.session(res, 0, '退出成功！')
		})
	})

	// 注册接口
	api.post('/register', async (req, res) => {

		try {

			Object.keys(req.body).forEach(item => {
				if (req.body[item] == '') delete req.body[item]
			})



			const userinfo = await HuiyuanModel.create(req.body)

			if (userinfo === null) {

				toRes.session(res, -1, '注册失败！')
			} else {

				toRes.session(res, 0, '注册成功！')
			}
		} catch (err) {

			toRes.session(res, -2, '请检查是否正确输入或用户名重复！', '', 200)
		}
	})

	// 获取session接口
	api.all('/session', async (req, res) => {

		try {

			toRes.record(res, 0, await HuiyuanModel.findOne({ where: { id: req.session.userinfo === undefined ? jwt.decode(req.headers.token).id : req.session.userinfo.id } }))
		} catch (err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 忘记密码（找回密码）
	api.all('/resetPass', async (req, res) => {

		try {

			let pwd = '123456'

			await HuiyuanModel.update({
				mima: pwd
			}, {
				where: {
					yonghuming: req.query.username
				}
			})

			toRes.session(res, 0, '密码已重置为：123456')
		} catch (err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 分页接口（后端）
	api.get('/page', async (req, res) => {

		try {

			let page = parseInt(req.query.page) || 1
			let limit = parseInt(req.query.limit) || 10
			let sort = req.query.sort || 'id'
			let order = req.query.order || 'asc'

			let where = {}
			let yonghuming = req.query.yonghuming
			if (yonghuming) {

				if (yonghuming.indexOf('%') != -1) {
					where.yonghuming = {
						[Op.like]: yonghuming
					}
				} else {
					where.yonghuming = {
						[Op.eq]: yonghuming
					}
				}
			}
			
			let mima = req.query.mima
			if (mima) {

				if (mima.indexOf('%') != -1) {
					where.mima = {
						[Op.like]: mima
					}
				} else {
					where.mima = {
						[Op.eq]: mima
					}
				}
			}
			let xingming = req.query.xingming
			if (xingming) {

				if (xingming.indexOf('%') != -1) {
					where.xingming = {
						[Op.like]: xingming
					}
				} else {
					where.xingming = {
						[Op.eq]: xingming
					}
				}
			}
			let xingbie = req.query.xingbie
			if (xingbie) {

				if (xingbie.indexOf('%') != -1) {
					where.xingbie = {
						[Op.like]: xingbie
					}
				} else {
					where.xingbie = {
						[Op.eq]: xingbie
					}
				}
			}
			let touxiang = req.query.touxiang
			if (touxiang) {

				if (touxiang.indexOf('%') != -1) {
					where.touxiang = {
						[Op.like]: touxiang
					}
				} else {
					where.touxiang = {
						[Op.eq]: touxiang
					}
				}
			}
			let shouji = req.query.shouji
			if (shouji) {

				if (shouji.indexOf('%') != -1) {
					where.shouji = {
						[Op.like]: shouji
					}
				} else {
					where.shouji = {
						[Op.eq]: shouji
					}
				}
			}
			let shenfenzheng = req.query.shenfenzheng
			if (shenfenzheng) {

				if (shenfenzheng.indexOf('%') != -1) {
					where.shenfenzheng = {
						[Op.like]: shenfenzheng
					}
				} else {
					where.shenfenzheng = {
						[Op.eq]: shenfenzheng
					}
				}
			}

			let result = await HuiyuanModel.findAndCountAll({
				order: [[sort, order]],
				where,
				offset: (page - 1) * limit,
				limit
			})

			result.currPage = page
			result.pageSize = limit

			toRes.page(res, 0, result)
		} catch (err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 分页接口（前端）
	api.get('/list', async (req, res) => {

		try {

			let page = parseInt(req.query.page) || 1
			let limit = parseInt(req.query.limit) || 10
			let sort = req.query.sort || 'id'
			let order = req.query.order || 'asc'

			let where = {}
			let yonghuming = req.query.yonghuming
			if (yonghuming) {

				if (yonghuming.indexOf('%') != -1) {
					where.yonghuming = {
						[Op.like]: yonghuming
					}
				} else {
					where.yonghuming = {
						[Op.eq]: yonghuming
					}
				}
			}
			let xingming = req.query.xingming
			if (xingming) {

				if (xingming.indexOf('%') != -1) {
					where.xingming = {
						[Op.like]: xingming
					}
				} else {
					where.xingming = {
						[Op.eq]: xingming
					}
				}
			}


			let result = await HuiyuanModel.findAndCountAll({
				order: [[sort, order]],
				where,
				offset: (page - 1) * limit,
				limit
			})

			result.currPage = page
			result.pageSize = limit

			toRes.page(res, 0, result)
		} catch (err) {

			toRes.session(res, 401, '您的权限不够！', '', 200)
		}
	})


	// 保存接口（后端）
	api.post('/save', async (req, res) => {

		try {

			Object.keys(req.body).forEach(item => {
				if (req.body[item] == '') delete req.body[item]
			})



			const userinfo = await HuiyuanModel.create(req.body)

			if (userinfo === null) {

				toRes.session(res, -1, '添加失败！')
			} else {

				toRes.session(res, 0, '添加成功！')
			}
		} catch (err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 保存接口（前端）
	api.post('/add', async (req, res) => {

		try {

			Object.keys(req.body).forEach(item => {
				if (req.body[item] == '') delete req.body[item]
			})

			if (jwt.decode(req.headers.token) == null) {
				toRes.session(res, 401, '请登录后再操作', '', 401)
			}



			const userinfo = await HuiyuanModel.create(req.body)

			if (userinfo === null) {

				toRes.session(res, -1, '添加失败！')
			} else {

				toRes.session(res, 0, '添加成功！')
			}
		} catch (err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 更新接口
	api.post('/update', async (req, res) => {

		try {



			await HuiyuanModel.update(req.body, {
				where: {
					id: req.body.id || 0
				}
			})


			toRes.session(res, 0, '编辑成功！')
		} catch (err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 删除接口
	api.post('/delete', async (req, res) => {

		try {

			await HuiyuanModel.destroy({
				where: {
					id: {
						[Op.in]: req.body
					}
				}
			})

			toRes.session(res, 0, '删除成功！')
		} catch (err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 详情接口（后端）
	api.all('/info/:id', async (req, res) => {

		try {


			toRes.record(res, 0, await HuiyuanModel.findOne({ where: { id: req.params.id } }))
		} catch (err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 详情接口（前端）
	api.all('/detail/:id', async (req, res) => {

		try {


			toRes.record(res, 0, await HuiyuanModel.findOne({ where: { id: req.params.id } }))
		} catch (err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 获取需要提醒的记录数接口
	api.get('/remind/:columnName/:type', async (req, res) => {

		try {

			let sql = 'SELECT 0 AS count'

			if (req.params.type == 1) {
				if (req.query.remindstart) sql = "SELECT COUNT(*) AS count FROM huiyuan WHERE " + req.params.columnName + " >= '" + req.query.remindstart + "'"
				if (req.query.remindend) sql = "SELECT COUNT(*) AS count FROM huiyuan WHERE " + req.params.columnName + " <= '" + req.query.remindend + "'"

				if (req.query.remindstart && req.query.remindend) {
					sql = "SELECT COUNT(*) AS count FROM huiyuan WHERE " + req.params.columnName + " >= '" + req.query.remindstart + "' AND " + req.params.columnName + " <= '" + req.query.remindend + "'"
				}
			}

			if (req.params.type == 2) {
				if (req.query.remindstart) {
					let remindStart = util.getDateTimeFormat(0 + Number(req.query.remindstart), "yyyy-MM-dd")
					sql = "SELECT COUNT(*) AS count FROM huiyuan WHERE " + req.params.columnName + " >= '" + remindStart + "'"
				}
				if (req.query.remindend) {
					let remindEnd = util.getDateTimeFormat(req.query.remindend, "yyyy-MM-dd")
					sql = "SELECT COUNT(*) AS count FROM huiyuan WHERE " + req.params.columnName + " <= '" + remindEnd + "'"
				}

				if (req.query.remindstart && req.query.remindend) {
					let remindStart = util.getDateTimeFormat(0 + Number(req.query.remindstart), "yyyy-MM-dd")
					let remindEnd = util.getDateTimeFormat(req.query.remindend, "yyyy-MM-dd")
					sql = "SELECT COUNT(*) AS count FROM huiyuan WHERE " + req.params.columnName + " >= '" + remindStart + "' AND " + req.params.columnName + " <= '" + remindEnd + "'"
				}
			}

			const results = await sequelize.query(sql, {
				plain: true,
				raw: true,
				type: QueryTypes.SELECT
			})

			toRes.count(res, 0, results.count)
		} catch (err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})










	// 分组统计接口
	api.get('/group/:columnName', async (req, res) => {

		try {

			let sql = ""
			let columnName = req.params.columnName
			// let tableName = "huiyuan"
			let where = " WHERE 1 = 1 "
			sql = "SELECT COUNT(*) AS total, " + columnName + " FROM huiyuan " + where + " GROUP BY " + columnName + " LIMIT 10"
			toRes.record(res, 0, await sequelize.query(sql, {
				plain: false,
				raw: true,
				type: QueryTypes.SELECT
			}))
		} catch (err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 统计指定字段
	api.get('/value/:xColumnName/:yColumnName', async (req, res) => {

		try {

			let sql = ""
			let xColumnName = req.params.xColumnName
			let yColumnName = req.params.yColumnName
			// let tableName = "huiyuan"
			let where = " WHERE 1 = 1 "
			if ("huiyuan" == "orders") {
				where += " AND status IN ('已支付', '已发货', '已完成') ";
			}

			sql = "SELECT " + xColumnName + ", SUM(" + yColumnName + ") AS total FROM huiyuan " + where + " GROUP BY " + xColumnName + " DESC LIMIT 10"

			toRes.record(res, 0, await sequelize.query(sql, {
				plain: false,
				raw: true,
				type: QueryTypes.SELECT
			}))
		} catch (err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 按日期统计
	api.get('/value/:xColumnName/:yColumnName/:timeStatType', async (req, res) => {

		try {

			let sql = ""
			let xColumnName = req.params.xColumnName
			let yColumnName = req.params.yColumnName
			let timeStatType = req.params.timeStatType
			let tableName = "huiyuan"
			let where = " WHERE 1 = 1 "
			if ("huiyuan" == "orders") {
				where += " AND status IN ('已支付', '已发货', '已完成') ";
			}

			if (config.dbConnection.dbtype.toLowerCase() == "mysql") {
				if (timeStatType == "日")
					sql = "SELECT DATE_FORMAT(" + xColumnName + ", '%Y-%m-%d') " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(" + xColumnName + ", '%Y-%m-%d') LIMIT 10";
				if (timeStatType == "月")
					sql = "SELECT DATE_FORMAT(" + xColumnName + ", '%Y-%m') " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(" + xColumnName + ", '%Y-%m')  LIMIT 10";
				if (timeStatType == "年")
					sql = "SELECT DATE_FORMAT(" + xColumnName + ", '%Y') " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(" + xColumnName + ", '%Y')  LIMIT 10";
			} else {
				if (timeStatType == "日")
					sql = "SELECT DATE_FORMAT(VARCHAR(10)," + xColumnName + ", 120) " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(VARCHAR(10)," + xColumnName + ", 120)  LIMIT 10";
				if (timeStatType == "月")
					sql = "SELECT DATE_FORMAT(VARCHAR(7)," + xColumnName + ", 120) " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(VARCHAR(7)," + xColumnName + ", 120)  LIMIT 10";
				if (timeStatType == "年")
					sql = "SELECT DATE_FORMAT(VARCHAR(4)," + xColumnName + ", 120) " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(VARCHAR(4)," + xColumnName + ", 120)  LIMIT 10";
			}
			toRes.record(res, 0, await sequelize.query(sql, {
				plain: false,
				raw: true,
				type: QueryTypes.SELECT
			}))
		} catch (err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})







	return api
}
