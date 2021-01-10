import _ from "lodash";

//Detects a card's number
const cardNumber = (card) => card.slice(1, 3);

const advancedCardNumber = (card) => {
  switch (card) {
    case "02":
      return "2";
    case "03":
      return "3";
    case "04":
      return "4";
    case "05":
      return "5";
    case "06":
      return "6";
    case "07":
      return "7";
    case "08":
      return "8";
    case "09":
      return "9";
    case "10":
      return "10";
    case "11":
      return "j";
    case "12":
      return "q";
    case "13":
      return "k";
    case "14":
      return "a";
    default:
      return null;
  }
};

//Detects a card's suite
const cardSuitChar = (card) => {
  if (typeof card === "string") {
    return card.charAt(0);
  } else return undefined;
};

const advancedCardSuitChar = (card) => {
  if (typeof card === "string") {
    switch (card.charAt(0)) {
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

//Check if we have a royal flush
const isRoyalFlush = (hand) =>
  isFlush(hand) && isStraight(hand) && lowCard(hand) === 10;

//Check if we have a straight flush
const isStraightFlush = (hand) => isFlush(hand) && isStraight(hand);

//Check if we have four of a kind
const isFourOfAKind = (hand) => cardsDuplicates(hand).includes(4);

//Check if we have a full house
const isFullHouse = (hand) =>
  cardsDuplicates(hand).includes(3) && cardsDuplicates(hand).includes(2);

//Check if we have a flush
const isFlush = (hand) => {
  const firstCardSuit = cardSuitChar(hand[0]);
  return hand.every((card) => cardSuitChar(card) === firstCardSuit);
};

//Check if we have a straight
const isStraight = (hand) => {
  const lowestCard = Math.min(...cardsToNumbers(hand));
  return (
    (cardsToNumbers(hand).includes(lowestCard) &&
      cardsToNumbers(hand).includes(lowestCard + 1) &&
      cardsToNumbers(hand).includes(lowestCard + 2) &&
      cardsToNumbers(hand).includes(lowestCard + 3) &&
      cardsToNumbers(hand).includes(lowestCard + 4)) ||
    (cardsToNumbers(hand).includes(14) &&
      cardsToNumbers(hand).includes(2) &&
      cardsToNumbers(hand).includes(3) &&
      cardsToNumbers(hand).includes(4) &&
      cardsToNumbers(hand).includes(5))
  );
};

//Check if we have three of a kind
const isThreeOfAKind = (hand) => cardsDuplicates(hand).includes(3);

//Check if we have two pairs
const isTwoPair = (hand) =>
  cardsDuplicates(hand).includes(2) && cardsDuplicates(hand).length === 3;

//Check if we have a pair
const isPair = (hand) => cardsDuplicates(hand).includes(2);

//Check for the highest card
//const highCard = (hand) => Math.max(...cardsToNumbers(hand));

//Check for the lowest card
const lowCard = (hand) => Math.min(...cardsToNumbers(hand));

//Determines the player's current hand
const handCheck = (hand) => {
  switch (true) {
    case isRoyalFlush(hand):
      return 10;
    case isStraightFlush(hand):
      return 9;
    case isFourOfAKind(hand):
      return 8;
    case isFullHouse(hand):
      return 7;
    case isFlush(hand):
      return 6;
    case isStraight(hand):
      return 5;
    case isThreeOfAKind(hand):
      return 4;
    case isTwoPair(hand):
      return 3;
    case isPair(hand):
      return 2;
    default:
      return 1;
  }
};

export {
  cardNumber,
  advancedCardNumber,
  cardSuitChar,
  advancedCardSuitChar,
  cardStrength,
  cardsToNumbers,
  cardsDuplicates,
  isRoyalFlush,
  isStraightFlush,
  isFourOfAKind,
  isFullHouse,
  isFlush,
  isStraight,
  isThreeOfAKind,
  isTwoPair,
  isPair,
  lowCard,
  handCheck,
};

export default handCheck;
