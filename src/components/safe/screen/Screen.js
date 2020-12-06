import React from 'react';

// Custom hooks
import { useIdle } from '../../../hooks/useIdle';
import { useShortenText } from '../../../hooks/useShortenText';

const Screen = ({ password }) => {
  // Max character length visible on screen
  const maxCharLength = 11;

  // Amount of time to wait before turning idle
  const idleAfter = 5000;

  // Control idle state of screen
  const { idle, locked, status } = useIdle(password, idleAfter);

  // Shorten text if it exceeds max char length
  const { shortText: shortPassword } = useShortenText(password, maxCharLength);

  return (
    <div className={idle ? 'screen' : 'screen screen--on'}>
      <div className='screen__state'>{locked ? 'Locked' : 'Unlocked'}</div>
      <div className='screen__message'>
        {password.length > maxCharLength
          ? shortPassword
          : password.length > 0
          ? password
          : status}
      </div>
    </div>
  );
};

export default Screen;
