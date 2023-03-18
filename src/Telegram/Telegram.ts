import * as ServerCore from '@var3n1k/server-core'

const TelegramBotToken = ServerCore.Engine.Module.Classes.Process.Env.TELEGRAM_BOT_TOKEN as string

const TelegramBotCommandsRelativePath = ServerCore.Engine.Module.Classes.FileSystem.GetPathFromSourceDirectory(import.meta.url, [`Commands`])

const TelegramBotClient = new ServerCore.Engine.API.ChatBot.Telegram.API.default(TelegramBotToken, TelegramBotCommandsRelativePath)

export default TelegramBotClient