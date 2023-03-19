import * as ServerCore from '@var3n1k/server-core'
import * as GlobalModule from '../../../../../module.js'

const RolesIDRouter = new ServerCore.Engine.API.WebServer.HTTP.API.Router.default()
RolesIDRouter.On.Get(`/*`, GlobalModule.API.Controllers.EESTEC.Roles.default.Get)

const RolesRouter = new ServerCore.Engine.API.WebServer.HTTP.API.Router.default()
RolesRouter.Add(`/id`, [RolesIDRouter])

RolesRouter.On.Post(`/create`, GlobalModule.API.Controllers.EESTEC.Roles.default.Create)
RolesRouter.On.Post(`/update`, GlobalModule.API.Controllers.EESTEC.Roles.default.Update)
RolesRouter.On.Post(`/delete`, GlobalModule.API.Controllers.EESTEC.Roles.default.Delete)

const Router = new ServerCore.Engine.API.WebServer.HTTP.API.Router.default()
Router.Add(`/roles`, [RolesRouter])

export default Router