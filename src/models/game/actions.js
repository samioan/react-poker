import ActionCreator from "aa-minimal-core-lib/models/actions/ActionCreator";

const namespacedActionCreator = ActionCreator("//GAME");

export const check = namespacedActionCreator("CHECK");
export const playerChecked = namespacedActionCreator("PLAYER_CHECKED");
export const playerWon = namespacedActionCreator("PLAYER_WON");
export const playerLost = namespacedActionCreator("PLAYER_LOST");
export const playerTied = namespacedActionCreator("PLAYER_TIED");
export const startGame = namespacedActionCreator("START_GAME");
export const fold = namespacedActionCreator("FOLD");
export const raise = namespacedActionCreator("RAISE");
export const replace = namespacedActionCreator("REPLACE");
export const cardReplaced = namespacedActionCreator("CARD_REPLACED");
export const advancePhase = namespacedActionCreator("ADVANCE_PHASE");
export const betsReset = namespacedActionCreator("BETS_RESET");
