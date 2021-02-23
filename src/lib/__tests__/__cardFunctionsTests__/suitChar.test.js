const { suitChar } = require("lib/cardFunctions");

describe("suitChar function", () => {
  test("should return symbol: <>&hearts;</>, string: hearts ", () => {
    //GIVEN
    const suitCharacter = "H";
    //WHEN
    const result = suitChar(suitCharacter);
    //THEN
    expect(result).toStrictEqual({ symbol: <>&hearts;</>, string: "hearts" });
  });
  test("should return symbol: <>&clubs;</>, string: clubs ", () => {
    //GIVEN
    const suitCharacter = "C";
    //WHEN
    const result = suitChar(suitCharacter);
    //THEN
    expect(result).toStrictEqual({ symbol: <>&clubs;</>, string: "clubs" });
  });
  test("should return symbol: <>&diams;</>, string: diams ", () => {
    //GIVEN
    const suitCharacter = "D";
    //WHEN
    const result = suitChar(suitCharacter);
    //THEN
    expect(result).toStrictEqual({ symbol: <>&diams;</>, string: "diams" });
  });
  test("should return symbol: <>&spades;</>, string: spades ", () => {
    //GIVEN
    const suitCharacter = "S";
    //WHEN
    const result = suitChar(suitCharacter);
    //THEN
    expect(result).toStrictEqual({ symbol: <>&spades;</>, string: "spades" });
  });
  test("should return an empty object", () => {
    //GIVEN
    const suitCharacter = "A";
    //WHEN
    const result = suitChar(suitCharacter);
    //THEN
    expect(result).toStrictEqual({});
  });
});
