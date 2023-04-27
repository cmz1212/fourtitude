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
      board: [],
      gameOver: false,
      traps: [[], [], []],
    };

    this.play = this.play.bind(this);
  }

  initBoard() {
    let board = [];
    let traps = [];

    for (let i = 0; i < 3; i++) {
      let x = Math.floor(Math.random() * 5);
      let y = Math.floor(Math.random() * 5 + 1);

      traps.push([x, y]);
    }
    while (traps[1].toString() === traps[0].toString()) {
      let x = Math.floor(Math.random() * 5 );
      let y = Math.floor(Math.random() * 5 + 1);
      traps[1].splice(0, 2, x, y);
    }
    while (
      traps[2].toString() === traps[0].toString() ||
      traps[2].toString() === traps[1].toString()
    ) {
      let x = Math.floor(Math.random() * 5 );
      let y = Math.floor(Math.random() * 5 + 1);
      traps[2].splice(0, 2, x, y);
    }

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
      board,
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
    if (!this.state.gameOver) {
      for (let r = 0; r < c4rows; r++) {
        for (let c = 0; c < c4columns; c++) {
          const name = r.toString() + c.toString();
          document.getElementById(name).className = "tile";
        }
      }
      let board = this.state.board;
      for (let r = 5; r >= 0; r--) {
        if (!board[r][c]||board[r][c]===3) {
          board[r][c] = this.state.currentPlayer;
          const name = r.toString() + c.toString();
          document.getElementById(name).className = "currenttile";
          break;
        }
      }

      let result = this.checkAll(board);
      if (result === this.state.player1) {
        this.setState({ board, gameOver: true });
        alert("Player 1 wins!");
      } else if (result === this.state.player2) {
        this.setState({ board, gameOver: true });
        alert("Player 2 wins!");
      } else if (result === "draw") {
        this.setState({ board, gameOver: true });
        alert("It's a draw!");
      } else {
        this.setState({ board, currentPlayer: this.togglePlayer() });
      }
    } else {
      alert("Game over. Please start a new game.");
    }
  }
  hoverDisplay(board, c) {
    //console.log(c);

    for (let r = c4rows - 1; r >= 0; r--) {
      if (!board[r][c]||board[r][c]===3) {
        const name = r.toString() + c.toString();
        document.getElementById(name).className = "tile2";
        break;
      }
    }
  }
  hoverOut(c) {
    for (let r = 0; r < c4rows; r++) {
      const name = r.toString() + c.toString();
      const id = document.getElementById(name).className;
      if (id !== "currenttile") {
        document.getElementById(name).className = "tile";
      }
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
    for (let r = 0; r < c4rows; r++) {
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
    const { currentPlayer, board, traps } = this.state;
    //let rowNumber =0;
    return (
      <div>
        <div
          className="button"
          onClick={() => {
            this.initBoard();
          }}
        >
          New Game
        </div>
        <table>
          <thead></thead>
          <tbody>
            {board.map((row, i) => (
              <Row
                board={board}
                key={i}
                row={row}
                play={this.play}
                hover={this.hoverDisplay}
                out={this.hoverOut}
                rowNum={i}
                traps={traps}
              />
            ))}
          </tbody>
        </table>
        <br />
        <h3 className="text">Player {currentPlayer}'s turn</h3>
      </div>
    );
  }
}

export default Board;
