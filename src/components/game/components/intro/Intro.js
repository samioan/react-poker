import React from "react";
import { Linking, BackHandler } from "react-native";

import { Link } from "react-router-dom";
import { Button } from "../board/components";
import { Forecast } from "./components";

import "./intro.css";

const Intro = () => (
  <div className="container">
    <div className="header-row">
      <h2 className="textArea">React Poker App</h2>
      <p className="text">Poker app made in React.js.</p>
      <p className="text">By Ioannis Siampalias</p>
      <div className="buttons-row">
        <Button
          id={"Github"}
          onClick={() => {
            Linking.openURL("https://github.com/samioan");
          }}
        />
        <Button
          id={"Linkedin"}
          onClick={() => {
            Linking.openURL("https://www.linkedin.com/in/ioannis-siampalias/");
          }}
        />
        <Button
          id={"Youtube"}
          onClick={() => {
            Linking.openURL(
              "https://www.youtube.com/channel/UCMeE4EgASe1WQDSbpTopDcQ"
            );
          }}
        />
      </div>
    </div>
    <div className="buttons-row">
      <Link to="/game">
        <Button id={"New Game"} />
      </Link>
      <Button id={"Exit Game"} onClick={() => BackHandler.exitApp()} />
    </div>
    <div className="buttons-row">
      <Forecast />
    </div>
  </div>
);
export default Intro;
