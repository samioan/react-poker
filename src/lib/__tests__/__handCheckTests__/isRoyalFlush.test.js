const { isRoyalFlush } = require("lib/handCheck");

describe("isRoyalFlush function", () => {
  test("should return true", () => {
    //GIVEN
    const hand = ["C10", "C11", "C12", "C13", "C14"];
    //WHEN
    const result = isRoyalFlush(hand);
    //THEN
    expect(result).toBeTruthy();
  });
  test("should return false", () => {
    //GIVEN
    const hand = ["D10", "H11", "S12", "C13", "C14"];
    //WHEN
    const result = isRoyalFlush(hand);
    //THEN
    expect(result).toBeFalsy();
  });
  test("should return false", () => {
    //GIVEN
    const hand = ["C09", "C10", "C11", "C12", "C13"];
    //WHEN
    const result = isRoyalFlush(hand);
    //THEN
    expect(result).toBeFalsy();
  });
});
