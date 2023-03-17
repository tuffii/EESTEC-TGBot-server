import * as CoreAPI from '@var3n1k/core'

import * as GlobalModule from '../../../../module.js'

const Router = new CoreAPI.Engine.API.WebServer.HTTP.API.Router.default()
Router.On.Post(`/validate`, GlobalModule.API.Controllers.User.default.Validate)
Router.On.Post(`/register`, GlobalModule.API.Controllers.User.default.Register)

Router.On.Get(`/id/*`, GlobalModule.API.Controllers.User.default.Get)

const AuthRouter = new CoreAPI.Engine.API.WebServer.HTTP.API.Router.default()
AuthRouter.Add(`/auth`, [Router])

export default AuthRouter