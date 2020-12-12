import React from "react";
import { cardSuitChar, cardNumber } from "lib/handCheck";

const suitCharToSymbol = (suitChar) => {
  switch (suitChar) {
    case "H":
      return <>&hearts;</>;
    case "C":
      return <>&clubs;</>;
    case "D":
      return <>&diams;</>;
    case "S":
      return <>&spades;</>;
    default:
      return null;
  }
};

const Card = (props) => (
  <div class="playingCards simpleCards">
    <div class="card">
      <span class="rank">{cardNumber(props.card)}</span>
      <span class="suit">{suitCharToSymbol(cardSuitChar(props.card))}</span>
    </div>
  </div>
);

export default Card;
