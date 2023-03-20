import * as ServerCore from "@var3n1k/server-core"
import * as GlobalModule from "../../../module.js"

type HTTPRequest = ServerCore.Engine.API.WebServer.HTTP.API.HTTPWebServerRequest
type HTTPResponse = ServerCore.Engine.API.WebServer.HTTP.API.HTTPWebServerResponse

export default class AchievementsController {
  public static async Get(request: HTTPRequest, response: HTTPResponse): Promise<void> {
    const RequestEndpointElements = request.Destination.Endpoint.split(/\//)
    const RequestUserId = Number.parseInt(RequestEndpointElements[RequestEndpointElements.length - 1])

    const RequestAchievements = {
      id: RequestUserId,
      achievement: undefined,
    }

    const IsUserExist = await GlobalModule.API.Services.EESTEC.Achievements.default.DoesExist(RequestAchievements)
    if (IsUserExist) {
      const [ExistingUser] = await GlobalModule.API.Services.EESTEC.Achievements.default.Get(RequestAchievements)

      response.Responder.JSON(200, {}, ExistingUser)
    } else {
      response.Responder.JSON(409, {}, { message: `achievement doesn't exists` })
    }
  }
}
