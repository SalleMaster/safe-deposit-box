import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Actions
import {
  setLock,
  unlock,
  enableServiceMode,
  validateCode,
} from '../actions/safeActions';

// Input logic hook
export const useInput = (keys) => {
  const [text, setText] = useState([]);
  const dispatch = useDispatch();

  // Safe state
  const safe = useSelector((state) => state.safe);
  const { locked, serviceMode, keypadLocked } = safe;

  // Key enter handler
  const enterKey = (key) => {
    if (keypadLocked) {
      return;
    } else if (serviceMode) {
      setText([...text, key].join(''));
    } else if (key === 'L' && !locked) {
      dispatch(setLock(text));
      setText([]);
    } else {
      if (key === 'L') {
        return;
      }
      setText([...text, key].join(''));
    }
  };

  // Button click handler
  const onClickHandler = (e) => {
    enterKey(e.target.value);
  };

  // Keyboard handler callback
  const keyboardCallback = (e) => {
    let key = e.key;
    if (key === 'l') {
      key = 'L';
    }
    if (keys.includes(key)) {
      enterKey(key);
    }
  };

  // Listen for keyboard input
  useEffect(() => {
    document.addEventListener('keydown', keyboardCallback);

    return () => document.removeEventListener('keydown', keyboardCallback);
  });

  // Handle input when in locked or service state
  useEffect(() => {
    // Shorten text to six characters when not in service mode
    if (!serviceMode) {
      if (text.length > 6) {
        setText(text.slice(text.length - 6, text.length));
      }
    }

    // Handle input after 1.2s
    const timeout = setTimeout(() => {
      if (locked && text === '000000') {
        setText([]);
        dispatch(enableServiceMode());
      } else if (text.length !== 0 && !serviceMode && locked) {
        setText([]);
        dispatch(unlock(text));
      } else if (text.length !== 0 && serviceMode) {
        setText([]);
        dispatch(validateCode(text));
      }
    }, 1200);

    return () => clearTimeout(timeout);
  }, [text, locked, dispatch, setText, serviceMode]);

  return {
    onClickHandler,
    keys,
    text,
  };
};
