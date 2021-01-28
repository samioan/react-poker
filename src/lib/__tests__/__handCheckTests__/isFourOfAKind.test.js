const { isFourOfAKind } = require("lib/handCheck");

describe("isFourOfAKind function", () => {
  test("should return true", () => {
    //GIVEN
    const hand = ["C04", "H04", "D04", "S04", "C08"];
    //WHEN
    const result = isFourOfAKind(hand);
    //THEN
    expect(result).toEqual(true);
  });
  test("should return false", () => {
    //GIVEN
    const hand = ["C04", "H04", "D04", "S03", "C08"];
    //WHEN
    const result = isFourOfAKind(hand);
    //THEN
    expect(result).toEqual(false);
  });
  test("should return false", () => {
    //GIVEN
    const hand = ["C02", "H02", "D04", "S04", "C08"];
    //WHEN
    const result = isFourOfAKind(hand);
    //THEN
    expect(result).toEqual(false);
  });
});
