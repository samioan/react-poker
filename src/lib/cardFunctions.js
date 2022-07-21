import _ from "lodash";

//Detects a card's number
const cardNumber = (card) => card.slice(1, 3);

//Detects a card's suite
const cardSuitChar = (card) => {
  if (typeof card === "string") {
    return card.charAt(0);
  } else return undefined;
};

//Detects a card's strength
const cardStrength = (card) => parseInt(cardNumber(card), 10);

//Turns all cards into numbers
const cardsToNumbers = (hand) => hand.map((card) => cardStrength(card));

//Check if a hand has cards of the same number
const cardsDuplicates = (hand) => {
  return Object.values(_.groupBy(hand, cardNumber)).map((card) => card.length);
};

const suitChar = (suitChar) => {
  const suits = {
    H: { symbol: <>&hearts;</>, string: "hearts" },
    C: { symbol: <>&clubs;</>, string: "clubs" },
    D: { symbol: <>&diams;</>, string: "diams" },
    S: { symbol: <>&spades;</>, string: "spades" },
  };
  return suits[suitChar] || {};
};
//Displays the card's rank in a string
const cardNumtoRank = (suitRank) => {
  const characters = ["10", "J", "Q", "K", "A"];
  const suitRankNumber = parseInt(suitRank);

  if (suitRank <= 9) {
    return suitRank.charAt(1).toString();
  }
  if (suitRank > 9 && suitRank < 15) {
    return characters[suitRankNumber - 10];
  }
  return null;
};

export {
  suitChar,
  cardNumber,
  cardSuitChar,
  cardStrength,
  cardsToNumbers,
  cardsDuplicates,
  cardNumtoRank,
};
