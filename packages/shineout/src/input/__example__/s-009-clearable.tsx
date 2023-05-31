import React from 'react';
import { Input } from 'shineout';

const App: React.FC = () => (
  <div>
    {/*<Input clearable placeholder='input something' />*/}
    {/*<Input*/}
    {/*  clearable*/}
    {/*  clearToUndefined*/}
    {/*  placeholder='clearToUndefined'*/}
    {/*  onChange={console.log.bind(null, 'change')}*/}
    {/*/>*/}
    <Input.Number clearable placeholder='input something' />
    <Input.Number
      clearable
      clearToUndefined
      placeholder='clearToUndefined'
      onChange={console.log.bind(null, 'change')}
    />
    {/*<Input.Password clearable placeholder='input something' />*/}
    {/*<Input.Password*/}
    {/*  clearable*/}
    {/*  clearToUndefined*/}
    {/*  placeholder='clearToUndefined'*/}
    {/*  onChange={console.log.bind(null, 'change')}*/}
    {/*/>*/}
  </div>
);

export default App;
