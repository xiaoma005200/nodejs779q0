import http from 'http'
import path from 'path'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import expressSession from 'express-session'
import expressJWT from 'express-jwt'
import initializeDb from './db'
import middleware from './middleware'
import api from './api'
import config from './config.json'
import util from './lib/util'

let app = express()
app.server = http.createServer(app)

// app.use(morgan('dev'))

//模块解决跨域问题
app.use(cors({
	exposedHeaders: config.corsHeaders
}))

//Post请求中间件，bodyParser.json将前端发来的json对象解析
app.use(bodyParser.json({
	limit: config.bodyLimit
}))

//引用模块expressSession
app.use(expressSession({
	secret: config.sessionSecret,
	resave: false,
	saveUninitialized: true
}))

//express路由的配置
app.use('/' + config.projectName, express.static(path.join(__dirname, 'views')))

//使用jsonwebToken模块,浏览器通过记录token的值辨别用户身份login|register|upload|download|resetPass|autoSort|list|sendemail|notify|update|security|sendsms
app.use(expressJWT({
	secret: config.jwtSecret,   //必选参数，string类型或函数
	algorithms: ["HS256"],      //加密方式HS256
	credentialsRequired: true,  //当为false时，如果请求不包含令牌，则继续到下一个中间件，而不是失败
	getToken (req) {            //getToken获取登录时浏览器保存的Token

		return util.isNothing(req.headers.token) ? null : req.headers.token
	},
	requestProperty: 'xiezn'
}).unless({
	path: [
		{
			url: /.*\/(login|register|upload|download|resetPass|autoSort|list|sendemail|notify|update|security|sendsms)$/,
			methods: ['GET', 'POST']
		},
		{
			url: /.*\/(config|option|follow|sh|remind|cal|group|value|news|info|detail|forum|updateBrowseDuration)\/.*/,
			methods: ['GET', 'POST']
		}
	]
}))

//直接访问http://localhost:8080/
app.use((err, req, res, next) => {

	if (err.name === 'UnauthorizedError') {
		res.status(200).json({
			code: 401,
			msg: '您的权限不够！'
		})
	}
})


//设置服务信息，监听端口等
initializeDb(db => {

	app.use(middleware({ config, db }))

	app.use('/' + config.projectName, api({ config, db }))

	app.server.listen(process.env.PORT || config.port, () => {
		console.log(`Started on port ${app.server.address().port}`)
	})
})

export default app
