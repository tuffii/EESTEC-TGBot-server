import * as ServerCore from '@var3n1k/server-core'

import * as GlobalModule from '../../../../../module.js'

const UsersIDRouter = new ServerCore.Engine.API.WebServer.HTTP.API.Router.default()
UsersIDRouter.On.Get(`/*`, GlobalModule.API.Controllers.EESTEC.User.default.Get)

const UsersAuthRouter = new ServerCore.Engine.API.WebServer.HTTP.API.Router.default()
UsersAuthRouter.On.Post(`/validate`, GlobalModule.API.Controllers.EESTEC.User.default.Validate)
UsersAuthRouter.On.Post(`/register`, GlobalModule.API.Controllers.EESTEC.User.default.Register)

const UsersRouter = new ServerCore.Engine.API.WebServer.HTTP.API.Router.default()
UsersRouter.Add(`/id`, [UsersIDRouter])
UsersRouter.Add(`/auth`, [UsersAuthRouter])

const Router = new ServerCore.Engine.API.WebServer.HTTP.API.Router.default()
Router.Add(`/users`, [UsersRouter])

export default Router