import { React } from "react";

import { cardNumber, cardSuitChar } from "lib/handCheck";
import Card from "../card";

const Hand = ({ hand, visible, onClick, isSelected }) => {
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

  const suitCharToString = (suitChar) => {
    switch (suitChar) {
      case "H":
        return "hearts";
      case "C":
        return "clubs";
      case "D":
        return "diams";
      case "S":
        return "spades";
      default:
        return null;
    }
  };

  const cardNumtoRank = (suitRank) => {
    if (suitRank <= 9) {
      return suitRank.charAt(1).toString();
    }
    switch (suitRank) {
      case "10":
        return "10";
      case "11":
        return "J";
      case "12":
        return "Q";
      case "13":
        return "K";
      case "14":
        return "A";
      default:
        return null;
    }
  };

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
            onClick={() => onClick(card)}
          />
        ))}
      </div>
    </div>
  );
};

export default Hand;
