import React, { Component } from 'react';

class Tile extends Component {
  render() {
    const { play, columnIndex, rowIndex, hover,out, value, board, } = this.props;
    let space = 'open';
    
    if (value === 1) {
      space = 'player1';
    } else if (value === 2) {
      space = 'player2';
    }else if (value===3){
      space='trap';
    }

    return (
      <td>
        <div id={`${rowIndex}${columnIndex}`}  className="tile" onClick={() => play(columnIndex)} 
        onMouseOver={() => hover(board, columnIndex)} onMouseOut={() => out(columnIndex)}>
          
          {/* <div className={["trap", "circle"].join(' ')}></div> */}
          <div className={[space, "circle"].join(' ')}></div>
        </div>
      </td>
    );
  }  
}

export default Tile;

