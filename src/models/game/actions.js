const Action = (type) => {
  const actionCreator = (payload) => ({
    type,
    payload,
  });
  actionCreator.type = type;
  return actionCreator;
};

export const check = Action("CHECK");
export const playerChecked = Action("PLAYER_CHECKED");
export const playerWon = Action("PLAYER_WON");
export const playerLost = Action("PLAYER_LOST");
export const playerTied = Action("PLAYER_TIED");
export const startGame = Action("START_GAME");
export const gameStarted = Action("GAME_STARTED");
export const fold = Action("FOLD");
export const playerFolded = Action("PLAYER_FOLDED");
export const raise = Action("RAISE");
export const betRaised = Action("BET_RAISED");
export const replace = Action("REPLACE");
export const cardReplaced = Action("CARD_REPLACED");
export const nextPhase = Action("NEXT_PHASE");
export const phaseAdvanced = Action("PHASE_ADVANCED");
