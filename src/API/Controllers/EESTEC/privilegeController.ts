import * as ServerCore from '@var3n1k/server-core'
import * as GlobalModule from '../../../module.js'

type HTTPRequest = ServerCore.Engine.API.WebServer.HTTP.API.HTTPWebServerRequest
type HTTPResponse = ServerCore.Engine.API.WebServer.HTTP.API.HTTPWebServerResponse


export default class PrivilegeController {

    public static async Get(request: HTTPRequest, response: HTTPResponse): Promise<void> {
        const RequestEndpointElements = request.Destination.Endpoint.split(/\//)
        const RequestUserId = Number.parseInt(RequestEndpointElements[RequestEndpointElements.length - 1])

        const RequestPrivilege = {
            id: RequestUserId,
            privilege: undefined,
        }

        const IsUserExist = await GlobalModule.API.Services.EESTEC.Privilege.default.DoesExist(RequestPrivilege)
        if (IsUserExist) {
            const [ExistingUser] = await GlobalModule.API.Services.EESTEC.Privilege.default.Get(RequestPrivilege)

            response.Responder.JSON(200, {}, ExistingUser)
        }
        else {
            response.Responder.JSON(409, {}, { message: `privilege doesn't exists` })
        }
    }
}