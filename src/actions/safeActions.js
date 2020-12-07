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

// Set lock action
export const setLock = (password) => (dispatch) => {
  try {
    dispatch({ type: SAFE_KEYPAD_LOCKED });
    dispatch({ type: SAFE_SET_LOCK_REQUEST });

    // Password must be six characters long and can not be all zeroes
    if (!password || password.length !== 6 || password === '000000') {
      throw new Error('Error');
    }

    // Locking safe lasts 3s
    setTimeout(() => {
      dispatch({ type: SAFE_SET_LOCK_SUCCESS, payload: password });
      dispatch({ type: SAFE_KEYPAD_UNLOCKED });
    }, 3000);
  } catch (error) {
    // Display error
    dispatch({ type: SAFE_SET_LOCK_FAIL, payload: error.message });

    // Reset safe, and remove error after 2s
    setTimeout(() => {
      dispatch({ type: SAFE_SET_LOCK_RESET });
      dispatch({ type: SAFE_KEYPAD_UNLOCKED });
    }, 2000);
  }
};

// Unlock safe action
export const unlock = (password) => (dispatch, getState) => {
  try {
    dispatch({ type: SAFE_KEYPAD_LOCKED });
    dispatch({ type: SAFE_UNLOCK_REQUEST });

    // Current safe password
    const safePassword = getState().safe.password;

    // Passwords must match
    if (password !== safePassword) {
      throw new Error('Error');
    } else {
      // Unlocking safe lasts 3s
      setTimeout(() => {
        dispatch({ type: SAFE_UNLOCK_SUCCESS });
      }, 3000);
    }
  } catch (error) {
    // Display error
    dispatch({ type: SAFE_UNLOCK_FAIL, payload: error.message });

    // Reset safe to locked state, and remove error after 2s
    setTimeout(() => {
      dispatch({ type: SAFE_UNLOCK_RESET });
      dispatch({ type: SAFE_KEYPAD_UNLOCKED });
    }, 2000);
  }
};

// Service mode action
export const enableServiceMode = () => (dispatch) => {
  dispatch({ type: SAFE_SERVICE_MODE_ENABLE });
};

// Validate code action
export const validateCode = (code) => async (dispatch, getState) => {
  try {
    dispatch({ type: SAFE_KEYPAD_LOCKED });
    dispatch({ type: SAFE_VALIDATE_CODE_REQUEST });

    // Send validation code to an API
    const res = await fetch(
      `https://9w4qucosgf.execute-api.eu-central-1.amazonaws.com/default/CR-JS_team_M02a?code=${code}`
    );

    // Extract serial number from response
    const { sn } = await res.json();

    // Our safe serial number
    const safeSerialNumber = getState().safe.serialNumber;

    // Response serial number and our safe serial number must match
    if (sn !== safeSerialNumber) {
      throw new Error('Error');
    } else {
      dispatch({ type: SAFE_VALIDATE_CODE_SUCCESS });

      // Unlocking lasts 3s
      setTimeout(() => {
        dispatch({ type: SAFE_UNLOCK_SUCCESS });
      }, 3000);
    }
  } catch (error) {
    // Display error
    dispatch({ type: SAFE_VALIDATE_CODE_FAIL, payload: error.message });

    // Reset safe to locked state, and remove error after 2s
    setTimeout(() => {
      dispatch({ type: SAFE_VALIDATE_CODE_RESET });
      dispatch({ type: SAFE_KEYPAD_UNLOCKED });
    }, 2000);
  }
};
