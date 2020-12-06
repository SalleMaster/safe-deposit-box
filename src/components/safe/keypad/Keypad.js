import React from 'react';

const Keypad = ({ onClickHandler, keys }) => {
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

export default Keypad;
