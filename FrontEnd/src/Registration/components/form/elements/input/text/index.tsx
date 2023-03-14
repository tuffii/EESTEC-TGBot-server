import React from 'react'

type TextInputValue = string | undefined
interface ITextInput {
    readonly Title: string
    readonly Settings: {
        readonly IsRequired: boolean
        readonly IsDisabled: boolean
    }
    readonly Prompt: string
    readonly Value: {
        readonly Initial: TextInputValue
        readonly OnChange: (value: TextInputValue) => boolean
    }
}

function Element(parameters: ITextInput): JSX.Element {
    const InputTitle = parameters.Title

    const IsInputRequired = parameters.Settings.IsRequired
    const IsInputDisabled = parameters.Settings.IsDisabled

    const InputPrompt = parameters.Prompt

    const InitialInputValue = parameters.Value.Initial
    const ChangeValueHandler = parameters.Value.OnChange

    const [IsInputValueInvalid, SetInputValueInvalid] = React.useState(true)
    const [IsInputValueConfirmed, SetInputValueConfirmed] = React.useState(false)

    const UpdateValue = (value: TextInputValue) => {
        const IsValudValid = ChangeValueHandler(value)

        SetInputValueInvalid(!IsValudValid)
        SetInputValueConfirmed(IsValudValid && !IsInputDisabled)
    }

    React.useEffect(() => {
        UpdateValue(InitialInputValue)
    })

    const Element: JSX.Element = (
        <div className={`field`}
        is-required={`${IsInputRequired}`}
        is-invalid={`${IsInputValueInvalid}`}
        is-confirmed={`${IsInputValueConfirmed}`}
        is-disabled={`${IsInputDisabled}`}
        >
            <div className={`name`}>
                <span>{InputTitle}</span>
            </div>
            <div className={`value`}>
                <input type={`text`}
                value={InitialInputValue}
                placeholder={`${InputPrompt}`}
                onChange={(e) => UpdateValue(e.target.value)}
                />
            </div>
        </div>
    )

    return Element
}

export default Element