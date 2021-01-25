import React from "react";
import "./button.css";

const Button = ({ id, onClick }) => (
  <button className="button" onClick={onClick}>
    <div>{id}</div>
  </button>
);

export { Button };
export default Button;
