import React, { useState, useEffect } from 'react';

const BacklitScreen = ({ password, locked, status }) => {
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    setIdle(false);

    const timeout = setTimeout(() => {
      setIdle(true);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [password, locked, status]);

  return (
    <div className={idle ? 'screen' : 'screen screen--on'}>
      <div className='screen__state'>{locked ? 'Locked' : 'Unlocked'}</div>
      <div className='screen__message'>
        {password.length > 0 ? password : status}
      </div>
    </div>
  );
};

export default BacklitScreen;
