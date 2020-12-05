import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Actions
import {
  setLock,
  unlock,
  enableServiceMode,
  validateCode,
} from '../actions/safeActions';

const NumKeypad = ({
  locked,
  password,
  setPassword,
  serviceMode,
  keypadLocked,
}) => {
  const keys = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '*', '0', 'L'];

  const dispatch = useDispatch();

  const enterKey = (key) => {
    if (keypadLocked) {
      return;
    } else if (serviceMode) {
      setPassword([...password, key].join(''));
    } else if (key === 'L' && !locked) {
      dispatch(setLock(password));
      setPassword([]);
    } else {
      if (key === 'L') {
        return;
      }
      setPassword([...password, key].join(''));
    }
  };

  // Button Click handler
  const onClickHandler = (e) => {
    enterKey(e.target.value);
  };

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

  useEffect(() => {
    if (!serviceMode) {
      if (password.length > 6) {
        setPassword(password.slice(password.length - 6, password.length));
      }
    }

    const timeout = setTimeout(() => {
      if (locked && password === '000000') {
        setPassword([]);
        dispatch(enableServiceMode());
      } else if (password.length !== 0 && !serviceMode && locked) {
        setPassword([]);
        dispatch(unlock(password));
      } else if (password.length !== 0 && serviceMode) {
        setPassword([]);
        dispatch(validateCode(password));
      }
    }, 1200);

    return () => clearTimeout(timeout);
  }, [password, locked, dispatch, setPassword, serviceMode]);

  return (
    <div className='keypad'>
      {keys.map((key, index) => (
        <button
          className='keypad__btn'
          value={key}
          key={index}
          onClick={(e) => onClickHandler(e)}
        >
          {key}
        </button>
      ))}
    </div>
  );
};

export default NumKeypad;
