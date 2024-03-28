import React from 'react';
import { Announce } from './component';

export default { title: 'Aria Live Broadcast' };

export function Usage() {
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Announce action="Select" />
      <Announce action="Alert" />
    </div>
  );
}
