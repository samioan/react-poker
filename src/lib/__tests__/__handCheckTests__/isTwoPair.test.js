const { isTwoPair } = require("lib/handCheck");

describe("isTwoPair function", () => {
  test("should return true", () => {
    //GIVEN
    const hand = ["C02", "D02", "H03", "S03", "C10"];
    //WHEN
    const result = isTwoPair(hand);
    //THEN
    expect(result).toEqual(true);
  });
  test("should return false", () => {
    //GIVEN
    const hand = ["C02", "D02", "H02", "S03", "C03"];
    //WHEN
    const result = isTwoPair(hand);
    //THEN
    expect(result).toBeFalsy();
  });
  test("should return false", () => {
    //GIVEN
    const hand = ["C14", "D14", "H08", "S14", "H14"];
    //WHEN
    const result = isTwoPair(hand);
    //THEN
    expect(result).toBeFalsy();
  });
});
