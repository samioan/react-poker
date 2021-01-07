import React from "react";
import { Board, Intro } from "./components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Game = (props) => {
  return (
    <>
      <h1>Poker App</h1>
      <Router>
        <Switch>
          <Route exact path="/">
            <Intro />
          </Route>
        </Switch>
        <Switch>
          <Route path="/game">
            <Board />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default Game;
