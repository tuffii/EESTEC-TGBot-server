import * as ServerCore from '@var3n1k/server-core'

import * as GlobalModule from '../../module.js'

const CommandName = `start`

export default class Command extends ServerCore.Engine.API.ChatBot.Telegram.API.Commands.BaseCommand {
    // TODO: JSDoc
	constructor(api: ServerCore.Engine.API.ChatBot.Telegram.API.default) {
		const Validator = ServerCore.Engine.Module.Classes.Validator
		Validator.Strict(api, new Validator().Default.Class.Instance().Required().Of(ServerCore.Engine.API.ChatBot.Telegram.API.default))

        super(api, CommandName, {
            Chat: {
                Private: true,
                Public: {
                    Group: false,
                    Channel: false,
                },
            },
        }, async (context, command, commandName, commandQuery, commandChat, commandAuthor) => {
            // const Validator = ServerCore.Engine.Module.Classes.Validator

            const UserName = this._API.FormUserName(commandAuthor.username, commandAuthor.first_name, commandAuthor.last_name)

            const IsTelegramUserByTelegramIDExist = await GlobalModule.API.Services.Telegram.User.default.DoesExist({
                id: `${commandAuthor.id}`,
            })

            const IsEESTECUserByTelegramIDExist = await GlobalModule.API.Services.EESTEC.User.default.DoesExist({
                telegram_id: `${commandAuthor.id}`,
            })

            if (IsEESTECUserByTelegramIDExist) {
                await context.reply(`К вашему аккаунту Telegram ${UserName} уже привязана учетная запись EESTEC`)
            }
            else {
                const HideableContactRequestButton = ServerCore.Engine.API.ChatBot.Telegram.Dependencies.Telegraf.Markup.button.contactRequest(`Поделиться номером телефона`, true)

                await context.reply(`Отправьте мне свой номер телефона, чтобы я проверил его наличие в базе существующих пользователей`, {
                    reply_markup: {
                        keyboard: [
                            [HideableContactRequestButton],
                        ],
                    },
                })

                const UserPhoneNumber = await this._API.AwaitedHandler.Attachment.Phone(commandChat.id, commandAuthor.id)

                const IsUserLastNameExist = Validator.Soft(commandAuthor.last_name, new Validator().Default.String().Required().MinLength(1)).Status

                const UpdatedTelegramUserInfo = {
                    id: `${commandAuthor.id}`,
                    login: `${commandAuthor.username}`,
                    first_name: `${commandAuthor.first_name}`,
                    last_name: IsUserLastNameExist ? `${commandAuthor.last_name}` : undefined,
                    phone_number: `${UserPhoneNumber}`,
                } as const

                if (IsTelegramUserByTelegramIDExist) {
                    await GlobalModule.API.Services.Telegram.User.default.Update({
                        id: `${commandAuthor.id}`,
                    }, UpdatedTelegramUserInfo)
                }
                else {
                    await GlobalModule.API.Services.Telegram.User.default.Create(UpdatedTelegramUserInfo)
                }

                const IsEESTECUserByPhoneNumberExist = await GlobalModule.API.Services.EESTEC.User.default.DoesExist({
                    phone_number: `${UserPhoneNumber}`,
                })

                if (IsEESTECUserByPhoneNumberExist) {
                    await context.reply(`К вашему номеру телефона ${UserPhoneNumber} уже привязана учетная запись EESTEC`)
                }
                else {
                    const IsWebAppClientConnectionSecure = Boolean(ServerCore.Engine.Module.Classes.Process.Env.CLIENT_SECURE)

                    const IsWebAppClientRemote = Boolean(ServerCore.Engine.Module.Classes.Process.Env.CLIENT_REMOTE)

                    const WebAppClientDomain = ServerCore.Engine.Module.Classes.Process.Env.CLIENT_DOMAIN as string
                    const WebAppClientPort = Number.parseInt(ServerCore.Engine.Module.Classes.Process.Env.CLIENT_PORT as string)

                    const URLFormerParameters = [IsWebAppClientRemote, IsWebAppClientConnectionSecure, WebAppClientDomain, WebAppClientPort] as const

                    const WebAppClientURL = ServerCore.Engine.Module.Functions.Parameter.Type.Manager.Custom.URL.FormURL(...URLFormerParameters)
                    const WebAppButton = ServerCore.Engine.API.ChatBot.Telegram.Dependencies.Telegraf.Markup.button.webApp(`Зарегистрироваться`, WebAppClientURL)

                    await context.reply(`Зарегистрируйтесь в системе EESTEC для начала работы`, {
                        reply_markup: {
                            inline_keyboard: [
                                [WebAppButton],
                            ],
                        },
                    })
                }
            }
        })
    }
}