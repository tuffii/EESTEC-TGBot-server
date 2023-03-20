import * as ServerCore from "@var3n1k/server-core"
import * as GlobalModule from "../../../module.js"

type HTTPRequest = ServerCore.Engine.API.WebServer.HTTP.API.HTTPWebServerRequest
type HTTPResponse = ServerCore.Engine.API.WebServer.HTTP.API.HTTPWebServerResponse

export default class AchieveTrackerController {
  public static async Get(request: HTTPRequest, response: HTTPResponse): Promise<void> {
    const RequestEndpointElements = request.Destination.Endpoint.split(/\//)
    const RequestAchieveTrackerId = Number.parseInt(RequestEndpointElements[RequestEndpointElements.length - 1])

    const RequestAchieveTracker = {
      id: RequestAchieveTrackerId,
      achieveID: undefined,
      time: undefined
    }

    const IsAchieveTrackerExist = await GlobalModule.API.Services.EESTEC.AchieveTracker.default.DoesExist(RequestAchieveTracker)
    if (IsAchieveTrackerExist) {
      const [ExistingUserAchieve] = await GlobalModule.API.Services.EESTEC.AchieveTracker.default.Get(RequestAchieveTracker)

      response.Responder.JSON(200, {}, ExistingUserAchieve)
    } else {
      response.Responder.JSON(409, {}, { message: `achieve doesn't exists` })
    }
  }

  public static async Create(request: HTTPRequest, response: HTTPResponse): Promise<void> {
    const ParsedRequestBody = JSON.parse(request.Body)

    const IsAchieveTrackerExist = await GlobalModule.API.Services.EESTEC.AchieveTracker.default.DoesExist(ParsedRequestBody)
    if (IsAchieveTrackerExist) {
      response.Responder.JSON(409, {}, { message: `AchieveTracker already exists` })
    } else {
      const RegisteredAchieveTracker = await GlobalModule.API.Services.EESTEC.AchieveTracker.default.Create(ParsedRequestBody)
      response.Responder.JSON(200, {}, RegisteredAchieveTracker)
    }
  }

  public static async Delete(request: HTTPRequest, response: HTTPResponse): Promise<void> {
    const ParsedRequestBody = JSON.parse(request.Body)
    const IsAchieveTrackerExist = await GlobalModule.API.Services.EESTEC.AchieveTracker.default.DoesExist(ParsedRequestBody)

    if (IsAchieveTrackerExist) {
      const DeleteAchieveTracker = await GlobalModule.API.Services.EESTEC.AchieveTracker.default.Delete(ParsedRequestBody)
      response.Responder.JSON(200, {}, DeleteAchieveTracker)
    } else {
      response.Responder.JSON(409, {}, { message: `AchieveTracker doesn't exists` })
    }
  }

  public static async Update(request: HTTPRequest, response: HTTPResponse): Promise<void> {
    ///
  }

}
