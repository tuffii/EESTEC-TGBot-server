import * as ServerCore from '@var3n1k/server-core'

import * as UsersRouter from './users/__users.js'

const Router = new ServerCore.Engine.API.WebServer.HTTP.API.Router.default()
Router.Add(`/telegram`, [UsersRouter.default])

export default Router