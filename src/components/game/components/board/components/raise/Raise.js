import React from "react";

const Raise = (props) => (
  <button className="button" onClick={props.onClick}>
    <div>Raise</div>
    {props.betValue}
  </button>
);

export default Raise;
