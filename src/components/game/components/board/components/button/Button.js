import React from "react";

const Button = ({ id, onClick }) => (
  <button className="button" onClick={onClick}>
    <div>{id}</div>
  </button>
);

export default Button;
