import { shuffle } from "lodash";

const deckCreator = () => {
  const suits = ["H", "S", "C", "D"];
  const ranks = [
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
  ];

  const deck = [...ranks.map((x) => suits.map((y) => y + x))].flat();

  return shuffle(deck);
};

export { deckCreator };
export default deckCreator;
