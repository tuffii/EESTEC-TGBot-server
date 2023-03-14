import * as ProjectManager from '@var3n1k/project-manager'

import * as GlobalModule from '../../module.js'

export default class Command extends ProjectManager.Engine.API.ChatBot.Telegram.API.Commands.BaseCommand {
    // TODO: JSDoc
	constructor(api: ProjectManager.Engine.API.ChatBot.Telegram.API.default) {
		const Validator = ProjectManager.Engine.Module.Classes.Validator
		Validator.Strict(api, new Validator().Default.Class.Instance().Required().Of(ProjectManager.Engine.API.ChatBot.Telegram.API.default))

        super(api, `start`, {
            Chat: {
                Private: true,
                Public: {
                    Group: false,
                    Channel: false,
                },
            },
        }, async (context, command, commandName, commandQuery, commandChat, commandAuthor) => {
            const Validator = ProjectManager.Engine.Module.Classes.Validator

            const UserName = this._API.FormUserName(commandAuthor.username, commandAuthor.first_name, commandAuthor.last_name)

            const EESTECDataBase = GlobalModule.PostgreSQLDataBase.DataBases.EESTEC
            const UsersTable = EESTECDataBase.Tables.Users

            const UserTelegramID = commandAuthor.id
            const TelegramIDMatchCondition = UsersTable.Condition.Single.EqualTo(`telegram_id`, `${UserTelegramID}`)

            const ExistingMatchedUsersByTelegramID = await UsersTable.Select(undefined, TelegramIDMatchCondition, false, undefined)
            const IsMatchedUserByTelegramIDExist = !Validator.TypeGuard.Default.IsEmptyArray(ExistingMatchedUsersByTelegramID)

            if (IsMatchedUserByTelegramIDExist) {
                await context.reply(`К вашему аккаунту Telegram ${UserName} уже привязана учетная запись EESTEC`)
            }
            else {
                const HideableContactRequestButton = ProjectManager.Engine.API.ChatBot.Telegram.Dependencies.Telegraf.Markup.button.contactRequest(`отправить маляву`, true)

                await context.reply(`Номерок свой черкани и мы в расчете`, {
                    reply_markup: {
                        keyboard: [
                            [HideableContactRequestButton],
                        ],
                    },
                })

                const UserPhoneNumber = await this._API.AwaitedPhoneAttachment(commandChat.id, commandAuthor.id)
                const PhoneNumberMatchCondition = UsersTable.Condition.Single.EqualTo(`phone`, UserPhoneNumber)

                const ExistingMatchedUsersByPhoneNumber = await UsersTable.Select(undefined, PhoneNumberMatchCondition, false, undefined)
                const IsMatchedUserByPhoneNumberExist = !Validator.TypeGuard.Default.IsEmptyArray(ExistingMatchedUsersByPhoneNumber)

                if (IsMatchedUserByPhoneNumberExist) {
                    await context.reply(`К вашему номеру телефона ${UserPhoneNumber} уже привязана учетная запись EESTEC`)
                }
                else {
                    const UserInitialFirstName = commandAuthor.first_name
                    const IsUserInitialFirstNameExist = !Validator.TypeGuard.Default.IsUndefined(UserInitialFirstName)
    
                    const UserInitialLastName = commandAuthor.last_name
                    const IsUserInitialLastNameExist = !Validator.TypeGuard.Default.IsUndefined(UserInitialLastName)
    
                    // await UsersTable.Insert({
                    //     first_name: IsUserInitialFirstNameExist ? UserInitialFirstName : `Безымянный`,
                    //     last_name: IsUserInitialLastNameExist ? UserInitialLastName : `Безфамильный`,
                    //     phone: UserPhoneNumber,
                    //     telegram_id: `${UserTelegramID}`,
                    // })
                }
            }
        })
    }
}