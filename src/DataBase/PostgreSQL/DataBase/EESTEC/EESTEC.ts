import * as ProjectManager from '@var3n1k/project-manager'

import * as Tables from './Tables/__tables.js'

interface DataBaseTables {
	readonly Users: Tables.Users
}

export default class DataBase extends ProjectManager.Engine.API.DataBase.PostgreSQL.API.DataBases.BaseDataBase {
	public readonly Tables: DataBaseTables

	constructor(api: ProjectManager.Engine.API.DataBase.PostgreSQL.API.default, name: string) {
		super(api, name)

		this.Tables = {
			Users: new Tables.Users(api, this),
		}
	}
}