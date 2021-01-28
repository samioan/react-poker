const { isStraightFlush } = require("lib/handCheck");

describe("isStraightFlush function", () => {
  test("should return true", () => {
    //GIVEN
    const hand = ["C04", "C05", "C06", "C07", "C08"];
    //WHEN
    const result = isStraightFlush(hand);
    //THEN
    expect(result).toEqual(true);
  });
  test("should return false", () => {
    //GIVEN
    const hand = ["D04", "H05", "S06", "C07", "C08"];
    //WHEN
    const result = isStraightFlush(hand);
    //THEN
    expect(result).toEqual(false);
  });
  test("should return false", () => {
    //GIVEN
    const hand = ["C10", "C11", "C12", "C13", "C08"];
    //WHEN
    const result = isStraightFlush(hand);
    //THEN
    expect(result).toEqual(false);
  });
});
