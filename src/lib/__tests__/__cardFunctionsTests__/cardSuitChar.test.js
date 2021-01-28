const { cardSuitChar } = require("lib/cardFunctions");

describe("cardSuitChar function", () => {
  test("should return C", () => {
    //GIVEN
    const card = "C08";
    //WHEN
    const result = cardSuitChar(card);
    //THEN
    expect(result).toEqual("C");
  });
  test("should return undefined", () => {
    //GIVEN
    const card = 25;
    //WHEN
    const result = cardSuitChar(card);
    //THEN
    expect(result).toEqual(undefined);
  });
});
