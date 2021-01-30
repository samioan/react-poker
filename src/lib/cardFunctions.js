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

//Displays the card's suit symbol
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

//Displays the card's suit in a string
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

//Displays the card's rank in a string
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

export {
  cardNumber,
  cardSuitChar,
  cardStrength,
  cardsToNumbers,
  cardsDuplicates,
  suitCharToSymbol,
  suitCharToString,
  cardNumtoRank,
};
