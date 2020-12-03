import { KEYPAD_INPUT } from '../constants/keypadConstants';

export const keypadInput = (password) => async (dispatch) => {
  dispatch({
    type: KEYPAD_INPUT,
    payload: {
      typing: true,
      password,
    },
  });
};
