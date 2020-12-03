import {
  SAFE_SET_LOCK_REQUEST,
  SAFE_SET_LOCK_SUCCESS,
  SAFE_SET_LOCK_FAIL,
  SAFE_SET_LOCK_RESET,
  SAFE_UNLOCK_REQUEST,
  SAFE_UNLOCK_SUCCESS,
  SAFE_UNLOCK_FAIL,
  SAFE_UNLOCK_RESET,
} from '../constants/safeConstants';

export const setLock = (password) => async (dispatch) => {
  try {
    dispatch({ type: SAFE_SET_LOCK_REQUEST });

    if (!password || password.length !== 6) {
      throw new Error('Error');
    }

    setTimeout(() => {
      dispatch({ type: SAFE_SET_LOCK_SUCCESS, payload: password });
    }, 3000);
  } catch (error) {
    dispatch({ type: SAFE_SET_LOCK_FAIL, payload: error.message });

    setTimeout(() => {
      dispatch({ type: SAFE_SET_LOCK_RESET });
    }, 2000);
  }
};

export const unlock = (password) => async (dispatch, getState) => {
  try {
    dispatch({ type: SAFE_UNLOCK_REQUEST });

    const safePassword = getState().safe.password;

    if (password !== safePassword) {
      throw new Error('Error');
    } else {
      setTimeout(() => {
        dispatch({ type: SAFE_UNLOCK_SUCCESS, payload: password });
      }, 3000);
    }
  } catch (error) {
    dispatch({ type: SAFE_UNLOCK_FAIL, payload: error.message });

    setTimeout(() => {
      dispatch({ type: SAFE_UNLOCK_RESET });
    }, 2000);
  }
};
