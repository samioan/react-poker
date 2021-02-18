import handCheck from "lib/handCheck";

const compareHands = (firstHand, secondHand) => {
  const firstHandResult = handCheck(firstHand)[0];
  const secondHandResult = handCheck(secondHand)[0];

  if (firstHandResult > secondHandResult) return 1;
  if (firstHandResult < secondHandResult) return 2;
  return -1;
};

export { compareHands };
export default compareHands;
