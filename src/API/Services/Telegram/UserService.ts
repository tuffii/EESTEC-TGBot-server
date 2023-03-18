import * as ServerCore from '@var3n1k/server-core'

import * as GlobalModule from '../../../module.js'

import * as PostgreSQLTelegramTables from '../../../DataBase/PostgreSQL/DataBase/Telegram/Tables/__tables.js'

type TelegramUserInput = PostgreSQLTelegramTables.Users.Input
type TelegramUserOutput = PostgreSQLTelegramTables.Users.Output
interface TelegramUserSearch {
    id?: TelegramUserOutput[`id`] | undefined,
    login?: TelegramUserOutput[`login`] | undefined,
    first_name?: TelegramUserOutput[`first_name`] | undefined,
    last_name?: TelegramUserOutput[`last_name`] | undefined,
    phone_number?: TelegramUserOutput[`phone_number`] | undefined,
}

const Validator = ServerCore.Engine.Module.Classes.Validator
const TelegramUserSearchValidator = new Validator().Default.Object().Required().Exact({
    id: new Validator().Default.String().MinLength(1),
    login: new Validator().Default.String().MinLength(1),
    first_name: new Validator().Default.String().MinLength(1),
    last_name: new Validator().Default.String().MinLength(1),
    phone_number: new Validator().Default.String().MinLength(1),
})
const TelegramUserInputValidator = new Validator().Default.Object().Required().Exact({
    id: new Validator().Default.String().Required().MinLength(1),
    login: new Validator().Default.String().Required().MinLength(1),
    first_name: new Validator().Default.String().Required().MinLength(1),
    last_name: new Validator().Default.String().MinLength(1),
    phone_number: new Validator().Default.String().MinLength(1),
})
const TelegramUserOutputValidator = new Validator().Default.Object().Required().Exact({
    id: new Validator().Default.String().Required().MinLength(1),
    login: new Validator().Default.String().Required().MinLength(1),
    first_name: new Validator().Default.String().Required().MinLength(1),
    last_name: new Validator().Default.String().MinLength(1),
    phone_number: new Validator().Default.String().MinLength(1),
})

export default class UserService {
    // TODO: JSDoc
	public static async Get(searchParameters: TelegramUserSearch): Promise<Array<TelegramUserOutput>> {
        const Validator = ServerCore.Engine.Module.Classes.Validator
        Validator.Strict(searchParameters, TelegramUserSearchValidator)

        const IDToSearch = searchParameters.id
        const IsIDToSearchExist = !Validator.TypeGuard.Default.IsUndefined(IDToSearch)
        const LoginToSearch = searchParameters.login
        const IsLoginToSearchExist = !Validator.TypeGuard.Default.IsUndefined(LoginToSearch)
        const FirstNameToSearch = searchParameters.first_name
        const IsFirstNameToSearchExist = !Validator.TypeGuard.Default.IsUndefined(FirstNameToSearch)
        const LastNameToSearch = searchParameters.last_name
        const IsLastNameToSearchExist = !Validator.TypeGuard.Default.IsUndefined(LastNameToSearch)
        const PhoneNumberToSearch = searchParameters.phone_number
        const IsPhoneNumberToSearchExist = !Validator.TypeGuard.Default.IsUndefined(PhoneNumberToSearch)

        const TelegramDataBase = GlobalModule.DataBase.PostgreSQL.DataBases.Telegram
        const TelegramUsersTable = TelegramDataBase.Tables.Users

        const TelegramUserMatchConditions: Array<string> = []
        if (IsIDToSearchExist) TelegramUserMatchConditions.push(TelegramUsersTable.Condition.Single.EqualTo(`id`, IDToSearch))
        if (IsLoginToSearchExist) TelegramUserMatchConditions.push(TelegramUsersTable.Condition.Single.EqualTo(`login`, LoginToSearch))
        if (IsFirstNameToSearchExist) TelegramUserMatchConditions.push(TelegramUsersTable.Condition.Single.EqualTo(`first_name`, FirstNameToSearch))
        if (IsLastNameToSearchExist) TelegramUserMatchConditions.push(TelegramUsersTable.Condition.Single.EqualTo(`last_name`, LastNameToSearch))
        if (IsPhoneNumberToSearchExist) TelegramUserMatchConditions.push(TelegramUsersTable.Condition.Single.EqualTo(`phone_number`, PhoneNumberToSearch))

        const TelegramUserMatchCondition = TelegramUsersTable.Condition.Multiple.Every(...TelegramUserMatchConditions)

        const MatchedTelegramUsers = await TelegramUsersTable.Select(undefined, TelegramUserMatchCondition, false, undefined)

        return MatchedTelegramUsers
    }

    // TODO: JSDoc
	public static async DoesExist(searchParameters: TelegramUserSearch): Promise<boolean> {
        const Validator = ServerCore.Engine.Module.Classes.Validator
        Validator.Strict(searchParameters, TelegramUserSearchValidator)

        const MatchedTelegramUsers = await UserService.Get(searchParameters)
        const IsMatchedTelegramUserExist = !Validator.TypeGuard.Default.IsEmptyArray(MatchedTelegramUsers)

        return IsMatchedTelegramUserExist
    }

    // TODO: JSDoc
	public static async Create(newUser: TelegramUserInput): Promise<TelegramUserOutput> {
        const Validator = ServerCore.Engine.Module.Classes.Validator
        Validator.Strict(newUser, TelegramUserInputValidator)

        const TelegramDataBase = GlobalModule.DataBase.PostgreSQL.DataBases.Telegram
        const TelegramUsersTable = TelegramDataBase.Tables.Users

        const MatchedTelegramUsers = await UserService.Get(newUser)
        Validator.Strict(MatchedTelegramUsers, new Validator().Default.Array().Required().Of(TelegramUserOutputValidator).Length(0))

        const [CreatedTelegramUser] = await TelegramUsersTable.Insert(newUser)

        return CreatedTelegramUser
    }

    // TODO: JSDoc
	public static async Update(searchParameters: TelegramUserSearch, newParameters: TelegramUserOutput): Promise<TelegramUserOutput> {
        const Validator = ServerCore.Engine.Module.Classes.Validator
        Validator.Strict(searchParameters, TelegramUserSearchValidator)
        Validator.Strict(newParameters, TelegramUserOutputValidator)

        const IDToSearch = searchParameters.id
        const IsIDToSearchExist = !Validator.TypeGuard.Default.IsUndefined(IDToSearch)
        const LoginToSearch = searchParameters.login
        const IsLoginToSearchExist = !Validator.TypeGuard.Default.IsUndefined(LoginToSearch)
        const FirstNameToSearch = searchParameters.first_name
        const IsFirstNameToSearchExist = !Validator.TypeGuard.Default.IsUndefined(FirstNameToSearch)
        const LastNameToSearch = searchParameters.last_name
        const IsLastNameToSearchExist = !Validator.TypeGuard.Default.IsUndefined(LastNameToSearch)
        const PhoneNumberToSearch = searchParameters.phone_number
        const IsPhoneNumberToSearchExist = !Validator.TypeGuard.Default.IsUndefined(PhoneNumberToSearch)

        const TelegramDataBase = GlobalModule.DataBase.PostgreSQL.DataBases.Telegram
        const TelegramUsersTable = TelegramDataBase.Tables.Users

        const TelegramUserMatchConditions: Array<string> = []
        if (IsIDToSearchExist) TelegramUserMatchConditions.push(TelegramUsersTable.Condition.Single.EqualTo(`id`, IDToSearch))
        if (IsLoginToSearchExist) TelegramUserMatchConditions.push(TelegramUsersTable.Condition.Single.EqualTo(`login`, LoginToSearch))
        if (IsFirstNameToSearchExist) TelegramUserMatchConditions.push(TelegramUsersTable.Condition.Single.EqualTo(`first_name`, FirstNameToSearch))
        if (IsLastNameToSearchExist) TelegramUserMatchConditions.push(TelegramUsersTable.Condition.Single.EqualTo(`last_name`, LastNameToSearch))
        if (IsPhoneNumberToSearchExist) TelegramUserMatchConditions.push(TelegramUsersTable.Condition.Single.EqualTo(`phone_number`, PhoneNumberToSearch))

        const TelegramUserMatchCondition = TelegramUsersTable.Condition.Multiple.Every(...TelegramUserMatchConditions)

        const MatchedTelegramUsers = await UserService.Get(searchParameters)
        Validator.Strict(MatchedTelegramUsers, new Validator().Default.Array().Required().Of(TelegramUserOutputValidator).Length(1))

        const NewTelegramUserSetters: Array<string> = []
        NewTelegramUserSetters.push(TelegramUsersTable.ValueSetter.Single(`id`, newParameters.id))
        NewTelegramUserSetters.push(TelegramUsersTable.ValueSetter.Single(`login`, newParameters.login))
        NewTelegramUserSetters.push(TelegramUsersTable.ValueSetter.Single(`first_name`, newParameters.first_name))
        NewTelegramUserSetters.push(TelegramUsersTable.ValueSetter.Single(`last_name`, newParameters.last_name))
        NewTelegramUserSetters.push(TelegramUsersTable.ValueSetter.Single(`phone_number`, newParameters.phone_number))

        const NewTelegramUserSetter = TelegramUsersTable.ValueSetter.Multiple(...NewTelegramUserSetters)

        const [UpdatedTelegramUser] = await TelegramUsersTable.Update(NewTelegramUserSetter, TelegramUserMatchCondition)

        return UpdatedTelegramUser
    }

    // TODO: JSDoc
	public static async Delete(searchParameters: TelegramUserSearch): Promise<TelegramUserOutput> {
        const Validator = ServerCore.Engine.Module.Classes.Validator
        Validator.Strict(searchParameters, TelegramUserSearchValidator)

        const IDToSearch = searchParameters.id
        const IsIDToSearchExist = !Validator.TypeGuard.Default.IsUndefined(IDToSearch)
        const LoginToSearch = searchParameters.login
        const IsLoginToSearchExist = !Validator.TypeGuard.Default.IsUndefined(LoginToSearch)
        const FirstNameToSearch = searchParameters.first_name
        const IsFirstNameToSearchExist = !Validator.TypeGuard.Default.IsUndefined(FirstNameToSearch)
        const LastNameToSearch = searchParameters.last_name
        const IsLastNameToSearchExist = !Validator.TypeGuard.Default.IsUndefined(LastNameToSearch)
        const PhoneNumberToSearch = searchParameters.phone_number
        const IsPhoneNumberToSearchExist = !Validator.TypeGuard.Default.IsUndefined(PhoneNumberToSearch)

        const TelegramDataBase = GlobalModule.DataBase.PostgreSQL.DataBases.Telegram
        const TelegramUsersTable = TelegramDataBase.Tables.Users

        const TelegramUserMatchConditions: Array<string> = []
        if (IsIDToSearchExist) TelegramUserMatchConditions.push(TelegramUsersTable.Condition.Single.EqualTo(`id`, IDToSearch))
        if (IsLoginToSearchExist) TelegramUserMatchConditions.push(TelegramUsersTable.Condition.Single.EqualTo(`login`, LoginToSearch))
        if (IsFirstNameToSearchExist) TelegramUserMatchConditions.push(TelegramUsersTable.Condition.Single.EqualTo(`first_name`, FirstNameToSearch))
        if (IsLastNameToSearchExist) TelegramUserMatchConditions.push(TelegramUsersTable.Condition.Single.EqualTo(`last_name`, LastNameToSearch))
        if (IsPhoneNumberToSearchExist) TelegramUserMatchConditions.push(TelegramUsersTable.Condition.Single.EqualTo(`phone_number`, PhoneNumberToSearch))

        const TelegramUserMatchCondition = TelegramUsersTable.Condition.Multiple.Every(...TelegramUserMatchConditions)

        const MatchedTelegramUsers = await UserService.Get(searchParameters)
        Validator.Strict(MatchedTelegramUsers, new Validator().Default.Array().Required().Of(TelegramUserOutputValidator).Length(1))

        const [DeletedTelegramUser] = await TelegramUsersTable.Delete(TelegramUserMatchCondition)

        return DeletedTelegramUser
    }
}