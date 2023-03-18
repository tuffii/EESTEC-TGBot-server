import * as ServerCore from '@var3n1k/server-core'

import * as GlobalModule from '../../../module.js'

import * as PostgreSQLEESTECTables from '../../../DataBase/PostgreSQL/DataBase/EESTEC/Tables/__tables.js'

type EESTECUserInput = PostgreSQLEESTECTables.Users.Input
type EESTECUserOutput = PostgreSQLEESTECTables.Users.Output
interface EESTECUserSearch {
    id?: EESTECUserOutput[`id`] | undefined,
    first_name?: EESTECUserOutput[`first_name`] | undefined,
    last_name?: EESTECUserOutput[`last_name`] | undefined,
    phone_number?: EESTECUserOutput[`phone_number`] | undefined,
    telegram_id?: EESTECUserOutput[`telegram_id`] | undefined,
}

const Validator = ServerCore.Engine.Module.Classes.Validator
const EESTECUserSearchValidator = new Validator().Default.Object().Required().Exact({
    id: new Validator().Default.Numeric().Number().Integer().Min(1),
    first_name: new Validator().Default.String().MinLength(1),
    last_name: new Validator().Default.String().MinLength(1),
    phone_number: new Validator().Default.String().MinLength(1),
    telegram_id: new Validator().Default.String().MinLength(1),
})
const EESTECUserInputValidator = new Validator().Default.Object().Required().Exact({
    first_name: new Validator().Default.String().Required().MinLength(1),
    last_name: new Validator().Default.String().Required().MinLength(1),
    phone_number: new Validator().Default.String().Required().MinLength(1),
    telegram_id: new Validator().Default.String().Required().MinLength(1),
})
const EESTECUserOutputValidator = new Validator().Default.Object().Required().Exact({
    id: new Validator().Default.Numeric().Number().Required().Integer().Min(1),
    first_name: new Validator().Default.String().Required().MinLength(1),
    last_name: new Validator().Default.String().Required().MinLength(1),
    phone_number: new Validator().Default.String().Required().MinLength(1),
    telegram_id: new Validator().Default.String().Required().MinLength(1),
})

interface ValidationResult {
    readonly Status: boolean
    readonly Error: {
        readonly Message: string
    }
}

export default class UserService {
    // TODO: JSDoc
	public static Validate(validationCategory: string, validationType: string, validationParameter: string): ValidationResult {
        const Validator = ServerCore.Engine.Module.Classes.Validator

        const ValidationCategory = {
            Registration: `REGISTRATION`,
            Login: `LOGIN`,
        } as const

        Validator.Strict(validationCategory, new Validator().Default.String().Required().MinLength(1).In([
            ValidationCategory.Registration,
            ValidationCategory.Login,
        ]))
        Validator.Strict(validationParameter, new Validator().Default.String().Required())

        const ValidationResults: Array<ValidationResult> = []

        if (validationCategory === ValidationCategory.Registration) {
            const ValidationType = {
                FirstName: `FIRST_NAME`,
                SecondName: `SECOND_NAME`,
                ThirdName: `THIRD_NAME`,
                PhoneNumber: `PHONE_NUMBER`,
            } as const

            Validator.Strict(validationType, new Validator().Default.String().Required().MinLength(1).In([
                ValidationType.FirstName,
                ValidationType.SecondName,
                ValidationType.ThirdName,
                ValidationType.PhoneNumber,
            ]))

            if (validationType === ValidationType.FirstName) {
                const EmptyValueValidation = Validator.Soft(validationParameter, new Validator().Default.String().Required().MinLength(1))
                const IsValueEmpty = !EmptyValueValidation.Status
                const EmptyValueErrorMessage = `Имя не может быть пустым`

                const ToUpperCase = ServerCore.Engine.Module.Functions.Parameter.Type.Manager.Default.String.Style.Modify.Case.Size.ToUpperCase

                const ENAlphabet = ServerCore.Engine.Module.Dataset.Dictionary.Language.Alphabet[ServerCore.Engine.Module.Dataset.Dictionary.Language.Code.English]
                const RUAlphabet = ServerCore.Engine.Module.Dataset.Dictionary.Language.Alphabet[ServerCore.Engine.Module.Dataset.Dictionary.Language.Code.Russian]
                const LowerCaseAlphabets = [...ENAlphabet, ...RUAlphabet]
                const UpperCaseAlphabets = LowerCaseAlphabets.map((_el, _ind, _arr) => ToUpperCase(_el, Array.from(Array(_el.length), (__el, __ind) => __ind)))
                const FirstNameSymbols = [...LowerCaseAlphabets, ...UpperCaseAlphabets]

                const FullValueValidation = Validator.Soft(validationParameter, new Validator().Default.String().Required().MinLength(1)
                .Of(FirstNameSymbols).StartsWith(FirstNameSymbols.map((_el, _ind, _arr) => ToUpperCase(_el, [0]))))
                const IsValueValid = FullValueValidation.Status
                const InvalidValueErrorMessage = `Имя введено неверно`

                const ValidationResult: ValidationResult = {
                    Status: IsValueValid,
                    Error: {
                        Message: IsValueValid ? `` : (IsValueEmpty ? EmptyValueErrorMessage : InvalidValueErrorMessage),
                    },
                }

                ValidationResults.push(ValidationResult)
            }
            else if (validationType === ValidationType.SecondName) {
                const EmptyValueValidation = Validator.Soft(validationParameter, new Validator().Default.String().Required().MinLength(1))
                const IsValueEmpty = !EmptyValueValidation.Status
                const EmptyValueErrorMessage = `Фамилия не может быть пустой`

                const ToUpperCase = ServerCore.Engine.Module.Functions.Parameter.Type.Manager.Default.String.Style.Modify.Case.Size.ToUpperCase

                const ENAlphabet = ServerCore.Engine.Module.Dataset.Dictionary.Language.Alphabet[ServerCore.Engine.Module.Dataset.Dictionary.Language.Code.English]
                const RUAlphabet = ServerCore.Engine.Module.Dataset.Dictionary.Language.Alphabet[ServerCore.Engine.Module.Dataset.Dictionary.Language.Code.Russian]
                const LowerCaseAlphabets = [...ENAlphabet, ...RUAlphabet]
                const UpperCaseAlphabets = LowerCaseAlphabets.map((_el, _ind, _arr) => ToUpperCase(_el, Array.from(Array(_el.length), (__el, __ind) => __ind)))
                const LastNameSymbols = [...LowerCaseAlphabets, ...UpperCaseAlphabets]

                const FullValueValidation = Validator.Soft(validationParameter, new Validator().Default.String().Required().MinLength(1)
                .Of(LastNameSymbols).StartsWith(LastNameSymbols.map((_el, _ind, _arr) => ToUpperCase(_el, [0]))))
                const IsValueValid = FullValueValidation.Status
                const InvalidValueErrorMessage = `Фамилия введена неверно`

                const ValidationResult: ValidationResult = {
                    Status: IsValueValid,
                    Error: {
                        Message: IsValueValid ? `` : (IsValueEmpty ? EmptyValueErrorMessage : InvalidValueErrorMessage),
                    },
                }

                ValidationResults.push(ValidationResult)
            }
            else if (validationType === ValidationType.ThirdName) {
                const EmptyValueValidation = Validator.Soft(validationParameter, new Validator().Default.String().Required().MinLength(0))
                const IsValueEmpty = !EmptyValueValidation.Status
                const EmptyValueErrorMessage = `Отчество не может быть пустым`

                const ToUpperCase = ServerCore.Engine.Module.Functions.Parameter.Type.Manager.Default.String.Style.Modify.Case.Size.ToUpperCase

                const RUAlphabet = ServerCore.Engine.Module.Dataset.Dictionary.Language.Alphabet[ServerCore.Engine.Module.Dataset.Dictionary.Language.Code.Russian]
                const LowerCaseAlphabets = [...RUAlphabet]
                const UpperCaseAlphabets = LowerCaseAlphabets.map((_el, _ind, _arr) => ToUpperCase(_el, Array.from(Array(_el.length), (__el, __ind) => __ind)))
                const LastNameSymbols = [...LowerCaseAlphabets, ...UpperCaseAlphabets]

                const FullValueValidation = Validator.Soft(validationParameter, new Validator().Default.String().Required().MinLength(0)
                .Of(LastNameSymbols).StartsWith(LastNameSymbols.map((_el, _ind, _arr) => ToUpperCase(_el, [0]))))
                const IsValueValid = FullValueValidation.Status
                const InvalidValueErrorMessage = `Отчество введено неверно`

                const ValidationResult: ValidationResult = {
                    Status: IsValueValid,
                    Error: {
                        Message: IsValueValid ? `` : (IsValueEmpty ? EmptyValueErrorMessage : InvalidValueErrorMessage),
                    },
                }

                ValidationResults.push(ValidationResult)
            }
            else if (validationType === ValidationType.PhoneNumber) {
                const EmptyValueValidation = Validator.Soft(validationParameter, new Validator().Default.String().Required().MinLength(1))
                const IsValueEmpty = !EmptyValueValidation.Status
                const EmptyValueErrorMessage = `Номер телефона не может быть пустым`

                const Numbers = ServerCore.Engine.Module.Dataset.Dictionary.Symbol.Collection.Numbers
                const PhoneNumberSymbols = [...Numbers, `+`, `-`]

                const FullValueValidation = Validator.Soft(validationParameter, new Validator().Default.String().Required().MinLength(1)
                .Of(PhoneNumberSymbols).StartsWith([`+`, ...Numbers]))
                const IsValueValid = FullValueValidation.Status
                const InvalidValueErrorMessage = `Номер телефона введен неверно`

                const ValidationResult: ValidationResult = {
                    Status: IsValueValid,
                    Error: {
                        Message: IsValueValid ? `` : (IsValueEmpty ? EmptyValueErrorMessage : InvalidValueErrorMessage),
                    },
                }

                ValidationResults.push(ValidationResult)
            }
        }
        else if (validationCategory === ValidationCategory.Login) {

        }

        const IsValidationResultExist = !Validator.TypeGuard.Default.IsEmptyArray(ValidationResults)
        if (IsValidationResultExist) {
            const ValidationResult = ValidationResults[ValidationResults.length - 1]

            return ValidationResult
        }
        else {
            const ValidationResult: ValidationResult = {
                Status: false,
                Error: {
                    Message: ``,
                },
            }

            return ValidationResult
        }
    }

    // TODO: JSDoc
	public static async Get(searchParameters: EESTECUserSearch): Promise<Array<EESTECUserOutput>> {
        const Validator = ServerCore.Engine.Module.Classes.Validator
        Validator.Strict(searchParameters, EESTECUserSearchValidator)

        const IDToSearch = searchParameters.id
        const IsIDToSearchExist = !Validator.TypeGuard.Default.IsUndefined(IDToSearch)
        const FirstNameToSearch = searchParameters.first_name
        const IsFirstNameToSearchExist = !Validator.TypeGuard.Default.IsUndefined(FirstNameToSearch)
        const LastNameToSearch = searchParameters.last_name
        const IsLastNameToSearchExist = !Validator.TypeGuard.Default.IsUndefined(LastNameToSearch)
        const PhoneNumberToSearch = searchParameters.phone_number
        const IsPhoneNumberToSearchExist = !Validator.TypeGuard.Default.IsUndefined(PhoneNumberToSearch)
        const TelegramIDToSearch = searchParameters.telegram_id
        const IsTelegramIDToSearchExist = !Validator.TypeGuard.Default.IsUndefined(TelegramIDToSearch)

        const EESTECDataBase = GlobalModule.DataBase.PostgreSQL.DataBases.EESTEC
        const EESTECUsersTable = EESTECDataBase.Tables.Users

        const EESTECUserMatchConditions: Array<string> = []
        if (IsIDToSearchExist) EESTECUserMatchConditions.push(EESTECUsersTable.Condition.Single.EqualTo(`id`, IDToSearch))
        if (IsFirstNameToSearchExist) EESTECUserMatchConditions.push(EESTECUsersTable.Condition.Single.EqualTo(`first_name`, FirstNameToSearch))
        if (IsLastNameToSearchExist) EESTECUserMatchConditions.push(EESTECUsersTable.Condition.Single.EqualTo(`last_name`, LastNameToSearch))
        if (IsPhoneNumberToSearchExist) EESTECUserMatchConditions.push(EESTECUsersTable.Condition.Single.EqualTo(`phone_number`, PhoneNumberToSearch))
        if (IsTelegramIDToSearchExist) EESTECUserMatchConditions.push(EESTECUsersTable.Condition.Single.EqualTo(`telegram_id`, TelegramIDToSearch))

        const EESTECUserMatchCondition = EESTECUsersTable.Condition.Multiple.Every(...EESTECUserMatchConditions)

        const MatchedEESTECUsers = await EESTECUsersTable.Select(undefined, EESTECUserMatchCondition, false, undefined)

        return MatchedEESTECUsers
    }

    // TODO: JSDoc
	public static async DoesExist(searchParameters: EESTECUserSearch): Promise<boolean> {
        const Validator = ServerCore.Engine.Module.Classes.Validator
        Validator.Strict(searchParameters, EESTECUserSearchValidator)

        const MatchedEESTECUsers = await UserService.Get(searchParameters)
        const IsMatchedEESTECUserExist = !Validator.TypeGuard.Default.IsEmptyArray(MatchedEESTECUsers)

        return IsMatchedEESTECUserExist
    }

    // TODO: JSDoc
	public static async Create(newUser: EESTECUserInput): Promise<EESTECUserOutput> {
        const Validator = ServerCore.Engine.Module.Classes.Validator
        Validator.Strict(newUser, EESTECUserInputValidator)

        const EESTECDataBase = GlobalModule.DataBase.PostgreSQL.DataBases.EESTEC
        const EESTECUsersTable = EESTECDataBase.Tables.Users

        const MatchedEESTECUsers = await UserService.Get(newUser)
        Validator.Strict(MatchedEESTECUsers, new Validator().Default.Array().Required().Of(EESTECUserOutputValidator).Length(0))

        const [CreatedEESTECUser] = await EESTECUsersTable.Insert(newUser)

        return CreatedEESTECUser
    }

    // TODO: JSDoc
	public static async Update(searchParameters: EESTECUserSearch, newParameters: EESTECUserOutput): Promise<EESTECUserOutput> {
        const Validator = ServerCore.Engine.Module.Classes.Validator
        Validator.Strict(searchParameters, EESTECUserSearchValidator)

        const IDToSearch = searchParameters.id
        const IsIDToSearchExist = !Validator.TypeGuard.Default.IsUndefined(IDToSearch)
        const FirstNameToSearch = searchParameters.first_name
        const IsFirstNameToSearchExist = !Validator.TypeGuard.Default.IsUndefined(FirstNameToSearch)
        const LastNameToSearch = searchParameters.last_name
        const IsLastNameToSearchExist = !Validator.TypeGuard.Default.IsUndefined(LastNameToSearch)
        const PhoneNumberToSearch = searchParameters.phone_number
        const IsPhoneNumberToSearchExist = !Validator.TypeGuard.Default.IsUndefined(PhoneNumberToSearch)
        const TelegramIDToSearch = searchParameters.telegram_id
        const IsTelegramIDToSearchExist = !Validator.TypeGuard.Default.IsUndefined(TelegramIDToSearch)

        const EESTECDataBase = GlobalModule.DataBase.PostgreSQL.DataBases.EESTEC
        const EESTECUsersTable = EESTECDataBase.Tables.Users

        const EESTECUserMatchConditions: Array<string> = []
        if (IsIDToSearchExist) EESTECUserMatchConditions.push(EESTECUsersTable.Condition.Single.EqualTo(`id`, IDToSearch))
        if (IsFirstNameToSearchExist) EESTECUserMatchConditions.push(EESTECUsersTable.Condition.Single.EqualTo(`first_name`, FirstNameToSearch))
        if (IsLastNameToSearchExist) EESTECUserMatchConditions.push(EESTECUsersTable.Condition.Single.EqualTo(`last_name`, LastNameToSearch))
        if (IsPhoneNumberToSearchExist) EESTECUserMatchConditions.push(EESTECUsersTable.Condition.Single.EqualTo(`phone_number`, PhoneNumberToSearch))
        if (IsTelegramIDToSearchExist) EESTECUserMatchConditions.push(EESTECUsersTable.Condition.Single.EqualTo(`telegram_id`, TelegramIDToSearch))

        const EESTECUserMatchCondition = EESTECUsersTable.Condition.Multiple.Every(...EESTECUserMatchConditions)

        const MatchedEESTECUsers = await UserService.Get(searchParameters)
        Validator.Strict(MatchedEESTECUsers, new Validator().Default.Array().Required().Of(EESTECUserOutputValidator).Length(1))

        const NewEESTECUserSetters: Array<string> = []
        NewEESTECUserSetters.push(EESTECUsersTable.ValueSetter.Single(`id`, newParameters.id))
        NewEESTECUserSetters.push(EESTECUsersTable.ValueSetter.Single(`first_name`, newParameters.first_name))
        NewEESTECUserSetters.push(EESTECUsersTable.ValueSetter.Single(`last_name`, newParameters.last_name))
        NewEESTECUserSetters.push(EESTECUsersTable.ValueSetter.Single(`phone_number`, newParameters.phone_number))
        NewEESTECUserSetters.push(EESTECUsersTable.ValueSetter.Single(`telegram_id`, newParameters.telegram_id))

        const NewEESTECUserSetter = EESTECUsersTable.ValueSetter.Multiple(...NewEESTECUserSetters)

        const [UpdatedEESTECUser] = await EESTECUsersTable.Update(NewEESTECUserSetter, EESTECUserMatchCondition)

        return UpdatedEESTECUser
    }

    // TODO: JSDoc
	public static async Delete(searchParameters: EESTECUserSearch): Promise<EESTECUserOutput> {
        const Validator = ServerCore.Engine.Module.Classes.Validator
        Validator.Strict(searchParameters, EESTECUserSearchValidator)

        const IDToSearch = searchParameters.id
        const IsIDToSearchExist = !Validator.TypeGuard.Default.IsUndefined(IDToSearch)
        const FirstNameToSearch = searchParameters.first_name
        const IsFirstNameToSearchExist = !Validator.TypeGuard.Default.IsUndefined(FirstNameToSearch)
        const LastNameToSearch = searchParameters.last_name
        const IsLastNameToSearchExist = !Validator.TypeGuard.Default.IsUndefined(LastNameToSearch)
        const PhoneNumberToSearch = searchParameters.phone_number
        const IsPhoneNumberToSearchExist = !Validator.TypeGuard.Default.IsUndefined(PhoneNumberToSearch)
        const TelegramIDToSearch = searchParameters.telegram_id
        const IsTelegramIDToSearchExist = !Validator.TypeGuard.Default.IsUndefined(TelegramIDToSearch)

        const EESTECDataBase = GlobalModule.DataBase.PostgreSQL.DataBases.EESTEC
        const EESTECUsersTable = EESTECDataBase.Tables.Users

        const EESTECUserMatchConditions: Array<string> = []
        if (IsIDToSearchExist) EESTECUserMatchConditions.push(EESTECUsersTable.Condition.Single.EqualTo(`id`, IDToSearch))
        if (IsFirstNameToSearchExist) EESTECUserMatchConditions.push(EESTECUsersTable.Condition.Single.EqualTo(`first_name`, FirstNameToSearch))
        if (IsLastNameToSearchExist) EESTECUserMatchConditions.push(EESTECUsersTable.Condition.Single.EqualTo(`last_name`, LastNameToSearch))
        if (IsPhoneNumberToSearchExist) EESTECUserMatchConditions.push(EESTECUsersTable.Condition.Single.EqualTo(`phone_number`, PhoneNumberToSearch))
        if (IsTelegramIDToSearchExist) EESTECUserMatchConditions.push(EESTECUsersTable.Condition.Single.EqualTo(`telegram_id`, TelegramIDToSearch))

        const EESTECUserMatchCondition = EESTECUsersTable.Condition.Multiple.Every(...EESTECUserMatchConditions)

        const MatchedEESTECUsers = await UserService.Get(searchParameters)
        Validator.Strict(MatchedEESTECUsers, new Validator().Default.Array().Required().Of(EESTECUserOutputValidator).Length(1))

        const [DeletedEESTECUser] = await EESTECUsersTable.Delete(EESTECUserMatchCondition)

        return DeletedEESTECUser
    }
}