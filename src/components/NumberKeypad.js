import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

//Actions
import { keypadInput } from '../actions/keypadActions';

const NumberKeypad = ({ setKeypadInput }) => {
  const dispatch = useDispatch();

  const keys = [7, 8, 9, 4, 5, 6, 1, 2, 3, '*', 0, 'L'];
  const [password, setPassword] = useState([]);

  // Button Click handler
  const onClickHandler = (e) => {
    setKeypadInput(e.target.value);
  };

  useEffect(() => {
    dispatch(keypadInput(password));
  }, [password]);

  // useEffect(() => {
  //   // if (password.length > 6) {
  //   //   setPassword(password.slice(password.length - 6, password.length));
  //   // }

  //   const timeout = setTimeout(() => {
  //     if (password.length !== 0) {
  //       console.log('timeout');
  //     }
  //   }, 1200);

  //   return () => clearTimeout(timeout);
  // }, [password]);

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

export default NumberKeypad;
