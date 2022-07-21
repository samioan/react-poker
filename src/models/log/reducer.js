import { addMessage, addStartMessage } from "./actions";

const initialState = {
  logMessages: [],
};

const logReducer = (state = initialState, action) => {
  switch (action.type) {
    case addStartMessage.type: {
      return {
        ...state,
        logMessages: [...action.payload],
      };
    }
    case addMessage.type: {
      return {
        ...state,
        logMessages: [...state.logMessages, ...action.payload],
      };
    }

    default:
      return state;
  }
};

export { initialState };
export default logReducer;
