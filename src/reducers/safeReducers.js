import {
  SAFE_SET_LOCK_REQUEST,
  SAFE_SET_LOCK_SUCCESS,
  SAFE_SET_LOCK_FAIL,
  SAFE_UNLOCK_REQUEST,
  SAFE_UNLOCK_SUCCESS,
  SAFE_UNLOCK_FAIL,
  SAFE_INPUT_PASSWORD,
} from '../constants/safeConstants';

const initialState = {
  locked: false,
  password: '',
  status: 'Ready',
  idle: false,
  serialNumber: '4815162342',
  loading: false,
  error: false,
};

export const safeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAFE_INPUT_PASSWORD:
      return { ...state, password: action.payload };
    default:
      return state;
  }
};
