const { isStraight } = require("lib/handCheck");

describe("isStraight function", () => {
  test("should return true", () => {
    //GIVEN
    const hand = ["C09", "D10", "H11", "C12", "S13"];
    //WHEN
    const result = isStraight(hand);
    //THEN
    expect(result).toBeTruthy();
  });
  test("should return true", () => {
    //GIVEN
    const hand = ["H14", "D02", "C03", "S04", "C05"];
    //WHEN
    const result = isStraight(hand);
    //THEN
    expect(result).toEqual(true);
  });
  test("should return true", () => {
    //GIVEN
    const hand = ["C14", "C10", "D11", "S12", "C13"];
    //WHEN
    const result = isStraight(hand);
    //THEN
    expect(result).toEqual(true);
  });
  test("should return false", () => {
    //GIVEN
    const hand = ["C02", "C10", "D11", "S12", "C13"];
    //WHEN
    const result = isStraight(hand);
    //THEN
    expect(result).toEqual(false);
  });
});
