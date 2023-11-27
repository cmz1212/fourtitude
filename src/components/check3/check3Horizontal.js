export default function check3Horizontal (board, c4rows, c4columns, p1, p2) {
  let score = [0, 0];
  for (let r = 0; r < c4rows; r++) {
    for (let c = 0; c < c4columns - 3; c++) {
      if (board[r][c] === p1 || board[r][c] === p2) {
        if (
          board[r][c] === board[r][c + 1] &&
          board[r][c] === board[r][c + 2]
        ) {
          if (c === 0) {
            if (
              (board[r][c + 3] === null || board[r][c + 3] === 3) &&
              board[r][c] !== board[r][c + 4]
            ) {
              if (board[r][c] === p1) {
                score[0]++;
              } else {
                score[1]++;
              }
            }
          } else if (c === 4) {
            if (
              (board[r][c - 1] === null || board[r][c - 1] === 3) &&
              board[r][c] !== board[r][c - 2]
            ) {
              if (board[r][c] === p1) {
                score[0]++;
              } else {
                score[1]++;
              }
            }
          } else {
            if (board[r][c - 1] === null || board[r][c - 1] === 3) {
              if (board[r][c] === p1) {
                score[0]++;
              } else {
                score[1]++;
              }
            }
            if (board[r][c + 3] === null || board[r][c + 3] === 3) {
              if (board[r][c] === p1) {
                score[0]++;
              } else {
                score[1]++;
              }
            }
          }
        } else if (
          (board[r][c] === board[r][c + 1]) +
            (board[r][c] === board[r][c + 2]) +
            (board[r][c] === board[r][c + 3]) ===
            2 &&
          (board[r][c + 1] === null ||
            board[r][c + 2] === null ||
            board[r][c + 3] === null ||
            board[r][c + 1] === 3 ||
            board[r][c + 2] === 3 ||
            board[r][c + 3] === 3)
        ) {
          if (c === 2) {
            if (board[r][c] !== board[r][c - 1]) {
              if (board[r][c] === p1) {
                score[0]++;
              } else {
                score[1]++;
              }
            }
          } else {
            if (board[r][c] === p1) {
              score[0]++;
            } else {
              score[1]++;
            }
          }
        }
      }
    }
  }
  return score;
}