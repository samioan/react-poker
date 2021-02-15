import {
  addMessage,
  addGameEndMessage,
  addPlayerMoneyMessage,
} from "./actions";

const initialState = {
  logger: [],
};

const logReducer = (state = initialState, action) => {
  switch (action.type) {
    case addMessage.type: {
      return {
        ...state,
        logger: [...state.logger, ...action.payload],
      };
    }

    case addGameEndMessage.type: {
      return {
        ...state,
        logger: [...state.logger, ...action.payload],
      };
    }

    case addPlayerMoneyMessage.type: {
      return {
        ...state,
        logger: [...state.logger, ...action.payload],
      };
    }

    default:
      return state;
  }
};

export { initialState };
export default logReducer;
