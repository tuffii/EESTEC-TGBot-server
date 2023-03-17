import * as CoreAPI from '@var3n1k/core'

import * as DataBases from './DataBase/__databases.js'

const PostgreSQLConfig = {
    User: {
        Name: CoreAPI.Engine.Module.Classes.Process.Env.POSTGRE_SQL_USERNAME as string,
        Password: CoreAPI.Engine.Module.Classes.Process.Env.POSTGRE_SQL_PASSWORD as string,
    },
    Connection: {
        Host: {
            Name: CoreAPI.Engine.Module.Classes.Process.Env.POSTGRE_SQL_HOSTNAME as string,
            Port: Number.parseInt(CoreAPI.Engine.Module.Classes.Process.Env.POSTGRE_SQL_PORT as string),
        },
    },
} as const

const PostgreSQLClient = new CoreAPI.Engine.API.DataBase.PostgreSQL.API.default(
    PostgreSQLConfig.User.Name, PostgreSQLConfig.User.Password,
    PostgreSQLConfig.Connection.Host.Name, PostgreSQLConfig.Connection.Host.Port,
)

const PostgreSQL = {
    Client: PostgreSQLClient,
    DataBases: {
        EESTEC: PostgreSQLClient.Connect(DataBases.EESTEC.default, `eestec`),
    },
} as const

export default PostgreSQL