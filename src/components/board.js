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
      let x = Math.floor(Math.random() * 5 + 1);
      let y = Math.floor(Math.random() * 5 + 1);

      traps.push([x, y]);
    }
    while (traps[1].toString() === traps[0].toString()) {
      let x = Math.floor(Math.random() * 5 + 1);
      let y = Math.floor(Math.random() * 5 + 1);
      traps[1].splice(0, 2, x, y);
    }
    while (
      traps[2].toString() === traps[0].toString() ||
      traps[2].toString() === traps[1].toString()
    ) {
      let x = Math.floor(Math.random() * 5 + 1);
      let y = Math.floor(Math.random() * 5 + 1);
      traps[2].splice(0, 2, x, y);
    }

    for (let r = 0; r < c4rows + 1; r++) {
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
    const { p1Win, p2Win } = this.state;
    if (!this.state.gameOver) {
      for (let r = 1; r < c4rows + 1; r++) {
        for (let c = 0; c < c4columns; c++) {
          const name = r.toString() + c.toString();
          document.getElementById(name).className = "tile";
        }
      }
      let board = this.state.board;
      for (let r = 6; r >= 1; r--) {
        if (!board[r][c] || board[r][c] === 3) {
          board[r][c] = this.state.currentPlayer;
          const name = r.toString() + c.toString();
          document.getElementById(name).className = "currenttile";
          break;
        }
      }

      let result = this.checkAll(board);
      if (result === this.state.player1) {
        this.setState({ board, gameOver: true, p1Win: p1Win + 1 });

        alert("Player 1 wins!");
      } else if (result === this.state.player2) {
        this.setState({ board, gameOver: true, p2Win: p2Win + 1 });
        alert("Player 2 wins!");
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

        document.getElementById("top" + c.toString()).className =
          c_name.toString();
      }
    } else {
      alert("Game over. Please start a new game.");
    }
  }
  hoverDisplay(board, c, curr) {
    const top_name = "top" + c.toString();
    let c_name;
    if (curr === 1) {
      c_name = ["player1", "circle"].join(" ");
    } else if (curr === 2) {
      c_name = ["player2", "circle"].join(" ");
    }
    document.getElementById(top_name).className = c_name.toString();
    for (let r = c4rows; r >= 1; r--) {
      if (!board[r][c] || board[r][c] === 3) {
        const name = r.toString() + c.toString();
        document.getElementById(name).className = "tile2";
        break;
      }
    }
  }

  hoverOut(c) {
    const top_name = "top" + c.toString();
    const c_name = ["open", "circle"].join(" ");

    document.getElementById(top_name).className = c_name.toString();
    for (let r = 1; r < c4rows + 1; r++) {
      const name = r.toString() + c.toString();
      const id = document.getElementById(name).className;
      if (id !== "currenttile") {
        document.getElementById(name).className = "tile";
      }
    }
  }

  checkVertical(board) {
    for (let r = 4; r < c4rows + 1; r++) {
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
    for (let r = 1; r < c4rows + 1; r++) {
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
    for (let r = 4; r < c4rows + 1; r++) {
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
    for (let r = 4; r < c4rows + 1; r++) {
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
    for (let r = 1; r < c4rows + 1; r++) {
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
  applyNull(r, c) {
    const board = this.state.board;
    board[r][c] = null;
  }
  applyFire(r, c) {
    const board = this.state.board;
    for (let i = c - 1; i <= c + 1; i++) {
      this.applyNull(r + 1, i);
    }

    this.applyNull(r, c + 1);
    this.applyNull(r, c - 1);
    this.setState({
      board,
    });
  }
  applyThunder(r, c) {
    const board = this.state.board;
    for (let i = c4rows; i > r; i--) {
      this.applyNull(i, c);
    }
    this.setState({
      board,
    });
  }
  applyIce(r,c) {
    const board = this.state.board;
    board[r][c]=4;
    this.setState({
      board,
    });
  }
  applyGrass() {
    console.log("apply grass");
  }
  applyRandom(t1, t2, t3) {
    console.log(t1, t2, t3);

    const rand_num = Math.floor(Math.random() * 4);
    switch (rand_num) {
      case 0:
        this.applyFire(t1[0], t1[1]);
        break;
      case 1:
        this.applyThunder(t1[0], t1[1]);
        break;
      case 2:
        this.applyIce();
        break;
      case 3:
        this.applyGrass();
        break;
      default:
    }
  }
  render() {
    const { currentPlayer, board, traps, p1Win, p2Win } = this.state;

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
        <p>
          P1 {p1Win} : P2 {p2Win}
        </p>
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
                curr={currentPlayer}
              />
            ))}
          </tbody>
        </table>
        <br />
        <h3 className="text">Player {currentPlayer}'s turn</h3>
        <h4>Test buttons</h4>
        <div display="inline-block">
          <button onClick={() => this.applyFire(5, 5)}>Apply Fire</button>
          <button onClick={() => this.applyThunder(2, 5)}>Apply Thunder</button>
          <button onClick={() => this.applyIce(5,5)}>Apply Ice</button>
          <button onClick={() => this.applyGrass}>Apply Grass</button>
          <button
            onClick={() => this.applyRandom(traps[0], traps[1], traps[2])}
          >
            Apply random{" "}
          </button>
        </div>
      </div>
    );
  }
}

export default Board;
