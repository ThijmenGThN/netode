import React from "react"
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Link,
    Switch,
} from "react-router-dom"
import {
    FaCouch,
    FaUserFriends,
    FaSpa,
    FaVials,
    FaStream,
} from "react-icons/fa"

import Lounge from "../pages/Lounge"
import Social from "../pages/Social"
import Splash from "../pages/Splash"
import Modules from "../pages/Modules"
import Settings from "../pages/Settings"

import "./styles/NavBar.css"

const $ = (el) => document.querySelector(el)

let at = 2
const go = (to) => {
    $("#NavBar-Active").style.left = 19.5 * to + "%"

    $("#NavBar-Item" + at).style.backgroundColor = "#1a1f2580"
    $("#NavBar-Item" + at).style.transform = "scale(1, 1)"

    $("#NavBar-Item" + to).style.backgroundColor = "#1a1f25bf"
    $("#NavBar-Item" + to).style.transform = "scale(0.95, 0.9)"

    at = to
}

export default () => {
    return (
        <Router>
            <div className="NavBar">
                <Link to="/lounge">
                    <button
                        onClick={() => (at !== 0 ? go(0) : null)}
                        id="NavBar-Item0"
                    >
                        <FaCouch />
                    </button>
                </Link>

                <Link to="/social">
                    <button
                        onClick={() => (at !== 1 ? go(1) : null)}
                        id="NavBar-Item1"
                    >
                        <FaUserFriends />
                    </button>
                </Link>

                <Link to="/splash">
                    <button
                        style={{
                            backgroundColor: "#1a1f25bf",
                            transform: "scale(0.95, 0.9)",
                        }}
                        onClick={() => (at !== 2 ? go(2) : null)}
                        id="NavBar-Item2"
                    >
                        <FaSpa />
                    </button>
                </Link>

                <Link to="/modules">
                    <button
                        onClick={() => (at !== 3 ? go(3) : null)}
                        id="NavBar-Item3"
                    >
                        <FaVials />
                    </button>
                </Link>

                <Link to="/settings">
                    <button
                        onClick={() => (at !== 4 ? go(4) : null)}
                        id="NavBar-Item4"
                    >
                        <FaStream />
                    </button>
                </Link>

                <div id="NavBar-Active"></div>
            </div>

            <div id="Page">
                <Switch>
                    <Route path="/lounge">
                        <Lounge />
                    </Route>
                    <Route path="/social">
                        <Social />
                    </Route>
                    <Route path="/splash">
                        <Splash />
                    </Route>
                    <Route path="/modules">
                        <Modules />
                    </Route>
                    <Route path="/settings">
                        <Settings />
                    </Route>

                    <Route render={() => <Redirect to="/splash" />} />
                </Switch>
            </div>
        </Router>
    )
}
