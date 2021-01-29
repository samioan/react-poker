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
  test("should return 3", () => {
    //GIVEN
    const suitRank = "03";
    //WHEN
    const result = cardNumtoRank(suitRank);
    //THEN
    expect(result).toEqual("3");
  });
  test("should return 4", () => {
    //GIVEN
    const suitRank = "04";
    //WHEN
    const result = cardNumtoRank(suitRank);
    //THEN
    expect(result).toEqual("4");
  });
  test("should return 5", () => {
    //GIVEN
    const suitRank = "05";
    //WHEN
    const result = cardNumtoRank(suitRank);
    //THEN
    expect(result).toEqual("5");
  });
  test("should return 6", () => {
    //GIVEN
    const suitRank = "06";
    //WHEN
    const result = cardNumtoRank(suitRank);
    //THEN
    expect(result).toEqual("6");
  });
  test("should return 7", () => {
    //GIVEN
    const suitRank = "07";
    //WHEN
    const result = cardNumtoRank(suitRank);
    //THEN
    expect(result).toEqual("7");
  });
  test("should return 8", () => {
    //GIVEN
    const suitRank = "08";
    //WHEN
    const result = cardNumtoRank(suitRank);
    //THEN
    expect(result).toEqual("8");
  });
  test("should return 9", () => {
    //GIVEN
    const suitRank = "09";
    //WHEN
    const result = cardNumtoRank(suitRank);
    //THEN
    expect(result).toEqual("9");
  });
  test("should return 10", () => {
    //GIVEN
    const suitRank = "10";
    //WHEN
    const result = cardNumtoRank(suitRank);
    //THEN
    expect(result).toEqual("10");
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
