import * as ServerCore from '@var3n1k/server-core'

import * as GlobalModule from '../../../module.js'

type HTTPRequest = ServerCore.Engine.API.WebServer.HTTP.API.HTTPWebServerRequest
type HTTPResponse = ServerCore.Engine.API.WebServer.HTTP.API.HTTPWebServerResponse

export default class UserController {
    // TODO: JSDoc
	public static async Get(request: HTTPRequest, response: HTTPResponse): Promise<void> {
        const RequestEndpointElements = request.Destination.Endpoint.split(/\//)
        const RequestUserId = Number.parseInt(RequestEndpointElements[RequestEndpointElements.length - 1])

        const RequestUser = {
            id: `${RequestUserId}`,
            login: undefined,
            first_name: undefined,
            last_name: undefined,
            phone_number: undefined,
        }

        const IsUserExist = await GlobalModule.API.Services.Telegram.User.default.DoesExist(RequestUser)
        if (IsUserExist) {
            const [ExistingUser] = await GlobalModule.API.Services.Telegram.User.default.Get(RequestUser)

            response.Responder.JSON(200, {}, ExistingUser)

        }
        else {
            response.Responder.JSON(409, {}, { message: `User doesn't exists` })
        }
    }

    // TODO: JSDoc
	public static async Register(request: HTTPRequest, response: HTTPResponse): Promise<void> {
        const ParsedRequestBody = JSON.parse(request.Body)

        const IsUserExist = await GlobalModule.API.Services.Telegram.User.default.DoesExist(ParsedRequestBody)
        if (IsUserExist) {
            response.Responder.JSON(409, {}, { message: `User already exists` })
        }
        else {
            const RegisteredUser = await GlobalModule.API.Services.Telegram.User.default.Create(ParsedRequestBody)

            response.Responder.JSON(200, {}, RegisteredUser)
        }
    }
}