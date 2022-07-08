import React from "react";

import classes from "./Stats.module.css";
import withStatsProps from "./withStatsProps";

const Stats = ({ money, bid, strength, pot, isAmountValid }) => (
  <div className={classes.container}>
    {isAmountValid(money) && <h2 className={classes.text}>Money: {money}</h2>}
    {isAmountValid(bid) && <h2 className={classes.text}>Bid: {bid} </h2>}
    {strength && <h2 className={classes.text}>{strength} </h2>}
    {isAmountValid(pot) && <h2 className={classes.text}>Pot: {pot} </h2>}
  </div>
);

export { Stats };
export default withStatsProps(Stats);
