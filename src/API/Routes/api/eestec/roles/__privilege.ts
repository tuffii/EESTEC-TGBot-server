import * as ServerCore from '@var3n1k/server-core'
import * as GlobalModule from '../../../../../module.js'

const PrivilegeIDRouter = new ServerCore.Engine.API.WebServer.HTTP.API.Router.default()
PrivilegeIDRouter.On.Get(`/*`, GlobalModule.API.Controllers.EESTEC.Privilege.default.Get)

const PrivilegeRouter = new ServerCore.Engine.API.WebServer.HTTP.API.Router.default()
PrivilegeRouter.Add(`/id`, [PrivilegeIDRouter])

const Router = new ServerCore.Engine.API.WebServer.HTTP.API.Router.default()
Router.Add(`/roles`, [PrivilegeRouter])

export default Router
