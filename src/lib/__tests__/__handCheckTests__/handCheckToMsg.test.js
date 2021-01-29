const { handCheckToMsg } = require("lib/handCheck");

describe("handCheckToMsg function", () => {
  test("should return Royal Flush", () => {
    //GIVEN
    const hand = ["C14", "C13", "C12", "C11", "C10"];
    //WHEN
    const result = handCheckToMsg(hand);
    //THEN
    expect(result).toBe("Royal Flush");
  });
  test("should return Straight Flush", () => {
    //GIVEN
    const hand = ["C05", "C06", "C07", "C08", "C09"];
    //WHEN
    const result = handCheckToMsg(hand);
    //THEN
    expect(result).toBe("Straight Flush");
  });
  test("should return Four of a kind", () => {
    //GIVEN
    const hand = ["C07", "D07", "H07", "S07", "C10"];
    //WHEN
    const result = handCheckToMsg(hand);
    //THEN
    expect(result).toBe("Four of a kind");
  });
  test("should return Full House", () => {
    //GIVEN
    const hand = ["C10", "D10", "C03", "S03", "H03"];
    //WHEN
    const result = handCheckToMsg(hand);
    //THEN
    expect(result).toBe("Full House");
  });
  test("should return Flush", () => {
    //GIVEN
    const hand = ["C14", "C08", "C02", "C04", "C06"];
    //WHEN
    const result = handCheckToMsg(hand);
    //THEN
    expect(result).toEqual("Flush");
  });
  test("should return Straight", () => {
    //GIVEN
    const hand = ["C05", "D04", "H03", "S02", "C14"];
    //WHEN
    const result = handCheckToMsg(hand);
    //THEN
    expect(result).toEqual("Straight");
  });
  test("should return Three of a kind", () => {
    //GIVEN
    const hand = ["C08", "H08", "S08", "D11", "C10"];
    //WHEN
    const result = handCheckToMsg(hand);
    //THEN
    expect(result).toEqual("Three of a kind");
  });
  test("should return Two Pair", () => {
    //GIVEN
    const hand = ["C10", "H10", "C14", "D14", "S08"];
    //WHEN
    const result = handCheckToMsg(hand);
    //THEN
    expect(result).toEqual("Two Pair");
  });
  test("should return One Pair", () => {
    //GIVEN
    const hand = ["C14", "H14", "S08", "D02", "C05"];
    //WHEN
    const result = handCheckToMsg(hand);
    //THEN
    expect(result).toEqual("One Pair");
  });
  test("should return No Strength", () => {
    //GIVEN
    const hand = ["C02", "D04", "H06", "S08", "C10"];
    //WHEN
    const result = handCheckToMsg(hand);
    //THEN
    expect(result).toEqual("No Strength");
  });
});
