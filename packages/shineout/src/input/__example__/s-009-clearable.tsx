import React from 'react';
import { Input } from 'shineout';

const App: React.FC = () => (
  <div>
    <Input clearable placeholder='input something' />
    <Input
      clearable
      clearToUndefined
      placeholder='clearToUndefined'
      onChange={console.log.bind(null, 'change')}
    />
    <Input
      clearable={() => {
        console.log('clear');
      }}
      placeholder='clearToUndefined'
    />
  </div>
);

export default App;
