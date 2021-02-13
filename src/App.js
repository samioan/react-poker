import React from "react";
import { Board, Intro } from "./components/game/components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";

const App = () => (
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
);

export { App };
export default App;
