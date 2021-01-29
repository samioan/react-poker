const { suitCharToSymbol } = require("lib/cardFunctions");

describe("suitCharToSymbol function", () => {
  test("should return <>&hearts;</>", () => {
    //GIVEN
    const suitChar = "H";
    //WHEN
    const result = suitCharToSymbol(suitChar);
    //THEN
    expect(result).toEqual(<>&hearts;</>);
  });
  test("should return <>&clubs;</>", () => {
    //GIVEN
    const suitChar = "C";
    //WHEN
    const result = suitCharToSymbol(suitChar);
    //THEN
    expect(result).toEqual(<>&clubs;</>);
  });
  test("should return <>&diams;</>", () => {
    //GIVEN
    const suitChar = "D";
    //WHEN
    const result = suitCharToSymbol(suitChar);
    //THEN
    expect(result).toEqual(<>&diams;</>);
  });
  test("should return <>&spades;</>", () => {
    //GIVEN
    const suitChar = "S";
    //WHEN
    const result = suitCharToSymbol(suitChar);
    //THEN
    expect(result).toEqual(<>&spades;</>);
  });
  test("should return null", () => {
    //GIVEN
    const suitChar = "A";
    //WHEN
    const result = suitCharToSymbol(suitChar);
    //THEN
    expect(result).toBeNull();
  });
});
