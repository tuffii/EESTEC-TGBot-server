import * as ServerCore from '@var3n1k/server-core'

const TableName = `users`
const TableFields = {
    ID: `id`,
    Login: `login`,
    Name: {
        First: `first_name`,
        Last: `last_name`,
    },
    PhoneNumber: `phone_number`,
} as const

export interface Output {
	readonly [TableFields.ID]: string
	readonly [TableFields.Login]: string
	readonly [TableFields.Name.First]: string
	readonly [TableFields.Name.Last]: string | undefined
	readonly [TableFields.PhoneNumber]: string | undefined
}

export interface Input {
	readonly [TableFields.ID]: Output[typeof TableFields.ID]
	readonly [TableFields.Login]: Output[typeof TableFields.Login]
	readonly [TableFields.Name.First]: Output[typeof TableFields.Name.First]
	readonly [TableFields.Name.Last]: Output[typeof TableFields.Name.Last]
	readonly [TableFields.PhoneNumber]: Output[typeof TableFields.PhoneNumber]
}

export default class Table extends ServerCore.Engine.API.DataBase.PostgreSQL.API.DataBases.Tables.BaseTable<Input, Output> {
	constructor(api: ServerCore.Engine.API.DataBase.PostgreSQL.API.default, database: ServerCore.Engine.API.DataBase.PostgreSQL.API.DataBases.BaseDataBase) {
		super(api, database, TableName, {
            [TableFields.ID]: {
                Type: ServerCore.Engine.API.DataBase.PostgreSQL.API.DataBases.Tables.DataType.String.VarChar,
                MetaData: {
                    DefaultValue: undefined,
                    IsPrimary: true,
                    IsRequired: true,
                    IsUnique: true,
                    MustBeAutoIncremented: false,
                },
            },
            [TableFields.Login]: {
                Type: ServerCore.Engine.API.DataBase.PostgreSQL.API.DataBases.Tables.DataType.String.Text,
                MetaData: {
                    DefaultValue: undefined,
                    IsPrimary: false,
                    IsRequired: true,
                    IsUnique: false,
                    MustBeAutoIncremented: false,
                },
            },
            [TableFields.Name.First]: {
                Type: ServerCore.Engine.API.DataBase.PostgreSQL.API.DataBases.Tables.DataType.String.Text,
                MetaData: {
                    DefaultValue: undefined,
                    IsPrimary: false,
                    IsRequired: true,
                    IsUnique: false,
                    MustBeAutoIncremented: false,
                },
            },
            [TableFields.Name.Last]: {
                Type: ServerCore.Engine.API.DataBase.PostgreSQL.API.DataBases.Tables.DataType.String.Text,
                MetaData: {
                    DefaultValue: undefined,
                    IsPrimary: false,
                    IsRequired: false,
                    IsUnique: false,
                    MustBeAutoIncremented: false,
                },
            },
            [TableFields.PhoneNumber]: {
                Type: ServerCore.Engine.API.DataBase.PostgreSQL.API.DataBases.Tables.DataType.String.Text,
                MetaData: {
                    DefaultValue: undefined,
                    IsPrimary: false,
                    IsRequired: false,
                    IsUnique: true,
                    MustBeAutoIncremented: false,
                },
            },
        })
	}
}