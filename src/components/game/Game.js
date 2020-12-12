import React from "react";
import { Board } from "./components";

class Game extends React.Component {
  render() {
    return (
      <>
        <h1>Poker App</h1>

        <Board />
      </>
    );
  }
}

export default Game;
