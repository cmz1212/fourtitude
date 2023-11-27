export default function check3DiagonalLeft (board, c4rows, c4columns, p1, p2) {
  let score = [0, 0];
  for (let r = c4rows - 1; r >= 3; r--) {
    for (let c = 3; c < c4columns; c++) {
      if (board[r][c] === p1 || board[r][c] === p2) {
        if (
          (r === 4 || r === 3) &&
          c !== 6 &&
          board[r][c] === board[r - 1][c - 1] &&
          board[r][c] === board[r - 2][c - 2]
        ) {
          if (board[r + 1][c + 1] === null || board[r + 1][c + 1] === 3) {
            if (board[r][c] === p1) {
              score[0]++;
            } else {
              score[1]++;
            }
          }
          if (board[r - 3][c - 3] === null || board[r - 3][c - 3] === 3) {
            if (board[r][c] === p1) {
              score[0]++;
            } else {
              score[1]++;
            }
          }
        } else if (
          (board[r][c] === board[r - 1][c - 1]) +
            (board[r][c] === board[r - 2][c - 2]) +
            (board[r][c] === board[r - 3][c - 3]) ===
            2 &&
          (board[r - 1][c - 1] === null ||
            board[r - 2][c - 2] === null ||
            board[r - 3][c - 3] === null ||
            board[r - 1][c - 1] === 3 ||
            board[r - 2][c - 2] === 3 ||
            board[r - 3][c - 3] === 3)
        ) {
          if (board[r][c] === p1) {
            score[0]++;
          } else {
            score[1]++;
          }
        }
      }
    }
  }
  return score;
}