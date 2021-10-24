import React from "react"
import ReactDOM from "react-dom"

import TitleBar from "./components/TitleBar"
import NavBar from "./components/NavBar"

import "./styles/index.css"
import "./fonts/import.css"

const { ipcRenderer } = window.require("electron")
ipcRenderer.on("alert", (event, notice) => alert(notice))

ReactDOM.render(
    <React.StrictMode>
        <TitleBar />
        <NavBar />
    </React.StrictMode>,
    document.getElementById("Root")
)
