import { Card } from "../Card";

describe("Card component", () => {
  let onClickSpy;

  beforeEach(() => {
    onClickSpy = jest.fn(() => null);
  });

  afterEach(() => {
    onClickSpy.mockRestore();
  });

  test("renders correctly -- is visible", () => {
    // GIVEN
    const mockProps = {
      rank: "mock_rank",
      suit: "mock_suit",
      suitSymbol: "mock_symbol",
      visible: true,
      onClick: onClickSpy,
    };

    // WHEN
    const tree = shallowSnapshot(<Card {...mockProps} />);

    // THEN
    expect(tree).toMatchSnapshot();
  });

  test("renders correctly -- is hidden", () => {
    // GIVEN
    const mockProps = {
      rank: "rank",
      suit: "suit",
      suitSymbol: "symbol",
      visible: false,
      onClick: onClickSpy,
    };

    // WHEN
    const tree = shallowSnapshot(<Card {...mockProps} />);

    // THEN
    expect(tree).toMatchSnapshot();
  });
});
