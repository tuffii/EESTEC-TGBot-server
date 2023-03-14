import React from 'react'

import './styles.css'

import * as Components from './components/__components'

function Element(): JSX.Element {
    const Element: JSX.Element = (
        <div className={`registration`}>
            <div className={`content`}>
                <div className={`header`}>
                    <div className={`content`}>
                        
                    </div>
                    <div className={`background`}>
                        <img src={`./assets/Logo/eestec.png`} alt={`EESTEC Logo`} />
                    </div>
                </div>
                <div className={`main`}>
                    <div className={`content`}>
                        <Components.Form />
                    </div>
                    <div className={`background`}>
                        
                    </div>
                </div>
            </div>
            <div className={`background`}>
                <img src={`./assets/Background/gradient_3.jpg`} alt={`Background`} />
            </div>
        </div>
    )

    return Element
}

export default Element