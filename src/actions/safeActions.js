import {
  SAFE_SET_LOCK_REQUEST,
  SAFE_SET_LOCK_SUCCESS,
  SAFE_SET_LOCK_FAIL,
  SAFE_SET_LOCK_RESET,
  SAFE_UNLOCK_REQUEST,
  SAFE_UNLOCK_SUCCESS,
  SAFE_UNLOCK_FAIL,
  SAFE_UNLOCK_RESET,
  SAFE_SERVICE_MODE_ENABLE,
  SAFE_VALIDATE_CODE_REQUEST,
  SAFE_KEYPAD_UNLOCKED,
  SAFE_KEYPAD_LOCKED,
  SAFE_VALIDATE_CODE_SUCCESS,
  SAFE_VALIDATE_CODE_FAIL,
  SAFE_VALIDATE_CODE_RESET,
} from '../constants/safeConstants';

export const setLock = (password) => async (dispatch) => {
  try {
    dispatch({ type: SAFE_KEYPAD_LOCKED });
    dispatch({ type: SAFE_SET_LOCK_REQUEST });

    if (!password || password.length !== 6 || password === '000000') {
      throw new Error('Error');
    }

    setTimeout(() => {
      dispatch({ type: SAFE_SET_LOCK_SUCCESS, payload: password });
      dispatch({ type: SAFE_KEYPAD_UNLOCKED });
    }, 3000);
  } catch (error) {
    dispatch({ type: SAFE_SET_LOCK_FAIL, payload: error.message });

    setTimeout(() => {
      dispatch({ type: SAFE_SET_LOCK_RESET });
      dispatch({ type: SAFE_KEYPAD_UNLOCKED });
    }, 2000);
  }
};

export const unlock = (password) => async (dispatch, getState) => {
  try {
    dispatch({ type: SAFE_KEYPAD_LOCKED });
    dispatch({ type: SAFE_UNLOCK_REQUEST });

    const safePassword = getState().safe.password;

    if (password !== safePassword) {
      throw new Error('Error');
    } else {
      setTimeout(() => {
        dispatch({ type: SAFE_UNLOCK_SUCCESS });
      }, 3000);
    }
  } catch (error) {
    dispatch({ type: SAFE_UNLOCK_FAIL, payload: error.message });

    setTimeout(() => {
      dispatch({ type: SAFE_UNLOCK_RESET });
      dispatch({ type: SAFE_KEYPAD_UNLOCKED });
    }, 2000);
  }
};

export const enableServiceMode = () => async (dispatch) => {
  dispatch({ type: SAFE_SERVICE_MODE_ENABLE });
};

export const validateCode = (code) => async (dispatch, getState) => {
  try {
    dispatch({ type: SAFE_KEYPAD_LOCKED });
    dispatch({ type: SAFE_VALIDATE_CODE_REQUEST });

    const res = await fetch(
      `https://9w4qucosgf.execute-api.eu-central-1.amazonaws.com/default/CR-JS_team_M02a?code=${code}`
    );

    const { sn } = await res.json();

    const safeSerialNumber = getState().safe.serialNumber;

    if (sn !== safeSerialNumber) {
      throw new Error('Error');
    } else {
      dispatch({ type: SAFE_VALIDATE_CODE_SUCCESS });
      setTimeout(() => {
        dispatch({ type: SAFE_UNLOCK_SUCCESS });
      }, 3000);
    }
  } catch (error) {
    dispatch({ type: SAFE_VALIDATE_CODE_FAIL, payload: error.message });

    setTimeout(() => {
      dispatch({ type: SAFE_VALIDATE_CODE_RESET });
      dispatch({ type: SAFE_KEYPAD_UNLOCKED });
    }, 2000);
  }
};
