import * as ServerCore from "@var3n1k/server-core"
import * as GlobalModule from "../../../module.js"

type HTTPRequest = ServerCore.Engine.API.WebServer.HTTP.API.HTTPWebServerRequest
type HTTPResponse = ServerCore.Engine.API.WebServer.HTTP.API.HTTPWebServerResponse

export default class RoleController {
  public static async Get(request: HTTPRequest, response: HTTPResponse): Promise<void> {
    const RequestEndpointElements = request.Destination.Endpoint.split(/\//)
    const RequestRoleId = Number.parseInt(RequestEndpointElements[RequestEndpointElements.length - 1])

    const RequestRole = {
      id: RequestRoleId,
      roleName: undefined,
      privilegeID: undefined,
      parametr: undefined,
    }

    const IsRoleExist = await GlobalModule.API.Services.EESTEC.Role.default.DoesExist(RequestRole)
    if (IsRoleExist) {
      const [ExistingUser] = await GlobalModule.API.Services.EESTEC.Role.default.Get(RequestRole)

      response.Responder.JSON(200, {}, ExistingUser)
    } else {
      response.Responder.JSON(409, {}, { message: `Role doesn't exists` })
    }
  }

  public static async Create(request: HTTPRequest, response: HTTPResponse): Promise<void> {
    const ParsedRequestBody = JSON.parse(request.Body)

    const IsRoleExist = await GlobalModule.API.Services.EESTEC.Role.default.DoesExist(ParsedRequestBody)
    if (IsRoleExist) {
      response.Responder.JSON(409, {}, { message: `Role already exists` })
    } else {
      const RegisteredRole = await GlobalModule.API.Services.EESTEC.Role.default.Create(ParsedRequestBody)
      response.Responder.JSON(200, {}, RegisteredRole)
    }
  }

  public static async Delete(request: HTTPRequest, response: HTTPResponse): Promise<void> {
    const ParsedRequestBody = JSON.parse(request.Body)
    const IsRoleExist = await GlobalModule.API.Services.EESTEC.Role.default.DoesExist(ParsedRequestBody)

    if (IsRoleExist) {
      const DeleteRole = await GlobalModule.API.Services.EESTEC.Role.default.Delete(ParsedRequestBody)
      response.Responder.JSON(200, {}, DeleteRole)
    } else {
      response.Responder.JSON(409, {}, { message: `Role doesn't exists` })
    }
  }

  public static async Update(request: HTTPRequest, response: HTTPResponse): Promise<void> {
    /*
        const ParsedRequestBody = JSON.parse(request.Body)
        const IsRoleExist = await GlobalModule.API.Services.EESTEC.Role.default.DoesExist(ParsedRequestBody)
        if (IsRoleExist) {
            const DeleteRole = await GlobalModule.API.Services.EESTEC.Role.default.Update(ParsedRequestBody)
            response.Responder.JSON(200, {}, DeleteRole)
        }
        else {
            response.Responder.JSON(409, {}, { message: `Role doesn't exists` })
        }*/
  }
}
