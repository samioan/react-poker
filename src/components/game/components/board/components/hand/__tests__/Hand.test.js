//import {Card} from "../../card";
import { Hand } from "../Hand";

describe("Hand component", () => {
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
      hand: [
        "mock_card1",
        "mock_card2",
        "mock_card3",
        "mock_card4",
        "mock_card5",
      ],
      visible: true,
      onClick: onClickSpy,
    };

    // WHEN
    const tree = shallowSnapshot(<Hand {...mockProps} />);

    // THEN
    expect(tree).toMatchSnapshot();
  });

  test("renders correctly -- is hidden", () => {
    // GIVEN
    const mockProps = {
      hand: [
        "mock_card1",
        "mock_card2",
        "mock_card3",
        "mock_card4",
        "mock_card5",
      ],
      visible: false,
      onClick: onClickSpy,
    };

    // WHEN
    const tree = shallowSnapshot(<Hand {...mockProps} />);

    // THEN
    expect(tree).toMatchSnapshot();
  });
});
