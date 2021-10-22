import React from "react";

import "./styles/NavBar.css";

const $ = (el) => document.querySelector(el);

let at = 2;
const go = (to) => {
  $("#NavBar-Active").style.left = 19.5 * to + "%";

  $("#NavBar-Item" + at).style.backgroundColor = "#1a1f2580";
  $("#NavBar-Item" + to).style.backgroundColor = "#1a1f25bf";

  at = to;
};

export default () => {
  return (
    <div className="NavBar">
      <button onClick={() => (at !== 0 ? go(0) : null)} id="NavBar-Item0">
        A
      </button>
      <button onClick={() => (at !== 1 ? go(1) : null)} id="NavBar-Item1">
        B
      </button>
      <button
        style={{ backgroundColor: "#1a1f25bf" }}
        onClick={() => (at !== 2 ? go(2) : null)}
        id="NavBar-Item2"
      >
        C
      </button>
      <button onClick={() => (at !== 3 ? go(3) : null)} id="NavBar-Item3">
        D
      </button>
      <button onClick={() => (at !== 4 ? go(4) : null)} id="NavBar-Item4">
        E
      </button>
      <div id="NavBar-Active"></div>
    </div>
  );
};
