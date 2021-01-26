import React from "react";

const Stats = ({ money, bid, strength, pot }) => (
  <div className="board-row">
    {money > -1 && <h2 className="textArea">Money: {money}</h2>}
    {bid > -1 && <h2 className="textArea">&nbsp; Bid: {bid} </h2>}
    {strength && <h2 className="textArea">&nbsp; {strength} </h2>}
    {pot > -1 && <h2 className="textArea">Pot: {pot} </h2>}
  </div>
);

export { Stats };
export default Stats;
