import React from "react";
import "./App.css";
import Board from "./Board";
import { parseCommands } from "./util";

class App extends React.Component {
  constructor() {
    super();
    this.executeCommands = this.executeCommands.bind(this);
    this.getResult = this.getResult.bind(this);
    this.state = {
      result: ""
    };
    this.board = new Board(5, 5, this.getResult);
  }

  executeCommands() {
    try {
      const comms = parseCommands(this.taRef.value);
      this.board.clear();
      const commSum = comms.length;
      for (let i = 0; i < commSum; i++) {
        this.board.executeCommand(comms[i]);
      }
    } catch (e) {
      //TODO add error handling logic
      console.log(e.message);
    }
  }

  getResult(val) {
    this.setState({
      result: val
    });
  }

  render() {
    return (
      <div>
        <div>Please enter the commands:</div>
        <textarea ref={(itm) => (this.taRef = itm)} />
        <button onClick={this.executeCommands}>EXECUTE</button>
        <div>output: {this.state.result}</div>
      </div>
    );
  }
}

export default App;
