import React from "react";

import { Button } from "components";

import classes from "./Header.module.css";

const Header = () => (
  <div className={classes.container}>
    <h2 className={classes.header}>React Poker</h2>
    <p className={classes.text}>Poker game made in React.js</p>
    <p className={classes.text}>By Ioannis Siampalias</p>
    <div className={classes.buttonsContainer}>
      <Button
        label="Github"
        href="https://github.com/samioan"
        target="_blank"
      />

      <Button
        label="Linkedin"
        href="https://www.linkedin.com/in/ioannis-siampalias/"
        target="_blank"
      />
    </div>
  </div>
);

export default Header;
