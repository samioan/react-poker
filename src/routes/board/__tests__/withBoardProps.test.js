import { withBoardProps } from "../withBoardProps";

const DummyComponent = (props) => <div>{props}</div>;

describe("withBoardProps HOC", () => {
  test("renders correctly", () => {
    //GIVEN
    const mockProps = {
      playerHand: ["C01", "C02", "C03", "C04", "C05"],
      deck: ["D01", "S02", "C03", "H04", "C05"],
      phase: 1,
      playerMoney: 1000,
      playerBet: 100,
      aiMoney: 1000,
      aiBet: 100,
      pot: 200,
      logger: ["Mock message 1", "Mock message 2"],
    };
    const EnchancedComponent = withBoardProps(DummyComponent);

    //WHEN
    const tree = shallowSnapshot(<EnchancedComponent {...mockProps} />);

    //THEN
    expect(tree).toMatchSnapshot();
  });
});
