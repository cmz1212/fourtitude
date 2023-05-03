function check3_Vertical(board, c4rows, c4columns) {
  let score = [0, 0];
  for (let c = 0; c < c4columns; c++) {
    for (let r = c4rows - 1; r >= 3; r--) {
      if (board[r][c] === 1 || board[r][c] === 2) {
        if (
          board[r][c] === board[r - 1][c] &&
          board[r][c] === board[r - 2][c] &&
          board[r - 3][c] === null
        ) {
          score[board[r][c] - 1]++;
        }
      }
    }
  }
  return score;
}

export default check3_Vertical;
