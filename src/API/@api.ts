import * as ServerCore from '@var3n1k/server-core'

export * as Services from './Services/__services.js'

export * as Controllers from './Controllers/__controllers.js'

export * as Routes from './Routes/__routes.js'

const HTTPServerHost = ServerCore.Engine.Module.Classes.Process.Env.SERVER_DOMAIN as string
const HTTPServerPort = ServerCore.Engine.Module.Classes.Process.Env.SERVER_PORT as string
export const HTTPServer = new ServerCore.Engine.API.WebServer.HTTP.API.default(HTTPServerHost, Number.parseInt(HTTPServerPort))