const Action = (type) => {
  const actionCreator = (payload) => ({
    type,
    payload,
  });
  actionCreator.type = type;
  return actionCreator;
};

export const check = Action("CHECK");
export const gameChecked = Action("GAME_CHECKED");
export const gameWin = Action("GAME_WIN");
export const gameLose = Action("GAME_LOSE");
export const gameTie = Action("GAME_TIE");
export const startGame = Action("START_GAME");
export const gameStarted = Action("GAME_STARTED");
export const fold = Action("FOLD");
export const gameFolded = Action("GAME_FOLDED");
export const raise = Action("RAISE");
export const betRaised = Action("BET_RAISED");
export const betNotRaised = Action("BET_NOT_RAISED");
export const replace = Action("REPLACE");
export const cardReplaced = Action("CARD_REPLACED");
export const cardNotReplaced = Action("CARD_NOT_REPLACED");
export const nextPhase = Action("NEXT_PHASE");
export const phaseAdvanced = Action("PHASE_ADVANCED");
