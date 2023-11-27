import React from "react";

export default function Tile ({ selectorType, state, value, columnIndex, rowIndex, play, hover, out, curr, c4rows }) {
    let space = "";
    if (selectorType === true) { space = "selector-open"; }
    else { space = "open"; }

    if (value === 1) { space = "player1";}
    else if (value === 2) { space = "player2";}
    else if (value === 3) { space = "trap";}
    else if (value === 4) { space = "freeze";}
    else if (value === 5) { space = "playerGreen";}
    else if (value === 6) { space = "playerGrey";}
    else if (value === 7) { space = "playerPurple";}
    else if (value === 8) { space = "playerBrown";}

    return (
      <td>
        {selectorType ? (
          <div className="selector-tile" onClick={() => play(columnIndex)} onMouseOver={() => hover(columnIndex, state, curr, c4rows)} onMouseOut={() => out(columnIndex, c4rows)}>
            <div id={`selector${columnIndex}`} className={[space, "circle"].join(" ")}></div>
          </div>
        ) : (
          <div id={`${rowIndex}${columnIndex}`} className="tile" onClick={() => play(columnIndex)} onMouseOver={() => hover(columnIndex, state, curr, c4rows)} onMouseOut={() => out(columnIndex, c4rows)}>
            <div className={[space, "circle"].join(" ")}></div>
          </div>
        )}
      </td>
  );
};