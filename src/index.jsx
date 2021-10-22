import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"

import TitleBar from "./components/TitleBar"
import NavBar from "./components/NavBar"

import "./styles/index.css"
import "./fonts/import.css"

ReactDOM.render(
    <React.StrictMode>
        <TitleBar />
        <NavBar />
    </React.StrictMode>,
    document.getElementById("Root")
)
