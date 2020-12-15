import React from "react";

const Deck = (props) => (
  <button className="button" onClick={props.onClick}>
    <div>Begin</div>
    {props.rankValue}
    {props.suitValue}
  </button>
);

export default Deck;
