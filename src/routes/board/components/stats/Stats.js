import React from "react";

import classes from "./Stats.module.css";

const Stats = ({ money, bid, strength, pot }) => (
  <div className={classes.container}>
    {money > -1 && <h2 className={classes.text}>Money: {money}</h2>}
    {bid > -1 && <h2 className={classes.text}>Bid: {bid} </h2>}
    {strength && <h2 className={classes.text}>{strength} </h2>}
    {pot > -1 && <h2 className={classes.text}>Pot: {pot} </h2>}
  </div>
);

export { Stats };
export default Stats;
