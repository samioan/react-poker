import React from "react";

const Deck = (props) => (
  <button className="button" onClick={props.onClick}>
    <div> Play </div>
    {props.rankValue}
    {props.suitValue}
  </button>
);

export default Deck;
