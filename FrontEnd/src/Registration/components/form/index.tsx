import React from 'react'

import * as Elements from './elements/__elements'

function Element(): JSX.Element {
    type IFirstName = string | undefined
    const InitialFirstName: IFirstName = undefined
    const [FirstName, SetFirstName] = React.useState<IFirstName>(InitialFirstName)
    const [IsFirstNameValid, SetFirstNameValid] = React.useState(false)
    const UpdateFirstName = (_: IFirstName): boolean => {
        SetFirstName(_)

        SetFirstNameValid(true)

        UpdateSubmitAvaildable()
        UpdateCancelAvaildable()

        return IsFirstNameValid
    }

    type ILastName = string | undefined
    const InitialLastName: ILastName = undefined
    const [LastName, SetLastName] = React.useState<ILastName>(InitialLastName)
    const [IsLastNameValid, SetLastNameValid] = React.useState(false)
    const UpdateLastName = (_: ILastName): boolean => {
        SetLastName(_)

        SetLastNameValid(false)

        UpdateSubmitAvaildable()
        UpdateCancelAvaildable()

        return IsLastNameValid
    }

    type IPhoneNumber = string | undefined
    const InitialPhoneNumber: IPhoneNumber = `+71234567890`
    const [PhoneNumber, SetPhoneNumber] = React.useState<IPhoneNumber>(InitialPhoneNumber)
    const [IsPhoneNumberValid, SetPhoneNumberValid] = React.useState(false)
    const UpdatePhoneNumber = (_: IPhoneNumber): boolean => {
        SetPhoneNumber(_)

        SetPhoneNumberValid(true)

        UpdateSubmitAvaildable()
        UpdateCancelAvaildable()

        return IsPhoneNumberValid
    }

    type IEmail = string | undefined
    const InitialEmail: IEmail = undefined
    const [Email, SetEmail] = React.useState<IEmail>(InitialEmail)
    const [IsEmailValid, SetEmailValid] = React.useState(false)
    const UpdateEmail = (_: IEmail): boolean => {
        SetEmail(_)

        SetEmailValid(false)

        UpdateSubmitAvaildable()
        UpdateCancelAvaildable()

        return IsEmailValid
    }


    const [IsSubmitAvaildable, SetSubmitAvaildable] = React.useState(false)
    const UpdateSubmitAvaildable = (): void => {
        const IsResultFirstNameValid = IsFirstNameValid
        const IsResultLastNameValid = IsLastNameValid

        const IsResultPhoneNumberValid = IsPhoneNumberValid

        const IsResultEmailValid = IsEmailValid

        const IsEverythingValid = IsResultFirstNameValid && IsResultLastNameValid && IsResultPhoneNumberValid && IsResultEmailValid

        SetSubmitAvaildable(IsEverythingValid)
    }

    const [IsCancelAvaildable, SetCancelAvaildable] = React.useState(false)
    const UpdateCancelAvaildable = (): void => {
        SetCancelAvaildable(true)
    }

    const SubmitForm = () => {
        const ResultFirstName = FirstName
        const IsResultFirstNameValid = IsFirstNameValid

        const ResultLastName = LastName
        const IsResultLastNameValid = IsLastNameValid

        const ResultPhoneNumber = PhoneNumber
        const IsResultPhoneNumberValid = IsPhoneNumberValid

        const ResultEmail = Email
        const IsResultEmailValid = IsEmailValid

        const IsEverythingValid = IsResultFirstNameValid && IsResultLastNameValid && IsResultPhoneNumberValid && IsResultEmailValid

        console.log(`FirstName: `, ResultFirstName, IsResultFirstNameValid)
        console.log(`LastName: `, ResultLastName, IsResultLastNameValid)
        console.log(`PhoneNumber: `, ResultPhoneNumber, IsResultPhoneNumberValid)
        console.log(`Email: `, ResultEmail, IsResultEmailValid)
        console.log(IsEverythingValid)
    }

    const CancelForm = () => {
        
    }

    const Element: JSX.Element = (
        <div className={`form`}>
            <div className={`content`}>
                <div className={`input`}>
                    <div className={`content`}>
                        <Elements.Input.Text
                        Title={`Имя`}
                        Settings={{ IsRequired: true, IsDisabled: false }}
                        Prompt={`Введите свое имя`}
                        Value={{
                            Initial: FirstName,
                            OnChange: UpdateFirstName
                        }}
                        />
                        <Elements.Input.Text
                        Title={`Фамилия`}
                        Settings={{ IsRequired: true, IsDisabled: false }}
                        Prompt={`Введите свою фамилию`}
                        Value={{
                            Initial: LastName,
                            OnChange: UpdateLastName
                        }}
                        />
                        <Elements.Input.Text
                        Title={`Телефон`}
                        Settings={{ IsRequired: true, IsDisabled: true }}
                        Prompt={`Введите свой телефон`}
                        Value={{
                            Initial: PhoneNumber,
                            OnChange: UpdatePhoneNumber
                        }}
                        />
                        <Elements.Input.Text
                        Title={`Электронная почта`}
                        Settings={{ IsRequired: true, IsDisabled: false }}
                        Prompt={`Введите свою электронную почту`}
                        Value={{
                            Initial: Email,
                            OnChange: UpdateEmail
                        }}
                        />
                    </div>
                    <div className={`background`}>
                        
                    </div>
                </div>
                <div className={`submit`} is-disabled={`${!IsSubmitAvaildable}`}>
                    <div className={`content`}>
                        <button onClick={SubmitForm}><span>Отправить</span></button>
                    </div>
                    <div className={`background`}>
                        
                    </div>
                </div>
                <div className={`cancel`} is-disabled={`${!IsCancelAvaildable}`}>
                    <div className={`content`}>
                        <button onClick={CancelForm}><span>Отмена</span></button>
                    </div>
                    <div className={`background`}>
                        
                    </div>
                </div>
            </div>
            <div className={`background`}>
                
            </div>
        </div>
    )

    return Element
}

export default Element