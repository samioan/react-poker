import { forecastLoaded, getForecast } from "./actions";

const initialState = {
  name: "",
  temp: "",
  description: "",
};

const forecastReducer = (state = initialState, action) => {
  switch (action.type) {
    case forecastLoaded.type: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case getForecast.succeeded.type: {
      return {
        ...state,
        // TODO: The reducer way
      };
    }

    default:
      return state;
  }
};

export { initialState };
export default forecastReducer;
