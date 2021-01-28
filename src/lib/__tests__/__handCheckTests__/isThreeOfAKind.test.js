const { isThreeOfAKind } = require("lib/handCheck");

describe("isThreeOfAKind function", () => {
  test("should return true", () => {
    //GIVEN
    const hand = ["C03", "D03", "H03", "S08", "C10"];
    //WHEN
    const result = isThreeOfAKind(hand);
    //THEN
    expect(result).toEqual(true);
  });
  test("should return false", () => {
    //GIVEN
    const hand = ["C03", "D03", "H03", "S03", "C10"];
    //WHEN
    const result = isThreeOfAKind(hand);
    //THEN
    expect(result).toEqual(false);
  });
  test("should return false", () => {
    //GIVEN
    const hand = ["C03", "D03", "H04", "S05", "C06"];
    //WHEN
    const result = isThreeOfAKind(hand);
    //THEN
    expect(result).toEqual(false);
  });
});
