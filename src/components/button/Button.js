import React from "react";
import { Link } from "react-router-dom";

import classes from "./Button.module.css";

const Button = ({ label, onClick, href, disabled, target }) => (
  <Link
    to={{
      pathname: href,
    }}
    target={target}
  >
    <button className={classes.button} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  </Link>
);

Button.defaultProps = {
  target: "_self",
};

export { Button };
export default Button;
