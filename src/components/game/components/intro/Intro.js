import React from "react";
import { Link } from "react-router-dom";

const Intro = (props) => (
  <>
    <h2>Welcome!</h2>
    <button className="button">
      <Link to="/game">Start the game!</Link>
    </button>
  </>
);
export default Intro;
