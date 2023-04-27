import React, { Component } from 'react';
import './App.css';
import Board from './components/board.js';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Connect Four</h1>
        <Board />
      </div>
    );
  }
}

export default App;
