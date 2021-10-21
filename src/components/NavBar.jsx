import React from "react"

import "./styles/NavBar.css"

export default () => {
    return (
        <div className="NavBar">
            <button className="NavBar-Active">A</button>
            <button>B</button>
            <button>C</button>
            <button>D</button>
            <button>E</button>
            <div id="NavBar-Active"></div>
        </div>
    )
}
