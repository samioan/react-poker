import { React } from "react";

import Card from "../card";
import {suitCharToSymbol,suitCharToString,cardNumtoRank,cardSuitChar,cardNumber} from "lib/cardFunctions";

const Hand = ({ hand, visible, onClick, isSelected }) => {
 
  const cardSelector = (value) => {
  return !value
  }
  return (
    <div className="playingCards">
      <div className="board-row">
        {hand.map((card) => (
          <Card
            card={card}
            rank={cardNumtoRank(cardNumber(card))}
            suitSymbol={suitCharToSymbol(cardSuitChar(card))}
            suit={suitCharToString(cardSuitChar(card))}
            selected={isSelected}
            visible={visible}
            onClick={() => onClick(isSelected)}
          />
        ))}
      </div>
    </div>
  );
};

export default Hand;
