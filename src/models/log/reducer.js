import { addMessage } from "./actions";

const initialState = {
  logger: [],
};

const logReducer = (state = initialState, action) => {
  switch (action.type) {
    case addMessage.type: {
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
export default logReducer;
