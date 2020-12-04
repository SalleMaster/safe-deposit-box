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
  SAFE_VALIDATE_CODE_SUCCESS,
  SAFE_VALIDATE_CODE_FAIL,
  SAFE_KEYPAD_LOCKED,
  SAFE_KEYPAD_UNLOCKED,
  SAFE_VALIDATE_CODE_RESET,
} from '../constants/safeConstants';

const initialState = {
  locked: false,
  password: '',
  status: 'Ready',
  serialNumber: 4815162342,
  serviceMode: false,
  keypadLocked: false,
};

export const safeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAFE_SET_LOCK_REQUEST:
      return { ...state, status: 'Locking...' };
    case SAFE_SET_LOCK_SUCCESS:
      return {
        ...state,
        locked: true,
        status: '',
        password: action.payload,
      };
    case SAFE_SET_LOCK_FAIL:
      return {
        ...state,
        status: action.payload,
      };
    case SAFE_SET_LOCK_RESET:
      return initialState;
    case SAFE_UNLOCK_REQUEST:
      return {
        ...state,
        status: 'Unlocking...',
      };
    case SAFE_UNLOCK_SUCCESS:
      return initialState;
    case SAFE_UNLOCK_FAIL:
      return {
        ...state,
        status: action.payload,
      };
    case SAFE_UNLOCK_RESET:
      return {
        ...state,
        status: '',
      };
    case SAFE_KEYPAD_LOCKED:
      return {
        ...state,
        keypadLocked: true,
      };
    case SAFE_KEYPAD_UNLOCKED:
      return {
        ...state,
        keypadLocked: false,
      };
    case SAFE_SERVICE_MODE_ENABLE:
      return {
        ...state,
        serviceMode: true,
        status: 'Service',
      };
    case SAFE_VALIDATE_CODE_REQUEST:
      return {
        ...state,
        status: 'Validating...',
      };
    case SAFE_VALIDATE_CODE_SUCCESS:
      return {
        ...state,
        status: 'Unlocking...',
      };
    case SAFE_VALIDATE_CODE_FAIL:
      return {
        ...state,
        status: action.payload,
      };
    case SAFE_VALIDATE_CODE_RESET:
      return {
        ...state,
        serviceMode: false,
        status: '',
      };
    default:
      return state;
  }
};
