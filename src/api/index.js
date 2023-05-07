import { Router } from 'express'
import UsersController from './Users'
import FileController from './File'
import ConfigController from './Config'
import CommonController from './Common'
import HuiyuanController from './Huiyuan'
import FangjianleixingController from './Fangjianleixing'
import FangjianxinxiController from './Fangjianxinxi'
import YudingjiluController from './Yudingjilu'
import RuzhujiluController from './Ruzhujilu'
import PingjiajiluController from './Pingjiajilu'
import StoreupController from './Storeup'
import NewsController from './News'
import AboutusController from './Aboutus'
import SystemintroController from './Systemintro'

export default ({ config, db }) => {
	let api = Router()
	api.use('/users', UsersController({ config, db }))
	api.use('/file', FileController({ config, db }))
	api.use('/config', ConfigController({ config, db }))
	api.use('/', CommonController({ config, db }))
	api.use('/huiyuan', HuiyuanController({ config, db }))
	api.use('/fangjianleixing', FangjianleixingController({ config, db }))
	api.use('/fangjianxinxi', FangjianxinxiController({ config, db }))
	api.use('/yudingjilu', YudingjiluController({ config, db }))
	api.use('/ruzhujilu', RuzhujiluController({ config, db }))
	api.use('/pingjiajilu', PingjiajiluController({ config, db }))
	api.use('/storeup', StoreupController({ config, db }))
	api.use('/news', NewsController({ config, db }))
	api.use('/aboutus', AboutusController({ config, db }))
	api.use('/systemintro', SystemintroController({ config, db }))
	return api
}
