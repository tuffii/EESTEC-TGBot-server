import * as ServerCore from '@var3n1k/server-core'

import * as Tables from './Tables/__tables.js'

interface DataBaseTables {
	readonly Users: Tables.Users.default
}

export default class DataBase extends ServerCore.Engine.API.DataBase.PostgreSQL.API.DataBases.BaseDataBase {
	public readonly Tables: DataBaseTables

	public async Init(): Promise<void> {
		const Tables = [
			this.Tables.Users,
		]

		await Promise.all(Tables.map(async (_el, _ind, _arr) => await _el.CreateIfNotExist()))
	}

	constructor(api: ServerCore.Engine.API.DataBase.PostgreSQL.API.default, name: string) {
		super(api, name)

		this.Tables = {
			Users: new Tables.Users.default(api, this),
		}
	}
}