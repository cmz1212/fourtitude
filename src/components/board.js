import React, { Component } from "react";
import "./../App.css";
import Row from "./row.js";
import checkAll from "./check4/checkAll.js";
import check3_Vertical from "./check3/check3_Vertical.js";
import check3_Horizontal from "./check3/check3_Horizontal.js";
import check3_DiagonalLeft from "./check3/check3_DiagonalLeft.js";
import check3_DiagonalRight from "./check3/check3_DiagonalRight.js";
import Popup from "./stats_popup/Popup.js";
import PopupIcon from "./stats_popup/PopupIcon.js";
import NotifyContent from "./notifications/NotifyContent.js";

import backgroundMusic from "./../sound/music.mp3";
import audio_click from "./../sound/click.wav";
import audio_drop from "./../sound/drop.wav";
import audio_win from "./../sound/win.wav";
import audio_draw from "./../sound/draw.wav";
import audio_fire from "./../sound/fire_burning.wav";
import audio_thunder from "./../sound/thunder_cracking.wav";
import audio_ice from "./../sound/ice_effect.mp3";
import audio_grass from "./../sound/grass_rustling.mp3";

const c4rows = 6;
const c4columns = 7;

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      player1: 1,
      player2: 2,
      currentPlayer: null,
      p1Win: 0,
      p2Win: 0,
      Winner: 0,
      selector: [],
      board: [],
      gameOver: false,
      traps: [[], [], []],
      showPopup: false,
      isMusicPlaying: true,
      showNotification: false,
      notificationID: "",
    };
    this.audioRef = React.createRef();
    this.play = this.play.bind(this);
    this.hoverDisplay = this.hoverDisplay.bind(this);
    this.hoverOut = this.hoverOut.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
  }

  togglePlayer() {
    return this.state.currentPlayer === this.state.player1
      ? this.state.player2
      : this.state.player1;
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }

  toggleNotification = (notificationID, currentPlayer) => {
    this.setState({
      showNotification: true,
      notificationID,
      currentPlayer,
    });

    setTimeout(() => {
      this.setState({ showNotification: false });
    }, 2000);
  };

  handleMusicToggle = () => {
    const audio = this.audioRef.current;
    if (this.state.isMusicPlaying) {
      audio.pause();
    } else {
      audio.volume = 0.1;
      audio.play();
    }
    this.setState((prevState) => ({
      isMusicPlaying: !prevState.isMusicPlaying,
    }));
  };

  initBoard() {
    let selector = [];
    let board = [];
    let traps = [];

    //Initiate positions for the special effect tiles
    for (let i = 0; i < 3; i++) {
      let x = Math.floor(Math.random() * (c4rows - 1));
      let y = Math.floor(Math.random() * (c4columns - 2) + 1);

      traps.push([x, y]);
    }

    //Changing tile position if overlap with other special effect tiles
    while (traps[1].toString() === traps[0].toString()) {
      let x = Math.floor(Math.random() * (c4rows - 1));
      let y = Math.floor(Math.random() * (c4columns - 2) + 1);
      traps[1].splice(0, 2, x, y);
    }

    while (
      traps[2].toString() === traps[0].toString() ||
      traps[2].toString() === traps[1].toString()
    ) {
      let x = Math.floor(Math.random() * (c4rows - 1));
      let y = Math.floor(Math.random() * (c4columns - 2) + 1);
      traps[2].splice(0, 2, x, y);
    }

    //Creating Selector row
    for (let r = 0; r < 1; r++) {
      let row = [];
      for (let c = 0; c < c4columns; c++) {
        row.push(null);
      }
      selector.push(row);
    }

    //Creating Board status
    for (let r = 0; r < c4rows; r++) {
      let row = [];
      for (let c = 0; c < c4columns; c++) {
        if (r === traps[0][0] && c === traps[0][1]) {
          row.push(3);
        } else if (r === traps[1][0] && c === traps[1][1]) {
          row.push(3);
        } else if (r === traps[2][0] && c === traps[2][1]) {
          row.push(3);
        } else {
          row.push(null);
        }
      }
      board.push(row);
    }

    this.setState({
      selector,
      board,
      currentPlayer: this.state.player1,
      gameOver: false,
      Winner: 0,
      traps,
      showNotification: false,
      notificationID: "",
    });
  }

  play = async (col) => {
    const { p1Win, p2Win, traps, board } = this.state;

    if (!this.state.gameOver) {
      let c = Number(col);

      //Applying played tile
      for (let r = 5; r >= 0; r--) {
        if (!board[r][c] || board[r][c] === 3) {
          new Audio(audio_drop).play();

          //If triggered special tile
          if (board[r][c] === 3) {
            board[r][c] = this.state.currentPlayer;

            this.triggerRandom(r, c);

            //Restore display for special tiles after board cleanup
            let t1,
              t2,
              t3 = false;
            if (board[traps[0][0]][traps[0][1]] === 3) {
              t1 = true;
            }
            if (board[traps[1][0]][traps[1][1]] === 3) {
              t2 = true;
            }
            if (board[traps[2][0]][traps[2][1]] === 3) {
              t3 = true;
            }
            for (let j = 0; j < 6 - r; j++) {
              this.dropTiles();
              await this.delay(200);
            }

            if (t1) {
              board[traps[0][0]][traps[0][1]] = 3;
            }
            if (t2) {
              board[traps[1][0]][traps[1][1]] = 3;
            }
            if (t3) {
              board[traps[2][0]][traps[2][1]] = 3;
            }
            this.setState({ board });
          } else {
            board[r][c] = this.state.currentPlayer;
          }

          //Check for potential winner
          let result = checkAll(board, c4rows, c4columns);
          if (result === this.state.player1) {
            new Audio(audio_win).play();
            this.setState({
              board,
              gameOver: true,
              p1Win: p1Win + 1,
              Winner: this.state.currentPlayer,
            });
            this.toggleNotification("win", this.state.currentPlayer);
          } else if (result === this.state.player2) {
            new Audio(audio_win).play();
            this.setState({
              board,
              gameOver: true,
              p2Win: p2Win + 1,
              Winner: this.state.currentPlayer,
            });
            this.toggleNotification("win", this.state.currentPlayer);
          } else if (result === "draw") {
            new Audio(audio_draw).play();
            this.setState({
              board,
              gameOver: true,
              Winner: 3,
            });
            this.toggleNotification("draw", this.state.currentPlayer);
          } else {
            this.setState({ board, currentPlayer: this.togglePlayer() });
            let c_name;

            if (this.state.currentPlayer === 2) {
              c_name = ["player1", "circle"].join(" ");
            } else if (this.state.currentPlayer === 1) {
              c_name = ["player2", "circle"].join(" ");
            }

            document.getElementById("selector" + c.toString()).className =
              c_name.toString();
          }
          break;
        }
      }
    } else {
      alert("Game over. Please start a new game.");
    }
  };

  //Display tile at selector row and play position on mouse over
  hoverDisplay(board, c, curr) {
    let audio = new Audio(audio_click);
    audio.volume = 0.1;

    let c_name = "";
    if (curr === 1) {
      c_name = ["player1", "circle"].join(" ");
    } else if (curr === 2) {
      c_name = ["player2", "circle"].join(" ");
    }

    document.getElementById("selector" + c.toString()).className =
      c_name.toString();

    for (let r = c4rows - 1; r >= 0; r--) {
      if (!board[r][c] || board[r][c] === 3) {
        audio.play();
        document.getElementById(r.toString() + c.toString()).className =
          "tile-hover";

        break;
      }
    }
  }

  //Restore board look on mouse out
  hoverOut(c) {
    const selector_name = "selector" + c.toString();
    const c_name = ["selector-open", "circle"].join(" ");
    document.getElementById(selector_name).className = c_name.toString();

    for (let r = 0; r < c4rows; r++) {
      const name = r.toString() + c.toString();
      document.getElementById(name).className = "tile";
    }
  }

  componentWillMount() {
    this.initBoard();
  }

  componentDidMount() {
    const audio = this.audioRef.current;
    audio.volume = 0.1;
    audio.play();
  }

  componentDidUpdate() {
    if (this.state.isMusicPlaying) {
      this.audioRef.current.play();
    } else {
      this.audioRef.current.pause();
    }
  }

  //Function for removing a particular tile
  applyNull(r, c) {
    const board = this.state.board;
    if (0 <= r <= c4rows && 0 <= c <= c4columns) {
      board[r][c] = null;
    }
  }

  delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  //Drop all suspending tiles to bottom-most row
  dropTiles = () => {
    const board = this.state.board;
    for (let r = 4; r >= 0; r--) {
      for (let c = 0; c < 7; c++) {
        if (
          (board[r + 1][c] === null || board[r + 1][c] === 3) &&
          board[r][c] !== 3
        ) {
          board[r + 1][c] = board[r][c];
          board[r][c] = null;
        }
      }
    }
    this.setState({
      board,
    });
  };

  //Trigger Fire special effect
  fireEffect = (r, c) => {
    new Audio(audio_fire).play();

    this.toggleNotification("fire", this.state.currentPlayer);
    const { board, currentPlayer } = this.state;
    for (let i = c - 1; i <= c + 1; i++) {
      if (board[r][i] !== 3) {
        this.applyNull(r + 1, i);
      }
      if (board[r + 1][i] !== 3) {
        this.applyNull(r + 1, i);
      }
    }
    board[r][c] = currentPlayer;
    this.setState({
      board,
    });
  };

  //Trigger Thunder special effect
  thunderEffect = (r, c) => {
    new Audio(audio_thunder).play();

    this.toggleNotification("thunder", this.state.currentPlayer);
    const board = this.state.board;
    for (let i = c4rows - 1; i > r; i--) {
      this.applyNull(i, c);
    }
    this.setState({
      board,
    });
  };

  //Trigger Fire special effect
  iceEffect = (r, c) => {
    new Audio(audio_ice).play();

    this.toggleNotification("ice", this.state.currentPlayer);
    const board = this.state.board;
    if (r >= 1) {
      board[r - 1][c] = 4;
    }
    if (board[r][c + 1] === null) {
      board[r][c + 1] = 4;
    }
    if (board[r][c - 1] === null) {
      board[r][c - 1] = 4;
    }
    this.setState({
      board,
    });
  };

  //Trigger Growth special effect
  growthEffect = (r, c) => {
    new Audio(audio_grass).play();

    this.toggleNotification("growth", this.state.currentPlayer);
    const { board, currentPlayer } = this.state;
    let determinant = true;

    while (determinant) {
      const rand_num = Math.floor(Math.random() * 3);
      switch (rand_num) {
        case 0:
          if (r > 0 && (board[r - 1][c] === null || board[r - 1][c] === 3)) {
            board[r - 1][c] = currentPlayer;
            determinant = false;
          }
          break;
        case 1:
          if (board[r][c + 1] === null || board[r][c + 1] === 3) {
            board[r][c + 1] = currentPlayer;
            determinant = false;
          }
          break;
        case 2:
          if (board[r][c - 1] === null || board[r][c - 1] === 3) {
            board[r][c - 1] = currentPlayer;
            determinant = false;
          }
          break;
        default:
      }
      if (
        r === 0 &&
        board[r][c + 1] !== null &&
        board[r][c + 1] !== 3 &&
        board[r][c - 1] !== null &&
        board[r][c - 1] !== 3
      ) {
        determinant = false;
      }
    }

    this.setState({ board });
  };

  //Randomly trigger one of four special effects
  triggerRandom(r, c) {
    const rand_num = Math.floor(Math.random() * 4);
    switch (rand_num) {
      case 0:
        this.fireEffect(r, c);
        break;
      case 1:
        this.thunderEffect(r, c);
        break;
      case 2:
        this.iceEffect(r, c);
        break;
      case 3:
        this.growthEffect(r, c);
        break;
      default:
    }
  }

  render() {
    const {
      gameOver,
      selector,
      currentPlayer,
      board,
      p1Win,
      p2Win,
      showNotification,
      notificationID,
      Winner,
    } = this.state;

    let gameWinnerMessage = "";
    if (Winner === 3) {
      gameWinnerMessage = "It's a draw!";
    } else {
      gameWinnerMessage =
        currentPlayer === 1 ? `Red Won !!!` : `Yellow Won !!!`;
    }

    const gameTurnMessage = `${
      currentPlayer === 1 ? "Red" : "Yellow"
    }'s Turn: Drop Token Below`;

    const check3_Diagonals = check3_DiagonalLeft(board, c4rows, c4columns).map(
      (elem, index) =>
        elem + check3_DiagonalRight(board, c4rows, c4columns)[index]
    );

    return (
      <div>
        <span className="text">
          {gameOver ? gameWinnerMessage : gameTurnMessage}
        </span>

        <PopupIcon onClick={this.togglePopup} />
        {this.state.showPopup && (
          <Popup
            onClose={this.togglePopup}
            Player1Wins={p1Win}
            Player2Wins={p2Win}
            OpensVertical={check3_Vertical(board, c4rows, c4columns)}
            OpensHorizontal={check3_Horizontal(board, c4rows, c4columns)}
            OpensDiagonals={check3_Diagonals}
          />
        )}

        <table id="selector-table">
          <thead></thead>
          <tbody>
            {selector.map((row, i) => (
              <Row
                selectorType={true}
                board={board}
                row={row}
                play={this.play}
                hover={this.hoverDisplay}
                out={this.hoverOut}
                rowNum={i}
                curr={currentPlayer}
              />
            ))}
          </tbody>
        </table>

        <table>
          <thead></thead>
          <tbody>
            {board.map((row, i) => (
              <Row
                selectorType={false}
                board={board}
                row={row}
                rowNum={i}
                play={this.play}
                hover={this.hoverDisplay}
                out={this.hoverOut}
                curr={currentPlayer}
              />
            ))}
          </tbody>
        </table>
        {showNotification && (
          <NotifyContent notificationID={notificationID} curr={currentPlayer} />
        )}

        <br />
        <br />

        <div className="button-row">
          <div
            className="button"
            onClick={() => {
              this.initBoard();
            }}
          >
            New Game
          </div>

          <div className="button" onClick={this.handleMusicToggle}>
            {this.state.isMusicPlaying ? "Pause Music" : "Play Music"}
          </div>
        </div>

        <audio ref={this.audioRef} src={backgroundMusic} loop />
      </div>
    );
  }
}

export default Board;
