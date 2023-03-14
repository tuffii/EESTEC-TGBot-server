import * as ProjectManager from '@var3n1k/project-manager'

import * as GlobalModule from './module.js'

const Core = new ProjectManager.Engine.Module.Classes.Core({}, {}, {}, {})

await Core.Init(async () => {
	await GlobalModule.Telegram.Init()

	await GlobalModule.PostgreSQLDataBase.DataBases.EESTEC.Tables.Users.CreateIfNotExist()
})