import React from "react";

import Card from "../card";
import {
  cardNumtoRank,
  cardSuitChar,
  cardNumber,
  suitChar,
} from "lib/cardFunctions";

const Hand = ({ hand, visible, onClick }) => (
  <div className="playingCards">
    <div className="board-row">
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
  </div>
);

export { Hand };
export default Hand;
