import * as CoreAPI from '@var3n1k/server-core'

import * as GlobalModule from '../../module.js'

const CommandName = `addRole`

export default class Command extends CoreAPI.Engine.API.ChatBot.Telegram.API.Commands.BaseCommand {
    // TODO: JSDoc
	constructor(api: CoreAPI.Engine.API.ChatBot.Telegram.API.default) {
		const Validator = CoreAPI.Engine.Module.Classes.Validator
		Validator.Strict(api, new Validator().Default.Class.Instance().Required().Of(CoreAPI.Engine.API.ChatBot.Telegram.API.default))

        super(api, CommandName, {
            Chat: {
                Private: true,
                Public: {
                    Group: false,
                    Channel: false,
                },
            },
        },  async (context, command, commandName, commandQuery, commandChat, commandAuthor) => {
            //const Validator = CoreAPI.Engine.Module.Classes.Validator

            const IsEESTECUserByTelegramIDExist = await GlobalModule.API.Services.EESTEC.User.default.DoesExist({
                telegram_id: `${commandAuthor.id}`,
            })









        })
    }
}