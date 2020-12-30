import React from "react";

const Replace = (props) => (
  <button className="button" onClick={props.onClick}>
    <div>Replace a card</div>
    {props.rankValue}
    {props.suitValue}
  </button>
);

export default Replace;
