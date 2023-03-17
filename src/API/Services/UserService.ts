import * as CoreAPI from '@var3n1k/core'

import * as GlobalModule from '../../module.js'

import * as PostgreSQLEESTECTables from '../../DataBase/PostgreSQL/DataBase/EESTEC/Tables/__tables.js'

type EESTECUser = PostgreSQLEESTECTables.EESTECUsers.Output
type EESTECUserCreation = PostgreSQLEESTECTables.EESTECUsers.Input

interface ValidationResult {
    readonly Status: boolean
    readonly Error: {
        readonly Message: string
    }
}

export default class UserService {
    // TODO: JSDoc
	public static Validate(validationCategory: string, validationType: string, validationParameter: string): ValidationResult {
        const Validator = CoreAPI.Engine.Module.Classes.Validator

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
                LastName: `LAST_NAME`,
                PhoneNumber: `PHONE_NUMBER`,
                EmailAdress: `EMAIL_ADRESS`,
            } as const

            Validator.Strict(validationType, new Validator().Default.String().Required().MinLength(1).In([
                ValidationType.FirstName,
                ValidationType.LastName,
                ValidationType.PhoneNumber,
                ValidationType.EmailAdress,
            ]))

            if (validationType === ValidationType.FirstName) {
                const EmptyValueValidation = Validator.Soft(validationParameter, new Validator().Default.String().Required().MinLength(1))
                const IsValueEmpty = !EmptyValueValidation.Status
                const EmptyValueErrorMessage = `Имя не может быть пустым`

                const ToUpperCase = CoreAPI.Engine.Module.Functions.Parameter.Type.Manager.Default.String.Style.Modify.Case.Size.ToUpperCase

                const ENAlphabet = CoreAPI.Engine.Module.Dataset.Dictionary.Language.Alphabet[CoreAPI.Engine.Module.Dataset.Dictionary.Language.Code.English]
                const RUAlphabet = CoreAPI.Engine.Module.Dataset.Dictionary.Language.Alphabet[CoreAPI.Engine.Module.Dataset.Dictionary.Language.Code.Russian]
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
            else if (validationType === ValidationType.LastName) {
                const EmptyValueValidation = Validator.Soft(validationParameter, new Validator().Default.String().Required().MinLength(1))
                const IsValueEmpty = !EmptyValueValidation.Status
                const EmptyValueErrorMessage = `Фамилия не может быть пустой`

                const ToUpperCase = CoreAPI.Engine.Module.Functions.Parameter.Type.Manager.Default.String.Style.Modify.Case.Size.ToUpperCase

                const ENAlphabet = CoreAPI.Engine.Module.Dataset.Dictionary.Language.Alphabet[CoreAPI.Engine.Module.Dataset.Dictionary.Language.Code.English]
                const RUAlphabet = CoreAPI.Engine.Module.Dataset.Dictionary.Language.Alphabet[CoreAPI.Engine.Module.Dataset.Dictionary.Language.Code.Russian]
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
            else if (validationType === ValidationType.PhoneNumber) {
                const EmptyValueValidation = Validator.Soft(validationParameter, new Validator().Default.String().Required().MinLength(1))
                const IsValueEmpty = !EmptyValueValidation.Status
                const EmptyValueErrorMessage = `Номер телефона не может быть пустым`

                const Numbers = CoreAPI.Engine.Module.Dataset.Dictionary.Symbol.Collection.Numbers
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
            else if (validationType === ValidationType.EmailAdress) {
                const EmptyValueValidation = Validator.Soft(validationParameter, new Validator().Default.String().Required().MinLength(1))
                const IsValueEmpty = !EmptyValueValidation.Status
                const EmptyValueErrorMessage = `Адрес электронной почты не может быть пустым`

                const ToUpperCase = CoreAPI.Engine.Module.Functions.Parameter.Type.Manager.Default.String.Style.Modify.Case.Size.ToUpperCase

                const ENAlphabet = CoreAPI.Engine.Module.Dataset.Dictionary.Language.Alphabet[CoreAPI.Engine.Module.Dataset.Dictionary.Language.Code.English]
                const LowerCaseAlphabets = [...ENAlphabet]
                const UpperCaseAlphabets = LowerCaseAlphabets.map((_el, _ind, _arr) => ToUpperCase(_el, Array.from(Array(_el.length), (__el, __ind) => __ind)))
                const EmailAdressSymbols = [...LowerCaseAlphabets, ...UpperCaseAlphabets, `@`, `.`]

                const FullValueValidation = Validator.Soft(validationParameter, new Validator().Default.String().Required().MinLength(1)
                .Of(EmailAdressSymbols).StartsWith([...ENAlphabet]))
                const IsValueValid = FullValueValidation.Status
                const InvalidValueErrorMessage = `Адрес электронной почты введен неверно`

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
	public static async Get(
        searchParameters: {
            first_name: EESTECUser['first_name'] | undefined,
            last_name: EESTECUser['last_name'] | undefined,
            phone_number: EESTECUser['phone_number'] | undefined,
            telegram_id: EESTECUser['telegram_id'] | undefined,
        },
    ): Promise<Array<EESTECUser>> {
        const Validator = CoreAPI.Engine.Module.Classes.Validator
        Validator.Strict(searchParameters, new Validator().Default.Object().Required().Exact({
            first_name: new Validator().Default.String().MinLength(1),
            last_name: new Validator().Default.String().MinLength(1),
            phone_number: new Validator().Default.String().MinLength(1),
            telegram_id: new Validator().Default.String().MinLength(1),
        }))

        const FirstNameToSearchFor = searchParameters.first_name
        const IsFirstNameDefined = !Validator.TypeGuard.Default.IsUndefined(FirstNameToSearchFor)
        const LastNameToSearchFor = searchParameters.last_name
        const IsLastNameDefined = !Validator.TypeGuard.Default.IsUndefined(LastNameToSearchFor)
        const PhoneNumberToSearchFor = searchParameters.phone_number
        const IsPhoneNumberDefined = !Validator.TypeGuard.Default.IsUndefined(PhoneNumberToSearchFor)
        const TelegramIDToSearchFor = searchParameters.telegram_id
        const IsTelegramIDDefined = !Validator.TypeGuard.Default.IsUndefined(TelegramIDToSearchFor)

        const EESTECDataBase = GlobalModule.DataBase.PostgreSQL.DataBases.EESTEC
        const UsersTable = EESTECDataBase.Tables.Users.EESTEC

        const UserMatchConditions: Array<string> = []
        if (IsFirstNameDefined) UserMatchConditions.push(UsersTable.Condition.Single.EqualTo(`first_name`, FirstNameToSearchFor))
        if (IsLastNameDefined) UserMatchConditions.push(UsersTable.Condition.Single.EqualTo(`last_name`, LastNameToSearchFor))
        if (IsPhoneNumberDefined) UserMatchConditions.push(UsersTable.Condition.Single.EqualTo(`phone_number`, PhoneNumberToSearchFor))
        if (IsTelegramIDDefined) UserMatchConditions.push(UsersTable.Condition.Single.EqualTo(`telegram_id`, TelegramIDToSearchFor))

        const UserMatchCondition = UsersTable.Condition.Multiple.Every(...UserMatchConditions)

        const ExistingMatchedUsers = await UsersTable.Select(undefined, UserMatchCondition, false, undefined)

        return ExistingMatchedUsers
    }

    // TODO: JSDoc
	public static async DoesExist(
        searchParameters: {
            first_name: EESTECUser['first_name'] | undefined,
            last_name: EESTECUser['last_name'] | undefined,
            phone_number: EESTECUser['phone_number'] | undefined,
            telegram_id: EESTECUser['telegram_id'] | undefined,
        },
    ): Promise<boolean> {
        const Validator = CoreAPI.Engine.Module.Classes.Validator
        Validator.Strict(searchParameters, new Validator().Default.Object().Required().Exact({
            first_name: new Validator().Default.String().MinLength(1),
            last_name: new Validator().Default.String().MinLength(1),
            phone_number: new Validator().Default.String().MinLength(1),
            telegram_id: new Validator().Default.String().MinLength(1),
        }))

        const ExistingMatchedUsers = await UserService.Get(searchParameters)
        const IsMatchedUserExist = !Validator.TypeGuard.Default.IsEmptyArray(ExistingMatchedUsers)

        return IsMatchedUserExist
    }

    // TODO: JSDoc
	public static async Create(newUser: EESTECUserCreation): Promise<EESTECUser> {
        const Validator = CoreAPI.Engine.Module.Classes.Validator
        Validator.Strict(newUser, new Validator().Default.Object().Required().Exact({
            first_name: new Validator().Default.String().Required().MinLength(1),
            last_name: new Validator().Default.String().Required().MinLength(1),
            phone_number: new Validator().Default.String().Required().MinLength(1),
            telegram_id: new Validator().Default.String().Required().MinLength(1),
        }))

        const EESTECDataBase = GlobalModule.DataBase.PostgreSQL.DataBases.EESTEC
        const UsersTable = EESTECDataBase.Tables.Users.EESTEC

        const DoesUserExist = await UserService.DoesExist(newUser)
        Validator.Strict(DoesUserExist, new Validator().Default.Boolean().Required().In([false]))

        const [NewUser] = await UsersTable.Insert(newUser)

        return NewUser
    }

    // TODO: JSDoc
	public static async Update(
        searchParameters: {
            first_name: EESTECUser['first_name'] | undefined,
            last_name: EESTECUser['last_name'] | undefined,
            phone_number: EESTECUser['phone_number'] | undefined,
            telegram_id: EESTECUser['telegram_id'] | undefined,
        },
        newParameters: EESTECUserCreation,
    ): Promise<EESTECUser> {
        const Validator = CoreAPI.Engine.Module.Classes.Validator
        Validator.Strict(searchParameters, new Validator().Default.Object().Required().Exact({
            first_name: new Validator().Default.String().MinLength(1),
            last_name: new Validator().Default.String().MinLength(1),
            phone_number: new Validator().Default.String().MinLength(1),
            telegram_id: new Validator().Default.String().MinLength(1),
        }))
        Validator.Strict(newParameters, new Validator().Default.Object().Required().Exact({
            first_name: new Validator().Default.String().Required().MinLength(1),
            last_name: new Validator().Default.String().Required().MinLength(1),
            phone_number: new Validator().Default.String().Required().MinLength(1),
            telegram_id: new Validator().Default.String().Required().MinLength(1),
        }))

        const FirstNameToSearchFor = searchParameters.first_name
        const IsFirstNameDefined = !Validator.TypeGuard.Default.IsUndefined(FirstNameToSearchFor)
        const LastNameToSearchFor = searchParameters.last_name
        const IsLastNameDefined = !Validator.TypeGuard.Default.IsUndefined(LastNameToSearchFor)
        const PhoneNumberToSearchFor = searchParameters.phone_number
        const IsPhoneNumberDefined = !Validator.TypeGuard.Default.IsUndefined(PhoneNumberToSearchFor)
        const TelegramIDToSearchFor = searchParameters.telegram_id
        const IsTelegramIDDefined = !Validator.TypeGuard.Default.IsUndefined(TelegramIDToSearchFor)

        const EESTECDataBase = GlobalModule.DataBase.PostgreSQL.DataBases.EESTEC
        const UsersTable = EESTECDataBase.Tables.Users.EESTEC

        const DoesUserExist = await UserService.DoesExist(searchParameters)
        Validator.Strict(DoesUserExist, new Validator().Default.Boolean().Required().In([true]))

        const UserMatchConditions: Array<string> = []
        if (IsFirstNameDefined) UserMatchConditions.push(UsersTable.Condition.Single.EqualTo(`first_name`, FirstNameToSearchFor))
        if (IsLastNameDefined) UserMatchConditions.push(UsersTable.Condition.Single.EqualTo(`last_name`, LastNameToSearchFor))
        if (IsPhoneNumberDefined) UserMatchConditions.push(UsersTable.Condition.Single.EqualTo(`phone_number`, PhoneNumberToSearchFor))
        if (IsTelegramIDDefined) UserMatchConditions.push(UsersTable.Condition.Single.EqualTo(`telegram_id`, TelegramIDToSearchFor))

        const UserMatchCondition = UsersTable.Condition.Multiple.Every(...UserMatchConditions)

        const NewUserSetters: Array<string> = []
        NewUserSetters.push(UsersTable.ValueSetter.Single(`first_name`, newParameters.first_name))
        NewUserSetters.push(UsersTable.ValueSetter.Single(`last_name`, newParameters.last_name))
        NewUserSetters.push(UsersTable.ValueSetter.Single(`phone_number`, newParameters.phone_number))
        NewUserSetters.push(UsersTable.ValueSetter.Single(`telegram_id`, newParameters.telegram_id))

        const NewUserSetter = UsersTable.ValueSetter.Multiple(...NewUserSetters)

        const [UpdatedUser] = await UsersTable.Update(NewUserSetter, UserMatchCondition)

        return UpdatedUser
    }

    // TODO: JSDoc
	public static async Delete(
        searchParameters: {
            first_name: EESTECUser['first_name'] | undefined,
            last_name: EESTECUser['last_name'] | undefined,
            phone_number: EESTECUser['phone_number'] | undefined,
            telegram_id: EESTECUser['telegram_id'] | undefined,
        },
    ): Promise<EESTECUser> {
        const Validator = CoreAPI.Engine.Module.Classes.Validator
        Validator.Strict(searchParameters, new Validator().Default.Object().Required().Exact({
            first_name: new Validator().Default.String().MinLength(1),
            last_name: new Validator().Default.String().MinLength(1),
            phone_number: new Validator().Default.String().MinLength(1),
            telegram_id: new Validator().Default.String().MinLength(1),
        }))

        const FirstNameToSearchFor = searchParameters.first_name
        const IsFirstNameDefined = !Validator.TypeGuard.Default.IsUndefined(FirstNameToSearchFor)
        const LastNameToSearchFor = searchParameters.last_name
        const IsLastNameDefined = !Validator.TypeGuard.Default.IsUndefined(LastNameToSearchFor)
        const PhoneNumberToSearchFor = searchParameters.phone_number
        const IsPhoneNumberDefined = !Validator.TypeGuard.Default.IsUndefined(PhoneNumberToSearchFor)
        const TelegramIDToSearchFor = searchParameters.telegram_id
        const IsTelegramIDDefined = !Validator.TypeGuard.Default.IsUndefined(TelegramIDToSearchFor)

        const EESTECDataBase = GlobalModule.DataBase.PostgreSQL.DataBases.EESTEC
        const UsersTable = EESTECDataBase.Tables.Users.EESTEC

        const DoesUserExist = await UserService.DoesExist(searchParameters)
        Validator.Strict(DoesUserExist, new Validator().Default.Boolean().Required().In([true]))

        const UserMatchConditions: Array<string> = []
        if (IsFirstNameDefined) UserMatchConditions.push(UsersTable.Condition.Single.EqualTo(`first_name`, FirstNameToSearchFor))
        if (IsLastNameDefined) UserMatchConditions.push(UsersTable.Condition.Single.EqualTo(`last_name`, LastNameToSearchFor))
        if (IsPhoneNumberDefined) UserMatchConditions.push(UsersTable.Condition.Single.EqualTo(`phone_number`, PhoneNumberToSearchFor))
        if (IsTelegramIDDefined) UserMatchConditions.push(UsersTable.Condition.Single.EqualTo(`telegram_id`, TelegramIDToSearchFor))

        const UserMatchCondition = UsersTable.Condition.Multiple.Every(...UserMatchConditions)

        const [DeletedUser] = await UsersTable.Delete(UserMatchCondition)

        return DeletedUser
    }
}