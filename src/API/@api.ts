import * as CoreAPI from '@var3n1k/core'


export * as Services from './Services/__services.js'

export * as Controllers from './Controllers/__controllers.js'

export * as Routes from './Routes/__routes.js'

const HTTPServerHost = CoreAPI.Engine.Module.Classes.Process.Env.SERVER_HOST as string
const HTTPServerPort = CoreAPI.Engine.Module.Classes.Process.Env.SERVER_PORT as string
export const HTTPServer = new CoreAPI.Engine.API.WebServer.HTTP.API.default(HTTPServerHost, Number.parseInt(HTTPServerPort))