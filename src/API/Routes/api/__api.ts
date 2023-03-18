import * as ServerCore from '@var3n1k/server-core'

import * as TelegramRouter from './telegram/__telegram.js'
import * as EESTECRouter from './eestec/__eestec.js'

const APIRouter = new ServerCore.Engine.API.WebServer.HTTP.API.Router.default()
APIRouter.Add(`/api`, [TelegramRouter.default, EESTECRouter.default])

export default APIRouter