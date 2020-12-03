import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// Components
import BacklitScreen from './BacklitScreen';
// import NumberKeypad from './NumberKeypad';

const SafeDepositBox = () => {
  const keys = [7, 8, 9, 4, 5, 6, 1, 2, 3, '*', 0, 'L'];
  const [password, setPassword] = useState([]);

  const safe = useSelector((state) => state.safe);
  const { serialNumber } = safe;

  useEffect(() => {
    if (password.length > 6) {
      setPassword(password.slice(password.length - 6, password.length));
    }
    const timeout = setTimeout(() => {
      if (password.length !== 0) {
        console.log(`password: ${password}`);
      }
    }, 1200);

    return () => clearTimeout(timeout);
  }, [password]);

  // Button Click handler
  const onClickHandler = (e) => {
    setPassword([...password, e.target.value].join(''));
  };

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
