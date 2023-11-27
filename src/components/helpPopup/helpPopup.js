import React, { useState, useEffect } from "react";
import qm from "../../img/question.png";
import fire from "../../img/fire_help.png";
import thunder from "../../img/thunder_help.png";
import ice from "../../img/ice_help.png";
import growth from "../../img/growth_help.png";

export default function HelpPopup () {
  const [toggleHelp, setToggleHelp] = useState(false);

  const displayBtn = () => {
    setToggleHelp(!toggleHelp);
  }

  const displayHelp = () => {
    document.getElementById("heading").style.display = "block";
    document.getElementById("description").style.display = "block";
    document.getElementById("helpBody").style.height = `850px`;
    document.getElementById("helpTitle").style.width = `470px`;
  };

  const hideHelp = () => {
    document.getElementById("helpTitle").style.width = `0px`;
    document.getElementById("heading").style.display = "none";
    document.getElementById("helpBody").style.height = `0px`;
    document.getElementById("description").style.display = "none";
  };

  useEffect(() => {
    if (toggleHelp) {
      displayHelp();
    } else {
      hideHelp();
    }
  }, [toggleHelp]);

  return (
    <div className="help-container">
      <button className="btn-help" id="btnHelp" onClick={displayBtn}>
        ?
      </button>
      <div className="help-title" id="helpTitle">
        <h2 id="heading">Help</h2>
        <div className="help-body" id="helpBody">
          <p id="description">
            When a tile is dropped onto{" "}
            <img src={qm} alt="question mark" width="25px" height="25px" />{" "}
            spaces, the following special effects may be triggered: <br />
            <br />
            Fire: Tiles right next to the played tile and immediately below are removed!
            <br />
            <img className="help-pic" src={fire} width="300px" height="auto" alt="help of fire effect"/>
            {Array(2).fill(<br />)}
            Thunder: All tiles in the same column and below the played tile are removed!
            <br />
            <img className="help-pic" src={thunder} width="200px" height="auto" alt="help of thunder effect"/>
            {Array(2).fill(<br />)}
            Ice: Icy blockers added to empty spaces above and beside the played tile!
            <br />
            <img className="help-pic" src={ice} width="300px" height="auto" alt="help of ice effect"/>
            {Array(2).fill(<br />)}
            Growth: Spawn a random tile in one of the empty spaces adjacent to played tile!
            <br />
            <img className="help-pic" src={growth} width="300px" height="auto" alt="help of growth effect"
            />
            {Array(2).fill(<br />)}
            Click on ? again to hide this panel.
          </p>
        </div>
      </div>
    </div>
  );
};