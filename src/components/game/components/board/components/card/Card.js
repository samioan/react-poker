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

const Card = ({ card }) => (
  <div className="playingCards faceImages">
    <label
      for={
        "c-" +
        cardNumtoRank(cardNumber(card)).toLowerCase() +
        "" +
        suitCharToString(cardSuitChar(card)).charAt(0).toUpperCase()
      }
      className={
        "card rank-" +
        cardNumtoRank(cardNumber(card)).toLowerCase() +
        " " +
        suitCharToString(cardSuitChar(card))
      }
    >
      <span className="rank">{cardNumtoRank(cardNumber(card))}</span>
      <span className="suit">{suitCharToSymbol(cardSuitChar(card))}</span>
      <input
        type="checkbox"
        name={
          "c-" +
          cardNumtoRank(cardNumber(card)).toLowerCase() +
          "" +
          suitCharToString(cardSuitChar(card)).charAt(0).toUpperCase()
        }
        id={
          "c-" +
          cardNumtoRank(cardNumber(card)).toLowerCase() +
          "" +
          suitCharToString(cardSuitChar(card)).charAt(0).toUpperCase()
        }
        value="select"
      />
    </label>
  </div>
);

export default Card;
