import * as CoreAPI from '@var3n1k/core'

import * as UsersRouter from './users/__users.js'

const APIRouter = new CoreAPI.Engine.API.WebServer.HTTP.API.Router.default()
APIRouter.Add(`/api`, [UsersRouter.default])

export default APIRouter