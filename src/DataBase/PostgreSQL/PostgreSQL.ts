import * as ServerCore from '@var3n1k/server-core'

import * as DataBases from './DataBase/__databases.js'

const PostgreSQLConfig = {
    User: {
        Name: ServerCore.Engine.Module.Classes.Process.Env.POSTGRE_SQL_USERNAME as string,
        Password: ServerCore.Engine.Module.Classes.Process.Env.POSTGRE_SQL_PASSWORD as string,
    },
    Connection: {
        Host: {
            Name: ServerCore.Engine.Module.Classes.Process.Env.POSTGRE_SQL_HOSTNAME as string,
            Port: Number.parseInt(ServerCore.Engine.Module.Classes.Process.Env.POSTGRE_SQL_PORT as string),
        },
    },
} as const

const PostgreSQLClient = new ServerCore.Engine.API.DataBase.PostgreSQL.API.default(
    PostgreSQLConfig.User.Name, PostgreSQLConfig.User.Password,
    PostgreSQLConfig.Connection.Host.Name, PostgreSQLConfig.Connection.Host.Port,
)

const PostgreSQL = {
    Client: PostgreSQLClient,
    DataBases: {
        Telegram: PostgreSQLClient.Connect(DataBases.Telegram.default, `telegram`),
        EESTEC: PostgreSQLClient.Connect(DataBases.EESTEC.default, `eestec`),
    },
} as const

export default PostgreSQL