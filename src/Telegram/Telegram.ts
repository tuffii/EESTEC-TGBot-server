import * as CoreAPI from '@var3n1k/core'

const TelegramBotToken = CoreAPI.Engine.Module.Classes.Process.Env.TELEGRAM_BOT_TOKEN as string

const TelegramBotCommandsRelativePath = CoreAPI.Engine.Module.Classes.FileSystem.GetPathFromSourceDirectory(import.meta.url, [`Commands`])

const TelegramBotClient = new CoreAPI.Engine.API.ChatBot.Telegram.API.default(TelegramBotToken, TelegramBotCommandsRelativePath)

export default TelegramBotClient