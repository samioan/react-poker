import React from "react";

const Replace = (props) => (
  <button className="button" onClick={props.onClick}>
    <div>Replace cards</div>
    {props.rankValue}
    {props.suitValue}
  </button>
);

export default Replace;
