import React from "react";

const Stats = ({ money, bid, strength }) => (
  <div className="board-row">
    <h2 className="text">Money: {money}</h2>
    <h2 className="text">Bid: {bid}</h2>
    <h2 className="text">{strength}</h2>
  </div>
);

export default Stats;
