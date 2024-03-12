/**
 * cn - 布局
 *    -- 默认是水平布局，设置 block 属性可以改为垂直布局
 * en - Layout
 *    -- The default layout is horizontal, and the block property can be set to vertical
 */
import React from 'react';
import { Checkbox } from 'shineout';

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];

const App: React.FC = () => (
  <>
    <Checkbox.Group keygen={(c) => c} data={data} defaultValue={['blue', 'cyan']} />
    <Checkbox.Group
      keygen={(c) => c}
      data={data}
      defaultValue={['blue', 'cyan']}
      block
      style={{ marginTop: 24, display: 'inline-block' }}
    />
  </>
);

export default App;
