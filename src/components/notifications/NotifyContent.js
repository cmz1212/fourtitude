import React from "react";

const NotifyContent = ({ notificationID, curr, p1 }) => {
  let display_msg = "";
  if (notificationID === "fire") {
    display_msg = "Fire!\nTiles around you are removed!";
  } else if (notificationID === "thunder") {
    display_msg = "Thunder!\nTiles in same column are removed!";
  } else if (notificationID === "ice") {
    display_msg = "Ice!\nSpaces around you will be frozen!";
  } else if (notificationID === "growth") {
    display_msg = "Growth!\nYou gain a new tile!";
  } else if (notificationID === "win") {
    display_msg = (curr === p1 ? "Player 1" : "Player 2") + " Wins!";
  } else if (notificationID === "draw") {
    display_msg = "It's a draw!";
  }

  return (
    <div className="NotifyContent">
      <center>
        <img
          src={`%PUBLIC_URL%/images/${notificationID}.gif`}
          alt={notificationID}
          style={{ width: "300px", height: "300px" }}
        />
      </center>

      <p id="Notify_Text">{display_msg}</p>
    </div>
  );
};

export default NotifyContent;
