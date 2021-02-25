import { getForecastEpic, getForecastSucceededEpic } from "../epics";
import { initialState } from "../reducer";
import { forecastLoaded, getForecast } from "../actions";

describe("Game epics", () => {
  describe("getForecastSucceededEpic", () => {
    test("should emit deckCreated action", () => {
      // GIVEN

      const inputAction = getForecast();
      const { epicEmissions, emitAction } = testEpic(
        getForecastSucceededEpic,
        {}
      );

      // WHEN
      emitAction(inputAction);

      // THEN
      expect(epicEmissions.length).toBe(1);
      expect(epicEmissions[0]).toEqual(
        forecastLoaded({
          name: "",
          temp: "",
          description: "",
        })
      );
    });
  });
});
