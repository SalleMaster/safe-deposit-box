import { KEYPAD_INPUT } from '../constants/keypadConstants';

const initialState = {
  typing: false,
  password: '',
};

export const keypadReducer = (state = initialState, action) => {
  switch (action.type) {
    case KEYPAD_INPUT:
      return {
        ...state,
        typing: action.payload.typing,
        password: action.payload.password,
      };
    default:
      return state;
  }
};
