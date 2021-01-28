const { cardStrength } = require("lib/cardFunctions");

describe("cardStrength function", () => {
  test("should return 8", () => {
    //GIVEN
    const card = "C08";
    //WHEN
    const result = cardStrength(card);
    //THEN
    expect(result).toEqual(8);
  });
});
