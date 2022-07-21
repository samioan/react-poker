const { handCheck } = require("lib/handCheck");

describe("handCheck function", () => {
  test("should return 10, Royal Flush", () => {
    //GIVEN
    const hand = ["C14", "C13", "C12", "C11", "C10"];
    //WHEN
    const result = handCheck(hand);
    //THEN
    expect(result).toEqual([10, "Royal Flush"]);
  });
  test("should return 9, Straight Flush", () => {
    //GIVEN
    const hand = ["C05", "C06", "C07", "C08", "C09"];
    //WHEN
    const result = handCheck(hand);
    //THEN
    expect(result).toEqual([9, "Straight Flush"]);
  });
  test("should return 8, Four of a kind", () => {
    //GIVEN
    const hand = ["C07", "D07", "H07", "S07", "C10"];
    //WHEN
    const result = handCheck(hand);
    //THEN
    expect(result).toEqual([8, "Four of a kind"]);
  });
  test("should return 7, Full House", () => {
    //GIVEN
    const hand = ["C10", "D10", "C03", "S03", "H03"];
    //WHEN
    const result = handCheck(hand);
    //THEN
    expect(result).toEqual([7, "Full House"]);
  });
  test("should return 6, Flush", () => {
    //GIVEN
    const hand = ["C14", "C08", "C02", "C04", "C06"];
    //WHEN
    const result = handCheck(hand);
    //THEN
    expect(result).toEqual([6, "Flush"]);
  });
  test("should return 5, Straight", () => {
    //GIVEN
    const hand = ["C05", "D04", "H03", "S02", "C14"];
    //WHEN
    const result = handCheck(hand);
    //THEN
    expect(result).toEqual([5, "Straight"]);
  });
  test("should return 4, Three of a kind", () => {
    //GIVEN
    const hand = ["C08", "H08", "S08", "D11", "C10"];
    //WHEN
    const result = handCheck(hand);
    //THEN
    expect(result).toEqual([4, "Three of a kind"]);
  });
  test("should return 3, Two Pairs", () => {
    //GIVEN
    const hand = ["C10", "H10", "C14", "D14", "S08"];
    //WHEN
    const result = handCheck(hand);
    //THEN
    expect(result).toEqual([3, "Two Pairs"]);
  });
  test("should return 2, One Pair", () => {
    //GIVEN
    const hand = ["C14", "H14", "S08", "D02", "C05"];
    //WHEN
    const result = handCheck(hand);
    //THEN
    expect(result).toEqual([2, "One Pair"]);
  });
  test("should return 1, No Strength", () => {
    //GIVEN
    const hand = ["C02", "D04", "H06", "S08", "C10"];
    //WHEN
    const result = handCheck(hand);
    //THEN
    expect(result).toEqual([1, "No Strength"]);
  });
});
