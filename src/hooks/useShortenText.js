import { useState, useEffect } from 'react';

// Custom hook for slicing down text
export const useShortenText = (text, maxCharLength) => {
  const [shortText, setShortText] = useState('');

  useEffect(() => {
    if (text.length > maxCharLength) {
      setShortText(`...${text.slice(-maxCharLength)}`);
    }
  }, [text, maxCharLength]);

  return {
    shortText,
  };
};
