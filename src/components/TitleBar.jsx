import React from "react"

import "./styles/TitleBar.css"

const { ipcRenderer } = window.require("electron")

const exit = () => ipcRenderer.send("exit")
const minimize = () => ipcRenderer.send("minimize")

export default () => {
    return (
        <div className="TitleBar">
            <p className="TitleBar-Title">netode</p>

            <div className="TitleBar-Controls">
                <button
                    onClick={minimize}
                    style={{ backgroundColor: "#c3c3c380" }}
                ></button>
                <button
                    onClick={exit}
                    style={{ backgroundColor: "#d73250e6", width: "22.5px" }}
                ></button>
            </div>
        </div>
    )
}
