import React from "react";
import { Link } from "react-router-dom";
import { Forecast } from "./components";

const Intro = (props) => (
  <>
    <h2>Welcome!</h2>
    <Forecast />
    <button className="button">
      <Link to="/game">Start the game!</Link>
    </button>
  </>
);
export default Intro;
