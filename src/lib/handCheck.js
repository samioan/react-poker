import { cardSuitChar, cardsToNumbers, cardsDuplicates } from "./cardFunctions";

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
      return [10, "Royal Flush"];
    case isStraightFlush(hand):
      return [9, "Straight Flush"];
    case isFourOfAKind(hand):
      return [8, "Four of a kind"];
    case isFullHouse(hand):
      return [7, "Full House"];
    case isFlush(hand):
      return [6, "Flush"];
    case isStraight(hand):
      return [5, "Straight"];
    case isThreeOfAKind(hand):
      return [4, "Three of a kind"];
    case isTwoPair(hand):
      return [3, "Two Pairs"];
    case isPair(hand):
      return [2, "One Pair"];
    default:
      return [1, "No Strength"];
  }
};
export {
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
