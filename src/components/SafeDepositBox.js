import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Actions
import { setLock, unlock } from '../actions/safeActions';

// Components
import BacklitScreen from './BacklitScreen';

const SafeDepositBox = () => {
  const dispatch = useDispatch();

  const keys = [7, 8, 9, 4, 5, 6, 1, 2, 3, '*', 0, 'L'];
  const [password, setPassword] = useState([]);

  const safe = useSelector((state) => state.safe);
  const { serialNumber, locked } = safe;

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
  }, [password, locked, dispatch]);

  return (
    <div className='safe'>
      <BacklitScreen password={password} />
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
      <div className='serial-number'>S/N: {serialNumber}</div>
    </div>
  );
};

export default SafeDepositBox;
