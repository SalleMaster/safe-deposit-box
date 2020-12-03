import {
  SAFE_INPUT_PASSWORD,
  SAFE_SET_LOCK_REQUEST,
  SAFE_SET_LOCK_SUCCESS,
  SAFE_SET_LOCK_FAIL,
  SAFE_UNLOCK_REQUEST,
  SAFE_UNLOCK_SUCCESS,
  SAFE_UNLOCK_FAIL,
} from '../constants/safeConstants';

export const inputPassword = (password) => async (dispatch) => {
  if (password.length > 6) {
    password = password.slice(password.length - 6, password.length);
  }
  dispatch({ type: SAFE_INPUT_PASSWORD, payload: password.join('') });
};
