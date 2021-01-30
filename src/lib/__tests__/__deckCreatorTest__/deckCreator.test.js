const { deckCreator } = require("lib/deckCreator");

describe("deckCreator function", () => {
  test("should check if our deck has been created", () => {
    //GIVEN
    const mock_suits = ["C", "D", "H", "S"];
    const mock_ranks = Array(13)
      .fill(null)
      .map((_, i) => {
        const stringifiedNumber = (i + 2).toString();
        return stringifiedNumber.length < 2
          ? "0" + stringifiedNumber
          : stringifiedNumber;
      });

    const mock_deck = [];

    for (let i = 0; i < mock_ranks.length; i++) {
      for (let y = 0; y < mock_suits.length; y++) {
        mock_deck.push(mock_suits[y] + mock_ranks[i]);
      }
    }

    //WHEN
    const result = mock_deck.every((i) => deckCreator().includes(i));
    //THEN
    expect(result).toBeTruthy();
  });
});
