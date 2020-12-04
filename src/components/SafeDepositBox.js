import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// Components
import BacklitScreen from './BacklitScreen';
import NumKeypad from './NumKeypad';

const SafeDepositBox = () => {
  const [password, setPassword] = useState([]);

  const safe = useSelector((state) => state.safe);
  const { serialNumber, locked, status } = safe;

  return (
    <div className='safe'>
      <BacklitScreen password={password} locked={locked} status={status} />
      <NumKeypad
        locked={locked}
        password={password}
        setPassword={setPassword}
      />
      <div className='serial-number'>S/N: {serialNumber}</div>
    </div>
  );
};

export default SafeDepositBox;
