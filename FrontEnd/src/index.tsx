import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import { default as Registration } from './Registration/index'

const RootElement = ReactDOM.createRoot(
    document.getElementById('main') as HTMLElement
)

RootElement.render(
    <React.StrictMode>
        <Registration />
    </React.StrictMode>
)