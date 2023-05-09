import React from "react";

const Popup = ({
  Player1Wins,
  Player2Wins,
  OpensVertical,
  OpensHorizontal,
  OpensDiagonals,
  p1,p2
}) => {
  let stat1, stat2;
  if (p1 === 1) {
    stat1 = "Red-Stats";
  } else if (p1 === 2) {
    stat1 = "Yellow-Stats";
  } else if (p1 === 5) {
    stat1 = "Green-Stats";
  }
  else if (p1 === 6) {
    stat1 = "Grey-Stats";
  }
  else if (p1 === 7) {
    stat1 = "Purple-Stats";
  }
  else if (p1 === 8) {
    stat1 = "Brown-Stats";
  }
  if (p2 === 1) {
    stat2 = "Red-Stats";
  } else if (p2 === 2) {
    stat2 = "Yellow-Stats";
  } else if (p2 === 5) {
    stat2 = "Green-Stats";
  }
  else if (p2 === 6) {
    stat2 = "Grey-Stats";
  }
  else if (p2 === 7) {
    stat2 = "Purple-Stats";
  }
  else if (p2 === 8) {
    stat2 = "Brown-Stats";
  }
  return (
    <div className="popup">
      <p id={stat1}>Player 1 has won {Player1Wins} games.</p>
      <span>Current Game: </span>
      <ul>
        <li key={0}>Number of Vertical Openings: {OpensVertical[0]}</li>
        <li key={1}>Number of Horizontal Openings: {OpensHorizontal[0]}</li>
        <li key={2}>Number of Diagonal Openings: {OpensDiagonals[0]}</li>
      </ul>
      <br />
      <p id={stat2}>Player 2 has won {Player2Wins} games.</p>
      <span>Current Game: </span>
      <ul>
        <li key={0}>Number of Vertical Openings: {OpensVertical[1]}</li>
        <li key={1}>Number of Horizontal Openings: {OpensHorizontal[1]}</li>
        <li key={2}>Number of Diagonal Openings: {OpensDiagonals[1]}</li>
      </ul>
    </div>
  );
};
export default Popup;
