import * as ProjectManager from '@var3n1k/project-manager'

const TableFields = {
    ID: `id`,
    Name: {
        First: `first_name`,
        Last: `last_name`,
    },
    Phone: `phone`,
    Telegram: {
        ID: `telegram_id`,
    },
} as const

interface TableOutput {
	readonly [TableFields.ID]: number
	readonly [TableFields.Name.First]: string
	readonly [TableFields.Name.Last]: string
	readonly [TableFields.Phone]: string
	readonly [TableFields.Telegram.ID]: string
}

interface TableInput {
	readonly [TableFields.Name.First]: TableOutput[typeof TableFields.Name.First]
	readonly [TableFields.Name.Last]: TableOutput[typeof TableFields.Name.Last]
	readonly [TableFields.Phone]: TableOutput[typeof TableFields.Phone]
	readonly [TableFields.Telegram.ID]: TableOutput[typeof TableFields.Telegram.ID]
}

export default class Table extends ProjectManager.Engine.API.DataBase.PostgreSQL.API.DataBases.Tables.BaseTable<TableInput, TableOutput> {
	constructor(api: ProjectManager.Engine.API.DataBase.PostgreSQL.API.default, database: ProjectManager.Engine.API.DataBase.PostgreSQL.API.DataBases.BaseDataBase) {
		super(api, database, `users`, {
            [TableFields.ID]: {
                Type: ProjectManager.Engine.API.DataBase.PostgreSQL.API.DataBases.Tables.DataType.Numeric.Int,
                MetaData: {
                    DefaultValue: undefined,
                    IsPrimary: true,
                    IsRequired: true,
                    IsUnique: true,
                    MustBeAutoIncremented: true,
                },
            },
            [TableFields.Name.First]: {
                Type: ProjectManager.Engine.API.DataBase.PostgreSQL.API.DataBases.Tables.DataType.String.Text,
                MetaData: {
                    DefaultValue: undefined,
                    IsPrimary: false,
                    IsRequired: true,
                    IsUnique: false,
                    MustBeAutoIncremented: false,
                },
            },
            [TableFields.Name.Last]: {
                Type: ProjectManager.Engine.API.DataBase.PostgreSQL.API.DataBases.Tables.DataType.String.Text,
                MetaData: {
                    DefaultValue: undefined,
                    IsPrimary: false,
                    IsRequired: true,
                    IsUnique: false,
                    MustBeAutoIncremented: false,
                },
            },
            [TableFields.Phone]: {
                Type: ProjectManager.Engine.API.DataBase.PostgreSQL.API.DataBases.Tables.DataType.String.VarChar,
                MetaData: {
                    DefaultValue: undefined,
                    IsPrimary: false,
                    IsRequired: true,
                    IsUnique: true,
                    MustBeAutoIncremented: false,
                },
            },
            [TableFields.Telegram.ID]: {
                Type: ProjectManager.Engine.API.DataBase.PostgreSQL.API.DataBases.Tables.DataType.String.VarChar,
                MetaData: {
                    DefaultValue: undefined,
                    IsPrimary: false,
                    IsRequired: true,
                    IsUnique: true,
                    MustBeAutoIncremented: false,
                },
            },
        })
	}
}