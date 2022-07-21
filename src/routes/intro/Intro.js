import React from "react";

import { Button } from "components";

import { logo } from "./images";
import classes from "./Intro.module.css";
import withIntroProps from "./withIntroProps";
import { Forecast, Header } from "./components";

const Intro = ({ startGame }) => (
  <div className={classes.container}>
    <Header />
    <img src={logo} className={classes.logo} />
    <Button label="Start Game" href="/game" onClick={startGame} />
    <Forecast />
  </div>
);
export default withIntroProps(Intro);
