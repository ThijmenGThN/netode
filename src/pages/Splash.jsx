import React, { useState } from "react"
import { FaFire, FaCodeBranch } from "react-icons/fa"

import "./styles/Splash.css"

const { ipcRenderer } = window.require("electron")
ipcRenderer.send("toMain-Version")

export default () => {
    const [version, setVersion] = useState("~.~.~")
    ipcRenderer.on("fromMain-Version", (event, arg) => setVersion(arg))

    return (
        <div>
            <div className="Splash-Changelog">
                <span>
                    <FaFire /> NEW UPDATE
                </span>
                <span id="Version">
                    <FaCodeBranch /> {version}
                </span>

                <div>
                    <p id="Changelog">
                        Added Features:
                        <br /> - Demo Feature 1
                        <br /> - Demo Feature 2
                        <br />
                        <br />
                        Bugs Fixed:
                        <br /> - Error 1
                        <br /> - Glitch 2
                        <br /> - Bug 3
                        <br />
                        Added Features:
                        <br /> - Demo Feature 1
                        <br /> - Demo Feature 2
                        <br />
                        <br />
                        Bugs Fixed:
                        <br /> - Error 1
                        <br /> - Glitch 2
                        <br /> - Bug 3
                    </p>
                </div>
            </div>

            <div className="Splash-Update">
                <label id="Splash-Update-Label">Updater</label>
                <progress
                    id="Splash-Update-State"
                    max="100"
                    value="20"
                ></progress>
            </div>
        </div>
    )
}
