/**
 * cn - 尺寸
 *    -- 设置 `size` 属性可以调整组件尺寸
 * en - Base
 *    -- Set the size property to adjust the size of the component.
 */
import React from 'react';
import { Switch } from 'shineout';

const App: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 24, alignItems: 'center' }}>
      <Switch size={'small'} />
      <Switch />
      <Switch size={'large'} />
    </div>
  );
};

export default App;
