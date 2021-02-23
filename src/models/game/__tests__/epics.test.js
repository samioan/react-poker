import {
  createDeckEpic,
  dealCardsEpic,
  placeBetsEpic,
  startGameEpic,
  foldEpic,
  raiseEpic,
  replaceEpic,
  phase1CheckEpic,
  phase3CheckEpic,
  nextTurnEpic,
} from "../epics";
import { initialState } from "../reducer";
import {
  startGame,
  deckCreated,
  cardsDealt,
  betsPlaced,
  gameStarted,
  playerFolded,
  betsReset,
  fold,
  raise,
  betRaised,
  replace,
  cardReplaced,
  check,
  advancePhase,
  playerWon,
  playerLost,
  playerTied,
  nextTurn,
} from "../actions";

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

  describe("dealCardsEpic", () => {
    test("should emit cardsDealt action", () => {
      // GIVEN

      const inputAction = deckCreated();
      const { epicEmissions, emitAction } = testEpic(dealCardsEpic, {
        game: {
          deck: [],
          playerHand: [],
          aiHand: [],
          changedPlayerHand: [],
        },
      });

      // WHEN
      emitAction(inputAction);

      // THEN
      expect(epicEmissions.length).toBe(1);
      expect(epicEmissions[0]).toEqual(
        cardsDealt({
          deck: [],
          playerHand: [],
          aiHand: [],
          changedPlayerHand: [null, null, null, null, null],
        })
      );
    });
  });

  describe("placeBetsEpic", () => {
    test("should emit betsPlaced action", () => {
      // GIVEN

      const inputAction = cardsDealt();
      const { epicEmissions, emitAction } = testEpic(placeBetsEpic, {
        game: {
          playerBet: 0,
          aiBet: 0,
          playerMoney: 1000,
          aiMoney: 1000,
        },
      });

      // WHEN
      emitAction(inputAction);

      // THEN
      expect(epicEmissions.length).toBe(1);
      expect(epicEmissions[0]).toEqual(
        betsPlaced({
          playerBet: 100,
          aiBet: 100,
          playerMoney: 900,
          aiMoney: 900,
        })
      );
    });
  });

  describe("startGameEpic", () => {
    test("should emit gameStarted action", () => {
      // GIVEN

      const inputAction = betsPlaced();
      const { epicEmissions, emitAction } = testEpic(startGameEpic, {
        ...initialState,
      });

      // WHEN
      emitAction(inputAction);

      // THEN
      expect(epicEmissions.length).toBe(1);
      expect(epicEmissions[0]).toEqual(
        gameStarted({
          payload: undefined,
          type: "//GAME/BETS_PLACED",
        })
      );
    });
  });

  describe("foldEpic", () => {
    test("should emit playerFolded and betsReset actions", () => {
      // GIVEN

      const inputAction = fold();
      const { epicEmissions, emitAction } = testEpic(foldEpic, {
        ...initialState,
      });

      // WHEN
      emitAction(inputAction);

      // THEN
      expect(epicEmissions.length).toBe(2);
      expect(epicEmissions[0]).toEqual(playerFolded());
      expect(epicEmissions[1]).toEqual(betsReset());
    });
  });

  describe("raiseEpic", () => {
    test("should emit betRaised action", () => {
      // GIVEN

      const inputAction = raise();
      const { epicEmissions, emitAction } = testEpic(raiseEpic, {
        game: {
          playerMoney: 1000,
          aiMoney: 1000,
          playerBet: 0,
          aiBet: 0,
        },
      });

      // WHEN
      emitAction(inputAction);

      // THEN
      expect(epicEmissions.length).toBe(1);
      expect(epicEmissions[0]).toEqual(
        betRaised({
          playerMoney: 900,
          aiMoney: 900,
          playerBet: 100,
          aiBet: 100,
        })
      );
    });

    test("should NOT emit betRaised action", () => {
      // GIVEN

      const inputAction = raise();
      const { epicEmissions, emitAction } = testEpic(raiseEpic, {
        game: {
          playerMoney: 0,
          aiMoney: 0,
          playerBet: 0,
          aiBet: 0,
        },
      });

      // WHEN
      emitAction(inputAction);

      // THEN
      expect(epicEmissions.length).toBe(0);
    });
  });

  describe("replaceEpic", () => {
    test("should emit cardReplaced action", () => {
      // GIVEN

      const inputAction = replace();
      const { epicEmissions, emitAction } = testEpic(replaceEpic, {
        game: {
          deck: ["C14"],
          playerHand: ["S01", "C03", "D04", "H05", "S02"],
          changedPlayerHand: [null, null, null, null, null],
        },
      });

      // WHEN
      emitAction(inputAction);

      // THEN
      expect(epicEmissions.length).toBe(1);
      expect(epicEmissions[0]).toEqual(
        cardReplaced({
          deck: [],
          playerHand: ["S01", "C03", "D04", "H05", "C14"],
          changedPlayerHand: [null, null, null, null, "C14"],
        })
      );
    });
  });

  describe("phase1CheckEpic", () => {
    test("should emit advancePhase action", () => {
      // GIVEN

      const inputAction = check();
      const { epicEmissions, emitAction } = testEpic(phase1CheckEpic, {
        game: {
          phase: 1,
        },
      });

      // WHEN
      emitAction(inputAction);

      // THEN
      expect(epicEmissions.length).toBe(1);
      expect(epicEmissions[0]).toEqual(
        advancePhase({
          payload: undefined,
          type: "//GAME/CHECK",
        })
      );
    });
    test("should NOT emit advancePhase action", () => {
      // GIVEN

      const inputAction = check();
      const { epicEmissions, emitAction } = testEpic(phase1CheckEpic, {
        game: {
          phase: 2,
        },
      });

      // WHEN
      emitAction(inputAction);

      // THEN
      expect(epicEmissions.length).toBe(0);
    });
  });

  describe("phase3CheckEpic", () => {
    test("should emit advancePhase, playerWon and betsReset actions", () => {
      // GIVEN

      const inputAction = check();
      const { epicEmissions, emitAction } = testEpic(phase3CheckEpic, {
        game: {
          phase: 3,
          playerHand: ["C14", "C13", "C12", "C11", "C10"],
          aiHand: ["C05", "C06", "C07", "C08", "C09"],
        },
      });

      // WHEN
      emitAction(inputAction);

      // THEN
      expect(epicEmissions.length).toBe(3);
      expect(epicEmissions[0]).toEqual(advancePhase());
      expect(epicEmissions[1]).toEqual(playerWon());
      expect(epicEmissions[2]).toEqual(betsReset());
    });

    test("should emit advancePhase, playerLost and betsReset actions", () => {
      // GIVEN

      const inputAction = check();
      const { epicEmissions, emitAction } = testEpic(phase3CheckEpic, {
        game: {
          phase: 3,
          playerHand: ["C05", "C06", "C07", "C08", "C09"],
          aiHand: ["C14", "C13", "C12", "C11", "C10"],
        },
      });

      // WHEN
      emitAction(inputAction);

      // THEN
      expect(epicEmissions.length).toBe(3);
      expect(epicEmissions[0]).toEqual(advancePhase());
      expect(epicEmissions[1]).toEqual(playerLost());
      expect(epicEmissions[2]).toEqual(betsReset());
    });

    test("should emit advancePhase, playerTied and betsReset actions", () => {
      // GIVEN

      const inputAction = check();
      const { epicEmissions, emitAction } = testEpic(phase3CheckEpic, {
        game: {
          phase: 3,
          playerHand: ["C05", "C06", "C07", "C08", "C09"],
          aiHand: ["C05", "C06", "C07", "C08", "C09"],
        },
      });

      // WHEN
      emitAction(inputAction);

      // THEN
      expect(epicEmissions.length).toBe(3);
      expect(epicEmissions[0]).toEqual(advancePhase());
      expect(epicEmissions[1]).toEqual(playerTied());
      expect(epicEmissions[2]).toEqual(betsReset());
    });

    test("should NOT emit any actions", () => {
      // GIVEN

      const inputAction = check();
      const { epicEmissions, emitAction } = testEpic(phase3CheckEpic, {
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

  describe("nextTurnEpic", () => {
    test("should emit advancePhase action", () => {
      // GIVEN

      const inputAction = nextTurn();
      const { epicEmissions, emitAction } = testEpic(nextTurnEpic, {});

      // WHEN
      emitAction(inputAction);

      // THEN
      expect(epicEmissions.length).toBe(1);
      expect(epicEmissions[0]).toEqual(
        advancePhase({ payload: undefined, type: "//GAME/NEXT_TURN" })
      );
    });
  });
});
