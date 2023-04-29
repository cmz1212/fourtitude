import React, { Component } from "react";
import "./App.css";
import Board from "./components/board.js";

class App extends Component {
  render() {
    return (
      <div id="root">
        <br />
        <h1>Fourtitude</h1>
        <br />
        <Board />
      </div>
    );
  }
}

export default App;
