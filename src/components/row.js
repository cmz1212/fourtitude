import React, { Component } from 'react';
import Tile from './tile.js';

class Row extends Component {
  render() {
    const { play, row, hover, out, rowNum, board, traps, curr} = this.props;
    
    let rowOutput = Object.keys(row).map(function(i) {
      
      //console.log(traps)
      return (<Tile board={board}  key={i} value={row[i]} columnIndex={i} rowIndex={rowNum} play={play} hover={hover} out={out} curr={curr} traps={traps}/>)
    });
    //console.log("break")
    return (<tr>{rowOutput}</tr>)
    
  };
}
export default Row; 
