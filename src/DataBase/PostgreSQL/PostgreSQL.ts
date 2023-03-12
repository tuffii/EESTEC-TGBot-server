import * as ProjectManager from '@var3n1k/project-manager'

import * as DataBases from './DataBase/__databases.js'

const PostgreSQLConfig = {
    User: {
        Name: ProjectManager.Engine.Module.Classes.Process.Env.POSTGRE_SQL_USERNAME as string,
        Password: ProjectManager.Engine.Module.Classes.Process.Env.POSTGRE_SQL_PASSWORD as string,
    },
    Connection: {
        Host: {
            Name: ProjectManager.Engine.Module.Classes.Process.Env.POSTGRE_SQL_HOSTNAME as string,
            Port: Number.parseInt(ProjectManager.Engine.Module.Classes.Process.Env.POSTGRE_SQL_PORT as string),
        },
    },
} as const

const PostgreSQLClient = new ProjectManager.Engine.API.DataBase.PostgreSQL.API.default(
    PostgreSQLConfig.User.Name, PostgreSQLConfig.User.Password,
    PostgreSQLConfig.Connection.Host.Name, PostgreSQLConfig.Connection.Host.Port,
)

const PostgreSQL = {
    Client: PostgreSQLClient,
    DataBases: {
        EESTEC: PostgreSQLClient.Connect(DataBases.EESTEC, `eestec`),
    },
} as const

export default PostgreSQL