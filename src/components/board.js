import React, { useState, useEffect, useRef } from "react";
import "./../App.css";
import Row from "./row.js";
import SpecialEffects from './effects/specialEffects.js';
import InteractionEffects from './effects/interactionEffects.js';

import check3Vertical from "./check3/check3Vertical.js";
import check3Horizontal from "./check3/check3Horizontal.js";
import check3Diagonals from "./check3/check3Diagonals.js";
import checkAll from "./check4/checkAll.js";

import HelpPopup from "./helpPopup/helpPopup.js";
import ColorPopup from "./colorPopup/colorPopup.js";
import StatsPopup from "./statsPopup/statsPopup.js";
import StatsPopupIcon from "./statsPopup/statsPopupIcon.js";
import NotifyContent from "./notifications/notifyContent.js";

import backgroundMusic from "./../sound/music.mp3";
import audio_drop from "./../sound/drop.wav";
import audio_win from "./../sound/win.wav";
import audio_draw from "./../sound/draw.wav";

const C4ROWS = 6;
const C4COLUMNS = 7;

export default function Board () {
  const [state, setState] = useState({player1: 1, player2: 2, currentPlayer: null, p1Win: 0, p2Win: 0, Winner: 0, selector: [], board: [], gameOver: false,
                                        traps: [[], [], []], showStatsPopup: false, isMusicPlaying: true, showNotification: false, notificationID: ""});
  
  const { player1, player2, currentPlayer, p1Win, p2Win, Winner, selector, board, gameOver, traps, showStatsPopup, isMusicPlaying, showNotification, notificationID } = state;

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = 0.1;
    audio.play();
    initBoard();
  }, []);

  const audioRef = useRef();
  
  const togglePlayer = () => currentPlayer === player1 ? player2 : player1;

  const toggleStatsPopup = () => { setState((prevState) => ({ ...prevState, showStatsPopup: !prevState.showStatsPopup })); };
  
  const toggleNotification = (notificationID, currentPlayer) => {
    setState((prevState) => ({ ...prevState, showNotification:true, notificationID, currentPlayer }));
    setTimeout(() => { setState((prevState) => ({ ...prevState, showNotification: false })); }, 3000);
  };

  const handleMusicToggle = () => {
    const audio = audioRef.current;
    if (isMusicPlaying) {
      audio.pause();
    } else {
      audio.volume = 0.1;
      audio.play();
    }
    setState((prevState) => ({ ...prevState, isMusicPlaying: !prevState.isMusicPlaying }));
  };

  const triggerRandom = (r, c) => {
    const rand_num = Math.floor(Math.random() * 4);
    switch (rand_num) {
      case 0:
        SpecialEffects.fireEffect(r, c, state, setState, toggleNotification, C4ROWS, C4COLUMNS);
        break;
      case 1:
        SpecialEffects.thunderEffect(r, c, state, setState, toggleNotification, C4ROWS, C4COLUMNS);
        break;
      case 2:
        SpecialEffects.iceEffect(r, c, state, setState, toggleNotification);
        break;
      case 3:
        SpecialEffects.growthEffect(r, c, state, setState, toggleNotification);
        break;
      default:
    }
  };

  const initBoard = () => {
    let newSelector = [];
    let newBoard = [];
    let newTraps = [];

    // Initiate positions for the special effect tiles
    for (let i = 0; i < 3; i++) {
      let x = Math.floor(Math.random() * (C4ROWS - 1));
      let y = Math.floor(Math.random() * (C4COLUMNS - 2) + 1);
      newTraps.push([x, y]);
    }

    // Changing tile position if overlap with other special effect tiles
    while (newTraps[1].toString() === newTraps[0].toString()) {
      let x = Math.floor(Math.random() * (C4ROWS - 1));
      let y = Math.floor(Math.random() * (C4COLUMNS - 2) + 1);
      newTraps[1].splice(0, 2, x, y);
    }

    while (
      newTraps[2].toString() === newTraps[0].toString() ||
      newTraps[2].toString() === newTraps[1].toString()
    ) {
      let x = Math.floor(Math.random() * (C4ROWS - 1));
      let y = Math.floor(Math.random() * (C4COLUMNS - 2) + 1);
      newTraps[2].splice(0, 2, x, y);
    }

    // Creating Selector row
    for (let r = 0; r < 1; r++) {
      let row = [];
      for (let c = 0; c < C4COLUMNS; c++) {
        row.push(null);
      }
      newSelector.push(row);
    }

    // Creating Board status
    for (let r = 0; r < C4ROWS; r++) {
      let row = [];
      for (let c = 0; c < C4COLUMNS; c++) {
        if (r === newTraps[0][0] && c === newTraps[0][1]) { row.push(3); }
        else if (r === newTraps[1][0] && c === newTraps[1][1]) { row.push(3); }
        else if (r === newTraps[2][0] && c === newTraps[2][1]) { row.push(3); }
        else { row.push(null); }
      }
      newBoard.push(row);
    }
    setState((prevState) => ({...prevState, selector:newSelector, board:newBoard, currentPlayer:player1, gameOver:false, Winner:0, traps:newTraps, showNotification:false, notificationID:""}));
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const play = async (col) => {
    if (!gameOver) {
      let c = Number(col);

      // Applying played tile
      for (let r = 5; r >= 0; r--) {
        if (!board[r][c] || board[r][c] === 3) {
          new Audio(audio_drop).play();

          // If triggered special tile
          if (board[r][c] === 3) {
            board[r][c] = currentPlayer;

            triggerRandom(r, c);

            // Restore display for special tiles after board cleanup
            let t1, t2, t3 = false;
            if (board[traps[0][0]][traps[0][1]] === 3) { t1 = true; }
            if (board[traps[1][0]][traps[1][1]] === 3) { t2 = true; }
            if (board[traps[2][0]][traps[2][1]] === 3) { t3 = true; }

            for (let j = 0; j < 6 - r; j++) {
              InteractionEffects.dropTiles(state, setState, C4COLUMNS);
              await delay(200);
            }

            if (t1) { board[traps[0][0]][traps[0][1]] = 3; }
            if (t2) { board[traps[1][0]][traps[1][1]] = 3; }
            if (t3) { board[traps[2][0]][traps[2][1]] = 3; }
            setState((prevState) => ({ ...prevState, board }));

          } else {
            board[r][c] = currentPlayer;
          }

          // Check for potential winner
          let result = checkAll(board, C4ROWS, C4COLUMNS);
          if (result === player1) {

            new Audio(audio_win).play();
            setState((prevState) => ({...prevState, board, gameOver: true, p1Win: p1Win + 1, Winner: currentPlayer}));
            toggleNotification("win", currentPlayer);

          } else if (result === player2) {

            new Audio(audio_win).play();
            setState((prevState) => ({...prevState, board, gameOver: true, p2Win: p2Win + 1, Winner: currentPlayer}));
            toggleNotification("win", currentPlayer);

          } else if (result === "draw") {

            new Audio(audio_draw).play();
            setState((prevState) => ({...prevState,board,gameOver: true,Winner: 3}));
            toggleNotification("draw", currentPlayer);

          } else {

            setState((prevState) => ({...prevState,board,currentPlayer: togglePlayer()}));
            let c_name, space;
            const value = currentPlayer;

            if (value === 1) {space = "player1";} 
            else if (value === 2) {space = "player2";} 
            else if (value === 5) {space = "playerGreen";} 
            else if (value === 6) {space = "playerGrey";} 
            else if (value === 7) {space = "playerPurple";} 
            else if (value === 8) {space = "playerBrown";}

            if (currentPlayer === player1) {
              c_name = [space, "circle"].join(" ");
            } else if (currentPlayer === player2) {
              c_name = [space, "circle"].join(" ");
            }

            document.getElementById("selector" + c.toString()).className = c_name.toString();
          }
          break;
        }
      }
    } else {
      alert("Game over. Please start a new game.");
    }
  };

  const gameWinnerMessage = () => {
    let gameWinnerMessage = ""
    if (Winner === 3) {
      gameWinnerMessage = "It's a draw!";
    } else {
      gameWinnerMessage = currentPlayer === player1 ? `Player 1 Won !!!` : `Player 2 Won !!!`;
    }
    return gameWinnerMessage;
  }

  const gameTurnMessage = () => { return `${currentPlayer === player1 ? "Player 1" : "Player 2"}'s Turn: Drop Token Below`; }
   
  return (
    <div>
      <span className="text">{gameOver ? gameWinnerMessage : gameTurnMessage}</span>
      <StatsPopupIcon onClick={toggleStatsPopup} />
      {showStatsPopup && (
        <StatsPopup onClose={toggleStatsPopup} Player1Wins={p1Win} Player2Wins={p2Win} p1={player1} p2={player2}
          OpensVertical={check3Vertical(board, C4ROWS, C4COLUMNS, player1, player2)}
          OpensHorizontal={check3Horizontal(board, C4ROWS, C4COLUMNS, player1, player2)}
          OpensDiagonals={check3Diagonals(board, C4ROWS, C4COLUMNS, player1, player2)}
        />
      )}
      <HelpPopup />
      <ColorPopup state={state} setState={setState} c4rows={C4ROWS} c4columns={C4COLUMNS} />

      <table id="selector-table">
        <thead></thead>
        <tbody>
          {console.log(selector)}
          {selector.map((row, i) => (
            <Row selectorType={true} state={state} row={row} rowNum={i} play={play} hover={InteractionEffects.hoverDisplay} out={InteractionEffects.hoverOut} curr={currentPlayer} c4rows={C4ROWS} />
          ))}
        </tbody>
      </table>

      <table>
        <thead></thead>
        <tbody>
          {board.map((row, i) => (
            <Row selectorType={false} state={state} row={row} rowNum={i} play={play} hover={InteractionEffects.hoverDisplay} out={InteractionEffects.hoverOut} curr={currentPlayer} c4rows={C4ROWS} />
          ))}
        </tbody>
      </table>

      {showNotification && ( <NotifyContent notificationID={notificationID} curr={currentPlayer} p1={player1} /> )}

      {Array(2).fill(<br />)}

      <div className="button-row">
        <div className="button" onClick={() => {initBoard();}}> New Game </div>
        <div className="button" onClick={handleMusicToggle}> {isMusicPlaying ? "Pause Music" : "Play Music"} </div>
      </div>

      <audio ref={audioRef} src={backgroundMusic} loop />
    </div>
  );
};