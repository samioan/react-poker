//import {
//  startGameEpic,
//  foldEpic,
//  raiseEpic,
//  replaceEpic,
//  checkEpic,
//  nextPhaseEpic,
//} from "../epics";
//import { initialState } from "../reducer";
//import {
//  playerChecked,
//  playerWon,
//  playerLost,
//  playerTied,
//  cardReplaced,
//  gameStarted,
//  playerFolded,
//  betRaised,
//  phaseAdvanced,
//} from "../actions";
//import * as services from "../services";
//
//describe("Game epics", () => {
//  describe("startGameEpic", () => {
//    test("should emit stopGame action, when setTicTacToe is emitted and state has a winner", () => {
//      // GIVEN
//      const inputAction = setTicTacToe();
//
//      // WHEN
//      const { epicEmissions, emitAction } = testEpic(checkGameFinishedEpic, {
//        ...initialState,
//        ticTacToe: {
//          winner: "WinnerName",
//        },
//      });
//      emitAction(inputAction);
//
//      // THEN
//      expect(epicEmissions.length).toBe(1);
//      expect(epicEmissions[0]).toEqual(stopGame());
//    });
//
//    describe("joinGameEpic", () => {
//      test("effect operator should have been called joinGameRequest, with state default name as a parameter", () => {
//        // GIVEN
//        const inputAction = joinGame();
//        const joinGameRequestSpy = jest
//          .spyOn(services, "joinGameRequest")
//          .mockReturnValue({});
//
//        // WHEN
//        const { epicEmissions, emitAction } = testEpic(joinGameEpic, {
//          ...initialState,
//          players: {
//            defaultName: "ADefaultName",
//          },
//        });
//
//        emitAction(inputAction);
//        epicEmissions[0].payload.effectCreator();
//
//        // THEN
//        expect(joinGameRequestSpy).toHaveBeenCalledWith("ADefaultName");
//        expect(epicEmissions[0].payload.effectResponseAction).toEqual(joinGame);
//        expect(epicEmissions[0].payload.additionalResponseActions).toEqual([
//          startGame,
//        ]);
//        joinGameRequestSpy.mockRestore();
//      });
//    });
//  });
//});
