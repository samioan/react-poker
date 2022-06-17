import { getForecast } from "./actions";

const initialState = {
  city: "",
  temperature: 0,
  weather: "",
};

const forecastReducer = (state = initialState, action) => {
  switch (action.type) {
    case getForecast.succeeded.type: {
      return {
        ...state,
        city: action.payload.name,
        temperature: action.payload.main.temp,
        weather: action.payload.weather[0].description,
      };
    }

    default:
      return state;
  }
};

export { initialState };
export default forecastReducer;
