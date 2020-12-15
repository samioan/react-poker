import React from "react";

const Draw = (props) => (
  <button className="button" onClick={props.onClick}>
    <div>Draw a card</div>
    {props.rankValue}
    {props.suitValue}
  </button>
);

export default Draw;
