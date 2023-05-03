function check3_Horizontal(board, c4rows, c4columns) {
  let score = [0, 0];
  for (let r = 0; r < c4rows; r++) {
    for (let c = 0; c < c4columns - 3; c++) {
      if (board[r][c] === 1 || board[r][c] === 2) {
        if (
          board[r][c] === board[r][c + 1] &&
          board[r][c] === board[r][c + 2]
        ) {
          if (c === 0) {
            if (board[r][c + 3] === null && board[r][c] !== board[r][c + 4]) {
              score[board[r][c] - 1]++;
            }
          } else if (c === 4) {
            if (board[r][c - 1] === null && board[r][c] !== board[r][c - 2]) {
              score[board[r][c] - 1]++;
            }
          } else {
            if (board[r][c - 1] === null) {
              score[board[r][c] - 1]++;
            }
            if (board[r][c + 3] === null) {
              score[board[r][c] - 1]++;
            }
          }
        } else if (
          (board[r][c] === board[r][c + 1]) +
            (board[r][c] === board[r][c + 2]) +
            (board[r][c] === board[r][c + 3]) ===
            2 &&
          (board[r][c + 1] === null ||
            board[r][c + 2] === null ||
            board[r][c + 3] === null)
        ) {
          if (c === 2) {
            if (board[r][c] !== board[r][c - 1]) {
              score[board[r][c] - 1]++;
            }
          } else {
            score[board[r][c] - 1]++;
          }
        }
      }
    }
  }
  return score;
}

export default check3_Horizontal;
