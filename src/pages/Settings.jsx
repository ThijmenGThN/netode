import React, { useState } from "react";
import { FaAngleRight } from "react-icons/fa";

import "./styles/Settings.css";

import Personalization from "./settings/Personalization";
import Preferences from "./settings/Preferences";

export default () => {
  const Item = (props) => {
    const [isVisible, setVisibility] = useState(false);

    return (
      <>
        <div
          className="Settings-Items-Header"
          onClick={() => setVisibility(!isVisible)}
          style={
            isVisible
              ? {
                  marginTop: "5px",
                  backgroundColor: "#1a1f254b",
                  borderRadius: "8px 8px 0 0",
                }
              : null
          }
        >
          <FaAngleRight
            className="Settings-Icon"
            style={isVisible ? { transform: "rotate(90deg)" } : null}
          />
          <h1>{props.title}</h1>
          <p>{props.description}</p>
        </div>
        {isVisible ? (
          <div className="Settings-Items-Content">
            <props.component />
          </div>
        ) : null}
      </>
    );
  };

  return (
    <div className="Settings">
      <p className="Settings-Header">Settings</p>
      <div className="Settings-Items">
        <ul>
          <li>
            <Item
              title="Personalization"
              description="Enjoy a new fresh tint, tweak it up .!"
              component={Personalization}
            />
          </li>
          <li>
            <Item
              title="Preferences"
              description="Revision how netode behaves .."
              component={Preferences}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};
