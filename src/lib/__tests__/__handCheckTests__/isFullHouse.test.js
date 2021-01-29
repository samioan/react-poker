const { isFullHouse } = require("lib/handCheck");

describe("isFullHouse function", () => {
  test("should return true", () => {
    //GIVEN
    const hand = ["C04", "H04", "D04", "S02", "C02"];
    //WHEN
    const result = isFullHouse(hand);
    //THEN
    expect(result).toBeTruthy();
  });
  test("should return false", () => {
    //GIVEN
    const hand = ["C04", "H14", "D14", "S03", "C08"];
    //WHEN
    const result = isFullHouse(hand);
    //THEN
    expect(result).toEqual(false);
  });
  test("should return false", () => {
    //GIVEN
    const hand = ["C04", "H04", "D04", "S02", "C03"];
    //WHEN
    const result = isFullHouse(hand);
    //THEN
    expect(result).toEqual(false);
  });
});
