'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	session: function session(res) {
		var code = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
		var msg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '操作成功！';
		var token = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
		var status = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 200;


		var result = {
			code: code,
			msg: msg
		};

		if (token !== '') result.token = token;

		res.status(status).json(result);
	},
	file: function file(res) {
		var code = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

		var _file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

		var msg = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '上传成功！';
		var status = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 200;


		res.status(status).json({
			code: code,
			file: _file,
			msg: msg
		});
	},
	count: function count(res) {
		var code = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

		var _count = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

		var msg = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '请求成功！';
		var status = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 200;


		res.status(status).json({
			code: code,
			count: _count,
			msg: msg
		});
	},
	record: function record(res) {
		var code = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
		var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
		var msg = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '请求成功！';
		var status = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 200;


		res.status(status).json({
			code: code,
			msg: msg,
			data: data
		});
	},
	page: function page(res) {
		var code = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
		var result = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
		var msg = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '请求成功！';
		var status = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 200;


		res.status(status).json({
			code: code,
			msg: msg,
			data: {
				total: result.count,
				pageSize: result.pageSize,
				totalPage: result.count % result.pageSize == 0 ? result.count / result.pageSize : Math.ceil(result.count / result.pageSize),
				currPage: result.currPage,
				list: result.rows
			}
		});
	},
	auth: function auth(req, res, role) {

		if (req.session.userinfo && !role.split(',').find(function (item) {
			return item === req.session.userinfo.role;
		})) {
			res.status(200).json({
				code: 401,
				msg: '您的权限不够！'
			});

			return false;
		}

		return true;
	}
};
//# sourceMappingURL=toRes.js.map