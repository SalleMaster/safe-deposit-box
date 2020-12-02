import React from 'react';

// Components
import BacklitScreen from './BacklitScreen';
import NumberKeypad from './NumberKeypad';

const SafeDepositBox = () => {
  return (
    <div className='safe'>
      <BacklitScreen />
      <NumberKeypad />
    </div>
  );
};

export default SafeDepositBox;
