import * as ServerCore from '@var3n1k/server-core'
import * as UsersRouter from './users/__users.js'
import * as RolesRouter from './roles/__roles.js'

const Router = new ServerCore.Engine.API.WebServer.HTTP.API.Router.default()
Router.Add(`/eestec`, [UsersRouter.default, RolesRouter.default])

export default Router