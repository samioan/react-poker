import { createDeckEpic } from "../epics";
import { initialState } from "../reducer";
import { startGame, deckCreated } from "../actions";

import * as deckCreatorModule from "lib/deckCreator";

describe("Game epics", () => {
  describe("createDeckEpic", () => {
    let deckCreatorSpy;
    beforeEach(() => {
      deckCreatorSpy = jest
        .spyOn(deckCreatorModule, "deckCreator")
        .mockImplementation(() => []);
      //.mockReturnValue([]);
    });
    afterEach(() => {
      deckCreatorSpy.mockRestore();
    });

    test("should emit deckCreated action", () => {
      // GIVEN

      const inputAction = startGame();
      const { epicEmissions, emitAction } = testEpic(createDeckEpic, {
        ...initialState,
      });

      // WHEN
      emitAction(inputAction);

      // THEN
      expect(epicEmissions.length).toBe(1);
      expect(epicEmissions[0]).toEqual(
        deckCreated({
          deck: [],
        })
      );
    });
  });
});
