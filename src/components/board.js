import React, { Component } from "react";
import Row from "./row.js";
import "./../App.css";

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
      selector: [],
      board: [],
      gameOver: false,
      traps: [[], [], []],
    };

    this.play = this.play.bind(this);
    this.hoverDisplay = this.hoverDisplay.bind(this);
    this.hoverOut = this.hoverOut.bind(this);
  }

  initBoard() {
    let selector = [];
    let board = [];
    let traps = [];

    //Traps
    for (let i = 0; i < 3; i++) {
      let x = Math.floor(Math.random() * (c4rows - 1));
      let y = Math.floor(Math.random() * (c4columns - 1));

      traps.push([x, y]);
    }

    while (traps[1].toString() === traps[0].toString()) {
      let x = Math.floor(Math.random() * (c4rows - 1));
      let y = Math.floor(Math.random() * (c4columns - 1));
      traps[1].splice(0, 2, x, y);
    }

    while (
      traps[2].toString() === traps[0].toString() ||
      traps[2].toString() === traps[1].toString()
    ) {
      let x = Math.floor(Math.random() * (c4rows - 1));
      let y = Math.floor(Math.random() * (c4columns - 1));
      traps[2].splice(0, 2, x, y);
    }

    //Selector
    for (let r = 0; r < 1; r++) {
      let row = [];
      for (let c = 0; c < c4columns; c++) {
        row.push(null);
      }
      selector.push(row);
    }

    //Board
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
      p1Win: 0,
      p2Win: 0,
      currentPlayer: this.state.player1,
      gameOver: false,
      traps,
    });
  }

  togglePlayer() {
    return this.state.currentPlayer === this.state.player1
      ? this.state.player2
      : this.state.player1;
  }

  play(c) {
    const { p1Win, p2Win } = this.state;

    let board = this.state.board;
    if (!this.state.gameOver) {
      for (let r = c4rows - 1; r >= 0; r--) {
        if (!board[r][c]) {
          board[r][c] = this.state.currentPlayer;
          break;
        }
      }

      let result = this.checkAll(board);
      if (result === this.state.player1) {
        this.setState({ board, gameOver: true, p1Win: p1Win + 1 });
        alert("Red Wins!");
      } else if (result === this.state.player2) {
        this.setState({ board, gameOver: true, p2Win: p2Win + 1 });
        alert("Yellow wins!");
      } else if (result === "draw") {
        this.setState({ board, gameOver: true });
        alert("It's a draw!");
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
    } else {
      alert("Game over. Please start a new game.");
    }
  }

  hoverDisplay(board, c, curr) {
    const selector_name = "selector" + c.toString();

    let c_name = "";
    if (curr === 1) {
      c_name = ["player1", "circle"].join(" ");
    } else if (curr === 2) {
      c_name = ["player2", "circle"].join(" ");
    }

    console.log(c_name);
    console.log(selector_name);
    document.getElementById(selector_name).className = c_name.toString();

    for (let r = c4rows - 1; r >= 0; r--) {
      if (!board[r][c] || board[r][c] === 3) {
        const name = r.toString() + c.toString();
        document.getElementById(name).className = "tile-hover";
        break;
      }
    }
  }

  hoverOut(c) {
    const selector_name = "selector" + c.toString();
    const c_name = ["selector-open", "circle"].join(" ");
    document.getElementById(selector_name).className = c_name.toString();

    for (let r = 0; r < c4rows; r++) {
      const name = r.toString() + c.toString();
      document.getElementById(name).className = "tile";
    }
  }

  checkVertical(board) {
    for (let r = 3; r < c4rows; r++) {
      for (let c = 0; c < c4columns; c++) {
        if (board[r][c]) {
          if (
            board[r][c] === board[r - 1][c] &&
            board[r][c] === board[r - 2][c] &&
            board[r][c] === board[r - 3][c]
          ) {
            return board[r][c];
          }
        }
      }
    }
  }

  checkHorizontal(board) {
    for (let r = 0; r < c4rows; r++) {
      for (let c = 0; c < 4; c++) {
        if (board[r][c]) {
          if (
            board[r][c] === board[r][c + 1] &&
            board[r][c] === board[r][c + 2] &&
            board[r][c] === board[r][c + 3]
          ) {
            return board[r][c];
          }
        }
      }
    }
  }

  checkDiagonalRight(board) {
    for (let r = 3; r < c4rows; r++) {
      for (let c = 0; c < 4; c++) {
        if (board[r][c]) {
          if (
            board[r][c] === board[r - 1][c + 1] &&
            board[r][c] === board[r - 2][c + 2] &&
            board[r][c] === board[r - 3][c + 3]
          ) {
            return board[r][c];
          }
        }
      }
    }
  }

  checkDiagonalLeft(board) {
    for (let r = 3; r < c4rows; r++) {
      for (let c = 3; c < c4columns; c++) {
        if (board[r][c]) {
          if (
            board[r][c] === board[r - 1][c - 1] &&
            board[r][c] === board[r - 2][c - 2] &&
            board[r][c] === board[r - 3][c - 3]
          ) {
            return board[r][c];
          }
        }
      }
    }
  }

  checkDraw(board) {
    for (let r = 1; r < c4rows; r++) {
      for (let c = 0; c < c4columns; c++) {
        if (board[r][c] === null) {
          return null;
        }
      }
    }
    return "draw";
  }

  checkAll(board) {
    return (
      this.checkVertical(board) ||
      this.checkDiagonalRight(board) ||
      this.checkDiagonalLeft(board) ||
      this.checkHorizontal(board) ||
      this.checkDraw(board)
    );
  }

  componentWillMount() {
    this.initBoard();
  }

  render() {
    const { gameOver, selector, currentPlayer, board } = this.state;

    const gameWinnerMessage =
      currentPlayer === 1 ? `Red Won !!!` : `Yellow Won !!!`;

    const gameTurnMessage = `${
      currentPlayer === 1 ? "Red" : "Yellow"
    }'s Turn: Drop Token Below`;

    return (
      <div>
        <span className="text">
          {gameOver ? gameWinnerMessage : gameTurnMessage}
        </span>

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

        <br />
        <br />
        <div
          className="button"
          onClick={() => {
            this.initBoard();
          }}
        >
          New Game
        </div>
      </div>
    );
  }
}

export default Board;
