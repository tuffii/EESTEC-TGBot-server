import * as CoreAPI from '@var3n1k/core'

import * as AuthRouter from './auth.js'

const UsersRouter = new CoreAPI.Engine.API.WebServer.HTTP.API.Router.default()
UsersRouter.Add(`/users`, [AuthRouter.default])

export default UsersRouter