import check3DiagonalLeft from "./check3DiagonalLeft.js";
import check3DiagonalRight from "./check3DiagonalRight.js";

export default function check3Diagonals (board, c4rows, c4columns, p1, p2) {
  return check3DiagonalLeft(board,c4rows,c4columns, p1, p2).map(
      (elem, index) => elem + check3DiagonalRight(board, c4rows, c4columns, p1, p2)[index]);
}