const { cardNumtoRank } = require("lib/cardFunctions");

describe("cardNumtoRank function", () => {
  test("should return 2", () => {
    //GIVEN
    const suitRank = "02";
    //WHEN
    const result = cardNumtoRank(suitRank);
    //THEN
    expect(result).toBe("2");
  });
  test("should return 10", () => {
    //GIVEN
    const suitRank = "10";
    //WHEN
    const result = cardNumtoRank(suitRank);
    //THEN
    expect(result).toBe("10");
  });
  test("should return J", () => {
    //GIVEN
    const suitRank = "11";
    //WHEN
    const result = cardNumtoRank(suitRank);
    //THEN
    expect(result).toBe("J");
  });
  test("should return Q", () => {
    //GIVEN
    const suitRank = "12";
    //WHEN
    const result = cardNumtoRank(suitRank);
    //THEN
    expect(result).toBe("Q");
  });
  test("should return K", () => {
    //GIVEN
    const suitRank = "13";
    //WHEN
    const result = cardNumtoRank(suitRank);
    //THEN
    expect(result).toBe("K");
  });
  test("should return A", () => {
    //GIVEN
    const suitRank = "14";
    //WHEN
    const result = cardNumtoRank(suitRank);
    //THEN
    expect(result).toBe("A");
  });
});
