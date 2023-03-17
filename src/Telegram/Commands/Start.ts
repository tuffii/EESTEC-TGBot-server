import * as CoreAPI from '@var3n1k/core'

import * as GlobalModule from '../../module.js'

export default class Command extends CoreAPI.Engine.API.ChatBot.Telegram.API.Commands.BaseCommand {
    // TODO: JSDoc
	constructor(api: CoreAPI.Engine.API.ChatBot.Telegram.API.default) {
		const Validator = CoreAPI.Engine.Module.Classes.Validator
		Validator.Strict(api, new Validator().Default.Class.Instance().Required().Of(CoreAPI.Engine.API.ChatBot.Telegram.API.default))

        super(api, `start`, {
            Chat: {
                Private: true,
                Public: {
                    Group: false,
                    Channel: false,
                },
            },
        }, async (context, command, commandName, commandQuery, commandChat, commandAuthor) => {
            const Validator = CoreAPI.Engine.Module.Classes.Validator

            const UserName = this._API.FormUserName(commandAuthor.username, commandAuthor.first_name, commandAuthor.last_name)

            const EESTECDataBase = GlobalModule.DataBase.PostgreSQL.DataBases.EESTEC
            const TelegramUsersTable = EESTECDataBase.Tables.Users.Telegram
            const EESTECUsersTable = EESTECDataBase.Tables.Users.EESTEC

            const TelegramUsersIDMatchCondition = TelegramUsersTable.Condition.Single.EqualTo(`id`, `${commandAuthor.id}`)
            const ExistingTelegramUsersByTelegramID = await TelegramUsersTable.Select(undefined, TelegramUsersIDMatchCondition, false, undefined)
            const IsTelegramUserByTelegramIDExist = !Validator.TypeGuard.Default.IsEmptyArray(ExistingTelegramUsersByTelegramID)

            const EESTECUsersIDMatchCondition = EESTECUsersTable.Condition.Single.EqualTo(`telegram_id`, `${commandAuthor.id}`)
            const ExistingEESTECUsersByTelegramID = await EESTECUsersTable.Select(undefined, EESTECUsersIDMatchCondition, false, undefined)
            const IsEESTECUserByTelegramIDExist = !Validator.TypeGuard.Default.IsEmptyArray(ExistingEESTECUsersByTelegramID)

            if (IsEESTECUserByTelegramIDExist) {
                await context.reply(`К вашему аккаунту Telegram ${UserName} уже привязана учетная запись EESTEC`)
            }
            else {
                const HideableContactRequestButton = CoreAPI.Engine.API.ChatBot.Telegram.Dependencies.Telegraf.Markup.button.contactRequest(`Поделиться номером телефона`, true)

                await context.reply(`Отправьте мне свой номер телефона, чтобы я проверил его наличие в базе существующих пользователей`, {
                    reply_markup: {
                        keyboard: [
                            [HideableContactRequestButton],
                        ],
                    },
                })

                const UserPhoneNumber = await this._API.AwaitedHandler.Attachment.Phone(commandChat.id, commandAuthor.id)

                if (IsTelegramUserByTelegramIDExist) {
                    const TelegramUserPhoneNumberSetter = TelegramUsersTable.ValueSetter.Single(`phone_number`, `${UserPhoneNumber}`)

                    await TelegramUsersTable.Update(TelegramUserPhoneNumberSetter, TelegramUsersIDMatchCondition)
                }
                else {
                    await TelegramUsersTable.Insert({
                        id: `${commandAuthor.id}`,
                        login: `${commandAuthor.username}`,
                        first_name: `${commandAuthor.first_name}`,
                        last_name: `${commandAuthor.last_name}`,
                        phone_number: `${UserPhoneNumber}`,
                    })
                }

                const EESTECUsersPhoneNumberMatchCondition = EESTECUsersTable.Condition.Single.EqualTo(`phone_number`, `${UserPhoneNumber}`)
                const ExistingEESTECUsersByPhoneNumber = await EESTECUsersTable.Select(undefined, EESTECUsersPhoneNumberMatchCondition, false, undefined)
                const IsEESTECUserByPhoneNumberExist = !Validator.TypeGuard.Default.IsEmptyArray(ExistingEESTECUsersByPhoneNumber)

                if (IsEESTECUserByPhoneNumberExist) {
                    await context.reply(`К вашему номеру телефона ${UserPhoneNumber} уже привязана учетная запись EESTEC`)
                }
                else {
                    const WebAppClientURL = CoreAPI.Engine.Module.Classes.Process.Env.CLIENT_URL as string
                    const WebAppButton = CoreAPI.Engine.API.ChatBot.Telegram.Dependencies.Telegraf.Markup.button.webApp(`Зарегистрироваться`, WebAppClientURL)

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