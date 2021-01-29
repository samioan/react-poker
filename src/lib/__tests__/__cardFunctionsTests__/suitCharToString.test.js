const { suitCharToString } = require("lib/cardFunctions");

describe("suitCharToString function", () => {
  test("should return hearts", () => {
    //GIVEN
    const suitChar = "H";
    //WHEN
    const result = suitCharToString(suitChar);
    //THEN
    expect(result).toBe("hearts");
  });
  test("should return clubs", () => {
    //GIVEN
    const suitChar = "C";
    //WHEN
    const result = suitCharToString(suitChar);
    //THEN
    expect(result).toBe("clubs");
  });
  test("should return diams", () => {
    //GIVEN
    const suitChar = "D";
    //WHEN
    const result = suitCharToString(suitChar);
    //THEN
    expect(result).toBe("diams");
  });
  test("should return spades", () => {
    //GIVEN
    const suitChar = "S";
    //WHEN
    const result = suitCharToString(suitChar);
    //THEN
    expect(result).toBe("spades");
  });
  test("should return null", () => {
    //GIVEN
    const suitChar = "A";
    //WHEN
    const result = suitCharToString(suitChar);
    //THEN
    expect(result).toBe(null);
  });
});
