import React from "react";
import { Link } from "react-router-dom";
import { Forecast } from "./components";

const Intro = (props) => (
  <>
    <div className="buttons-row">
      <h2>Welcome!</h2>
    </div>
    <div className="buttons-row">
      <Forecast />
    </div>
    <div className="buttons-row">
      <button className="button">
        <Link to="/game">Start the game!</Link>
      </button>
    </div>
  </>
);
export default Intro;
