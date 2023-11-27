import React from "react";
import Tile from "./tile.js";

export default function Row ({ selectorType, state, row, rowNum, play, hover, out, curr, c4rows }) {
  const rowOutput = Object.keys(row).map((i) => (
    <Tile key={i} selectorType={selectorType} state={state} value={row[i]} columnIndex={i} rowIndex={rowNum} play={play} hover={hover} out={out} curr={curr} c4rows={c4rows}/>
  ));

  return <tr>{rowOutput}</tr>;
};