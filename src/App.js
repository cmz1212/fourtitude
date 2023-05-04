import React, { Component } from "react";
import "./App.css";
import Board from "./components/board.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.displayBtn = this.displayBtn.bind(this);

    this.displayHelp = this.displayHelp.bind(this);
    this.hideHelp = this.hideHelp.bind(this);
  }
  ToggleCnt = 1;
  displayBtn() {
    this.ToggleCnt++;
    if (this.ToggleCnt % 2 === 0) {
      this.displayHelp();
    } else {
      this.hideHelp();
    }
  
  }

  displayHelp() {
    let titleWidth = 470;
    let bodyHeight = 570;

    document.getElementById("heading").style.display = "block";

    document.getElementById("description").style.display = "block";

    document.getElementById("helpBody").style.height = bodyHeight + "px";

    document.getElementById("helpTitle").style.width = titleWidth + "px";
  }
  hideHelp() {
    let titleWidth = 0;
    let bodyHeight = 0;

    document.getElementById("helpTitle").style.width = titleWidth + "px";

    document.getElementById("heading").style.display = "none";

    document.getElementById("helpBody").style.height = bodyHeight + "px";

    document.getElementById("description").style.display = "none";
  }
  render() {
    return (
      <div id="app-root">
        <div className="help-container">
          <button className="btn-help" id="btnHelp" onClick={this.displayBtn}>
            ?
          </button>

          <div className="help-title" id="helpTitle">
            <h2 id="heading">Help</h2>
            <div className="help-body" id="helpBody">
              <p id="description">
                When a tile is dropped onto these special spaces, the following
                special effects may be triggered: {<br />}Fire: {<br />}Thunder:{" "}
                {<br />}Ice: {<br />}Growth:{<br />}Click on ? again to hide
                this panel.
              </p>
            </div>
          </div>
        </div>
        <h1>Fourtitude</h1>
        <Board />
      </div>
    );
  }
}

export default App;
