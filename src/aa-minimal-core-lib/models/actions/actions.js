import ActionCreator from "./ActionCreator";

const namespacedActionCreator = ActionCreator("@@core");

const effect = namespacedActionCreator("effect");

export { effect };
