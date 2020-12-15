const deckCreator = () => {
  const deck = [];

  const suits = ["H", "S", "C", "D"];
  const values = [
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

  for (let suit in suits) {
    for (let value in values) {
      deck.push(`${suits[suit]}${values[value]}`);
    }
  }

  let m = deck.length,
    i;

  while (m) {
    i = Math.floor(Math.random() * m--);

    [deck[m], deck[i]] = [deck[i], deck[m]];
  }

  return deck;
};

export default deckCreator;
