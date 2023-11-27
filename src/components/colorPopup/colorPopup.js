import React, { useState, useEffect } from "react";

function changeP1Color (num, state, setState, c4rows, c4columns) {
    const { currentPlayer, player1, player2, board } = state;
    if (player2 !== num) {
      for (let r = 0; r < c4rows; r++) {
        for (let c = 0; c < c4columns; c++)
          if (board[r][c] === player1) {
            board[r][c] = num;
          }
      }
      if (currentPlayer === player1) { setState((prevState) => ({ ...prevState, currentPlayer: num })); }
      setState((prevState) => ({ ...prevState, board, player1: num }));
    }
  }

function changeP2Color (num, state, setState, c4rows, c4columns) {
    const { currentPlayer, player1, player2, board } = state;
    if (player1 !== num) {
      for (let r = 0; r < c4rows; r++) {
        for (let c = 0; c < c4columns; c++)
          if (board[r][c] === player2) {
            board[r][c] = num;
          }
      }
      if (currentPlayer === player2) { setState((prevState) => ({ ...prevState, currentPlayer: num })); }
      setState((prevState) => ({ ...prevState, board, player2: num }));
    }
  }

export default function ColorPopup ({ state, setState, c4rows, c4columns }) {
  const [showColor, setShowColor] = useState(false);

  const displayBtn = () => {
    setShowColor((prevShowColor) => !prevShowColor);
  };

  const displayColor = () => {
    document.getElementById("cHeading").style.display = "block";
    document.getElementById("p1Colors").style.display = "block";
    document.getElementById("p2Colors").style.display = "block";
    document.getElementById("colorBody").style.height = "270px";
    document.getElementById("colorBody").style.border = "1px solid black";
    document.getElementById("colorTitle").style.width = "470px";
  };

  const hideColor = () => {
    document.getElementById("colorTitle").style.width = "0px";
    document.getElementById("cHeading").style.display = "none";
    document.getElementById("colorBody").style.height = "0px";
    document.getElementById("colorBody").style.border = "0px";
    document.getElementById("p1Colors").style.display = "none";
    document.getElementById("p2Colors").style.display = "none";
  };

  useEffect(() => {
    if (showColor) {
      displayColor();
    } else {
      hideColor();
    }
  }, [showColor]);

  return (
    <div className="color-container">
      <button className="btn-color" id="btnColor" onClick={displayBtn}>
        C
      </button>
      <div className="color-title" id="colorTitle">
        <h2 id="cHeading">Change Tile Color</h2>
        <div className="color-body" id="colorBody">
          <div id="p1Colors">
            <h3>P1</h3>
            <button className="colored-btn" id="Red1" onClick={() => changeP1Color(1, state, setState, c4rows, c4columns)} />
            <button className="colored-btn" id="Yellow1" onClick={() => changeP1Color(2, state, setState, c4rows, c4columns)} />
            <button className="colored-btn" id="Green1" onClick={() => changeP1Color(5, state, setState, c4rows, c4columns)} />
            <button className="colored-btn" id="Grey1" onClick={() => changeP1Color(6, state, setState, c4rows, c4columns)} />
            <button className="colored-btn" id="Magenta1" onClick={() => changeP1Color(7, state, setState, c4rows, c4columns)} />
            <button className="colored-btn" id="Brown1" onClick={() => changeP1Color(8, state, setState, c4rows, c4columns)} />
          </div>
          <div id="p2Colors">
            <h3>P2</h3>
            <button className="colored-btn" id="Red2" onClick={() => changeP2Color(1, state, setState, c4rows, c4columns)} />
            <button className="colored-btn" id="Yellow2" onClick={() => changeP2Color(2, state, setState, c4rows, c4columns)} />
            <button className="colored-btn" id="Green2" onClick={() => changeP2Color(5, state, setState, c4rows, c4columns)} />
            <button className="colored-btn" id="Grey2" onClick={() => changeP2Color(6, state, setState, c4rows, c4columns)} />
            <button className="colored-btn" id="Magenta2" onClick={() => changeP2Color(7, state, setState, c4rows, c4columns)} />
            <button className="colored-btn" id="Brown2" onClick={() => changeP2Color(8, state, setState, c4rows, c4columns)} />
          </div>
        </div>
      </div>
    </div>
  );
};