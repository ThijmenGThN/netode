import React from "react";
import { FaAngleRight } from "react-icons/fa";

// import Themes from "./settings/Themes";

import "./styles/Settings.css";

export default () => {
  return (
    <div className="Settings">
      <p className="Settings-Header">Settings</p>
      <div className="Settings-Items">
        <div>
          <FaAngleRight className="Settings-Icon" />
          <h1>Personalization</h1>
          <p>Colors, Themes and more ..</p>
        </div>
        <div>
          <FaAngleRight className="Settings-Icon" />
          <h1>My Data</h1>
          <p>Your Stored Data and more ..</p>
        </div>
        <div>
          <FaAngleRight className="Settings-Icon" />
          <h1>Preferences</h1>
          <p>User Based Settings and more ..</p>
        </div>
      </div>
      <p style={{ textAlign: "center" }}>.. work in progress ..</p>
      <p style={{ textAlign: "center" }}>a lot will be changed</p>
    </div>
  );
};
