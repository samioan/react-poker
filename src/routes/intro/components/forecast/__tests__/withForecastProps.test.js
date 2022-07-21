import { withForecastProps } from "../withForecastProps";
import * as forecastActions from "models/forecast/actions";
import * as react from "react";

const DummyComponent = (props) => <div>{props}</div>;

describe("withForecastProps HOC", () => {
  let useEffectSpy;

  beforeEach(() => {
    useEffectSpy = jest
      .spyOn(react, "useEffect")
      .mockImplementation((f) => f());
  });

  afterEach(() => {
    useEffectSpy.mockRestore();
  });

  test("renders correctly", () => {
    // GIVEN
    const mockProps = {
      getForecastOnLoad: jest.fn(() => {}),
      temp: 15,
    };
    const EnchancedComponent = withForecastProps(DummyComponent);

    // WHEN
    const tree = shallowSnapshot(<EnchancedComponent {...mockProps} />);

    // THEN
    expect(tree).toMatchSnapshot();
    expect(mockProps.getForecastOnLoad).toHaveBeenCalled();
  });
});
