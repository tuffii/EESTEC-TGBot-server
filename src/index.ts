import * as CoreAPI from '@var3n1k/core'
const Core = new CoreAPI.default({}, {}, {}, {})

import * as GlobalModule from './module.js'

await Core.Init(async () => {
	GlobalModule.API.HTTPServer.Connect(GlobalModule.API.Routes.APIRouter.default)
	await GlobalModule.API.HTTPServer.Init()

	await GlobalModule.Telegram.Init()

	await GlobalModule.DataBase.PostgreSQL.DataBases.EESTEC.Init()
})