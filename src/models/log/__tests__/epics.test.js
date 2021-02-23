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

describe("Game epics", () => {
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
        addGameEndMessage({
          logger: [],
        })
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
        addGameEndMessage({
          logger: [],
        })
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
        addGameEndMessage({
          logger: [],
        })
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
        addMessage({
          logger: [],
        })
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
        addMessage({
          logger: [],
        })
      );
    });
  });

  describe("raiseLogEpic", () => {
    test("should emit addMessage action", () => {
      // GIVEN

      const inputAction = betRaised();
      const { epicEmissions, emitAction } = testEpic(raiseLogEpic, {});

      // WHEN
      emitAction(inputAction);

      // THEN
      expect(epicEmissions.length).toBe(1);
      expect(epicEmissions[0]).toEqual(
        addMessage({
          logger: [],
        })
      );
    });
  });

  describe("replaceLogEpic", () => {
    test("should emit addMessage action", () => {
      // GIVEN

      const inputAction = cardReplaced();
      const { epicEmissions, emitAction } = testEpic(replaceLogEpic, {});

      // WHEN
      emitAction(inputAction);

      // THEN
      expect(epicEmissions.length).toBe(1);
      expect(epicEmissions[0]).toEqual(
        addMessage({
          logger: [],
        })
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
        addMessage({
          logger: [],
        })
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
      expect(epicEmissions[0]).toEqual(
        addMessage({
          logger: [],
        })
      );
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
      expect(epicEmissions[0]).toEqual(
        addMessage({
          logger: [],
        })
      );
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
      expect(epicEmissions[0]).toEqual(
        addMessage({
          logger: [],
        })
      );
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
      expect(epicEmissions[0]).toEqual(
        addMessage({
          logger: [],
        })
      );
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
