import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Actions
import { setLock, unlock } from '../actions/safeActions';

const NumKeypad = ({ locked, password, setPassword }) => {
  const keys = [7, 8, 9, 4, 5, 6, 1, 2, 3, '*', 0, 'L'];

  const dispatch = useDispatch();

  // Button Click handler
  const onClickHandler = (e) => {
    if (e.target.value === 'L' && !locked) {
      dispatch(setLock(password));
      setPassword([]);
    } else {
      if (e.target.value === 'L') {
        return;
      }
      setPassword([...password, e.target.value].join(''));
    }
  };

  useEffect(() => {
    if (password.length > 6) {
      setPassword(password.slice(password.length - 6, password.length));
    }
    const timeout = setTimeout(() => {
      if (password.length !== 0 && locked) {
        setPassword([]);
        dispatch(unlock(password));
      }
    }, 1200);

    return () => clearTimeout(timeout);
  }, [password, locked, dispatch, setPassword]);

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
