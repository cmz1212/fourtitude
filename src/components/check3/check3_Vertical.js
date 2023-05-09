function check3_Vertical(board, c4rows, c4columns, p1, p2) {
  let score = [0, 0];
  for (let c = 0; c < c4columns; c++) {
    for (let r = c4rows - 1; r >= 3; r--) {
      if (board[r][c] === p1 || board[r][c] === p2) {
        if (
          board[r][c] === board[r - 1][c] &&
          board[r][c] === board[r - 2][c] &&
          (board[r - 3][c] === null || board[r - 3][c] === 3)
        ) {
          if (board[r][c] === p1) {
            score[0]++;
          } else {
            score[1]++;
          };
        }
      }
    }
  }
  return score;
}

export default check3_Vertical;
