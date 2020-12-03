import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const BacklitScreen = ({ password }) => {
  const [idle, setIdle] = useState(false);
  const safe = useSelector((state) => state.safe);
  const { locked, status } = safe;

  useEffect(() => {
    setIdle(false);

    const timeout = setTimeout(() => {
      setIdle(true);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [password, locked, status]);

  return (
    <div className={idle ? 'screen' : 'screen screen--on'}>
      <div className='screen__status'>{locked ? 'Locked' : 'Unlocked'}</div>
      <div className='screen__message'>
        {password.length > 0 ? password : status}
      </div>
    </div>
  );
};

export default BacklitScreen;
