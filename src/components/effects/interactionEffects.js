import audio_click from "../../sound/click.wav";

const InteractionEffects = {
  dropTiles: (state, setState, c4columns) => {
    const board = state.board;
    for (let r = 4; r >= 0; r--) {
      for (let c = 0; c < c4columns; c++) {
        if ( (board[r + 1][c] === null || board[r + 1][c] === 3) && board[r][c] !== 3 ) {
          board[r + 1][c] = board[r][c];
          board[r][c] = null;
        }
      }
    }
    setState((prevState) => ({ ...prevState, board }));
  },

  hoverDisplay: (c, state, curr, c4rows) => {
    const board = state.board;
    let audio = new Audio(audio_click);
    audio.volume = 0.1;
    let space;
    if (curr === 1) {
      space = "player1";
    } else if (curr === 2) {
      space = "player2";
    } else if (curr === 5) {
      space = "playerGreen";
    } else if (curr === 6) {
      space = "playerGrey";
    } else if (curr === 7) {
      space = "playerPurple";
    } else if (curr === 8) {
      space = "playerBrown";
    }
    let c_name = "";
    if (curr === state.player1) {
      c_name = [space, "circle"].join(" ");
    } else if (curr === state.player2) {
      c_name = [space, "circle"].join(" ");
    }

    document.getElementById("selector" + c.toString()).className = c_name.toString();

    for (let r = c4rows - 1; r >= 0; r--) {
      if (!board[r][c] || board[r][c] === 3) {
        audio.play();
        document.getElementById(r.toString() + c.toString()).className = "tile-hover";
        break;
      }
    }
  },

  hoverOut: (c, c4rows) => {
    const selector_name = "selector" + c.toString();
    const c_name = ["selector-open", "circle"].join(" ");
    document.getElementById(selector_name).className = c_name.toString();

    for (let r = 0; r < c4rows; r++) {
      const name = r.toString() + c.toString();
      document.getElementById(name).className = "tile";
    }
  },

};

export default InteractionEffects;