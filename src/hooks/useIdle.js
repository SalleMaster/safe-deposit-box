import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// Control idle state
export const useIdle = (text, idleAfter) => {
  const [idle, setIdle] = useState(false);

  const safe = useSelector((state) => state.safe);
  const { locked, status } = safe;

  useEffect(() => {
    setIdle(false);

    const timeout = setTimeout(() => {
      setIdle(true);
    }, idleAfter);

    return () => clearTimeout(timeout);
  }, [text, locked, status, idleAfter]);

  return {
    idle,
    locked,
    status,
  };
};
