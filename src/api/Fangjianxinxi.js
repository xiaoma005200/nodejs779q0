import { version } from '../../package.json'
import { Router } from 'express'
import { Sequelize, Op, QueryTypes } from 'sequelize'
import sequelize from '../models/sequelize'
import toRes from '../lib/toRes'
import FangjianxinxiModel from '../models/FangjianxinxiModel'
import md5 from 'md5-node'
import util from '../lib/util'
import StoreupModel from '../models/StoreupModel'
import jwt from 'jsonwebtoken'
import moment from 'moment'


export default ({ config, db }) => {
	let api = Router()


	// 分页接口（后端）
	api.get('/page', async (req, res) => {

		try {

			let page = parseInt(req.query.page) || 1
			let limit = parseInt(req.query.limit) || 10
			let sort = req.query.sort || 'id'
			let order = req.query.order || 'asc'

			let where = {}
			let fangjianmingcheng = req.query.fangjianmingcheng
			if (fangjianmingcheng) {

				if (fangjianmingcheng.indexOf('%') != -1) {
					where.fangjianmingcheng = {
						[Op.like]: fangjianmingcheng
					}
				} else {
					where.fangjianmingcheng = {
						[Op.eq]: fangjianmingcheng
					}
				}
			}
			let fangjianlouceng = req.query.fangjianlouceng
			if (fangjianlouceng) {

				if (fangjianlouceng.indexOf('%') != -1) {
					where.fangjianlouceng = {
						[Op.like]: fangjianlouceng
					}
				} else {
					where.fangjianlouceng = {
						[Op.eq]: fangjianlouceng
					}
				}
			}
			let fangjianleixing = req.query.fangjianleixing
			if (fangjianleixing) {

				if (fangjianleixing.indexOf('%') != -1) {
					where.fangjianleixing = {
						[Op.like]: fangjianleixing
					}
				} else {
					where.fangjianleixing = {
						[Op.eq]: fangjianleixing
					}
				}
			}
			let fangjiantupian = req.query.fangjiantupian
			if (fangjiantupian) {

				if (fangjiantupian.indexOf('%') != -1) {
					where.fangjiantupian = {
						[Op.like]: fangjiantupian
					}
				} else {
					where.fangjiantupian = {
						[Op.eq]: fangjiantupian
					}
				}
			}
			let fangjiansheshi = req.query.fangjiansheshi
			if (fangjiansheshi) {

				if (fangjiansheshi.indexOf('%') != -1) {
					where.fangjiansheshi = {
						[Op.like]: fangjiansheshi
					}
				} else {
					where.fangjiansheshi = {
						[Op.eq]: fangjiansheshi
					}
				}
			}
			let fangjianjiage = req.query.fangjianjiage
			if (fangjianjiage) {

				if (fangjianjiage.indexOf('%') != -1) {
					where.fangjianjiage = {
						[Op.like]: fangjianjiage
					}
				} else {
					where.fangjianjiage = {
						[Op.eq]: fangjianjiage
					}
				}
			}
			let fangjianzhuangtai = req.query.fangjianzhuangtai
			if (fangjianzhuangtai) {

				if (fangjianzhuangtai.indexOf('%') != -1) {
					where.fangjianzhuangtai = {
						[Op.like]: fangjianzhuangtai
					}
				} else {
					where.fangjianzhuangtai = {
						[Op.eq]: fangjianzhuangtai
					}
				}
			}
			let dingfangdianhua = req.query.dingfangdianhua
			if (dingfangdianhua) {

				if (dingfangdianhua.indexOf('%') != -1) {
					where.dingfangdianhua = {
						[Op.like]: dingfangdianhua
					}
				} else {
					where.dingfangdianhua = {
						[Op.eq]: dingfangdianhua
					}
				}
			}
			let fangjianjieshao = req.query.fangjianjieshao
			if (fangjianjieshao) {

				if (fangjianjieshao.indexOf('%') != -1) {
					where.fangjianjieshao = {
						[Op.like]: fangjianjieshao
					}
				} else {
					where.fangjianjieshao = {
						[Op.eq]: fangjianjieshao
					}
				}
			}
			let clicktime = req.query.clicktime
			if (clicktime) {

				if (clicktime.indexOf('%') != -1) {
					where.clicktime = {
						[Op.like]: clicktime
					}
				} else {
					where.clicktime = {
						[Op.eq]: clicktime
					}
				}
			}

			let result = await FangjianxinxiModel.findAndCountAll({
				order: [[sort, order]],
				where,
				offset: (page - 1) * limit,
				limit
			})
			
			result.currPage = page
			result.pageSize = limit

			toRes.page(res, 0, result)
		} catch(err) {

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
			let fangjianmingcheng = req.query.fangjianmingcheng
			if (fangjianmingcheng) {

				if (fangjianmingcheng.indexOf('%') != -1) {
					where.fangjianmingcheng = {
						[Op.like]: fangjianmingcheng
					}
				} else {
					where.fangjianmingcheng = {
						[Op.eq]: fangjianmingcheng
					}
				}
			}
			let fangjianleixing = req.query.fangjianleixing
			if (fangjianleixing) {

				if (fangjianleixing.indexOf('%') != -1) {
					where.fangjianleixing = {
						[Op.like]: fangjianleixing
					}
				} else {
					where.fangjianleixing = {
						[Op.eq]: fangjianleixing
					}
				}
			}
			let fangjianzhuangtai = req.query.fangjianzhuangtai
			if (fangjianzhuangtai) {

				if (fangjianzhuangtai.indexOf('%') != -1) {
					where.fangjianzhuangtai = {
						[Op.like]: fangjianzhuangtai
					}
				} else {
					where.fangjianzhuangtai = {
						[Op.eq]: fangjianzhuangtai
					}
				}
			}


			let result = await FangjianxinxiModel.findAndCountAll({
				order: [[sort, order]],
				where,
				offset: (page - 1) * limit,
				limit
			})
			
			result.currPage = page
			result.pageSize = limit

			toRes.page(res, 0, result)
		} catch(err) {
			
			toRes.session(res, 401, '您的权限不够！', '', 200)
		}
	})


	// 保存接口（后端）
	api.post('/save', async (req, res) => {

		try {

			Object.keys(req.body).forEach(item=>{
				if(req.body[item] == '')  delete req.body[item]
			})

			req.body.clicktime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')


			const userinfo = await FangjianxinxiModel.create(req.body)

			if (userinfo === null) {

				toRes.session(res, -1, '添加失败！')
			} else {

				toRes.session(res, 0, '添加成功！')
			}
		} catch(err) {
			
			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

    // 保存接口（前端）
	api.post('/add', async (req, res) => {

		try {

			Object.keys(req.body).forEach(item=>{
				if(req.body[item] == '')  delete req.body[item]
			})

			if (jwt.decode(req.headers.token) == null) {
				toRes.session(res, 401, '请登录后再操作', '', 401)
			}

			req.body.clicktime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')


			const userinfo = await FangjianxinxiModel.create(req.body)

			if (userinfo === null) {

				toRes.session(res, -1, '添加失败！')
			} else {

				toRes.session(res, 0, '添加成功！')
			}
		} catch(err) {
			
			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 更新接口
	api.post('/update', async (req, res) => {

		try {



			await FangjianxinxiModel.update(req.body, {
				where: {
				  id: req.body.id || 0
				}
			})


			toRes.session(res, 0, '编辑成功！')
		} catch(err) {
			
			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 删除接口
	api.post('/delete', async (req, res) => {

		try {

			await FangjianxinxiModel.destroy({
				where: {
				  id: {
					[Op.in]: req.body
				  }
				}
			})

			toRes.session(res, 0, '删除成功！')
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 详情接口（后端）
	api.all('/info/:id', async (req, res) => {

		try {

            await FangjianxinxiModel.update({
				clicktime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
			}, {
				where: {
				  id: req.params.id
				}
			})

			toRes.record(res, 0, await FangjianxinxiModel.findOne({ where: { id: req.params.id } }))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

    // 详情接口（前端）
	api.all('/detail/:id', async (req, res) => {

		try {

            await FangjianxinxiModel.update({
				clicktime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
			}, {
				where: {
				  id: req.params.id
				}
			})

			toRes.record(res, 0, await FangjianxinxiModel.findOne({ where: { id: req.params.id } }))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 获取需要提醒的记录数接口
	api.get('/remind/:columnName/:type', async (req, res) => {

		try {

			let sql = 'SELECT 0 AS count'
			
			if (req.params.type == 1) {
				if (req.query.remindstart) sql = "SELECT COUNT(*) AS count FROM fangjianxinxi WHERE " + req.params.columnName + " >= '" + req.query.remindstart + "'"
				if (req.query.remindend) sql = "SELECT COUNT(*) AS count FROM fangjianxinxi WHERE " + req.params.columnName + " <= '" + req.query.remindend + "'"

				if (req.query.remindstart && req.query.remindend) {
					sql = "SELECT COUNT(*) AS count FROM fangjianxinxi WHERE " + req.params.columnName + " >= '" + req.query.remindstart + "' AND " + req.params.columnName + " <= '" + req.query.remindend + "'"
				}
			}

			if (req.params.type == 2) {
				if (req.query.remindstart) {
					let remindStart = util.getDateTimeFormat(0 + Number(req.query.remindstart), "yyyy-MM-dd")
					sql = "SELECT COUNT(*) AS count FROM fangjianxinxi WHERE " + req.params.columnName + " >= '" + remindStart + "'"
				}
				if (req.query.remindend) {
					let remindEnd = util.getDateTimeFormat(req.query.remindend, "yyyy-MM-dd")
					sql = "SELECT COUNT(*) AS count FROM fangjianxinxi WHERE " + req.params.columnName + " <= '" + remindEnd + "'"
				}

				if (req.query.remindstart && req.query.remindend) {
					let remindStart = util.getDateTimeFormat(0 + Number(req.query.remindstart), "yyyy-MM-dd")
					let remindEnd = util.getDateTimeFormat(req.query.remindend, "yyyy-MM-dd")
					sql = "SELECT COUNT(*) AS count FROM fangjianxinxi WHERE " + req.params.columnName + " >= '" + remindStart + "' AND " + req.params.columnName + " <= '" + remindEnd + "'"
				}
			}

			const results = await sequelize.query(sql, {
				plain: true,
				raw: true,
				type: QueryTypes.SELECT
			})

			toRes.count(res, 0, results.count)
		} catch(err) {
			
			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})




	// 智能推荐接口
	api.get('/autoSort', async (req, res) => {

		try {

			let page = parseInt(req.query.page) || 1
			let limit = parseInt(req.query.limit) || 5
			let sort = req.query.sort || 'clicktime'
			let order = req.query.order || 'desc'


			let result = await FangjianxinxiModel.findAndCountAll({
				order: [[sort, order]],
				offset: (page - 1) * limit,
				limit
			})
			
			result.currPage = page
			result.pageSize = limit

			toRes.page(res, 0, result)
		} catch(err) {
			
			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 智能推荐接口
	api.get('/autoSort2', async (req, res) => {

		try {

			let page = parseInt(req.query.page) || 1
			let limit = parseInt(req.query.limit) || 5

			let whereStoreup = {}
			whereStoreup.userid = {
				[Op.eq]: jwt.decode(req.headers.token).id
			}
			whereStoreup.tablename = {
				[Op.eq]: 'fangjianxinxi'
			}
			let storeupList = await StoreupModel.findAndCountAll({
				attributes: ['inteltype'],
				order: [['addtime', 'desc']],
				where: whereStoreup,
				offset: (page - 1) * limit,
				limit
			})
			
			let arr = []
			storeupList.rows.forEach(item => {
				arr.push(item.dataValues.inteltype)
			})
			
			let where = {}
			where.fangjianleixing = {
				[Op.in]: arr,
			}

			let result = await FangjianxinxiModel.findAndCountAll({
				where,
				offset: (page - 1) * limit,
				limit
			})
			
			where = {}
			where.fangjianleixing = {
				[Op.notIn]: arr,
			}

			let result1 = await FangjianxinxiModel.findAndCountAll({
				where,
				offset: (page - 1) * limit,
				limit: limit - result.count
			})
			
			result.rows = result.rows.concat(result1.rows)
			
			result.currPage = page
			result.pageSize = limit
			result.total = result.count + result1.count
			result.count = result.total 

			toRes.page(res, 0, result)
		} catch(err) {
			
			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})





	// 分组统计接口
	api.get('/group/:columnName', async (req, res) => {

		try {

			let sql = ""
			let columnName = req.params.columnName
			// let tableName = "fangjianxinxi"
			let where = " WHERE 1 = 1 "
			sql = "SELECT COUNT(*) AS total, " + columnName + " FROM fangjianxinxi " + where + " GROUP BY " + columnName + " LIMIT 10" 
			toRes.record(res, 0, await sequelize.query(sql, {
				plain: false,
				raw: true,
				type: QueryTypes.SELECT
			}))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 统计指定字段
	api.get('/value/:xColumnName/:yColumnName', async (req, res) => {

		try {

			let sql = ""
			let xColumnName = req.params.xColumnName
			let yColumnName = req.params.yColumnName
			// let tableName = "fangjianxinxi"
			let where = " WHERE 1 = 1 "
			if ("fangjianxinxi" == "orders") {
				where += " AND status IN ('已支付', '已发货', '已完成') ";
			}

			sql = "SELECT " + xColumnName + ", SUM(" + yColumnName + ") AS total FROM fangjianxinxi " + where + " GROUP BY " + xColumnName + " DESC LIMIT 10"
			
			toRes.record(res, 0, await sequelize.query(sql, {
				plain: false,
				raw: true,
				type: QueryTypes.SELECT
			}))
		} catch(err) {

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
			let tableName = "fangjianxinxi"
			let where = " WHERE 1 = 1 "
			if ("fangjianxinxi" == "orders") {
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
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})







	return api
}
