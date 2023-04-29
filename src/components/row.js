import React, { Component } from 'react';
import Tile from './tile.js';

class Row extends Component {
  render() {
    const { play, row, hover, out, rowNum, board, curr} = this.props;
    
    let rowOutput = Object.keys(row).map(function(i) {
      
      //console.log(rowNum)
      return (<Tile board={board}  key={i} value={row[i]} columnIndex={i} rowIndex={rowNum} play={play} hover={hover} out={out} curr={curr}/>)
    });
    //console.log("break")
    return (<tr>{rowOutput}</tr>)
    
  };
}
export default Row; 