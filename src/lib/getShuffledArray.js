import { cloneDeep } from "lodash";

const getShuffledArray = (deck) => {
  const shuffledDeck = cloneDeep(deck);
  let remainingIterations = shuffledDeck.length;

  while (remainingIterations) {
    const randomNumber = Math.floor(Math.random() * remainingIterations--);

    [shuffledDeck[remainingIterations], shuffledDeck[randomNumber]] = [
      shuffledDeck[randomNumber],
      shuffledDeck[remainingIterations],
    ];
  }

  return shuffledDeck;
};

export { getShuffledArray };
export default getShuffledArray;
