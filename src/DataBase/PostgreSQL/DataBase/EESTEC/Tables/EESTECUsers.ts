import * as CoreAPI from '@var3n1k/core'

const TableName = `eestec_users`
const TableFields = {
    ID: `id`,
    Name: {
        First: `first_name`,
        Last: `last_name`,
    },
    PhoneNumber: `phone_number`,
    Telegram: {
        ID: `telegram_id`,
    },
} as const

export interface Output {
	readonly [TableFields.ID]: number
	readonly [TableFields.Name.First]: string
	readonly [TableFields.Name.Last]: string
	readonly [TableFields.PhoneNumber]: string
	readonly [TableFields.Telegram.ID]: string
}

export interface Input {
	readonly [TableFields.Name.First]: Output[typeof TableFields.Name.First]
	readonly [TableFields.Name.Last]: Output[typeof TableFields.Name.Last]
	readonly [TableFields.PhoneNumber]: Output[typeof TableFields.PhoneNumber]
	readonly [TableFields.Telegram.ID]: Output[typeof TableFields.Telegram.ID]
}

export default class Table extends CoreAPI.Engine.API.DataBase.PostgreSQL.API.DataBases.Tables.BaseTable<Input, Output> {
	constructor(api: CoreAPI.Engine.API.DataBase.PostgreSQL.API.default, database: CoreAPI.Engine.API.DataBase.PostgreSQL.API.DataBases.BaseDataBase) {
		super(api, database, TableName, {
            [TableFields.ID]: {
                Type: CoreAPI.Engine.API.DataBase.PostgreSQL.API.DataBases.Tables.DataType.Numeric.Int,
                MetaData: {
                    DefaultValue: undefined,
                    IsPrimary: true,
                    IsRequired: true,
                    IsUnique: true,
                    MustBeAutoIncremented: true,
                },
            },
            [TableFields.Name.First]: {
                Type: CoreAPI.Engine.API.DataBase.PostgreSQL.API.DataBases.Tables.DataType.String.Text,
                MetaData: {
                    DefaultValue: undefined,
                    IsPrimary: false,
                    IsRequired: true,
                    IsUnique: false,
                    MustBeAutoIncremented: false,
                },
            },
            [TableFields.Name.Last]: {
                Type: CoreAPI.Engine.API.DataBase.PostgreSQL.API.DataBases.Tables.DataType.String.Text,
                MetaData: {
                    DefaultValue: undefined,
                    IsPrimary: false,
                    IsRequired: true,
                    IsUnique: false,
                    MustBeAutoIncremented: false,
                },
            },
            [TableFields.PhoneNumber]: {
                Type: CoreAPI.Engine.API.DataBase.PostgreSQL.API.DataBases.Tables.DataType.String.VarChar,
                MetaData: {
                    DefaultValue: undefined,
                    IsPrimary: false,
                    IsRequired: true,
                    IsUnique: true,
                    MustBeAutoIncremented: false,
                },
            },
            [TableFields.Telegram.ID]: {
                Type: CoreAPI.Engine.API.DataBase.PostgreSQL.API.DataBases.Tables.DataType.String.VarChar,
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