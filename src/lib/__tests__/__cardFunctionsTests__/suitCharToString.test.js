const { suitCharToString } = require("lib/cardFunctions");

describe("suitCharToString function", () => {
  test("should return hearts", () => {
    //GIVEN
    const suitChar = "H";
    //WHEN
    const result = suitCharToString(suitChar);
    //THEN
    expect(result).toEqual("hearts");
  });
  test("should return clubs", () => {
    //GIVEN
    const suitChar = "C";
    //WHEN
    const result = suitCharToString(suitChar);
    //THEN
    expect(result).toEqual("clubs");
  });
  test("should return diams", () => {
    //GIVEN
    const suitChar = "D";
    //WHEN
    const result = suitCharToString(suitChar);
    //THEN
    expect(result).toEqual("diams");
  });
  test("should return spades", () => {
    //GIVEN
    const suitChar = "S";
    //WHEN
    const result = suitCharToString(suitChar);
    //THEN
    expect(result).toEqual("spades");
  });
  test("should return null", () => {
    //GIVEN
    const suitChar = "A";
    //WHEN
    const result = suitCharToString(suitChar);
    //THEN
    expect(result).toEqual(null);
  });
});
