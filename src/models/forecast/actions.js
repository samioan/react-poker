const Action = (type) => {
  const actionCreator = (payload) => ({
    type,
    payload,
  });
  actionCreator.type = type;
  return actionCreator;
};

export const getForecast = Action("GET_FORECAST");
export const forecastLoaded = Action("FORECAST_LOADED");
