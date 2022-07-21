import { Stats } from "../Stats";

describe("Stats component", () => {
  test("renders correctly", () => {
    // GIVEN
    const mockProps = {
      money: 10,
      bid: 10,
      strength: "mock_strength",
      pot: 10,
    };

    // WHEN
    const tree = shallowSnapshot(<Stats {...mockProps} />);

    // THEN
    expect(tree).toMatchSnapshot();
  });
});
