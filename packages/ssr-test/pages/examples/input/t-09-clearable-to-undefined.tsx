/**
 * cn - clearToUndefined
 *    --
 * en - clearToUndefined
 *    --
 */

import React from 'react';
import { Input } from 'shineout';

const App: React.FC = () => (
  <div style={{ width: 300, display: 'flex', flexDirection: 'column', gap: 24 }}>
    <Input clearable placeholder='input' />
    <Input
      clearable
      clearToUndefined
      placeholder='input clearToUndefined'
      onChange={console.log.bind(null, 'change')}
    />
    <Input.Number clearable placeholder='number' />
    <Input.Number
      clearable
      allowNull
      placeholder='number allowNull'
      onChange={console.log.bind(null, 'change')}
    />
    <Input.Number
      clearable
      clearToUndefined
      placeholder='number clearToUndefined'
      onChange={console.log.bind(null, 'change')}
    />

    <Input.Password clearable placeholder='password' />
    <Input.Password
      clearable
      clearToUndefined
      placeholder='password clearToUndefined'
      onChange={console.log.bind(null, 'change')}
    />
  </div>
);

export default App;
