import React from "react";

import { Link } from "react-router-dom";
import { Button } from "../board/components";
import { Forecast } from "./components";

import "./intro.css";

const Intro = () => (
  <div className="intro-container">
    <div className="header-row">
      <h2 className="textArea">React Poker App</h2>
      <p className="text">Poker app made in React.js.</p>
      <p className="text">By Ioannis Siampalias</p>
      <div className="buttons-row">
        <Link
          to={{
            pathname: "https://github.com/samioan",
          }}
          target="_blank"
        >
          <Button id={"Github"} />
        </Link>
        <Link
          to={{
            pathname: "https://www.linkedin.com/in/ioannis-siampalias/",
          }}
          target="_blank"
        >
          <Button id={"Linkedin"} />
        </Link>
        <Link
          to={{
            pathname:
              "https://www.youtube.com/channel/UCMeE4EgASe1WQDSbpTopDcQ",
          }}
          target="_blank"
        >
          <Button id={"Youtube"} />
        </Link>
      </div>
    </div>
    <div className="buttons-row">
      <img className="logo-image" />
    </div>
    <div className="buttons-row">
      <Link to="/game">
        <Button id={"New Game"} />
      </Link>
    </div>
    <div className="buttons-row">
      <Forecast />
    </div>
  </div>
);
export default Intro;
