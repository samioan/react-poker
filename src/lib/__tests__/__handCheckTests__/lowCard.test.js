const { lowCard } = require("lib/handCheck");

describe("lowCard function", () => {
  test("should return 2", () => {
    //GIVEN
    const hand = ["C14", "D04", "H08", "S10", "C02"];
    //WHEN
    const result = lowCard(hand);
    //THEN
    expect(result).toEqual(2);
  });
});
