const { isFlush } = require("lib/handCheck");

describe("isFlush function", () => {
  test("should return true", () => {
    //GIVEN
    const hand = ["C02", "C04", "C06", "C08", "C10"];
    //WHEN
    const result = isFlush(hand);
    //THEN
    expect(result).toBeTruthy();
  });
  test("should return false", () => {
    //GIVEN
    const hand = ["H02", "D04", "C06", "S08", "C10"];
    //WHEN
    const result = isFlush(hand);
    //THEN
    expect(result).toBeFalsy();
  });
  test("should return false", () => {
    //GIVEN
    const hand = ["C02", "C14", "D06", "C11", "C10"];
    //WHEN
    const result = isFlush(hand);
    //THEN
    expect(result).toBeFalsy();
  });
});
