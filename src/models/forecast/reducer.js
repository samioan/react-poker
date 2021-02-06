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

    default:
      return state;
  }
};

export { initialState };
export default forecastReducer;
