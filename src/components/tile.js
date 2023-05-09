import React, { Component } from "react";

class Tile extends Component {
  render() {

    const {
      selectorType,
      board,
      value,
      columnIndex,
      rowIndex,
      play,
      hover,
      out,
      curr,
    } = this.props;

    let space = "";
    if (selectorType === true) {
      space = "selector-open";
    } else {
      space = "open";
    }


    if (value === 1) {
      space = "player1";
    } else if (value === 2) {
      space = "player2";
    } else if (value === 3) {
      space = "trap";
    }else if (value === 4) {
      space = "freeze";
    }else if (value === 5) {
      space = "playerGreen";
    }
    else if (value === 6) {
      space = "playerGrey";
    }
    else if (value === 7) {
      space = "playerPurple";
    }
    else if (value === 8) {
      space = "playerBrown";
    }


    if (selectorType === true) {
      return (
        <td>
          <div
            className="selector-tile"
            onClick={() => play(columnIndex)}


   

            onMouseOver={() => hover(board, columnIndex, curr)}
            onMouseOut={() => out(columnIndex)}
          >
            <div
              id={`selector${columnIndex}`}
              className={[space, "circle"].join(" ")}
            ></div>
          </div>

        </td>
      );
    } else {
      return (
        <td>

          <div
            id={`${rowIndex}${columnIndex}`}
            className="tile"
            onClick={() => play(columnIndex)}
            onMouseOver={() => hover(board, columnIndex, curr)}
            onMouseOut={() => out(columnIndex)}
          >
            <div className={[space, "circle"].join(" ")}></div>
          </div>
        </td>
      );
    }
  }
}

export default Tile;
