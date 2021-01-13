import React from "react";

const Buttons = ({id, onClick, visible}) => (
  visible ? 
  <button className="button" onClick={onClick}>
    <div>{id}</div>
  </button> : (<></>)
);

export default Buttons;
