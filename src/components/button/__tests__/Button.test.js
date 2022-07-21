import { Button } from "../Button";

describe("Button component", () => {
  let onClickSpy;

  beforeEach(() => {
    onClickSpy = jest.fn(() => null);
  });

  afterEach(() => {
    onClickSpy.mockRestore();
  });

  test("renders correctly", () => {
    // GIVEN
    const mockProps = {
      id: "mock_id",
      onClick: onClickSpy,
    };

    // WHEN
    const tree = shallowSnapshot(<Button {...mockProps} />);

    // THEN
    expect(tree).toMatchSnapshot();
  });
});
