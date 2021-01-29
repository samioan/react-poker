const { handCheck } = require("lib/handCheck");

describe("handCheck function", () => {
  test("should return 10", () => {
    //GIVEN
    const hand = ["C14", "C13", "C12", "C11", "C10"];
    //WHEN
    const result = handCheck(hand);
    //THEN
    expect(result).toBe(10);
  });
  test("should return 9", () => {
    //GIVEN
    const hand = ["C05", "C06", "C07", "C08", "C09"];
    //WHEN
    const result = handCheck(hand);
    //THEN
    expect(result).toBe(9);
  });
  test("should return 8", () => {
    //GIVEN
    const hand = ["C07", "D07", "H07", "S07", "C10"];
    //WHEN
    const result = handCheck(hand);
    //THEN
    expect(result).toBe(8);
  });
  test("should return 7", () => {
    //GIVEN
    const hand = ["C10", "D10", "C03", "S03", "H03"];
    //WHEN
    const result = handCheck(hand);
    //THEN
    expect(result).toBe(7);
  });
  test("should return 6", () => {
    //GIVEN
    const hand = ["C14", "C08", "C02", "C04", "C06"];
    //WHEN
    const result = handCheck(hand);
    //THEN
    expect(result).toBe(6);
  });
  test("should return 5", () => {
    //GIVEN
    const hand = ["C05", "D04", "H03", "S02", "C14"];
    //WHEN
    const result = handCheck(hand);
    //THEN
    expect(result).toBe(5);
  });
  test("should return 4", () => {
    //GIVEN
    const hand = ["C08", "H08", "S08", "D11", "C10"];
    //WHEN
    const result = handCheck(hand);
    //THEN
    expect(result).toBe(4);
  });
  test("should return 3", () => {
    //GIVEN
    const hand = ["C10", "H10", "C14", "D14", "S08"];
    //WHEN
    const result = handCheck(hand);
    //THEN
    expect(result).toBe(3);
  });
  test("should return 2", () => {
    //GIVEN
    const hand = ["C14", "H14", "S08", "D02", "C05"];
    //WHEN
    const result = handCheck(hand);
    //THEN
    expect(result).toEqual(2);
  });
  test("should return 1", () => {
    //GIVEN
    const hand = ["C02", "D04", "H06", "S08", "C10"];
    //WHEN
    const result = handCheck(hand);
    //THEN
    expect(result).toEqual(1);
  });
});
