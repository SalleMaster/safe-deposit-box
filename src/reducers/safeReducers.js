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

const initialState = {
  locked: false,
  password: '',
  status: 'Ready',
  serialNumber: '4815162342',
};

export const safeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAFE_SET_LOCK_REQUEST:
      return { ...state, status: 'Locking...' };
    case SAFE_SET_LOCK_SUCCESS:
      return {
        ...state,
        locked: true,
        status: 'Ready',
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
        status: 'Error',
      };
    case SAFE_UNLOCK_RESET:
      return {
        ...state,
        status: 'Ready',
      };
    default:
      return state;
  }
};
