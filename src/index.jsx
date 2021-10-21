import React from "react"
import ReactDOM from "react-dom"

import TitleBar from './components/TitleBar'
import Updater from './pages/Updater'
import NavBar from './components/NavBar'

import './styles/index.css'
import './fonts/import.css'

ReactDOM.render(
    <React.StrictMode>
        <TitleBar />
        <NavBar />
        
        <div id="page">
            <Updater />
        </div>
    </React.StrictMode>,
    document.getElementById("root")
)
