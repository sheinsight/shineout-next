/**
 * cn - 基本用法
 *    -- 最基础的 Radio
 * en - Base
 *    -- Simple Radio
 */
import React from 'react';
import { Radio } from 'shineout';

const App: React.FC = () => {
  const [value, setValue] = React.useState('');
  return (
    <Radio
      checked={value === 'option'}
      htmlValue={'option'}
      onChange={(v) => {
        setValue(v);
      }}
    >
      Option
    </Radio>
  );
};

export default App;
