import ActionCreator from "aa-minimal-core-lib/models/actions/ActionCreator";

const namespacedActionCreator = ActionCreator("//LOG");

export const addStartMessage = namespacedActionCreator("ADD_START_MESSAGE");
export const addMessage = namespacedActionCreator("ADD_MESSAGE");
