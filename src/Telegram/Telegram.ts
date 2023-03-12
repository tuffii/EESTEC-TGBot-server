import * as ProjectManager from '@var3n1k/project-manager'

const TelegramBotToken = ProjectManager.Engine.Module.Classes.Process.Env.TELEGRAM_BOT_TOKEN as string

const TelegramBotCommandsRelativePath = ProjectManager.Engine.Module.Classes.FileSystem.GetPathFromSourceDirectory(import.meta.url, [`Commands`])

const TelegramBotClient = new ProjectManager.Engine.API.ChatBot.Telegram.API.default(TelegramBotToken, TelegramBotCommandsRelativePath)

export default TelegramBotClient