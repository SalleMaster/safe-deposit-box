import React from 'react';
import { useSelector } from 'react-redux';

const BacklitScreen = ({ password }) => {
  const safe = useSelector((state) => state.safe);
  const { locked, status, idle } = safe;

  return (
    <div className={idle ? 'screen' : 'screen screen--on'}>
      <div className='screen__status'>{locked ? 'Locked' : 'Unlocked'}</div>
      <div className='screen__message'>{password}</div>
    </div>
  );
};

export default BacklitScreen;
