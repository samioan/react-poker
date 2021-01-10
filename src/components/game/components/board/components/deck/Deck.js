import { phase } from "models/game/selectors";
import React from "react";
const phaseSelector = (phase) => {
  switch (phase) {
    case 0:
      return "Start Game";
    case 2:
      return "Replace cards";
    default:
      return "Play";
  }
};

const Deck = (props) => (
  <button className="button" onClick={props.onClick}>
    <div> {phaseSelector(phase)} </div>
    {props.rankValue}
    {props.suitValue}
  </button>
);

export default Deck;
