import React from "react";
import { Board, Intro } from "routes";
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
