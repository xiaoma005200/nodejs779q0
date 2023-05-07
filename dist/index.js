'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _expressJwt = require('express-jwt');

var _expressJwt2 = _interopRequireDefault(_expressJwt);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _config = require('./config.json');

var _config2 = _interopRequireDefault(_config);

var _util = require('./lib/util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.server = _http2.default.createServer(app);

// app.use(morgan('dev'))

//模块解决跨域问题
app.use((0, _cors2.default)({
	exposedHeaders: _config2.default.corsHeaders
}));

//Post请求中间件，bodyParser.json将前端发来的json对象解析
app.use(_bodyParser2.default.json({
	limit: _config2.default.bodyLimit
}));

//引用模块expressSession
app.use((0, _expressSession2.default)({
	secret: _config2.default.sessionSecret,
	resave: false,
	saveUninitialized: true
}));

//express路由的配置
app.use('/' + _config2.default.projectName, _express2.default.static(_path2.default.join(__dirname, 'views')));

//使用jsonwebToken模块,浏览器通过记录token的值辨别用户身份login|register|upload|download|resetPass|autoSort|list|sendemail|notify|update|security|sendsms
app.use((0, _expressJwt2.default)({
	secret: _config2.default.jwtSecret, //必选参数，string类型或函数
	algorithms: ["HS256"], //加密方式HS256
	credentialsRequired: true, //当为false时，如果请求不包含令牌，则继续到下一个中间件，而不是失败
	getToken: function getToken(req) {
		//getToken获取登录时浏览器保存的Token

		return _util2.default.isNothing(req.headers.token) ? null : req.headers.token;
	},

	requestProperty: 'xiezn'
}).unless({
	path: [{
		url: /.*\/(login|register|upload|download|resetPass|autoSort|list|sendemail|notify|update|security|sendsms)$/,
		methods: ['GET', 'POST']
	}, {
		url: /.*\/(config|option|follow|sh|remind|cal|group|value|news|info|detail|forum|updateBrowseDuration)\/.*/,
		methods: ['GET', 'POST']
	}]
}));

//直接访问http://localhost:8080/
app.use(function (err, req, res, next) {

	if (err.name === 'UnauthorizedError') {
		res.status(200).json({
			code: 401,
			msg: '您的权限不够！'
		});
	}
});

//设置服务信息，监听端口等
(0, _db2.default)(function (db) {

	app.use((0, _middleware2.default)({ config: _config2.default, db: db }));

	app.use('/' + _config2.default.projectName, (0, _api2.default)({ config: _config2.default, db: db }));

	app.server.listen(process.env.PORT || _config2.default.port, function () {
		console.log('Started on port ' + app.server.address().port);
	});
});

exports.default = app;
//# sourceMappingURL=index.js.map