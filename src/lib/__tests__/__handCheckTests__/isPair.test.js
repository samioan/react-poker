const { isPair } = require("lib/handCheck");

describe("isPair function", () => {
  test("should return true", () => {
    //GIVEN
    const hand = ["C02", "D02", "H04", "S05", "C06"];
    //WHEN
    const result = isPair(hand);
    //THEN
    expect(result).toEqual(true);
  });
  test("should return false", () => {
    //GIVEN
    const hand = ["C02", "D14", "H08", "S07", "C03"];
    //WHEN
    const result = isPair(hand);
    //THEN
    expect(result).toEqual(false);
  });
  test("should return false", () => {
    //GIVEN
    const hand = ["C14", "D14", "H08", "S14", "H03"];
    //WHEN
    const result = isPair(hand);
    //THEN
    expect(result).toEqual(false);
  });
});
