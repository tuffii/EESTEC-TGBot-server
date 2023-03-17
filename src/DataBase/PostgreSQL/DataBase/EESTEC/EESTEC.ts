import * as CoreAPI from '@var3n1k/core'

import * as Tables from './Tables/__tables.js'

interface DataBaseTables {
	readonly Users: {
		readonly Telegram: Tables.TelegramUsers.default
		readonly EESTEC: Tables.EESTECUsers.default
	}
}

export default class DataBase extends CoreAPI.Engine.API.DataBase.PostgreSQL.API.DataBases.BaseDataBase {
	public readonly Tables: DataBaseTables

	public async Init(): Promise<void> {
		const Tables = [
			this.Tables.Users.Telegram,
			this.Tables.Users.EESTEC,
		]

		await Promise.all(Tables.map(async (_el, _ind, _arr) => await _el.CreateIfNotExist()))
	}

	constructor(api: CoreAPI.Engine.API.DataBase.PostgreSQL.API.default, name: string) {
		super(api, name)

		this.Tables = {
			Users: {
				Telegram: new Tables.TelegramUsers.default(api, this),
				EESTEC: new Tables.EESTECUsers.default(api, this),
			},
		}
	}
}