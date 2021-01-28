const { cardNumber } = require("lib/cardFunctions");

describe("cardNumber function", () => {
  test("should return 08", () => {
    //GIVEN
    const card = "C08";
    //WHEN
    const result = cardNumber(card);
    //THEN
    expect(result).toEqual("08");
  });
});
