import React from "react";

import classes from "./Log.module.css";
import withLogProps from "./withLogProps";

const Log = ({ list, id, logText, logRef }) => (
  <div className={classes.container} ref={logRef}>
    {list.map((item) => (
      <p key={id(item)} className={classes.text}>
        {logText(item)}
      </p>
    ))}
  </div>
);

export default withLogProps(Log);
