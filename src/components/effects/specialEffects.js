import audio_fire from "../../sound/fire_burning.wav";
import audio_thunder from "../../sound/thunder_cracking.wav";
import audio_ice from "../../sound/ice_effect.mp3";
import audio_grass from "../../sound/grass_rustling.mp3";

//Function for removing a particular tile
function applyNull (r, c, state, setState, c4rows, c4columns) {
  const board = state.board;
  if (0 <= r <= c4rows && 0 <= c <= c4columns) {
    board[r][c] = null;
  }
  setState((prevState) => ({ ...prevState, board }));
}

const SpecialEffects = {
  fireEffect: (r, c, state, setState, toggleNotification, c4rows, c4columns) => {
    new Audio(audio_fire).play();

    toggleNotification("fire", state.currentPlayer);
    const { board, currentPlayer } = state;
    for (let i = c - 1; i <= c + 1; i++) {
      if (board[r][i] !== 3) {
        applyNull(r + 1, i, state, setState, c4rows, c4columns);
      }
      if (board[r + 1][i] !== 3) {
        applyNull(r + 1, i, state, setState, c4rows, c4columns);
      }
    }
    board[r][c] = currentPlayer;
    setState((prevState) => ({ ...prevState, board }));
  },

  thunderEffect: (r, c, state, setState, toggleNotification, c4rows, c4columns) => {
    new Audio(audio_thunder).play();

    toggleNotification("thunder", state.currentPlayer);
    const board = state.board;
    for (let i = c4rows - 1; i > r; i--) {
      applyNull(i, c, state, setState, c4rows, c4columns);
    }
    setState((prevState) => ({ ...prevState, board }));
  },

  iceEffect: (r, c, state, setState, toggleNotification) => {
        new Audio(audio_ice).play();

    toggleNotification("ice", state.currentPlayer);
    const board = state.board;
    if (r >= 1) {
      board[r - 1][c] = 4;
    }
    if (board[r][c + 1] === null) {
      board[r][c + 1] = 4;
    }
    if (board[r][c - 1] === null) {
      board[r][c - 1] = 4;
    }
    setState((prevState) => ({ ...prevState, board }));
  },

  growthEffect: (r, c, state, setState, toggleNotification) => {
    new Audio(audio_grass).play();

    toggleNotification("growth", state.currentPlayer);
    const { board, currentPlayer } = state;
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
    setState((prevState) => ({ ...prevState, board }));
  },


};

export default SpecialEffects;