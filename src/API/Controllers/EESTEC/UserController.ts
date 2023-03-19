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
            id: RequestUserId,
            first_name: undefined,
            last_name: undefined,
            phone_number: undefined,
            telegram_id: undefined,
        }

        const IsUserExist = await GlobalModule.API.Services.EESTEC.User.default.DoesExist(RequestUser)
        if (IsUserExist) {
            const [ExistingUser] = await GlobalModule.API.Services.EESTEC.User.default.Get(RequestUser)

            response.Responder.JSON(200, {}, ExistingUser)

        }
        else {
            response.Responder.JSON(409, {}, { message: `User doesn't exists` })
        }
    }

    // TODO: JSDoc
	public static async Validate(request: HTTPRequest, response: HTTPResponse): Promise<void> {
        const ParsedRequestBody = JSON.parse(request.Body)

        const ValidationParameters = {
            Category: ParsedRequestBody.Category as string,
            Type: ParsedRequestBody.Type as string,
            Value: ParsedRequestBody.Value as string,
        }
        const ValidationQuery = [ValidationParameters.Category, ValidationParameters.Type, ValidationParameters.Value] as const

        const ValidationResult = GlobalModule.API.Services.EESTEC.User.default.Validate(...ValidationQuery)

        response.Responder.JSON(200, {}, ValidationResult)
    }

    // TODO: JSDoc
	public static async Register(request: HTTPRequest, response: HTTPResponse): Promise<void> {
        const ParsedRequestBody = JSON.parse(request.Body)

        const IsUserExist = await GlobalModule.API.Services.EESTEC.User.default.DoesExist(ParsedRequestBody)
        if (IsUserExist) {
            response.Responder.JSON(409, {}, { message: `User already exists` })
        }
        else {
            const RegisteredUser = await GlobalModule.API.Services.EESTEC.User.default.Create(ParsedRequestBody)

            response.Responder.JSON(200, {}, RegisteredUser)
        }
    }

    public static async Delete(request: HTTPRequest, response: HTTPResponse): Promise<void> {

        const ParsedRequestBody = JSON.parse(request.Body)
        const IsUserExist = await GlobalModule.API.Services.EESTEC.User.default.DoesExist(ParsedRequestBody)

        if (IsUserExist) {
            const DeleteUser = await GlobalModule.API.Services.EESTEC.User.default.Delete(ParsedRequestBody)
            response.Responder.JSON(200, {}, DeleteUser)
        }
        else {
            response.Responder.JSON(409, {}, { message: `User doesn't exists` })
        }

    }
}