import React, { useState } from 'react';
import { announce } from '../';

export function Announce({ action }: { action: 'Alert' | 'Select' }) {
  const [count, setCount] = useState(1);

  const handleClick = () => {
    announce(`${action} ${count}`, action === 'Alert' ? 'assertive' : 'polite');
    setCount((prev) => prev + 1);
  };

  return (
    <div>
      <button type="button" onClick={handleClick}>
        Announce: {action}
      </button>
    </div>
  );
}
