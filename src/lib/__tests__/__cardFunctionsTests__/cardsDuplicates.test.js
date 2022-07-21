const { cardsDuplicates } = require("lib/cardFunctions");

describe("cardsDuplicates function", () => {
  test("should return [1, 2, 1, 1]", () => {
    //GIVEN
    const hand = ["C08", "D12", "H08", "S02", "C07"];
    //WHEN
    const result = cardsDuplicates(hand);
    //THEN
    expect(result).toEqual([1, 2, 1, 1]);
  });
  test("should return [3, 1, 1]", () => {
    //GIVEN
    const hand = ["C08", "D08", "H08", "S02", "C07"];
    //WHEN
    const result = cardsDuplicates(hand);
    //THEN
    expect(result).toEqual([3, 1, 1]);
  });
  test("should return [3, 2]", () => {
    //GIVEN
    const hand = ["C08", "D08", "H08", "S02", "C02"];
    //WHEN
    const result = cardsDuplicates(hand);
    //THEN
    expect(result).toEqual([3, 2]);
  });
  test("should return [1, 1, 1, 1, 1]", () => {
    //GIVEN
    const hand = ["C08", "D07", "H06", "S05", "C04"];
    //WHEN
    const result = cardsDuplicates(hand);
    //THEN
    expect(result).toEqual([1, 1, 1, 1, 1]);
  });
});
