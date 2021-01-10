import React from "react";
import {
  cardSuitChar,
  cardNumber,
  advancedCardNumber,
  advancedCardSuitChar,
} from "lib/handCheck";

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

const suitNumtoRank = (suitRank) => {
  switch (suitRank) {
    case "02":
      return <>2</>;
    case "03":
      return <>3</>;
    case "04":
      return <>4</>;
    case "05":
      return <>5</>;
    case "06":
      return <>6</>;
    case "07":
      return <>7</>;
    case "08":
      return <>8</>;
    case "09":
      return <>9</>;
    case "10":
      return <>10</>;
    case "11":
      return <>J</>;
    case "12":
      return <>Q</>;
    case "13":
      return <>K</>;
    case "14":
      return <>A</>;
    default:
      return null;
  }
};

const Card = (props) => (
  <div className="playingCards faceImages">
    <div
      className={
        "card rank-" +
        advancedCardNumber(cardNumber(props.card)) +
        " " +
        advancedCardSuitChar(props.card)
      }
    >
      <span className="rank">{suitNumtoRank(cardNumber(props.card))}</span>
      <span className="suit">{suitCharToSymbol(cardSuitChar(props.card))}</span>
    </div>
  </div>
);

export default Card;
