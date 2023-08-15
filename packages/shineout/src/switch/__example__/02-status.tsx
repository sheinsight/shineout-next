/**
 * cn - 禁用状态
 *    -- 设置 disabled 属性 可以设置禁用状态
 * en - Disabled
 *    -- Set disabled property to disable the Switch
 */
import React from 'react';
import { Switch } from 'shineout';

const App: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 24 }}>
      <Switch value={true} />
      <Switch value={false} />
      <Switch value={true} disabled />
      <Switch value={false} disabled />
    </div>
  );
};

export default App;
