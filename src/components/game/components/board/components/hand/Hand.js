import { React } from "react";

import Card from "../card";
import {
  suitCharToSymbol,
  suitCharToString,
  cardNumtoRank,
  cardSuitChar,
  cardNumber,
} from "lib/cardFunctions";

const Hand = ({ hand, visible, onClick, isSelected }) => (
  <div className="playingCards">
    <div className="board-row">
      {hand.map((card) => (
        <Card
          key={card}
          card={card}
          rank={cardNumtoRank(cardNumber(card))}
          suitSymbol={suitCharToSymbol(cardSuitChar(card))}
          suit={suitCharToString(cardSuitChar(card))}
          selected={isSelected}
          visible={visible}
          onClick={() => onClick(card)}
        />
      ))}
    </div>
  </div>
);

export default Hand;
