//Check if player has connect 4 tiles vertically
function checkVertical (board, c4rows, c4columns) {
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

//Check if player has connect 4 tiles horizontally
function checkHorizontal (board, c4rows) {
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

//Check if player has connect 4 tiles diagonally
function checkDiagonalRight (board, c4rows) {
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

//Check if player has connect 4 tiles diagonally
function checkDiagonalLeft (board, c4rows, c4columns) {
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

//Declare draw if all spaces are filled but no winner
function checkDraw (board, c4rows, c4columns) {
  for (let r = 0; r < c4rows; r++) {
    for (let c = 0; c < c4columns; c++) {
      if (board[r][c] === null || board[r][c] === 3) {
        return null;
      }
    }
  }
  return "draw";
}

export default function checkAll (board, c4rows, c4columns) {
  return (
    checkVertical(board, c4rows, c4columns) ||
    checkDiagonalRight(board, c4rows) ||
    checkDiagonalLeft(board, c4rows, c4columns) ||
    checkHorizontal(board, c4rows) ||
    checkDraw(board, c4rows, c4columns)
  );
}