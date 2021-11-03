import React, { useState, useEffect } from "react";
import { FaTimesCircle, FaCheckCircle } from "react-icons/fa";

import "./styles/Personalization.css";

const $ = (el) => document.querySelector(el);

export default () => {
  const Checkbox = (props) => {
    const [darkNavBar, setDarkNavBar] = useState(false);

    useEffect(() => {
      if (darkNavBar) $("#Root").style.background = "#000";
      else
        $("#Root").style.background =
          "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)";
    }, [darkNavBar]);

    return (
      <div
        className="checkbox"
        onClick={() => setDarkNavBar(!darkNavBar)}
        style={{
          animation: `${
            darkNavBar ? "activate" : "deactivate"
          } 4s linear infinite`,
        }}
      >
        {darkNavBar ? <FaCheckCircle /> : <FaTimesCircle />}
        <span
          style={{
            animation: `${
              darkNavBar ? "activate" : "deactivate"
            } 4s linear infinite`,
          }}
        >
          {props?.text ? props.text : "Unhooked"}
        </span>
      </div>
    );
  };

  return (
    <div className="Settings-Personalization">
      <h1>Palette</h1>
      <div>~ soon™</div>

      <h1>Navigation</h1>
      <div>
        <Checkbox text="Darken" />
      </div>
    </div>
  );
};
