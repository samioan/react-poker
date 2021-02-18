import ActionCreator from "aa-minimal-core-lib/models/actions/ActionCreator";

const namespacedActionCreator = ActionCreator("//LOG");

export const addMessage = namespacedActionCreator("ADD_MESSAGE");
export const addGameEndMessage = namespacedActionCreator(
  "ADD_GAME_END_MESSAGE"
);
export const addPlayerMoneyMessage = namespacedActionCreator(
  "ADD_PLAYER_MONEY_MESSAGE"
);
addPlayerMoneyMessage;
