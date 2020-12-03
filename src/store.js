import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Reducers
import { safeReducer } from './reducers/safeReducers';
import { keypadReducer } from './reducers/keypadReducers';

// Combine reducers in case we have more of them in the future
const reducer = combineReducers({
  safe: safeReducer,
  keypad: keypadReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
