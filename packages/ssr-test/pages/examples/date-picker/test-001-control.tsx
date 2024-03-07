/**
 * cn - 完全受控
 *    -- value onChange
 * en - controlled
 *    -- value onChange
 */
import React from 'react';
import { DatePicker } from 'shineout';

const App = () => {
  const [v, setV] = React.useState('');
  return (
    <DatePicker
      type='date'
      placeholder='Select date'
      value={v}
      onChange={(d: string) => {
        console.log(d);
        setV(d);
      }}
    />
  );
};

export default App;
