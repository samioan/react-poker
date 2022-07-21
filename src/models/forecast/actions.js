import ActionCreator from "aa-minimal-core-lib/models/actions/ActionCreator";

const namespacedActionCreator = ActionCreator("//FORECAST");

export const getForecast = namespacedActionCreator("GET_FORECAST");
