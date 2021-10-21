import React from "react"

import "./styles/TitleBar.css"

export default () => {
    return (
        <div className="TitleBar">
            <p>netode</p>

            <div className="TitleBar-Controls">
                <button style={{ backgroundColor: "#5c6066" }}></button>
                <button style={{ backgroundColor: "#cc4e4e" }}></button>
            </div>
        </div>
    )
}
