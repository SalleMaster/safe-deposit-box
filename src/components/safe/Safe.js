import React from 'react';
import { useSelector } from 'react-redux';

// Components
import Screen from './screen/Screen';
import Keypad from './keypad/Keypad';

// Custom hook for input logic
import { useInput } from '../../hooks/useInput';

const Safe = () => {
  // Keys we can use to interact with safe
  const keys = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '*', '0', 'L'];

  // Safe state
  const safe = useSelector((state) => state.safe);
  const { serialNumber } = safe;

  const { onClickHandler, text: password } = useInput(keys);

  return (
    <div className='safe'>
      <Screen password={password} />
      <Keypad onClickHandler={onClickHandler} keys={keys} />
      <div className='serial-number'>S/N: {serialNumber}</div>
    </div>
  );
};

export default Safe;
