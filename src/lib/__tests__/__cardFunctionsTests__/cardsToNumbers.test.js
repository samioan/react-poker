const { cardsToNumbers } = require("lib/cardFunctions");

describe("cardsToNumbers function", () => {
  test("should return [8,12,14,2,7]", () => {
    //GIVEN
    const hand = ["C08", "D12", "H14", "S02", "C07"];
    //WHEN
    const result = cardsToNumbers(hand);
    //THEN
    expect(result).toEqual([8, 12, 14, 2, 7]);
  });
});
