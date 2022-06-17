import React from "react";
import { Board, Intro } from "routes";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";

const routes = [
  { path: "/", component: <Intro /> },
  { path: "/game", component: <Board /> },
];

const App = () => (
  <Router>
    {routes.map(({ path, component }) => (
      <Switch>
        <Route exact path={path}>
          {component}
        </Route>
      </Switch>
    ))}
  </Router>
);

export { App };
export default App;
