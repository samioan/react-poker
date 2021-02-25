import {
  gameEndLogEpic,
  playerMoneyLogEpic,
  startGameLogEpic,
  foldLogEpic,
  raiseLogEpic,
  replaceLogEpic,
  phase1CheckLogEpic,
  playerWonLogEpic,
  playerLostLogEpic,
  playerTiedLogEpic,
  nextPhaseLogEpic,
} from "../epics";
import { initialState } from "../reducer";
import {
  addMessage,
  addGameEndMessage,
  addPlayerMoneyMessage,
} from "../actions";
import {
  gameStarted,
  playerFolded,
  betRaised,
  cardReplaced,
  playerWon,
  playerLost,
  playerTied,
  advancePhase,
  check,
} from "models/game/actions";

import * as uuidModule from "uuidv4";

describe("Game epics", () => {
  let uuidSpy;
  beforeEach(() => {
    uuidSpy = jest.spyOn(uuidModule, "uuid").mockImplementation(() => "");
  });
  afterEach(() => {
    uuidSpy.mockRestore();
  });
  describe("gameEndLogEpic", () => {
    test("should emit addGameEndMessage action", () => {
      // GIVEN

      const inputAction = check();
      const { epicEmissions, emitAction } = testEpic(gameEndLogEpic, {
        game: {
          phase: 4,
          playerHand: ["C14", "C13", "C12", "C11", "C10"],
          aiHand: ["C05", "C06", "C07", "C08", "C09"],
          playerMoney: 0,
        },
      });

      // WHEN
      emitAction(inputAction);

      // THEN
      expect(epicEmissions.length).toBe(1);
      expect(epicEmissions[0]).toEqual(
        addGameEndMessage([
          ".You had Royal Flush.",
          ".Opponent had Straight Flush.",
          ".You have 0 euros.",
        ])
      );
    });
  });

  describe("playerMoneyLogEpic", () => {
    test("should emit addPlayerMoneyMessage action from gameStarted action", () => {
      // GIVEN

      const inputAction = gameStarted();
      const { epicEmissions, emitAction } = testEpic(playerMoneyLogEpic, {
        game: {
          playerMoney: 0,
          playerBet: 0,
        },
      });

      // WHEN
      emitAction(inputAction);

      // THEN
      expect(epicEmissions.length).toBe(1);
      expect(epicEmissions[0]).toEqual(
        addPlayerMoneyMessage([".You have 0 euros.", ".Your bet is 0 euros."])
      );
    });

    test("should emit addPlayerMoneyMessage action from betRaised action", () => {
      // GIVEN

      const inputAction = betRaised();
      const { epicEmissions, emitAction } = testEpic(playerMoneyLogEpic, {
        game: {
          playerMoney: 0,
          playerBet: 0,
        },
      });

      // WHEN
      emitAction(inputAction);

      // THEN
      expect(epicEmissions.length).toBe(1);
      expect(epicEmissions[0]).toEqual(
        addPlayerMoneyMessage([".You have 0 euros.", ".Your bet is 0 euros."])
      );
    });
  });

  describe("startGameLogEpic", () => {
    test("should emit addMessage action", () => {
      // GIVEN

      const inputAction = gameStarted();
      const { epicEmissions, emitAction } = testEpic(startGameLogEpic, {
        game: {
          playerHand: ["C14", "C13", "C12", "C11", "C10"],
        },
      });

      // WHEN
      emitAction(inputAction);

      // THEN
      expect(epicEmissions.length).toBe(1);
      expect(epicEmissions[0]).toEqual(
        addMessage([".GAME STARTED.", ".You have Royal Flush."])
      );
    });
  });

  describe("foldLogEpic", () => {
    test("should emit addMessage action", () => {
      // GIVEN

      const inputAction = playerFolded();
      const { epicEmissions, emitAction } = testEpic(foldLogEpic, {
        game: {
          playerMoney: 0,
        },
      });

      // WHEN
      emitAction(inputAction);

      // THEN
      expect(epicEmissions.length).toBe(1);
      expect(epicEmissions[0]).toEqual(
        addMessage([".PLAYER FOLDS.", ".You have 0 euros."])
      );
    });
  });

  describe("raiseLogEpic", () => {
    test("should emit addMessage action", () => {
      // GIVEN

      const inputAction = betRaised();
      const { epicEmissions, emitAction } = testEpic(raiseLogEpic, {
        game: {
          playerBet: 100,
          aiBet: 100,
        },
      });

      // WHEN
      emitAction(inputAction);

      // THEN
      expect(epicEmissions.length).toBe(1);
      expect(epicEmissions[0]).toEqual(
        addMessage([".PLAYER RAISES.", ".Pot is 200 euros."])
      );
    });
  });

  describe("replaceLogEpic", () => {
    test("should emit addMessage action", () => {
      // GIVEN

      const inputAction = cardReplaced();
      const { epicEmissions, emitAction } = testEpic(replaceLogEpic, {
        game: {
          deck: Array(52).fill("C14"),
          playerHand: ["S09", "C03", "D04", "H05", "S02"],
          changedPlayerHand: Array(5).fill(null),
        },
      });

      // WHEN
      emitAction(inputAction);

      // THEN
      expect(epicEmissions.length).toBe(1);
      expect(epicEmissions[0]).toEqual(
        addMessage([".PLAYER TRADES A CARD.", ".You now have No Strength."])
      );
    });
  });

  describe("phase1CheckLogEpic", () => {
    test("should emit addMessage action", () => {
      // GIVEN

      const inputAction = advancePhase();
      const { epicEmissions, emitAction } = testEpic(phase1CheckLogEpic, {
        game: {
          phase: 2,
        },
      });

      // WHEN
      emitAction(inputAction);

      // THEN
      expect(epicEmissions.length).toBe(1);
      expect(epicEmissions[0]).toEqual(
        addMessage([".PLAYER CHECKS.", ".You can now replace up to 3 cards."])
      );
    });

    test("should NOT emit addMessage action", () => {
      // GIVEN

      const inputAction = advancePhase();
      const { epicEmissions, emitAction } = testEpic(phase1CheckLogEpic, {
        game: {
          phase: 3,
        },
      });

      // WHEN
      emitAction(inputAction);

      // THEN
      expect(epicEmissions.length).toBe(0);
    });
  });

  describe("playerWonLogEpic", () => {
    test("should emit addMessage action", () => {
      // GIVEN

      const inputAction = playerWon();
      const { epicEmissions, emitAction } = testEpic(playerWonLogEpic, {});

      // WHEN
      emitAction(inputAction);

      // THEN
      expect(epicEmissions.length).toBe(1);
      expect(epicEmissions[0]).toEqual(addMessage([".PLAYER WINS."]));
    });
  });

  describe("playerLostLogEpic", () => {
    test("should emit addMessage action", () => {
      // GIVEN

      const inputAction = playerLost();
      const { epicEmissions, emitAction } = testEpic(playerLostLogEpic, {});

      // WHEN
      emitAction(inputAction);

      // THEN
      expect(epicEmissions.length).toBe(1);
      expect(epicEmissions[0]).toEqual(addMessage([".PLAYER LOSES."]));
    });
  });

  describe("playerTiedLogEpic", () => {
    test("should emit addMessage action", () => {
      // GIVEN

      const inputAction = playerTied();
      const { epicEmissions, emitAction } = testEpic(playerTiedLogEpic, {});

      // WHEN
      emitAction(inputAction);

      // THEN
      expect(epicEmissions.length).toBe(1);
      expect(epicEmissions[0]).toEqual(addMessage([".TIE."]));
    });
  });

  describe("nextPhaseLogEpic", () => {
    test("should emit addMessage action", () => {
      // GIVEN

      const inputAction = advancePhase();
      const { epicEmissions, emitAction } = testEpic(nextPhaseLogEpic, {
        game: {
          phase: 3,
        },
      });

      // WHEN
      emitAction(inputAction);

      // THEN
      expect(epicEmissions.length).toBe(1);
      expect(epicEmissions[0]).toEqual(addMessage([".NEXT TURN."]));
    });

    test("should NOT emit addMessage action", () => {
      // GIVEN

      const inputAction = advancePhase();
      const { epicEmissions, emitAction } = testEpic(nextPhaseLogEpic, {
        game: {
          phase: 4,
        },
      });

      // WHEN
      emitAction(inputAction);

      // THEN
      expect(epicEmissions.length).toBe(0);
    });
  });
});
