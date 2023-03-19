import * as Tables from './Tables/__tables.js'
import * as ServerCore from '@var3n1k/server-core'

interface DataBaseTables {
	readonly Users: Tables.Users.default
	readonly rolesSettings: Tables.roleSettings.default
	readonly privilege: Tables.privilege.default
}

export default class DataBase extends ServerCore.Engine.API.DataBase.PostgreSQL.API.DataBases.BaseDataBase {
	public readonly Tables: DataBaseTables

	public async Init(): Promise<void> {
		const Tables = [
			this.Tables.Users,
			this.Tables.privilege,
			this.Tables.rolesSettings
		]

		await Promise.all(Tables.map(async (_el, _ind, _arr) => await _el.CreateIfNotExist()))
	}

	constructor(api: ServerCore.Engine.API.DataBase.PostgreSQL.API.default, name: string) {
		super(api, name)

		this.Tables = {
			Users: new Tables.Users.default(api, this),
			privilege: new Tables.privilege.default(api, this),
			rolesSettings: new Tables.roleSettings.default(api, this)
		}
	}
}
