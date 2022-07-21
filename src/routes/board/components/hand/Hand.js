import React from "react";

import { Card } from "./components";
import {
  cardNumtoRank,
  cardSuitChar,
  cardNumber,
  suitChar,
} from "lib/cardFunctions";

import classes from "./Hand.module.css";

const Hand = ({ hand, visible, onClick }) => (
  <div className={classes.container}>
    {hand.map((card) => (
      <Card
        key={card}
        card={card}
        rank={cardNumtoRank(cardNumber(card))}
        suitSymbol={suitChar(cardSuitChar(card)).symbol}
        suit={suitChar(cardSuitChar(card)).string}
        visible={visible}
        onClick={() => onClick && onClick(card)}
      />
    ))}
  </div>
);

export { Hand };
export default Hand;
