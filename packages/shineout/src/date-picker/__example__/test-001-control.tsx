/**
 * cn - 完全受控
 *    -- 通过封装实现完全受控
 * en - 完全受控
 *    -- 通过封装实现完全受控
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
