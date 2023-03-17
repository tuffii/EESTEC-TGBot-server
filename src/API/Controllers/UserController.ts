import * as CoreAPI from '@var3n1k/core'

import * as GlobalModule from '../../module.js'

type HTTPRequest = CoreAPI.Engine.API.WebServer.HTTP.API.HTTPWebServerRequest
type HTTPResponse = CoreAPI.Engine.API.WebServer.HTTP.API.HTTPWebServerResponse

export default class UserController {
    // TODO: JSDoc
	public static async Validate(request: HTTPRequest, response: HTTPResponse): Promise<void> {
        const ParsedRequestBody = JSON.parse(request.Body)

        const ValidationParameters = {
            Category: ParsedRequestBody.Category as string,
            Type: ParsedRequestBody.Type as string,
            Value: ParsedRequestBody.Value as string,
        }

        const ValidationResult = GlobalModule.API.Services.User.default.Validate(ValidationParameters.Category, ValidationParameters.Type, ValidationParameters.Value)

        response.Responder.JSON(200, {}, ValidationResult)
    }

    // TODO: JSDoc
	public static async Get(request: HTTPRequest, response: HTTPResponse): Promise<void> {
        const RequestEndpointElements = request.Destination.Endpoint
        const ParsedRequestBody = JSON.parse(request.Body)

        const IsUserExist = await GlobalModule.API.Services.User.default.DoesExist(ParsedRequestBody)
        if (IsUserExist) {
            const [ExistingUser] = await GlobalModule.API.Services.User.default.Get(ParsedRequestBody)

            response.Responder.JSON(200, {}, ExistingUser)
        }
        else {
            response.Responder.JSON(409, {}, { message: `User doesn't exists` })
        }
    }

    // TODO: JSDoc
	public static async Register(request: HTTPRequest, response: HTTPResponse): Promise<void> {
        const ParsedRequestBody = JSON.parse(request.Body)

        const IsUserExist = await GlobalModule.API.Services.User.default.DoesExist(ParsedRequestBody)
        if (IsUserExist) {
            response.Responder.JSON(409, {}, { message: `User already exists` })
        }
        else {
            const RegisteredUser = await GlobalModule.API.Services.User.default.Create(ParsedRequestBody)

            response.Responder.JSON(200, {}, RegisteredUser)
        }
    }
}