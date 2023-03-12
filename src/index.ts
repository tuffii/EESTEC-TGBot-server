import * as ProjectManager from '@var3n1k/project-manager'

import * as GlobalModule from './module.js'

const Core = new ProjectManager.Engine.Module.Classes.Core({}, {}, {}, {})
// const Validator = ProjectManager.Engine.Module.Classes.Validator

await Core.Init(async () => {
	await GlobalModule.Telegram.Init()

	await GlobalModule.PostgreSQLDataBase.DataBases.EESTEC.Tables.Users.CreateIfNotExist()
})



// const DataBaseSettings = {
//     SQL: {
//         MySQL: {
//             Server: {
//                 DataBase: {
        
//                 },
//                 User: {
//                     Default: {
//                         Username: `root`,
//                         Password: `mysql_root`,
//                     },
//                     Additional: {
//                         [`root_user`]: {
//                             Password: `mysql_root_user`,
//                         },
//                     },
//                 },
//             },
//             Client: {
        
//             },
//         },
//         PostgreSQL: {
//             Server: {
//                 Port: 5432,
//                 DataBase: {
            
//                 },
//                 User: {
//                     Default: {
//                         Username: `postgres`,
//                         Password: `postgresql_root`,
//                     },
//                     Additional: {
            
//                     },
//                 },
//             },
//             Client: {
//                 PgAdmin4: {
//                     Password: `postgresql_root`,
//                 }, 
//             },
//         },
//     },
//     NoSQL: {

//     },
// } as const