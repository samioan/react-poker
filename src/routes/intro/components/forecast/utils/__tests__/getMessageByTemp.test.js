const { getMessageByTemp } = require("../getMessageByTemp");

describe("getMessageByTemp function", () => {
  test("should return A freezing cold day!", () => {
    //GIVEN
    const temp = 5;
    //WHEN
    const result = getMessageByTemp(temp);
    //THEN
    expect(result).toBe("A freezing cold day!");
  });
  test("should return A cold day!", () => {
    //GIVEN
    const temp = 18;
    //WHEN
    const result = getMessageByTemp(temp);
    //THEN
    expect(result).toBe("A cold day!");
  });
  test("should return A nice day for poker!", () => {
    //GIVEN
    const temp = 28;
    //WHEN
    const result = getMessageByTemp(temp);
    //THEN
    expect(result).toBe("A nice day for poker!");
  });
  test("should return A warm day!", () => {
    //GIVEN
    const temp = 32;
    //WHEN
    const result = getMessageByTemp(temp);
    //THEN
    expect(result).toBe("A warm day!");
  });
  test("should return A pretty hot day!", () => {
    //GIVEN
    const temp = 36;
    //WHEN
    const result = getMessageByTemp(temp);
    //THEN
    expect(result).toBe("A pretty hot day!");
  });
  test("should return Have a good day!", () => {
    //GIVEN
    const temp = undefined;
    //WHEN
    const result = getMessageByTemp(temp);
    //THEN
    expect(result).toBe("Have a good day!");
  });
});
