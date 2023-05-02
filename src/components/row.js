import React, { Component } from "react";
import Tile from "./tile.js";

class Row extends Component {
  render() {

    const { selectorType, board, row, rowNum, play, hover, out, curr } =
      this.props;

    let rowOutput = Object.keys(row).map(function (i) {
      return (
        <Tile
          selectorType={selectorType}
          board={board}
          value={row[i]}
          columnIndex={i}
          rowIndex={rowNum}
          play={play}
          hover={hover}
          out={out}
          curr={curr}
        />
      );

    });

    return <tr>{rowOutput}</tr>;
  }
}

export default Row;
