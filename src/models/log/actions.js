import ActionCreator from "aa-minimal-core-lib/models/actions/ActionCreator";

const namespacedActionCreator = ActionCreator("//LOG");

export const addMessage = namespacedActionCreator("ADD_MESSAGE");
