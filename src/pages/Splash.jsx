import React, { useState, useEffect } from "react";
import { FaFire, FaCodeBranch } from "react-icons/fa";

import "./styles/Splash.css";

const { ipcRenderer } = window.require("electron");

const $ = (el) => document.querySelector(el);
const requestUpdate = () => ipcRenderer.send("toMain-Update");

export default () => {
  const [version, setVersion] = useState("");
  const [update, setUpdate] = useState("CHECKING ..");

  useEffect(() => {
    ipcRenderer.send("toMain-Splash");

    ipcRenderer.on("fromMain-Version", (event, version) => setVersion(version));

    ipcRenderer.on("fromMain-FetchUpdate", (event, data) => {
      let Button = $("#Update-Button"),
        State = $("#Update-State"),
        Changelog = $("#Changelog"),
        Notice = $("#Update-Notice");

      if (!Button || !State || !Changelog || !Notice) return;

      Notice.innerHTML = data.notice;

      if (data.failed) {
        Button.style.display = "none";
        State.style.width = "0%";
      } else {
        setUpdate(`INSTALL ${data.version}`);
        Button.style.display = "block";
      }

      if (data.changelog) {
        Changelog.innerHTML = data.changelog;
      }
    });

    ipcRenderer.on("fromMain-Update", (event, data) => {
      let Button = $("#Update-Button"),
        State = $("#Update-State"),
        Notice = $("#Update-Notice");

      if (!Button || !State || !Notice) return;

      switch (data.state) {
        case "starting":
          State.style.width = "0%";
          Button.style.display = "none";
          Notice.innerHTML = data.notice;
          break;
        case "downloading":
          Notice.innerHTML = data.notice;
          State.style.width = data.percent * 100 + "%";

          Button.style.display = "block";
          Button.style.animation = "none";
          Button.style.backgroundColor = "transparent";
          Button.innerHTML = Math.round(data.percent * 100) + " %";
          break;
        case "installing":
          Notice.innerHTML = data.notice;
          break;
        default:
          Notice.innerHTML = "update is being halted, one moment.";
          break;
      }
    });

    return;
  }, []);

  return (
    <div>
      <div className="Splash-Changelog">
        <span>
          <FaFire /> NEW changes
        </span>
        <span id="Version">
          <FaCodeBranch /> {version ? version : "~.~.~"}
        </span>

        <div>
          <p id="Changelog"></p>
        </div>
      </div>

      <div className="Splash-Update">
        <div className="Splash-Update-Progress">
          <p id="Update-Button" onClick={requestUpdate}>
            <FaCodeBranch /> {update}
          </p>
          <div id="Update-State"></div>
        </div>
        <div className="Splash-Update-Notice">
          <p id="Update-Notice">seeking updates, let's see what's new.</p>
        </div>
      </div>
    </div>
  );
};
