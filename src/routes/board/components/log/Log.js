import React from "react";

import classes from "./Log.module.css";
import withLogProps from "./withLogProps";

const Log = ({ list, id, logText, listEndRef }) => (
  <div className={classes.container}>
    {list.map((item) => (
      <p key={id(item)} className={classes.text}>
        {logText(item)}
      </p>
    ))}

    <div ref={listEndRef} />
  </div>
);

export default withLogProps(Log);
