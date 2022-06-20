import React from "react";
import { Link } from "react-router-dom";

import classes from "./Button.module.css";

const Button = ({ label, onClick, href, disabled }) => (
  <Link
    to={{
      pathname: href,
    }}
  >
    <button
      className={classes.button}
      onClick={onClick}
      href={href}
      disabled={disabled}
    >
      {label}
    </button>
  </Link>
);

export { Button };
export default Button;
