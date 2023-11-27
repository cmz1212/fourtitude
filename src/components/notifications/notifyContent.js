import React from "react";
import fire_gif from "../../img/fire.gif";
import thunder_gif from "../../img/thunder.gif";
import ice_gif from "../../img/ice.gif";
import growth_gif from "../../img/growth.gif";
import win_gif from "../../img/win.gif";
import draw_gif from "../../img/draw.gif";

export default function NotifyContent ({ notificationID, curr, p1 }) {
  let display_msg = "";
  let img_option = null;

  if (notificationID === "fire") {
    display_msg = "Fire!\nTiles around you are removed!";
    img_option = fire_gif;
  } else if (notificationID === "thunder") {
    display_msg = "Thunder!\nTiles in same column are removed!";
    img_option = thunder_gif;
  } else if (notificationID === "ice") {
    display_msg = "Ice!\nSpaces around you will be frozen!";
    img_option = ice_gif;
  } else if (notificationID === "growth") {
    display_msg = "Growth!\nYou gain a new tile!";
    img_option = growth_gif;
  } else if (notificationID === "win") {
    display_msg = (curr === p1 ? "Player 1" : "Player 2") + " Wins!";
    img_option = win_gif;
  } else if (notificationID === "draw") {
    display_msg = "It's a draw!";
    img_option = draw_gif;
  }

  return (
    <div className="NotifyContent">
      <center>
        <img src={img_option} alt={notificationID} style={{ width: "300px", height: "300px" }} />{" "}
      </center>
      {Array(6).fill(<br />)}
      <p id="Notify_Text">{display_msg}</p>
    </div>
  );
}
