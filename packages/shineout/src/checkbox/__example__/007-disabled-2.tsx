/**
 * cn -
 *    -- disabled 为函数时，根据函数结果实现有条件禁用
 * en -
 *    -- When the disabled property is a function, the conditional disable is implemented according to the function result.
 */
import React from 'react';
import { Checkbox } from 'shineout';

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];

const App: React.FC = () => (
  <>
    <Checkbox.Group
      disabled={(d) => d === 'yellow'}
      keygen={(c) => c}
      data={data}
      defaultValue={['blue', 'cyan']}
    />
  </>
);

export default App;
