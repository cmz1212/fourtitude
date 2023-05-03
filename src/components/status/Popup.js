import React from "react";

const Popup = ({
  Player1Wins,
  Player2Wins,
  OpensVertical,
  OpensHorizontal,
  OpensDiagonals,
}) => {
  return (
    <div className="popup">
      <p id="Red-Stats">Red has won {Player1Wins} games.</p>
      <ul>
        <li key={0}>Number of Vertical Openings: {OpensVertical[0]}</li>
        <li key={1}>Number of Horizontal Openings: {OpensHorizontal[0]}</li>
        <li key={2}>Number of Diagonal Openings: {OpensDiagonals[0]}</li>
      </ul>
      <br />
      <p id="Yellow-Stats">Yellow has won {Player2Wins} games.</p>
      <ul>
        <li key={0}>Number of Vertical Openings: {OpensVertical[1]}</li>
        <li key={1}>Number of Horizontal Openings: {OpensHorizontal[1]}</li>
        <li key={2}>Number of Diagonal Openings: {OpensDiagonals[1]}</li>
      </ul>
    </div>
  );
};
export default Popup;
